import { Project } from "../types";

export const NOWAIT: Project = {
  name: "노웨잇",
  description: "노웨잇 서비스는 대학교 축제에서 **불필요한 주점 웨이팅, 수기로 작성되는 주문 시스템을 개선**하기 위해 만들어졌습니다. 관리자와 사용자 모두 고려한 기획과 설계가 이루어졌으며, **1명의 디자이너와 프론트엔드 3명, 백엔드 2명**이 팀을 이루어 기획 및 디자인, 개발을 진행 하였고, 주 2회 오프라인 회의와 Discord, Figma, Swagger를 통해 원활한 소통과 협업을 진행했습니다.",
  image: { url: "/assets/nowait-service.svg", width: 1100, height: 484 },
  caseStudies: [
    {
      title: "지도 API 전환과 Polygon 기반 캠퍼스 시각화를 통한 축제 맵 UI/UX 개선",
      overviewTitle: "지도 API 전환과 Polygon 기반 캠퍼스 시각화를 통한 축제 맵 UI/UX 개선",
      keyword: "축제 맵 UI/UX 개선",
      problem: [
        { title: "축제 특유의 **밀집된 공간 구조**로 주점 위치를 직관적으로 파악하기 어려움" },
      ],
      causes: [
        "카카오 지도 API의 **줌 레벨 한계**",
        "좁은 캠퍼스에서 좌표 간격이 거의 없는 주점들이 **겹쳐 보이는 현상**",
        "지도 위치만으로 실제 주점 위치를 파악하기 어려운 UX 문제",
      ],
      failedAttempts: [
        {
          title: "기존 대학교 제공 축제 지도",
          subTitle: [
            "정적 지도 구조라 축제 환경에 필요한 지도 제어를 구현하기 어려움",
            "확장성과 사용자 경험 측면에서 부적합하다고 판단",
          ],
        },
        {
          title: "구글 지도 API",
          subTitle: ["이벤트성 공간을 시각적으로 표현하기에는 UI가 부족하다고 판단"],
        },
        {
          title: "카카오 지도 API",
          subTitle: ["줌 레벨 제한으로 주점 밀집 구역을 세밀하게 인지하기 어려움"],
        },
      ],
      solution: [
        {
          title: "네이버 지도 API로 전환",
          subTitle: [
            "지도 API별로 직접 적용해 기능 제약을 비교 분석",
            "고밀도 영역 확대 표현이 가능한 **네이버 지도 API**로 마이그레이션",
          ],
        },
        {
          title: "OpenStreetMap 데이터로 캠퍼스 Polygon 데이터 직접 추출 및 가공",
          subTitle: [
            "공개 GIS 데이터(openstreetmap)에서 캠퍼스 건물·구역 원본 데이터 탐색",
            "overpass Turbo로 GeoJSON geometry 데이터 추출",
            "GeoJSON 좌표(lng, lat) 배열을 지도 렌더링용 **MultiPolygon 형식**([[[], []]])으로 변환",
          ],
        },
      ],
      result: [
        {
          title: "지도 API 전환으로 **고배율 줌 레벨 지원** 및 주점 간 위치 구분 정확도 개선",
          image: { url: "/assets/zoom-level.svg", width: 488, height: 500 },
        },
        {
          title: "**캠퍼스 영역 시각화**로 주점 위치 인지력 및 사용자 경험 개선",
          image: { url: "/assets/polygon.svg", width: 488, height: 500 },
        },
      ],
    },
    {
      title: "지도 기반 내부 관리 페이지를 구현 및 운영 효율을 개선",
      overviewTitle: "지도 기반 내부 관리 페이지 구현을 통한 운영 효율 개선 (주점 위치 등록 시간 약 10분 단축)",
      keyword: "마커 생성 운영 효율 개선",
      problem: [
        {
          title: "축제 주점은 고정된 주소가 없어 운영자가 지도에서 **좌표를 직접 찾아 복사·입력**해야 했고, 시간 소모와 입력 실수 가능성 발생",
        },
      ],
      causes: [
        "주점 좌표를 수동으로 입력해야 하는 비효율적인 프로세스",
        "지도에서 좌표를 직접 찾아야 하는 번거로움",
        "좌표 입력 실수로 인한 주점 위치 오류 가능성",
      ],
      failedAttempts: [
        {
          title: "운영자에게 좌표 입력 매뉴얼 제공",
          subTitle: [
            "지도 사용 경험의 편차로 좌표 입력 정확도가 일관되지 않음",
            "위치를 잘못 지정하면 수정 요청이 반복되는 번거로움 발생",
            "주점 관리자에게 과도한 작업 부담을 주는 구조라 판단",
          ],
        },
      ],
      solution: [
        {
          title: "지도 기반 좌표 선택 UI 페이지 구현",
          subTitle: [
            "개발자가 **지도를 보며 직접 좌표를 선택**할 수 있는 UI 개발",
            "직관적인 인터페이스로 좌표 입력 과정 단순화",
          ],
          media: {
            type: "video",
            url: "https://www.youtube.com/watch?v=qFZTqwZ5DaQ",
            mediaWidth: "max-w-[500px]",
            height: 400,
            description: [
              "1. `시작` 버튼 클릭 시 좌표 생성 모드 활성화",
              "2. 지도 클릭 시 마커 생성과 함께 스토어 ID 입력 팝업 노출",
              "3. 입력한 스토어 ID와 클릭 좌표(lat, lng)를 매핑해 내부 배열에 저장",
              "4. `중지` 버튼으로 좌표 생성 모드 종료",
              "5. `뒤로가기` 버튼으로 마지막 마커만 선택적으로 제거",
              "6. `초기화` 버튼으로 모든 마커 일괄 제거",
              "7. `복사` 버튼을 통해 저장된 좌표를 문자열 형태로 즉시 복사",
            ],
          },
        },
      ],
      result: [
        { title: "주점 위치 등록 시간 **15분 → 5분 이내**로 단축 (약 65% 개선)" },
        {
          title: "좌표 입력 실수 최소화 및 운영 효율 극대화",
          // image: { url: "/assets/mapManage.svg", width: 653, height: 440 },
        },
      ],
    },
    {
      title: "낙관적 업데이트를 통한 북마크 기능 사용자 경험 개선",
      overviewTitle: "낙관적 업데이트를 통한 북마크 기능 사용자 경험 개선 (체감 응답성 약 95% 이상 개선)",
      keyword: "북마크 기능 UX 개선",
      problem: [
        { title: "버튼을 눌러도 **즉각적인 변화가 없는** UX 문제 발생" },
      ],
      causes: [
        "invalidateQueries 방식은 **서버 응답 이후에 UI가 갱신**되어, 네트워크 상태에 따라 변화 체감이 지연됨",
      ],
      failedAttempts: [
        {
          title: "useState로 UI를 먼저 변경한 뒤 서버 요청",
          subTitle: [
            "React Query 캐시와 로컬 상태의 이중 관리로 복잡성 증가",
            "요청 실패 시 정확한 롤백 상태 판단이 어려움",
            "상태 정합성이 깨지는 구조라 판단",
          ],
        },
      ],
      solution: [
        {
          title: "React Query의 Optimistic Update 전략 적용",
          subTitle: [
            "**onMutate**에서 서버 요청 전에 쿼리 캐시를 직접 업데이트해 UI에 즉시 반영",
            "실패 시 **onError**에서 이전 캐시 상태로 롤백",
            "완료 후 invalidateQueries로 서버 상태와 최종 동기화",
          ],
        },
      ],
      result: [
        {
          title: "UI 반응 속도 **300~500ms → 즉시(0~8ms)**로 단축 (체감 응답성 약 95% 이상 개선)",
        },
        { title: "요청 실패 시에도 안전한 롤백 구조 확보" },
        { title: "서버 상태와 UI 상태 간 정합성 유지" },
      ],
    },
    {
      title: "애니메이션 이미지 로딩 지연 UX 개선을 통한 사용자 경험 향상",
      overviewTitle: "애니메이션 이미지 로딩 지연 UX 개선",
      keyword: "애니메이션 이미지 UX 개선",
      problem: [
        { title: "애니메이션 이미지 사용으로 페이지 로딩 시 **프레임 드랍** 발생" },
      ],
      causes: [
        "정적 이미지보다 큰 파일 용량",
        "초기 화면 표시 전에 애니메이션 리소스가 준비되지 않아 시각적 끊김 발생",
      ],
      solution: [
        {
          title: "정적 fallback 이미지를 먼저 로드하도록 수정",
          subTitle: [
            "가벼운 **정적 fallback 이미지**를 먼저 렌더링해 초기 화면 안정화",
            "브라우저 Image 객체로 애니메이션 WebP를 DOM에 마운트하지 않고 **백그라운드 선로딩**",
            "로딩 완료 후 애니메이션 이미지로 교체",
          ],
        },
      ],
      result: [
        { title: "애니메이션 시작 시 발생하던 **프레임 드랍 제거**" },
        {
          title: "초기 렌더링 구간의 체감 품질 개선",
          image: { url: "/assets/fallback.png", width: 724, height: 330 },
        },
      ],
    },
    {
      title: "상태 로직과 저장소 책임 분리를 통한 장바구니 데이터 일관성 개선",
      overviewTitle: "상태 로직과 저장소 책임 분리를 통한 장바구니 데이터 일관성 개선",
      keyword: "장바구니 데이터 일관성 개선",
      // hidden: true,
      problem: [
        {
          title: "LocalStorage를 직접 제어하는 방식으로 장바구니 상태를 관리하면서 상태 변경 시마다 저장 및 직렬화 로직이 반복됨",
        },
        {
          title: "초기 렌더링 시점과 LocalStorage 데이터 복원 시점 불일치로 상태 누락 및 데이터 불일치 가능성 발생",
        },
      ],
      causes: [
        "LocalStorage는 상태 관리 도구가 아닌 단순 저장소로, 상태 변경과 저장 로직을 수동으로 관리해야 하는 구조",
        "새로고침 시 초기 상태와 저장된 데이터 간 동기화 타이밍을 직접 제어해야 하는 한계",
      ],
      failedAttempts: [
        {
          title: "useEffect 기반 초기 동기화 시도",
          subTitle: [
            "마운트 시 LocalStorage 데이터를 읽어 상태를 덮어쓰는 방식 적용",
            "렌더링 타이밍에 따라 초기 상태가 잠깐 노출되는 플리커링 문제 발생",
            "상태 초기화 책임이 여러 곳에 분산되는 문제 확인",
          ],
        },
        {
          title: "LocalStorage 헬퍼 함수로 로직 추상화",
          subTitle: [
            "중복 코드는 줄였으나 상태-저장소 동기화 문제는 그대로 존재",
            "근본적인 구조 개선에는 한계",
          ],
        },
      ],
      solution: [
        {
          title: "Zustand persist 미들웨어 도입",
          subTitle: [
            "상태 변경 시 LocalStorage 동기화를 자동화",
            "초기 상태 복원 타이밍 문제 제거",
          ],
        },
      ],
      result: [
        { title: "상태와 LocalStorage 간 데이터 불일치 가능성 최소화" },
        { title: "장바구니 상태 관리 로직 단순화 및 유지보수성 향상" },
        { title: "새로고침 및 페이지 이동 시에도 안정적인 상태 유지" },
      ],
    },
    {
      title: "결제 전 서버 검증을 통한 장바구니 품절 처리 UX 개선",
      overviewTitle: "결제 전 서버 검증을 통한 장바구니 품절 처리 UX 개선",
      keyword: "장바구니 품절 처리 UX 개선",
      // hidden: true,
      problem: [
        {
          title: "장바구니 데이터가 LocalStorage에만 저장되어 메뉴의 실시간 품절 여부를 사용자에게 제공할 수 없음",
        },
      ],
      causes: [
        "장바구니 상태가 서버와 분리된 클라이언트 상태",
        "실시간 품절 여부를 지속적으로 동기화할 경우 서버 요청 증가",
      ],
      failedAttempts: [
        {
          title: "장바구니 변경 시 서버 검증 시도",
          subTitle: [
            "UX는 개선되었으나 요청 수 과다 발생",
            "네트워크 환경에 따라 체감 성능 저하",
          ],
        },
        {
          title: "주기적 polling 방식 적용",
          subTitle: [
            "실시간성은 확보되었으나 불필요한 요청 발생",
            "모바일 환경에서 비효율적",
          ],
        },
      ],
      solution: [
        {
          title: "결제 전 서버 검증 방식 채택",
          subTitle: [
            "결제 페이지 진입 시 서버와 통신하여 장바구니 전체 품절 여부 검증",
            "품절 메뉴 존재 시 결제 중단 및 모달 안내",
          ],
        },
      ],
      result: [
        { title: "품절 상태를 인지하지 못한 채 결제하는 문제 최소화" },
        { title: "서버 부하 증가 없이 UX 개선" },
        { title: "결제 실패로 인한 사용자 혼란 및 이탈 감소" },
      ],
    },
    {
      title: "브라우저 히스토리 제어를 통한 결제 완료 UX 안정화",
      overviewTitle: "페이지 이동 흐름 제어를 통한 UX 안정성 개선",
      keyword: "뒤로가기 문제 해결",
      hidden: true,
      problem: [
        {
          title: "주문 완료 후 사용자가 브라우저 뒤로가기를 누를 경우 이미 완료된 결제 페이지로 다시 이동하는 UX 문제 발생",
        },
        { title: "결제 완료 이후에도 이전 결제 페이지가 히스토리에 남아 있어 사용자 혼란 및 중복 결제 가능성 존재" },
      ],
      causes: [
        "웹 환경에서 브라우저 히스토리 스택은 완전하게 제어할 수 없음",
        "단순 페이지 이동(push) 방식은 기존 히스토리를 유지해 UX 흐름 제어에 한계 존재",
        "클라이언트 상태 기반 제어는 새로고침 시 상태가 초기화되는 문제",
      ],
      solution: [
        {
          title: "조건부 리다이렉트 및 상태 플래그 방식 검증",
          subTitle: [
            "결제 완료 여부를 기준으로 접근 시 리다이렉트 처리 시도",
            "상태 플래그를 활용해 결제 페이지 접근 차단 로직 구현",
            "하지만 히스토리 스택이 유지되거나 새로고침 시 상태가 소실되는 한계 확인",
          ],
        },
        {
          title: "useNavigate + replace를 활용한 히스토리 스택 대체",
          subTitle: [
            "결제 완료 시 useNavigate(path, { replace: true }) 적용",
            "기존 결제 페이지 히스토리를 새로운 완료 페이지로 대체",
            "뒤로가기 시 결제 페이지가 아닌 의도한 이전 페이지로 이동하도록 UX 흐름 재설계",
          ],
        },
      ],
      result: [
        { title: "뒤로가기 시 결제 페이지 재진입 문제 해결로 결제 흐름 안정화" },
        { title: "중복 결제에 대한 사용자 혼란 가능성 제거 및 UX 신뢰도 향상" },
        { title: "브라우저 히스토리 특성을 고려한 설계를 통해 사용자 행동 예측 가능성 확보" },
      ],
    },
    {
      title: "Discord PR 알림 시스템 구축",
      overviewTitle: "Discord PR 알림 시스템 구축",
      keyword: "Discord PR 알림 시스템 구축",
      problem: [
        { title: "PR 생성 후 리뷰를 받으려면 팀원에게 **Discord DM으로 직접 요청**해야 했음" },
        {
          title: "PR 생성·리뷰 요청 여부를 수동으로 확인해야 해, PR이 올라와도 즉시 인지되지 않는 경우가 빈번",
        },
      ],
      causes: [
        "PR 생성 및 상태 변경에 대한 자동 알림 시스템 부재",
        "GitHub에 접속하지 않으면 리뷰 요청 여부를 알기 어려운 구조",
        "개인 DM에 의존한 리뷰 요청으로 협업 흐름 단절",
      ],
      solution: [
        {
          title: "GitHub WebHook 기반 PR 이벤트 감지",
          subTitle: ["PR 생성, 리뷰 요청, 리뷰 완료 등의 이벤트를 **WebHook**으로 수신"],
        },
        {
          title: "Discord 채널 자동 알림 시스템 구축",
          subTitle: [
            "이벤트 발생 시 Discord Webhook으로 **채널에 자동 메시지 전송**",
            "PR 제목, 작성자, 리뷰 요청 대상, 링크를 함께 전달해 즉시 확인 가능하도록 구성",
          ],
        },
      ],
      result: [
        {
          title: "자동 알림으로 리뷰 인지 속도 개선 (리뷰 시작 시간 **2~3일 → 1일 이내**로 단축)",
        },
        { title: "개인 DM 기반 요청을 없애 반복적인 커뮤니케이션 비용 감소" },
        {
          title: "코드 리뷰 흐름이 Discord 채널 중심으로 정리되어 협업 가시성과 효율 향상",
          image: { url: "/assets/pr1.png", width: 600, height: 189 },
        },
      ],
    },
  ],
};
