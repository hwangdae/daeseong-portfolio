import { MYSELECTSHOP } from "./projects/myselectshop";
import { NOWAIT } from "./projects/nowait";
import { CaseStudy } from "./types";

// 화면에 노출되는 프로젝트 순서
const PROJECT_LIST = [NOWAIT, MYSELECTSHOP];

// 숨김 처리된 항목을 제외하고, 작성된 순서대로 1번부터 번호를 부여한다
let lastId = 0;
export const PROJECTS = PROJECT_LIST.map((project) => ({
  ...project,
  caseStudies: project.caseStudies
    .filter((caseStudy) => !caseStudy.hidden)
    .map((caseStudy): CaseStudy => ({ ...caseStudy, id: ++lastId })),
}));

export const CASE_STUDIES = PROJECTS.flatMap((project) => project.caseStudies);

export const SERVICE_SECTION = {
  id: lastId + 1,
  title: "서비스 설명",
  keyword: "서비스 설명",
};

export const NAVIGATION_ITEMS = [
  ...CASE_STUDIES.map(({ id, keyword }) => ({ id, keyword })),
  { id: SERVICE_SECTION.id, keyword: SERVICE_SECTION.keyword },
];

export const SECTION_IDS = NAVIGATION_ITEMS.map((item) => item.id);
