---
title: 낙관적 업데이트를 통한 북마크 기능 사용자 경험 개선 (체감 응답성 약 95% 이상 개선)
description: 북마크 기능 UX 개선
date: '2026-09-09'
problem: 사용자는 버튼을 눌렀음에도 **즉각적인 변화가 없는** UX 문제 발생
solution: React Query의 **Optimistic Update** 전략을 적용
result: |-
  UI 반응 속도를 기존 **300~500ms → 즉시(0~8ms)**로 단축 (**체감 응답성 약 95% 이상 개선**)
  요청 실패 시에도 **안전한 롤백 구조** 확보
  서버 상태와 UI 상태 간 정합성 유지
thumbnail: ''
---
<h2>들어가며</h2><p>팀원들과 QA를 진행하면서 북마크 버튼을 클릭했을 때 UI가 늦게 바뀐다는 피드백을 들었습니다.</p><p>확인해 보니 버튼을 누르고 화면이 바뀌기까지 300~500ms 정도가 걸리고 있었습니다. 숫자로만 보면 짧은 시간이지만, 북마크처럼 누르자마자 결과가 보여야 하는 버튼에서는 이 정도 지연도 "제대로 눌린 건가?" 하는 의문을 남깁니다. 반응이 없으니 한 번 더 누르게 되고, 그러면 방금 한 북마크가 다시 해제될 수도 있습니다.</p><p>이 지연이 왜 생겼는지 살펴보고, React Query의 Optimistic Update로 버튼을 누르는 즉시 화면이 바뀌도록 개선한 과정을 정리해보겠습니다.</p><h2>왜 반응이 늦었을까</h2><p>원인은 금방 찾았습니다. 북마크 요청이 성공하면 <code>invalidateQueries</code>로 목록을 다시 불러오는 방식이었습니다.</p><pre><code class="language-typescript">// 기존 방식 (예시 코드)
const { mutate } = useMutation({
  mutationFn: toggleBookmark,
  onSuccess: () =&gt; {
    queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
  },
});</code></pre><p>이렇게 하면 서버 응답이 와야 화면이 바뀝니다. 네트워크 상태에 따라 300~500ms 정도 걸렸고, 그동안 사용자는 버튼이 눌린 건지 알 수가 없습니다.</p><h2>첫 번째 시도는 useState였다</h2><p>제일 먼저 떠올린 건 <code>useState</code>로 화면을 먼저 바꿔 두고 요청을 보내는 방법이었습니다. 반응은 빨라졌는데, 금방 다른 문제가 보였습니다.</p><p>같은 북마크 상태를 React Query 캐시와 컴포넌트 상태 두 곳에서 들고 있게 된 겁니다. 요청이 실패하면 어느 쪽 값으로 되돌려야 하는지 헷갈렸고, 두 값이 어긋나는 순간 화면에 뭐가 맞는 건지 저도 확신할 수 없었습니다. 코드를 보면 볼수록 이건 버그를 예약해 두는 구조라는 생각이 들어서 되돌렸습니다.</p><h2>상태는 한 곳에만 두기로 했다</h2><p>다시 생각해 보니 방향은 맞았습니다. 화면을 먼저 바꾸는 것까지는 좋았고, 문제는 그걸 별도 상태로 한 데 있었습니다. 그래서 React Query 캐시를 직접 먼저 바꾸는 Optimistic Update로 바꿨습니다.</p><p>흐름은 세 단계입니다. <code>onMutate</code>에서 요청을 보내기 전에 캐시를 바꿔 화면에 바로 반영하고, 혹시 모르니 이전 캐시를 챙겨 둡니다. 요청이 실패하면 <code>onError</code>에서 챙겨 둔 값으로 되돌립니다. 성공이든 실패든 끝나면 <code>onSettled</code>에서 서버 데이터로 한 번 더 맞춥니다.</p><pre><code class="language-typescript">// 예시 코드
const { mutate } = useMutation({
  mutationFn: toggleBookmark,
  onMutate: async (id: number) =&gt; {
    await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
    const previous = queryClient.getQueryData&lt;Bookmark[]&gt;(["bookmarks"]);

    queryClient.setQueryData&lt;Bookmark[]&gt;(["bookmarks"], (old = []) =&gt;
      old.map((item) =&gt;
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item,
      ),
    );

    return { previous };
  },
  onError: (_error, _id, context) =&gt; {
    queryClient.setQueryData(["bookmarks"], context?.previous);
  },
  onSettled: () =&gt; {
    queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
  },
});</code></pre><p><code>cancelQueries</code>는 처음에 빠뜨렸던 부분입니다. 진행 중이던 조회 요청이 늦게 도착하면, 방금 바꿔 둔 캐시를 옛날 데이터로 덮어써 버릴 수 있습니다. 그래서 캐시를 바꾸기 전에 진행 중인 요청부터 멈춥니다.</p><h2>결과</h2><ul><li><p>버튼을 누르고 화면이 바뀌기까지 <strong>300~500ms 걸리던 것이 0~8ms</strong>로 줄었습니다. (체감 응답성 약 95% 이상 개선)</p></li><li><p>요청이 실패해도 이전 상태로 깔끔하게 돌아갑니다.</p></li><li><p>상태가 캐시 한 곳에만 있으니 서버 데이터와 화면이 어긋날 일이 없어졌습니다.</p></li></ul><h2>돌아보며</h2><p>Optimistic Update라고 하면 "먼저 보여 주는 것"만 떠올렸는데, 해 보니 더 중요한 건 틀렸을 때 확실하게 되돌릴 수 있느냐였습니다. useState로 흉내 냈을 때 불안했던 이유도 결국 그 부분이 흐릿했기 때문이었던 것 같습니다.</p>
