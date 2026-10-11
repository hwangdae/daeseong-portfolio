# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

패키지 매니저는 Yarn입니다 (package.json의 `packageManager` 필드 참고). `package-lock.json`도 존재하지만 실제로 최신 상태로 관리되는 것은 `yarn.lock`이므로 `yarn`을 사용하세요.

- `yarn dev` — Next.js 개발 서버 실행 (http://localhost:3000)
- `yarn build` — 프로덕션 빌드
- `yarn start` — 프로덕션 빌드 실행
- `yarn lint` — ESLint 실행 (`eslint-config-next`의 core-web-vitals + typescript 규칙, flat config는 `eslint.config.mjs`)

이 프로젝트에는 테스트 스크립트/프레임워크가 설정되어 있지 않습니다.

## 아키텍처

이 프로젝트는 Next.js(App Router) 기반의 포트폴리오 사이트이며, 라우트는 두 종류입니다.

- `/` (`app/page.tsx` → `components/home/Main.tsx`) — 사실상 하나의 긴 스크롤 페이지로, 각 섹션은 숫자 앵커 id로 구분됩니다. 케이스 스터디는 여기서 문제/해결 과정/결과 제목만 보여주는 요약 카드로 렌더링됩니다.
- `/case-study/[id]` (`app/case-study/[id]/page.tsx`) — 케이스 스터디 하나의 전체 상세(블로그 글 형태)를 보여주는 동적 라우트입니다. `CASE_STUDIES`를 기준으로 `generateStaticParams`가 정적 생성하며, 존재하지 않는 id는 `notFound()` 처리됩니다.

### 콘텐츠는 `constant/`에서 데이터로 관리됨

페이지의 실제 텍스트/콘텐츠는 JSX에 흩어져 있지 않고 두 개의 constant 파일에 모여 있습니다. 새로운 케이스 스터디/프로젝트를 추가할 때는 컴포넌트에 하드코딩하지 말고 이 파일들을 수정하세요:

- `constant/title.ts` — 세 개의 순서 있는 배열(`NOWAIT_PROJECT_HIGHLIGHTS`, `MYSELECTSHOP_PROJECT_HIGHLIGHTS`, `SERVICE_HIGHLIGHTS`)로 구성되며, 각 항목은 `{ id, title, keyword }` 형태입니다. 히어로 섹션의 목차(`HeroSection.tsx`)와 스크롤 스파이 사이드 내비게이션(`Navigation.tsx`)을 렌더링하는 데 사용됩니다.
- `constant/caseStudies.ts` — `CASE_STUDIES`(케이스 스터디별 `problem` / `causes` / `failedAttempts` / `solution` / `result` 상세 내역)와 `SERVICE_DESCRIPTION`으로 구성되며, `CaseStudySection.tsx`에서 렌더링됩니다.

**숫자 `id`가 이 구조 전체를 연결하는 핵심 값입니다.** `title.ts`의 하이라이트 항목, `caseStudies.ts`의 해당 `CaseStudy.id`, 그리고 메인 페이지의 요약 카드에 실제로 부여되는 DOM 엘리먼트 `id`(`<article id={caseStudy.id}>`, `CaseStudySection.tsx`)가 모두 일치해야 합니다. 앵커 링크(`#3`), `IntersectionObserver` 기반 스크롤 스파이(`hooks/useActiveSection.ts`), 고정된 `Navigation`뿐 아니라 상세 페이지 경로(`/case-study/3`)도 이 동일한 id를 기준으로 동작합니다. id는 `title.ts`의 세 배열 전체에 걸쳐 순차적으로 부여되며(각 프로젝트마다 다시 1부터 시작하지 않음), 새 케이스 스터디를 추가할 때는 아직 사용되지 않은 다음 번호를 필요한 모든 위치에 함께 반영해야 합니다. 새로운 하이라이트 배열을 추가하는 경우에만 `Main.tsx`의 `useActiveSection` id 목록도 함께 업데이트하세요. `caseStudies.ts`에 주석 처리되어 있는 케이스 스터디들은 재사용을 위해 의도적으로 비활성화해 둔 콘텐츠이며, 삭제해도 되는 죽은 코드가 아닙니다.

### 렌더링 흐름

`app/layout.tsx`에서 로컬 가변 폰트(`font/WantedSansVariable.woff2`, `next/font/local` 사용)를 로드하고 페이지 메타데이터를 설정합니다 → `app/page.tsx`가 `Main`을 렌더링합니다 → `Main.tsx`가 `HeroSection`(소개 + 목차), `CaseStudySection`(`CASE_STUDIES`를 매핑해 요약 카드를 렌더링), 고정된 `Navigation` 사이드바를 조합하며, 세 하이라이트 배열 전체를 합친 id 목록을 인자로 받는 단일 `useActiveSection` 훅을 이 컴포넌트에서 소유합니다.

케이스 스터디의 전체 상세 콘텐츠(문제 상황/문제 원인/시도한 방법/해결 방법/결과)를 실제로 렌더링하는 곳은 `CaseStudySection.tsx`가 아니라 `components/caseStudy/CaseStudyDetail.tsx`입니다. `CaseStudySection.tsx`의 요약 카드는 `next/link`로 `/case-study/[id]`(`app/case-study/[id]/page.tsx`)에 연결되고, 이 라우트가 `CaseStudyDetail`을 렌더링합니다. 따라서 케이스 스터디의 상세 표시 방식(레이아웃, 이미지, 시도한 방법 등)을 바꿀 때는 `CaseStudyDetail.tsx`를, 요약 카드에 무엇을 보여줄지(현재는 문제/해결 과정/결과 제목만)를 바꿀 때는 `CaseStudySection.tsx`를 수정하세요.

### 스타일링 컨벤션

타이포그래피는 Tailwind의 텍스트 유틸리티 대신 `app/globals.css`에 정의된 커스텀 시맨틱 클래스(`.typo-headline`, `.typo-overview`, `.typo-section-title`, `.typo-subtitle`, `.typo-body`, `.typo-navi` 등)로 처리합니다. 타입 스케일 일관성을 유지하기 위해 새로운 텍스트에는 임의의 `text-*`/`font-*` Tailwind 유틸리티를 추가하지 말고 이 클래스들을 재사용하세요. 그 외 레이아웃/여백/색상 등은 JSX에서 Tailwind 유틸리티 클래스를 직접 사용합니다(CSS 모듈이나 컴포넌트 단위 스타일시트는 사용하지 않음). 경로 alias `@/*`는 저장소 루트를 가리킵니다(`tsconfig.json` 참고).

constant 파일에서 참조하는 이미지(`/assets/...`)는 `public/assets/`에 있습니다.

## Language
- 모든 설명은 한국어로 작성합니다.
- 코드의 변수명, 함수명, 타입명은 영어를 사용합니다.
- 커밋 메시지는 한국어로 작성합니다.

## Development
- TypeScript를 사용합니다.
- `any` 사용을 지양합니다.
- 기존 프로젝트 구조와 패턴을 우선적으로 따릅니다.
- 변경하기 전에 관련 코드를 먼저 확인합니다.
