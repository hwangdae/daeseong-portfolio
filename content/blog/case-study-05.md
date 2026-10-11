---
title: "Discord PR 알림 시스템 구축"
description: "Discord PR 알림 시스템 구축"
date: '2026-09-11'
problem: |-
  PR 생성 후 코드 리뷰를 받기 위해 팀원에게 **Discord DM으로 직접 리뷰 요청**을 해야 했음
  PR 생성 및 리뷰 요청 여부를 수동으로 확인해야 하여, PR이 올라와도 **즉시 인지되지 않는** 경우가 빈번하게 발생
solution: |-
  **GitHub WebHook** 기반 PR 이벤트 감지
  **Discord 채널 자동 알림** 시스템 구축
result: |-
  PR 생성 및 리뷰 요청 시 팀원에게 자동 알림이 전달되어 리뷰 인지 속도 개선 (**리뷰 시작 시간 2~3일 -> 1일 이내로 단축**)
  개인 DM 기반 요청을 제거해 반복적인 **커뮤니케이션 비용 감소**
  코드 리뷰 흐름이 Discord 채널 중심으로 정리되어 협업 가시성과 효율 향상
thumbnail: "/assets/pr1.png"
---
<h2>들어가며</h2><p>노웨잇은 디자이너 1명, 프론트엔드 3명, 백엔드 2명이 같이 만든 프로젝트입니다. 사람이 늘어나면서 코드 리뷰가 자꾸 늦어졌는데, 원인을 따져 보니 좀 허무했습니다. 다들 리뷰를 안 하는 게 아니라, PR이 올라온 걸 몰랐던 겁니다.</p><h2>PR을 올리면 DM부터 보내야 했다</h2><p>당시에는 PR을 올리고 나면 리뷰어에게 Discord DM으로 "PR 올렸어요, 봐 주세요" 하고 따로 연락해야 했습니다. 이걸 깜빡하면 PR은 그대로 방치됐고, 받는 쪽도 GitHub에 직접 들어가 보기 전까지는 리뷰 요청이 온 줄 몰랐습니다.</p><p>그러다 보니 리뷰가 시작되기까지 2~3일씩 걸리는 경우가 많았습니다. 누가 잘못한 게 아니라, 알림이라는 게 아예 없었던 겁니다.</p><h2>사람이 챙기던 걸 시스템이 챙기게</h2><p>그래서 PR에 무슨 일이 생기면 팀 채널에 자동으로 알림이 오게 만들었습니다.</p><p>먼저 GitHub Webhook으로 PR 생성, 리뷰 요청, 리뷰 완료 같은 이벤트를 받도록 설정했습니다. 그리고 이벤트가 들어오면 Discord Webhook으로 팀 채널에 메시지를 보냈습니다.</p><p>메시지에 뭘 넣을지 고민을 좀 했습니다. 알림만 오고 결국 GitHub에 들어가서 확인해야 한다면 반쪽짜리니까요. 그래서 알림만 보고도 "내가 봐야 하는 건지, 뭘 봐야 하는지" 알 수 있게 PR 제목, 작성자, 리뷰 요청 대상, PR 링크를 함께 넣었습니다.</p><pre><code class="language-typescript">// 예시 코드: PR 이벤트를 Discord 메시지로 변환해 전송
await fetch(DISCORD_WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    embeds: [
      {
        title: pullRequest.title,
        url: pullRequest.html_url,
        fields: [
          { name: "작성자", value: pullRequest.user.login, inline: true },
          { name: "리뷰어", value: reviewers.join(", "), inline: true },
        ],
      },
    ],
  }),
});</code></pre><img src="/assets/pr1.png" alt="Discord 채널로 전송된 PR 알림"><h2>결과</h2><ul><li><p>리뷰가 시작되기까지 걸리던 시간이 <strong>2~3일에서 1일 이내</strong>로 줄었습니다.</p></li><li><p>"PR 올렸어요" DM을 보낼 일이 없어졌습니다.</p></li><li><p>리뷰 관련 대화가 채널 한곳에 모이면서 누가 어떤 PR을 보고 있는지 팀 전체가 알 수 있게 되었습니다.</p></li></ul><h2>돌아보며</h2><p>기술적으로 어려운 작업은 아니었는데 팀에 준 영향은 컸습니다. 리뷰가 늦어진 게 누군가의 게으름 때문이 아니었다는 걸 확인한 것도 개인적으로는 의미가 있었습니다. 사람이 매번 기억해야 하는 일이 있다면, 그게 먼저 자동화할 대상인 것 같습니다.</p>
