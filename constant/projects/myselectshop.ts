import { Project } from "../types";

export const MYSELECTSHOP: Project = {
  name: "마이셀렉트샵",
  description: "마이 셀렉트샵 서비스는 여유 시간이 생겼을 때, 그 시간을 활용해 쇼핑을 즐기면 어떨까 하는 아이디어에서 시작되었습니다. 개인 프로젝트로 **초기 세팅부터 배포 자동화까지 전 과정을 직접 진행**했으며, AWS EC2를 활용해 직접 서버 환경을 구성하고 배포하면서, 개발한 서비스가 실제 사용자에게 전달되기까지의 배포 흐름을 이해할 수 있었습니다. 이를 통해 프론트엔드 개발뿐 아니라 서비스 운영 환경에 대해서도 경험을 쌓을 수 있었습니다.",
  image: { url: "/assets/mySelectshop-service.png", width: 1200, height: 527 },
  caseStudies: [
    {
      title: "폰트 최적화를 통한 초기 로딩 속도 개선",
      overviewTitle: "폰트 최적화를 통한 초기 로딩 속도 개선",
      keyword: "폰트 최적화",
      problem: [
        {
          title: "굵기·스타일별 로컬 폰트를 **개별 파일로 로드**하는 구조로 네트워크 요청 수와 다운로드 용량이 증가해 초기 렌더링 지연 발생",
        },
      ],
      causes: [
        "굵기·스타일별로 분리된 다수의 정적 폰트 파일 로딩",
        "폰트 파일 수 증가로 인한 네트워크 요청 과다",
        "사용하지 않는 문자 영역까지 포함된 불필요하게 큰 폰트 파일 용량",
        "폰트 로딩 완료가 늦어져 텍스트 렌더링 및 레이아웃 안정화 지연",
      ],
      solution: [
        {
          title: "Woff2 파일 포맷으로 통합 변환",
          subTitle: ["웹 전송에 최적화된 **Woff2** 포맷으로 변환해 파일 크기 감소"],
        },
        {
          title: "가변 폰트(Variable Font) 도입",
          subTitle: [
            "굵기·스타일별 폰트 파일을 **하나의 가변 폰트 파일**로 통합",
            "네트워크 요청 수 감소 및 관리 용이성 향상",
          ],
        },
        {
          title: "서브셋 웹 폰트 변환",
          subTitle: [
            "실제 사용되는 문자 영역만 포함하도록 **서브셋팅**",
            "불필요한 문자 데이터 제거로 파일 크기 추가 감소",
          ],
        },
      ],
      result: [
        { title: "폰트 파일 용량 **6MB → 476KB**로 축소 (약 90% 절감)" },
        {
          title: "TBT(Total Blocking Time) 개선으로 LightHouse Performance 점수 **54점 → 84점** 향상",
        },
      ],
    },
    {
      title: "리뷰 이미지 업로드 병목 해결 (압축 · 병렬 처리 · 부분 실패 허용)",
      overviewTitle: "Promise.allSettled로 여러 이미지 병렬 처리 및 부분 실패 허용 (리뷰 업로드 속도 5초 -> 2초 단축)",
      keyword: "Promise.allSettled",
      problem: [
        {
          title: "리뷰 이미지를 **원본 그대로 업로드**해 업로드 시간이 길어지고 리뷰 작성 완료까지 대기 시간 발생",
        },
        { title: "여러 장의 이미지를 **순차 업로드**해 네트워크 대기 시간이 누적됨" },
        { title: "이미지 한 장의 업로드 실패로 **전체 리뷰 업로드가 중단**되어 사용자 경험 저하" },
      ],
      causes: [
        "용량에 대한 사전 처리 없이 원본 이미지를 그대로 업로드",
        "for문 기반 순차 업로드로 업로드 시간이 이미지 개수에 비례해 증가",
        "Promise.all 사용으로 단일 실패가 전체 업로드를 중단시키는 구조",
      ],
      solution: [
        {
          title: "클라이언트 단 이미지 압축을 통한 업로드 병목 제거",
          subTitle: [
            "**browser-image-compression**으로 업로드 전에 이미지 리사이징 및 압축 적용",
            "이미지 용량을 줄여 네트워크 전송 시간 및 서버 업로드 부담 감소",
            "useWebWorker 옵션으로 압축 과정이 메인 스레드를 차단하지 않도록 처리",
          ],
        },
        {
          title: "Promise.allSettled 기반 병렬 업로드 및 부분 실패 허용",
          subTitle: [
            "**Promise.allSettled**로 이미지 업로드를 병렬 처리해 전체 업로드 시간 단축",
            "status가 'fulfilled'인 결과만 필터링해 성공한 이미지만 리뷰에 포함",
            "일부 이미지가 실패해도 텍스트 리뷰와 성공한 이미지는 정상 저장되도록 개선\n(실패한 이미지는 재업로드 안내를 제공해 사용자 혼선 최소화)",
          ],
          // media: { type: "image", url: "/assets/allsettled3.png", imageWidth: 1000 },
        },
      ],
      result: [
        {
          title: "이미지(약 5000KB) 5장 기준 리뷰 전체 업로드 시간 **약 5초 → 2초**로 단축",
          image: { url: "/assets/promise.png", width: 1100, height: 300 },
        },
        { title: "일부 이미지 업로드 실패 시에도 리뷰 작성 흐름이 중단되지 않아 사용자 이탈 가능성 감소" },
        { title: "리뷰 작성 전반의 체감 성능 및 안정성 향상" },
      ],
    },
    {
      title: "Dynamic Import로 번들 크기 최적화 및 초기 로딩 성능 개선",
      overviewTitle: "Dynamic Import를 활용한 후기 상태별 코드 스플리팅 (JS 번들 크기 최대 120KB 절감)",
      keyword: "Dynamic Import 코드 스플리팅",
      problem: [
        {
          title: "후기 미작성 안내, 후기 작성, 내가 작성한 후기 컴포넌트를 한 컴포넌트에서 모두 임포트해, 사용 여부와 관계없이 **모든 코드가 초기 번들에 포함**되어 초기 로딩 속도 저하",
          // media: { url: "/assets/bundle3.png", width: 1100, height: 760 },
        },
      ],
      causes: [
        "후기 상태에 따라 분기되는 3개의 UI 컴포넌트를 상세 컴포넌트에서 **정적으로 임포트**해, 조건부 렌더링과 관계없이 초기 번들에 모두 포함되는 구조",
      ],
      solution: [
        {
          title: "Dynamic Import를 활용한 컴포넌트 분리",
          subTitle: [
            "리뷰 작성(ReviewEditor)과 내 리뷰(MyReview) 컴포넌트를 **next/dynamic**으로 분리해 필요한 시점에만 로드",
            "ssr: false 옵션으로 브라우저 API에 의존하는 컴포넌트를 클라이언트 전용으로 구분",
          ],
        },
      ],
      result: [
        {
          title: "3개 주요 페이지의 초기 JS 번들 크기를 **최대 44%(평균 37%) 절감**해 초기 로딩 성능 개선",
          // image: { url: "/assets/bundleSize.png", width: 940, height: 63 },
        },
      ],
    },
    {
      title: "지역 베스트 리뷰 조회 성능 개선 및 렌더링 최적화",
      overviewTitle: "지역 베스트 리뷰 조회 성능 개선 및 렌더링 최적화",
      keyword: "리뷰 조회 성능 개선 및 렌더링 최적화",
      problem: [
        {
          title: "유저 조회 시 리뷰 목록까지 함께 포함하는 구조로, 초기 진입 시 **대량의 리뷰 데이터가 한 번에 로딩**됨",
        },
        { title: "리뷰마다 여러 장의 이미지가 포함되어 렌더링 비용이 급증하고 스크롤 성능 저하 발생" },
      ],
      causes: [
        "유저 조회 시 리뷰 전체를 함께 내려보내는 비효율적인 데이터 구조",
        "초기 진입 시 필요하지 않은 리뷰 데이터까지 한 번에 로딩",
        "리뷰 수 증가에 따라 DOM 노드가 과도하게 생성되는 구조",
      ],
      solution: [
        {
          title: "유저 데이터와 리뷰 데이터 구조 분리",
          subTitle: [
            "유저 데이터에는 리뷰 목록 대신 **리뷰 개수만 포함**하도록 설계",
            "리뷰 데이터는 별도 API로 조회하도록 분리",
          ],
        },
        {
          title: "무한 스크롤 기반 점진적 데이터 로딩",
          subTitle: [
            "**useInfiniteQuery**로 리뷰 데이터를 6개 단위로 로딩",
            "초기 렌더링 시 네트워크 및 렌더링 부담 최소화",
          ],
        },
        {
          title: "windowing 기법을 활용한 렌더링 최적화",
          subTitle: [
            "**react-virtual**로 화면에 실제 노출되는 영역만 DOM으로 렌더링",
            "windowing 특성상 IntersectionObserver가 동작하지 않는 문제 발생",
            "react-virtual의 스크롤 위치·아이템 인덱스 기반 바닥 감지 로직으로 대체",
          ],
          image: { url: "/assets/windowing.png", width: 600, height: 300 },
        },
      ],
      result: [
        { title: "불필요한 리뷰 데이터 로딩 제거로 **초기 렌더링 성능 개선**" },
        { title: "리뷰 수와 이미지 개수가 늘어도 **안정적인 스크롤 성능** 유지" },
        { title: "로딩 효율성과 UX를 함께 개선한 대규모 리스트 렌더링 구조 확립" },
      ],
    },
    {
      title: "GitHub Actions 기반 CI/CD 파이프라인 구축을 통한 배포 자동화",
      overviewTitle: "GitHub Actions 기반 CI/CD 파이프라인 구축(배포 시간 5분 이상 → 2분 내외로 단축)",
      keyword: "CI/CD 파이프라인 구축",
      problem: [
        {
          title: "개발 서버의 변경 사항을 배포 서버에 반영할 때마다 **수동으로 빌드 및 파일 업로드**를 해야 하는 비효율 발생",
        },
      ],
      causes: [
        "수동 배포로 인한 반복 작업",
        "배포 과정 중 누락·실수 가능성",
      ],
      solution: [
        {
          title: "GitHub Actions 실행 환경 IP 동적 제어를 통한 보안 강화",
          subTitle: [
            "Actions 실행 시 퍼블릭 IP를 조회해 **해당 IP만 AWS EC2 보안 그룹에 SSH 접근 권한으로 일시 등록**, 불필요한 포트 개방 없이 보안 유지",
          ],
        },
        {
          title: "EC2 자동 배포 프로세스 실행 스크립트 작성",
          subTitle: [
            "SSH 접속 후 최신 코드 pull, 의존성 설치, prisma Client 생성, 빌드를 **순차적으로 자동 실행**",
          ],
        },
        {
          title: "서비스 프로세스 관리를 위한 PM2 도입",
          subTitle: [
            "**PM2**로 기존 서비스는 재시작하고, 최초 배포 시에는 새 프로세스를 생성하도록 처리",
          ],
        },
        {
          title: "배포 완료 후 보안 설정 복구",
          subTitle: [
            "배포 완료 후 Actions의 퍼블릭 IP를 EC2 보안 그룹에서 다시 제거해 보안 유지",
          ],
        },
      ],
      result: [
        { title: "배포 시간 **약 60% 단축** (5분 이상 → 2분 내외)" },
        { title: "배포 자동화로 휴먼 에러 제거 및 안정성 확보" },
      ],
    },
  ],
};
