---
title: "Promise.allSettled로 여러 이미지 병렬 처리 및 부분 실패 허용 (리뷰 업로드 속도 5초 -> 2초 단축)"
description: "Promise.allSettled"
date: '2026-09-13'
problem: |-
  고해상도 리뷰 이미지를 그대로 업로드하면서 이미지 **업로드 시간이 길어지고**, 이로 인해 리뷰 작성 완료까지 대기 시간이 발생
  여러 장의 이미지를 **순차 업로드**하는 구조로 인해 네트워크 대기 시간이 누적됨
  단일 이미지 업로드 실패 시 **전체 리뷰 업로드가 중단**되어 사용자 경험이 저하됨
solution: |-
  **클라이언트 단 이미지 압축**을 통한 업로드 병목 제거
  **Promise.allSettled 기반 병렬 업로드** 및 **부분 실패 허용**
result: |-
  고해상도 이미지(약 5000KB) 5장 기준 리뷰 전체 업로드 시간 **약 5초 → 2초로 단축**
  일부 이미지 업로드 실패 시에도 **리뷰 작성 흐름이 중단되지 않아** 사용자 이탈 가능성 감소
  리뷰 작성 과정 전반에서 체감 성능 및 안정성 향상
thumbnail: "/assets/promise.png"
---
<h2>들어가며</h2><p>리뷰에 사진을 여러 장 붙여서 등록하면, 버튼을 누르고 한참을 기다려야 했습니다. 더 곤란한 건 사진 한 장이 실패하면 리뷰 전체가 저장되지 않는다는 점이었습니다. 공들여 쓴 리뷰가 사진 한 장 때문에 날아가는 건, 사용자 입장에서 제일 겪고 싶지 않은 일일 겁니다.</p><h2>무엇이 느리고, 왜 다 실패했을까</h2><p>코드를 보니 이유가 세 가지 있었습니다.</p><p>첫째, 고해상도 사진을 줄이지 않고 원본 그대로 올리고 있었습니다. 둘째, <code>for</code>문으로 한 장씩 순서대로 올리고 있어서 사진이 늘어날수록 시간이 그대로 쌓였습니다. 셋째, 이걸 병렬로 바꾸려고 <code>Promise.all</code>을 쓰면 한 장만 실패해도 전체가 실패로 처리되는 구조였습니다.</p><h2>먼저 사진을 가볍게</h2><p>업로드 전에 <code>browser-image-compression</code>으로 사진을 리사이징하고 압축했습니다. 보낼 데이터가 줄어드니 전송 시간도, 서버가 받는 부담도 같이 줄었습니다.</p><p>여기서 <code>useWebWorker</code> 옵션을 꼭 켰습니다. 압축은 CPU를 꽤 쓰는 작업이라, 메인 스레드에서 돌리면 압축하는 동안 화면이 멈춘 것처럼 보일 수 있기 때문입니다. 빨라지자고 한 작업이 화면을 굳게 만들면 의미가 없으니까요.</p><pre><code class="language-typescript">// 예시 코드
import imageCompression from "browser-image-compression";

const compress = (file: File) =&gt;
  imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });</code></pre><h2>한꺼번에 올리되, 하나가 실패해도 괜찮게</h2><p>순서대로 올리던 걸 동시에 올리도록 바꾸면서 <code>Promise.all</code> 대신 <code>Promise.allSettled</code>를 썼습니다. <code>Promise.all</code>은 하나라도 실패하면 바로 전체를 실패로 끝내지만, <code>Promise.allSettled</code>는 모든 요청이 끝날 때까지 기다렸다가 각각 성공했는지 실패했는지를 알려 줍니다.</p><pre><code class="language-typescript">// 예시 코드
const results = await Promise.allSettled(files.map(uploadImage));

const uploadedUrls = results
  .filter((result): result is PromiseFulfilledResult&lt;string&gt; =&gt; result.status === "fulfilled")
  .map((result) =&gt; result.value);

const failedCount = results.length - uploadedUrls.length;</code></pre><p>성공한 사진만 골라서 리뷰에 붙이고, 텍스트와 함께 저장했습니다. 실패한 사진은 조용히 빼 버리면 사용자가 나중에 "내 사진 어디 갔지?" 하고 당황할 수 있어서, 어떤 사진이 실패했고 다시 올릴 수 있다는 안내를 분명하게 보여 줬습니다.</p><img src="/assets/promise.png" alt="개선 전후 리뷰 업로드 시간 비교"><h2>결과</h2><ul><li><p>약 5000KB짜리 사진 5장 기준으로 리뷰 전체 업로드 시간이 <strong>약 5초에서 2초</strong>로 줄었습니다.</p></li><li><p>사진 일부가 실패해도 리뷰는 저장되니, 작성하다가 포기하고 나갈 이유가 하나 줄었습니다.</p></li><li><p>리뷰를 쓰는 과정 전체가 더 빠르고 안정적으로 느껴지게 되었습니다.</p></li></ul><h2>돌아보며</h2><p>속도는 압축과 병렬 처리로, 안정성은 부분 실패 허용으로 풀었습니다. 개인적으로는 "하나가 실패하면 전부 실패"가 정말 사용자가 원하는 동작인지 다시 생각해 본 게 제일 기억에 남습니다. 개발하면서는 전부 성공 아니면 전부 실패가 깔끔해 보였는데, 사용자에게는 그게 가장 나쁜 결과였습니다.</p>
