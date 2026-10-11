import { PROJECTS, SERVICE_SECTION } from "@/constant";

const HeroSection = () => {
  return (
    <>
      <div className="flex flex-col items-top justify-between">
        <header id={`${0}`} className="mb-10">
          {/* <h2 className="typo-subtitle">프론트엔드 개발자 황대성</h2> */}
          <h1 className="typo-headline">황대성 포트폴리오</h1>
        </header>
        <div>
          <div className="mb-4">
            <h2 className="typo-overview">Portfolio Overview</h2>
            <div className="w-full h-[1px] bg-[#c0c0c0]"></div>
          </div>
          {PROJECTS.map((project) => (
            <ul className="mb-3" key={project.name}>
              <h1 className="typo-sub-overview">{project.name}</h1>
              {project.caseStudies.map((caseStudy) => (
                <li className="" key={caseStudy.id}>
                  <a
                    href={`#${caseStudy.id}`}
                    className="typo-sub-headline underline decoration-[#999999]"
                  >
                    {caseStudy.id}. {caseStudy.overviewTitle}
                  </a>
                </li>
              ))}
            </ul>
          ))}
          <ul>
            {/* <h1 className="typo-sub-overview">서비스 설명</h1> */}
            <li className="">
              <a
                href={`#${SERVICE_SECTION.id}`}
                className="typo-sub-headline underline decoration-[#999999]"
              >
                {SERVICE_SECTION.title}
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <Divider /> */}
    </>
  );
};

export default HeroSection;
