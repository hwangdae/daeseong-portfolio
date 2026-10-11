---
title: "Dynamic Import를 활용한 후기 상태별 코드 스플리팅 (JS 번들 크기 최대 120KB 절감)"
description: "Dynamic Import 코드 스플리팅"
date: '2026-09-14'
problem: |-
  하나의 컴포넌트에서 후기 미작성 안내, 후기 작성, 내가 작성한 후기 컴포넌트가 중첩 임포트되는 구조로 인해 실제 사용 여부와 관계없이 **모든 코드가 초기 번들에 포함**되었고, 이로 인해 초기 페이지 로딩 속도가 저하되는 문제가 발생
solution: |-
  **Dynamic Import**를 활용한 컴포넌트 분리
result: |-
  3개 주요 페이지의 초기 JS 번들 크기를 **최대 약 120KB 절감**하여 초기 로딩 성능을 개선
thumbnail: ""
---
<h2>들어가며</h2><p>후기 상세 화면은 사용자 상태에 따라 세 가지 화면 중 하나만 보여 줍니다. 아직 후기를 안 썼으면 안내 화면, 쓰는 중이면 작성 화면, 다 썼으면 내 후기 화면입니다. 그런데 번들을 열어 보니 한 번에 하나만 보이는 이 세 화면이 전부 처음부터 같이 내려오고 있었습니다.</p><h2>보이지 않는 코드까지 받고 있었다</h2><p>하나의 상세 컴포넌트에서 세 컴포넌트를 모두 정적으로 import하고 있었습니다.</p><pre><code class="language-tsx">// 기존 구조 (예시 코드)
import ReviewEmpty from "./ReviewEmpty";
import ReviewEditor from "./ReviewEditor";
import MyReview from "./MyReview";

export default function ReviewDetail({ status }: Props) {
  if (status === "empty") return &lt;ReviewEmpty /&gt;;
  if (status === "writing") return &lt;ReviewEditor /&gt;;
  return &lt;MyReview /&gt;;
}</code></pre><p>조건문으로 하나만 보여 주니까 당연히 하나만 불러온다고 생각했는데, 정적 <code>import</code>는 화면에 그려지든 말든 번들에 들어갑니다. 특히 에디터처럼 무거운 컴포넌트까지 딸려 오면서 첫 로딩이 느려지고 있었습니다. 알고 보면 당연한 건데, 번들을 직접 열어 보기 전까지는 전혀 의식하지 못했던 부분이었습니다.</p><h2>필요할 때만 불러오게</h2><p>작성 화면(<code>ReviewEditor</code>)과 내 후기 화면(<code>MyReview</code>)을 <code>next/dynamic</code>으로 분리해서, 실제로 그 상태가 됐을 때만 코드를 받아오도록 바꿨습니다.</p><pre><code class="language-tsx">// 예시 코드
import dynamic from "next/dynamic";

const ReviewEditor = dynamic(() =&gt; import("./ReviewEditor"), { ssr: false });
const MyReview = dynamic(() =&gt; import("./MyReview"), { ssr: false });</code></pre><p><code>ssr: false</code>도 같이 붙였습니다. 이 컴포넌트들은 브라우저 API를 쓰기 때문에 서버에서 그릴 이유가 없고, 서버에서 그리다가 <code>window</code>를 찾지 못해 오류가 나는 상황도 미리 막을 수 있었습니다.</p><h2>결과</h2><ul><li><p>주요 페이지 3곳의 초기 JS 번들 크기를 <strong>최대 약 120KB</strong> 줄여서 첫 로딩이 빨라졌습니다.</p></li></ul><h2>돌아보며</h2><p>화면에 보이는 것과 실제로 받는 것이 다를 수 있다는 걸 이때 제대로 느꼈습니다. 그 뒤로는 상태에 따라 무거운 화면이 갈라지는 곳을 보면 번들부터 한 번 열어 보는 습관이 생겼습니다.</p>
