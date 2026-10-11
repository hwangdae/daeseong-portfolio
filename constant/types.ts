export interface ImageSource {
  url: string;
  width: number;
  height: number;
}

export interface SolutionMedia {
  type: "video" | "image";
  url: string;
  mediaWidth?: string;
  imageWidth?: number;
  height?: number;
  description?: string[];
}

// 프로젝트 파일에 작성하는 형태 (번호는 순서대로 자동 부여되므로 적지 않는다)
// 본문 문장(problem ~ result, description)은 **강조할 부분**처럼 감싸면 #000 색상으로 노출된다
export interface CaseStudyData {
  // 본문 제목
  title: string;
  // 상단 Portfolio Overview 목록에 노출되는 제목
  overviewTitle: string;
  // 우측 네비게이션에 노출되는 키워드
  keyword: string;
  // true면 화면에서 제외되고 번호도 건너뛴다
  hidden?: boolean;
  problem: { title: string; media?: ImageSource }[];
  causes: string[];
  failedAttempts?: { title: string; subTitle?: string[] }[];
  solution: {
    title: string;
    subTitle?: string[];
    media?: SolutionMedia;
    image?: ImageSource;
  }[];
  result: { title: string; image?: ImageSource }[];
}

export interface Project {
  name: string;
  // 서비스 설명 섹션에 노출되는 소개글과 이미지
  description: string;
  image: ImageSource;
  caseStudies: CaseStudyData[];
}

export interface CaseStudy extends CaseStudyData {
  id: number;
}
