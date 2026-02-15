export interface CaseStudy {
  id: number;
  title: string;
  problem: {
    id: number;
    title: string;
    media?: { id: number; url: string; width: number; height: number };
  }[];
  causes: string[];
  failedAttempts?: { id: number; title: string; subTitle?: string[] }[];
  solution: {
    id: number;
    title: string;
    subTitle?: string[];
    media?: {
      id: number;
      type: "video" | "image";
      url: string;
      mediaWidth?: string;
      imageWidth?: number;
      height?: number;
      description?: string[];
    };
  }[];
  result: {
    id: number;
    title: string;
    image?: { id: number; url: string; width: number; height: number };
  }[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image: {
    id: number;
    url: string;
    width: number;
    height: number;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  // Case Study 1
  {
    id: 1,
    title:
      "지도 API 전환과 Polygon 기반 캠퍼스 시각화를 통한 축제 맵 UI/UX 개선",
    problem: [
      {
        id: 1,
        title:
          "축제 환경 특유의 밀집된 공간 구조로 인해 주점 위치를 직관적으로 파악하기 어려움",
      },
    ],
    causes: [
      "카카오 지도 API의 줌 레벨 한계",
      "좁은 캠퍼스 공간 내에서 좌표 간 간격이 거의 없는 주점들이 겹쳐 보이는 현상",
      "사용자가 지도 상 위치만으로 실제 주점 위치를 직관적으로 파악하기 어려운 UX 문제",
    ],
    failedAttempts: [
      {
        id: 1,
        title: "기존 대학교 제공 축제 지도",
        subTitle: [
          "정적 지도 구조로 제공되어, 축제 환경에 필요한 지도 제어 구현이 요구사항을 충족하기에 부족함",
          "확장성과 사용자 경험 측면에서 고려했을 때 적합하지 않다고 판단",
        ],
      },
      {
        id: 2,
        title: "구글 지도 API",
        subTitle: [
          "축제와 같은 이벤트성 공간을 시각적으로 표현하기에는 UI가 다소 부족하다고 판단",
        ],
      },
      {
        id: 3,
        title: "카카오 지도 API",
        subTitle: [
          "줌 레벨 제한으로 인해 주점이 밀집된 구역을 세밀하게 인지하기 어려움",
        ],
      },
    ],
    solution: [
      {
        id: 1,
        title: "네이버 지도 API로 전환",
        subTitle: [
          "지도 API별 적용을 통해 기능 제약을 직접 비교 분석",
          "고밀도 영역 확대 표현이 가능한 네이버 지도 API로 마이그레이션",
        ],
      },
      {
        id: 2,
        title:
          "OpenStreetMap 데이터를 활용해 캠퍼스 Polygon 데이터 직접 추출 및 가공",
        subTitle: [
          "공개 GIS 데이터(openstreetmap)에서 캠퍼스 건물 및 구역 원본 데이터 탐색",
          "overpass Turbo 도구를 활용해 GeoJSON geometry 데이터 추출",
          "GeoJSON 좌표(lng, lat) 배열을 지도 렌더링에 맞는 MultiPolygon 형식([[[], []]])으로 변환",
          "정적 GeoJSON 데이터 특성을 고려해 메모리 캐싱을 통해 지도 재진입 시 불필요한 네트워크 요청 제거",
        ],
      },
    ],
    result: [
      {
        id: 1,
        title:
          "지도 API 전환을 통한 고배율 줌 레벨 지원 및 주점 간 위치 구분 정확도 개선",
        image: {
          id: 1,
          url: "/assets/zoom-level.svg",
          width: 488,
          height: 500,
        },
      },
      {
        id: 2,
        title:
          "캠퍼스 영역 시각화를 통한 주점 위치 인지력 향상 및 사용자 경험 개선",
        image: {
          id: 1,
          url: "/assets/polygon.svg",
          width: 488,
          height: 500,
        },
      },
    ],
  },
  // Case Study 2
  {
    id: 2,

    title: "지도 기반 내부 관리 페이지를 구현 및 운영 효율을 개선",
    problem: [
      {
        id: 1,
        title:
          "대학교 축제 특성상 주점 위치가 고정된 주소로 존재하지 않아, 운영자가 지도를 보며 좌표를 직접 찾아 복사·입력해야 하는 구조로 시간 소모 및 좌표 입력 실수 가능성 발생",
      },
    ],
    causes: [
      "운영자가 주점 좌표를 수동으로 입력해야 하는 비효율적인 프로세스",
      "지도 상에서 좌표를 직접 찾아야 하는 번거로움",
      "좌표 입력 실수로 인한 주점 위치 오류 가능성",
    ],
    failedAttempts: [
      {
        id: 1,
        title: "운영자에게 좌표 입력 매뉴얼 제공",
        subTitle: [
          "지도 사용 경험의 편차로 인해 좌표 입력 정확도가 일관되지 않음",
          "위치를 잘못 지정할 경우 반복적인 수정 요청 발생으로 인한 번거로움 발생",
          "축제 준비 과정에서 주점 관리자에게 과도한 작업 부담을 주는 구조라 판단",
        ],
      },
    ],
    solution: [
      {
        id: 1,
        title: "지도 기반 좌표 선택 UI 페이지 구현",
        subTitle: [
          "개발자가 지도를 보며 직접 좌표를 선택할 수 있는 UI 개발",
          "직관적인 인터페이스로 좌표 입력 과정 단순화",
        ],
        media: {
          id: 1,
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
      {
        id: 1,
        title: "주점 위치 등록 시간 15분 → 5분 이내로 단축 (약 65% 개선)",
      },
      {
        id: 2,
        title: "좌표 입력 과정 실수 최소화 및 운영 효율 극대화",
        image: { id: 1, url: "/assets/mapManage.svg", width: 653, height: 440 },
      },
    ],
  },
  // Case Study 3
  {
    id: 3,

    title: "낙관적 업데이트를 통한 북마크 기능 사용자 경험 개선",
    problem: [
      {
        id: 1,
        title: "사용자는 버튼을 눌렀음에도 즉각적인 변화가 없는 UX 문제 발생",
      },
    ],
    causes: [
      "invalidateQueries 기반 방식은 항상 서버 응답 이후에 UI가 갱신되어, 네트워크 상태에 따라 사용자가 변화를 체감하는 데 지연이 발생",
    ],
    failedAttempts: [
      {
        id: 1,
        title: "useState로 UI를 먼저 변경한 뒤 서버 요청",
        subTitle: [
          "React Query 캐시와 로컬 상태가 이중으로 관리되어 복잡성 증가",
          "요청 실패 시 정확한 롤백 상태 판단이 어려움",
          "상태 정합성이 깨지는 구조라 판단",
        ],
      },
    ],
    solution: [
      {
        id: 1,
        title: "React Query의 Optimistic Update 전략을 적용",
        subTitle: [
          "onMutate에서 서버 요청 전에 쿼리 캐시를 직접 업데이트해 UI를 즉시 반영",
          "mutation 실패 시 onError에서 이전 캐시 상태로 롤백",
          "mutation 완료 후 invalidateQueries로 서버 상태와 최종 동기화",
        ],
      },
    ],
    result: [
      {
        id: 1,
        title:
          "UI 반응 속도를 기존 300~500ms → 즉시(0~8ms)로 단축 (체감 응답성 약 95% 이상 개선)",
      },
      {
        id: 2,
        title: "요청 실패 시에도 안전한 롤백 구조 확보",
      },
      {
        id: 3,
        title: "서버 상태와 UI 상태 간 정합성 유지",
      },
    ],
  },
  // Case Study 4
  {
    id: 4,

    title: "애니메이션 이미지 로딩 지연 UX 개선를 통한 사용자 경험 향상",
    problem: [
      {
        id: 1,
        title:
          "페이지 진입 시 애니메이션 이미지가 즉시 표시되지만, 초기 로딩 구간에서 프레임 드랍이 발생하며 시각적으로 끊기는 현상이 발생",
      },
    ],
    causes: [
      "Chrome DevTools(Network / Performance) 분석 결과, 네트워크 지연이 아닌 이미지 디코딩과 렌더링이 동시에 발생하면서 메인 스레드에 부하 발생",
      "애니메이션 프레임이 준비되지 않은 상태에서 렌더링이 시작되어 프레임 손실 발생",
    ],

    solution: [
      {
        id: 1,
        title: "fallback 이미지를 먼저 로드하도록 수정",
        subTitle: [
          "fallback 이미지를 먼저 렌더링하여 초기 화면 안정화",
          "Image 객체를 활용해 메인 애니메이션을 백그라운드에서 선로딩",
          "decode()를 사용해 모든 프레임 디코딩 완료 이후에만 애니메이션을 화면에 적용",
        ],
      },
    ],
    result: [
      {
        id: 1,
        title: "애니메이션 시작 시 발생하던 프레임 드랍 제거",
      },
      {
        id: 2,
        title: "초기 렌더링 구간의 체감 품질 개선",
      },
    ],
  },

  // Case Study 5
  {
    id: 5,
    title: "상태 로직과 저장소 책임 분리를 통한 장바구니 데이터 일관성 개선",
    problem: [
      {
        id: 1,
        title:
          "LocalStorage를 직접 제어하는 방식으로 장바구니 상태를 관리하면서 상태 변경 시마다 저장 및 직렬화 로직이 반복됨",
      },
      {
        id: 2,
        title:
          "초기 렌더링 시점과 LocalStorage 데이터 복원 시점 불일치로 상태 누락 및 데이터 불일치 가능성 발생",
      },
    ],
    causes: [
      "LocalStorage는 상태 관리 도구가 아닌 단순 저장소로, 상태 변경과 저장 로직을 수동으로 관리해야 하는 구조",
      "새로고침 시 초기 상태와 저장된 데이터 간 동기화 타이밍을 직접 제어해야 하는 한계",
    ],
    failedAttempts: [
      {
        id: 1,
        title: "useEffect 기반 초기 동기화 시도",
        subTitle: [
          "마운트 시 LocalStorage 데이터를 읽어 상태를 덮어쓰는 방식 적용",
          "렌더링 타이밍에 따라 초기 상태가 잠깐 노출되는 플리커링 문제 발생",
          "상태 초기화 책임이 여러 곳에 분산되는 문제 확인",
        ],
      },
      {
        id: 2,
        title: "LocalStorage 헬퍼 함수로 로직 추상화",
        subTitle: [
          "중복 코드는 줄였으나 상태-저장소 동기화 문제는 그대로 존재",
          "근본적인 구조 개선에는 한계",
        ],
      },
    ],
    solution: [
      {
        id: 1,
        title: "Zustand persist 미들웨어 도입",
        subTitle: [
          "장바구니 상태를 단일 source of truth로 관리",
          "상태 변경 시 LocalStorage 동기화를 자동화",
          "초기 상태 복원 타이밍 문제 제거",
        ],
      },
    ],
    result: [
      { id: 1, title: "상태와 LocalStorage 간 데이터 불일치 가능성 최소화" },
      { id: 2, title: "장바구니 상태 관리 로직 단순화 및 유지보수성 향상" },
      { id: 3, title: "새로고침 및 페이지 이동 시에도 안정적인 상태 유지" },
    ],
  },
  // Case Study 6
  {
    id: 6,
    title: "결제 전 서버 검증을 통한 장바구니 품절 처리 UX 개선",
    problem: [
      {
        id: 1,
        title:
          "장바구니 데이터가 LocalStorage에만 저장되어 메뉴의 실시간 품절 여부를 사용자에게 제공할 수 없음",
      },
    ],
    causes: [
      "장바구니 상태가 서버와 분리된 클라이언트 상태",
      "실시간 품절 여부를 지속적으로 동기화할 경우 서버 요청 증가",
    ],
    failedAttempts: [
      {
        id: 1,
        title: "장바구니 변경 시 서버 검증 시도",
        subTitle: [
          "UX는 개선되었으나 요청 수 과다 발생",
          "네트워크 환경에 따라 체감 성능 저하",
        ],
      },
      {
        id: 2,
        title: "주기적 polling 방식 적용",
        subTitle: [
          "실시간성은 확보되었으나 불필요한 요청 발생",
          "모바일 환경에서 비효율적",
        ],
      },
    ],
    solution: [
      {
        id: 1,
        title: "결제 전 서버 검증 방식 채택",
        subTitle: [
          "결제 페이지 진입 시 서버와 통신하여 장바구니 전체 품절 여부 검증",
          "품절 메뉴 존재 시 결제 중단 및 모달 안내",
        ],
      },
    ],
    result: [
      { id: 1, title: "품절 상태를 인지하지 못한 채 결제하는 문제 최소화" },
      { id: 2, title: "서버 부하 증가 없이 UX 개선" },
      { id: 3, title: "결제 실패로 인한 사용자 혼란 및 이탈 감소" },
    ],
  },
  // Case Study 7
  {
    id: 7,
    title: "브라우저 히스토리 제어를 통한 결제 완료 UX 안정화",
    problem: [
      {
        id: 1,
        title:
          "주문 완료 후 사용자가 브라우저 뒤로가기를 누를 경우 이미 완료된 결제 페이지로 다시 이동하는 UX 문제 발생",
      },
      {
        id: 2,
        title:
          "결제 완료 이후에도 이전 결제 페이지가 히스토리에 남아 있어 사용자 혼란 및 중복 결제 가능성 존재",
      },
    ],
    causes: [
      "웹 환경에서 브라우저 히스토리 스택은 완전하게 제어할 수 없음",
      "단순 페이지 이동(push) 방식은 기존 히스토리를 유지해 UX 흐름 제어에 한계 존재",
      "클라이언트 상태 기반 제어는 새로고침 시 상태가 초기화되는 문제",
    ],
    solution: [
      {
        id: 1,
        title: "조건부 리다이렉트 및 상태 플래그 방식 검증",
        subTitle: [
          "결제 완료 여부를 기준으로 접근 시 리다이렉트 처리 시도",
          "상태 플래그를 활용해 결제 페이지 접근 차단 로직 구현",
          "하지만 히스토리 스택이 유지되거나 새로고침 시 상태가 소실되는 한계 확인",
        ],
      },
      {
        id: 2,
        title: "useNavigate + replace를 활용한 히스토리 스택 대체",
        subTitle: [
          "결제 완료 시 useNavigate(path, { replace: true }) 적용",
          "기존 결제 페이지 히스토리를 새로운 완료 페이지로 대체",
          "뒤로가기 시 결제 페이지가 아닌 의도한 이전 페이지로 이동하도록 UX 흐름 재설계",
        ],
      },
    ],
    result: [
      {
        id: 1,
        title: "뒤로가기 시 결제 페이지 재진입 문제 해결로 결제 흐름 안정화",
      },
      {
        id: 2,
        title: "중복 결제에 대한 사용자 혼란 가능성 제거 및 UX 신뢰도 향상",
      },
      {
        id: 3,
        title:
          "브라우저 히스토리 특성을 고려한 설계를 통해 사용자 행동 예측 가능성 확보",
      },
    ],
  },
  // Case Study 8
  {
    id: 8,
    title: "Discord PR 알림 시스템 구축",
    problem: [
      {
        id: 1,
        title:
          "PR 생성 후 코드 리뷰를 받기 위해 팀원에게 Discord DM으로 직접 리뷰 요청을 해야 했음",
      },
      {
        id: 2,
        title:
          "PR 생성 및 리뷰 요청 여부를 수동으로 확인해야 하여, PR이 올라와도 즉시 인지되지 않는 경우가 빈번하게 발생",
      },
    ],
    causes: [
      "PR 생성 및 상태 변경에 대한 자동 알림 시스템 부재",
      "GitHub에 직접 접속하지 않으면 리뷰 요청 여부를 알기 어려운 구조",
      "리뷰 요청이 개인 DM에 의존해 협업 흐름이 단절되는 문제",
    ],
    solution: [
      {
        id: 1,
        title: "GitHub WebHook 기반 PR 이벤트 감지",
        subTitle: [
          "PR 생성, 리뷰 요청, 리뷰 완료 등의 이벤트를 WebHook으로 수신",
          "이벤트 타입에 따라 알림 메시지를 분기 처리",
        ],
      },
      {
        id: 2,
        title: "Discord 채널 자동 알림 시스템 구축",
        subTitle: [
          "WebHook 이벤트 발생 시 Discord Webhook을 통해 채널로 자동 메시지 전송",
          "PR 제목, 작성자, 리뷰 요청 대상, PR 링크를 함께 전달해 즉시 확인 가능하도록 구성",
        ],
      },
    ],
    result: [
      {
        id: 1,
        title:
          "PR 생성 및 리뷰 요청 시 팀원에게 자동 알림이 전달되어 리뷰 인지 속도 개선 (리뷰 시작 시간 2~3일 -> 1일 이내로 단축)",
      },
      {
        id: 2,
        title: "개인 DM 기반 요청을 제거해 반복적인 커뮤니케이션 비용 감소",
      },
      {
        id: 3,
        title:
          "코드 리뷰 흐름이 Discord 채널 중심으로 정리되어 협업 가시성과 효율 향상",
        image: { id: 1, url: "/assets/pr1.png", width: 600, height: 189 },
      },
    ],
  },
  // ============================== nowait end ====================================================

  // ============================== myselectshop start ============================================

  // Case Study 9
  {
    id: 9,
    title: "폰트 최적화를 통한 초기 로딩 속도 개선",
    problem: [
      {
        id: 1,
        title:
          "여러 굵기와 스타일의 로컬 폰트를 각각 개별 파일로 로드하는 구조 사용으로 네트워크 요청 수와 총 다운로드 용량이 함께 증가 및 초기 페이지 진입 시 렌더링이 지연되는 현상이 발생",
      },
    ],
    causes: [
      "굵기·스타일별로 분리된 다수의 정적 폰트 파일 로딩",
      "폰트 파일 수 증가로 인한 네트워크 요청 과다 및 초기 렌더링 지연",
      "서비스에서 실제로 사용하지 않는 문자 영역까지 포함된 불필요하게 큰 폰트 파일 용량",
      "폰트 로딩 완료 시점이 늦어지며 텍스트 렌더링 및 레이아웃 안정화 지연 발생",
    ],
    solution: [
      {
        id: 1,
        title: "Woff2 파일 포맷으로 통합 변환",
        subTitle: ["웹 전송에 최적화된 Woff2 포맷으로 변환하여 파일 크기 감소"],
      },
      {
        id: 2,
        title: "가변 폰트(Variable Font) 도입",
        subTitle: [
          "굵기·스타일별로 분리된 폰트 파일을 하나의 가변 폰트 파일로 통합",
          "네트워크 요청 수 감소 및 관리 용이성 향상",
        ],
      },
      {
        id: 3,
        title: "서브셋 웹 폰트 변환",
        subTitle: [
          "서비스에서 실제로 사용되는 문자 영역만 포함하도록 폰트 파일을 서브셋팅",
          "불필요한 문자 데이터 제거로 파일 크기 추가 감소",
        ],
      },
    ],
    result: [
      { id: 1, title: "폰트 파일 용량 6MB -> 476KB로 축소 (약 90% 용량 절감)" },
      {
        id: 2,
        title:
          "TBT(Total Blocking Time) 개선을 통한 LightHouse Performance 점수 54점 → 84점으로 향상",
      },
    ],
  },
  // Case Study 10
  {
    id: 10,
    title: "리뷰 이미지 업로드 병목 해결 (압축 · 병렬 처리 · 부분 실패 허용)",
    problem: [
      {
        id: 1,
        title:
          "고해상도 리뷰 이미지를 그대로 업로드하면서 이미지 업로드 시간이 길어지고, 이로 인해 리뷰 작성 완료까지 대기 시간이 발생",
      },
      {
        id: 2,
        title:
          "여러 장의 이미지를 순차 업로드하는 구조로 인해 네트워크 대기 시간이 누적됨",
      },
      {
        id: 3,
        title:
          "단일 이미지 업로드 실패 시 전체 리뷰 업로드가 중단되어 사용자 경험이 저하됨",
      },
    ],
    causes: [
      "클라이언트에서 이미지 용량에 대한 사전 처리 없이 원본 이미지를 그대로 업로드",
      "for문 기반 순차 업로드로 인해 업로드 시간이 이미지 개수에 비례하여 증가",
      "Promise.all 사용으로 단일 업로드 실패가 전체 업로드 프로세스를 중단시키는 구조",
    ],
    solution: [
      {
        id: 1,
        title: "클라이언트 단 이미지 압축을 통한 업로드 병목 제거",
        subTitle: [
          "browser-image-compression 라이브러리를 활용해 업로드 이전 단계에서 이미지 리사이징 및 압축 적용",
          "고해상도 이미지 용량을 줄여 네트워크 전송 시간 및 서버 업로드 부담 감소",
          "useWebWorker 옵션을 적용해 이미지 압축 과정이 메인 스레드를 차단하지 않도록 처리",
        ],
      },
      {
        id: 2,
        title: "Promise.allSettled 기반 병렬 업로드 및 부분 실패 허용",
        subTitle: [
          "Promise.allSettled를 활용해 이미지 업로드를 병렬 처리하여 전체 업로드 시간 단축",
          "업로드 결과 중 status가 'fulfilled'인 항목만 필터링하여 성공한 이미지들만 리뷰에 포함",
          "일부 이미지 업로드 실패 상황에서도 텍스트 리뷰 및 성공한 이미지는 정상적으로 저장되도록 개선\n(실패한 이미지는 재업로드 안내를 명확히 제공해 사용자 혼선을 최소화)",
        ],
        media: {
          id: 1,
          type: "image",
          url: "/assets/allsettled3.png",
          imageWidth: 1000,
        },
      },
    ],
    result: [
      {
        id: 1,
        title:
          "고해상도 이미지(약 5000KB) 5장 기준 리뷰 전체 업로드 시간 약 5초 → 2초로 단축",
        image: { id: 1, url: "/assets/promise.png", width: 1100, height: 300 },
      },
      {
        id: 2,
        title:
          "일부 이미지 업로드 실패 시에도 리뷰 작성 흐름이 중단되지 않아 사용자 이탈 가능성 감소",
      },
      {
        id: 3,
        title: "리뷰 작성 과정 전반에서 체감 성능 및 안정성 향상",
      },
    ],
  },
  // Case Study 11
  {
    id: 11,
    title: "Dynamic Import로 번들 크기 최적화 및 초기 로딩 성능 개선",
    problem: [
      {
        id: 1,
        title:
          "하나의 컴포넌트에서 후기 미작성 안내, 후기 작성, 내가 작성한 후기 컴포넌트가 중첩 임포트되는 구조로 인해 실제 사용 여부와 관계없이 모든 코드가 초기 번들에 포함되었고, 이로 인해 초기 페이지 로딩 속도가 저하되는 문제가 발생",
        media: {
          id: 1,
          url: "/assets/bundle3.png",
          width: 1100,
          height: 760,
        },
      },
    ],
    causes: [
      "후기 상태에 따라 분기되는 3개의 UI 컴포넌트를 하나의 상세 컴포넌트에서 정적으로 임포트하고 있어, 조건부 렌더링과 관계없이 초기 번들에 모두 포함되는 구조",
    ],
    solution: [
      {
        id: 1,
        title: "Dynamic Import를 활용한 컴포넌트 분리",
        subTitle: [
          "리뷰 작성(ReviewEditor)과 내 리뷰(MyReview) 컴포넌트를 next/dynamic으로 분리하여 필요한 시점에만 로드되도록 개선",
          "ssr: false 옵션을 적용해 브라우저 API에 의존하는 컴포넌트를 클라이언트 전용으로 명확히 구분",
        ],
      },
    ],
    result: [
      {
        id: 1,
        title:
          "3개 주요 페이지의 초기 JS 번들 크기를 최대 약 120KB 절감하여 초기 로딩 성능을 개선",
        image: { id: 2, url: "/assets/bundleSize.png", width: 940, height: 63 },
      },
    ],
  },
  // Case Study 12
  {
    id: 12,
    title: "지역 베스트 리뷰 조회 성능 개선 및 렌더링 최적화",
    problem: [
      {
        id: 1,
        title:
          "유저 데이터 조회 시 해당 유저의 리뷰 목록을 함께 포함하는 구조로 인해, 초기 진입 시 대량의 리뷰 데이터가 한 번에 로딩되는 문제 발생",
      },
      {
        id: 2,
        title:
          "리뷰마다 여러 장의 이미지가 포함되면서 렌더링 비용이 급격히 증가하고, 스크롤 시 성능 저하가 발생",
      },
    ],
    causes: [
      "유저 조회 시 리뷰 전체를 함께 내려보내는 비효율적인 데이터 구조",
      "초기 진입 시 실제로 필요하지 않은 리뷰 데이터까지 한 번에 로딩",
      "리뷰 수 증가에 따라 DOM 노드가 과도하게 생성되는 구조",
    ],
    solution: [
      {
        id: 1,
        title: "유저 데이터와 리뷰 데이터 구조 분리",
        subTitle: [
          "유저 데이터에는 리뷰 목록 대신 리뷰 개수만 포함하도록 설계",
          "리뷰 데이터는 별도 API로 조회하도록 분리",
          "초기 진입 시 불필요한 대량 리뷰 데이터 로딩 제거",
        ],
      },
      {
        id: 2,
        title: "무한 스크롤 기반 점진적 데이터 로딩",
        subTitle: [
          "useInfiniteQuery를 활용해 리뷰 데이터를 6개 단위로 로딩",
          "초기 렌더링 시 네트워크 및 렌더링 부담 최소화",
        ],
      },
      {
        id: 3,
        title: "windowing 기법을 활용한 렌더링 최적화",
        subTitle: [
          "react-virtual을 적용해 화면에 실제로 노출되는 영역만 DOM으로 렌더링",
          "windowing 특성상 IntersectionObserver가 동작하지 않는 문제 발생",
          "react-virtual이 제공하는 스크롤 위치 및 아이템 인덱스 기반 바닥 감지 로직으로 대체",
        ],
      },
    ],
    result: [
      {
        id: 1,
        title:
          "초기 진입 시 불필요한 리뷰 데이터 로딩 제거로 초기 렌더링 성능 개선",
      },
      {
        id: 2,
        title: "리뷰 수와 이미지 개수가 증가해도 안정적인 스크롤 성능 유지",
      },
      {
        id: 3,
        title:
          "로딩 효율성과 UX를 동시에 개선한 대규모 리스트 렌더링 구조 확립",
      },
    ],
  },
  // Case Study 13
  {
    id: 13,
    title: "GitHub Actions 기반 CI/CD 파이프라인 구축을 통한 배포 자동화",
    problem: [
      {
        id: 1,
        title:
          "개발 서버의 변경 사항을 배포 서버에 반영하기 위해 매번 수동으로 빌드 및 파일 업로드를 진행해야 하는 비효율 발생",
      },
    ],
    causes: [
      "수동 배포 방식으로 인한 반복 작업 발생",
      "배포 과정 중 누락·실수 가능성 존재",
    ],
    solution: [
      {
        id: 1,
        title: "GitHub Actions 실행 환경 IP 동적 제어를 통한 보안 강화",
        subTitle: [
          "Actions 실행 시 퍼블릭 IP를 동적으로 조회한 후, 해당 IP만 AWS EC2 보안 그룹에 SSH 접근 권한으로 일시 등록하여 불필요한 포트 개방 없이 보안을 유지하도록 설계",
        ],
      },
      {
        id: 2,
        title: "EC2 자동 배포 프로세스 실행 스크립트 작성",
        subTitle: [
          "SSH 접속 후 최신 코드 pull, 의존성 설치, prisma Client 생성, 애플리케이션 빌드 과정을 순차적으로 자동 실행",
        ],
      },
      {
        id: 3,
        title: "서비스 프로세스 관리를 위한 PM2 도입",
        subTitle: [
          "PM2를 사용해 기존 서비스는 재시작하고, 최초 배포 시에는 새로운 프로세스를 생성하도록 처리해 안정적인 서비스 운영을 구성",
        ],
      },
      {
        id: 4,
        title: "배포 완료 후 보안 설정 복구",
        subTitle: [
          "배포가 완료된 후에는 GitHub Actions의 퍼블릭 IP를 EC2 보안 그룹에서 다시 제거하여 자동화된 배포 환경에서도 보안을 유지",
        ],
      },
    ],
    result: [
      {
        id: 1,
        title: "배포 시간 약 60% 단축 (5분 이상 → 2분 내외)",
      },
      {
        id: 2,
        title: "배포 자동화로 휴먼 에러 제거 및 안정성 확보",
      },
    ],
  },
];

export const SERVICE_DESCRIPTION: Service[] = [
  {
    id: 1,
    title: "노웨잇",
    description:
      "노웨잇 서비스는 대학교 축제에서 불필요한 주점 웨이팅, 수기로 작성되는 주문 시스템을 개선하기 위해 만들어졌습니다. 관리자와 사용자 모두 고려한 기획과 설계가 이루어졌으며, 1명의 디자이너와 프론트엔드 3명, 백엔드 2명이 팀을 이루어 기획 및 디자인, 개발을 진행 하였고, 주 2회 오프라인 회의와 Discord, Figma, Swagger를 통해 원활한 소통과 협업을 진행했습니다. 현재는 더 좋은 서비스 제공을 위해 웹 서비스에서 앱 서비스로 마이그레이션 진행중 입니다.",
    image: {
      id: 1,
      url: "/assets/nowait-service.svg",
      width: 1100,
      height: 484,
    },
  },
  {
    id: 2,
    title: "마이셀렉트샵",
    description:
      "마이 셀렉트샵 서비스는 여유 시간이 생겼을 때, 그 시간을 활용해 쇼핑을 즐기면 어떨까 하는 아이디어에서 시작되었습니다. 개인 프로젝트로 초기 세팅부터 배포 자동화까지 전 과정을 직접 진행했으며, PostgreSQL과 Prisma를 사용해 데이터베이스 설계 및 관리 경험을 쌓을 수 있었습니다.",
    image: {
      id: 1,
      url: "/assets/mySelectshop-service.png",
      width: 1200,
      height: 527,
    },
  },
];
