---
title: GitHub Actions 기반 CI/CD 파이프라인 구축(배포 시간 5분 이상 → 2분 내외로 단축)
description: CI/CD 파이프라인 구축
date: '2026-09-16'
problem: |-
  개발 서버의 변경 사항을 배포 서버에 반영하기 위해 **매번 수동으로 빌드 및 파일 업로드**를 진행해야 하는 비효율 발생
solution: |-
  GitHub Actions 실행 환경 **IP 동적 제어**를 통한 보안 강화
  **EC2 자동 배포** 프로세스 실행 스크립트 작성
  서비스 프로세스 관리를 위한 **PM2** 도입
  배포 완료 후 **보안 설정 복구**
result: |-
  배포 시간 **약 60% 단축 (5분 이상 → 2분 내외)**
  배포 자동화로 **휴먼 에러 제거** 및 안정성 확보
thumbnail: ''
---
<h2>들어가며</h2><p>마이셀렉트샵은 AWS EC2에 올려 둔 개인 프로젝트입니다. 처음에는 배포할 때마다 서버에 직접 접속해서 빌드하고 파일을 올렸습니다. 기능이 몇 개 없을 때는 괜찮았는데, 수정이 잦아지면서 배포 한 번 하는 게 슬슬 귀찮은 일이 됐습니다. 귀찮아지면 배포를 미루게 되고, 미루다 보면 한꺼번에 올리다 실수가 나옵니다.</p><h2>매번 손으로 하던 배포</h2><p>배포 과정 자체는 매번 똑같았습니다. 접속하고, 최신 코드를 받고, 설치하고, 빌드하고, 서버를 다시 띄우는 것. 똑같은 일을 사람이 반복하다 보니 가끔 단계 하나를 빠뜨리기도 했습니다. 그래서 GitHub Actions로 자동화하기로 했습니다.</p><h2>SSH 포트를 어떻게 열어 둘까</h2><p>자동화를 시작하자마자 걸린 게 SSH 접속이었습니다. GitHub Actions가 EC2에 접속하려면 보안 그룹에서 SSH 포트를 열어 줘야 하는데, 가장 쉬운 방법은 모든 IP에 열어 두는 것입니다. 하지만 그건 서버 문을 활짝 열어 두는 것과 같아서 내키지 않았습니다.</p><p>그렇다고 특정 IP만 허용하기도 어려웠습니다. GitHub Actions가 실행되는 환경의 IP는 매번 바뀌기 때문입니다.</p><h2>배포하는 동안에만 문을 열기</h2><p>그래서 Actions가 실행될 때 자기 IP를 조회해서, 그 IP만 보안 그룹에 잠깐 등록하는 방식으로 풀었습니다.</p><pre><code class="language-yaml"># 예시 코드
- name: Get runner IP
  id: ip
  run: echo "ipv4=$(curl -s https://checkip.amazonaws.com)" &gt;&gt; $GITHUB_OUTPUT

- name: Allow runner IP
  run: |
    aws ec2 authorize-security-group-ingress \
      --group-id ${{ secrets.EC2_SECURITY_GROUP_ID }} \
      --protocol tcp --port 22 --cidr ${{ steps.ip.outputs.ipv4 }}/32</code></pre><p>접속한 다음에는 제가 손으로 하던 순서를 그대로 스크립트로 옮겼습니다. 최신 코드를 pull하고, 의존성을 설치하고, Prisma Client를 생성하고, 빌드합니다.</p><p>서버를 띄우는 건 PM2에 맡겼습니다. 이미 떠 있는 서비스가 있으면 재시작하고, 처음 배포하는 거라면 새로 띄우도록 해서 어떤 상황이든 같은 스크립트로 배포할 수 있게 했습니다.</p><pre><code class="language-bash"># 예시 코드
pm2 restart my-select-shop || pm2 start yarn --name my-select-shop -- start</code></pre><p>마지막으로 배포가 끝나면 등록했던 IP를 보안 그룹에서 다시 지웁니다. 여기에는 <code>if: always()</code>를 붙였습니다. 배포가 중간에 실패하더라도 이 단계는 꼭 실행돼야, 문이 열린 채로 남는 일이 없기 때문입니다.</p><pre><code class="language-yaml"># 예시 코드
- name: Revoke runner IP
  if: always()
  run: |
    aws ec2 revoke-security-group-ingress \
      --group-id ${{ secrets.EC2_SECURITY_GROUP_ID }} \
      --protocol tcp --port 22 --cidr ${{ steps.ip.outputs.ipv4 }}/32</code></pre><h2>결과</h2><ul><li><p>배포 시간이 <strong>5분 이상에서 2분 내외</strong>로 약 60% 줄었습니다.</p></li><li><p>사람이 하던 단계를 스크립트가 하니 빠뜨리는 일이 없어졌습니다.</p></li></ul><h2>돌아보며</h2><p>배포 자동화는 편해지려고 하는 일이지만, 편해진 만큼 보안이 느슨해지면 안 된다고 생각했습니다. 필요할 때만 열고 끝나면 반드시 닫는 구조를 만든 게 이번 작업에서 제일 신경 쓴 부분입니다. 무엇보다 배포가 더 이상 귀찮은 일이 아니게 되면서, 작은 수정도 부담 없이 바로 올릴 수 있게 된 게 가장 좋았습니다.</p>
