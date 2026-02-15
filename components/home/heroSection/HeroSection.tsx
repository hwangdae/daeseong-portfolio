import {
  MYSELECTSHOP_PROJECT_HIGHLIGHTS,
  NOWAIT_PROJECT_HIGHLIGHTS,
  SERVICE_HIGHLIGHTS,
} from "@/constant/title";

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
          <ul className="mb-3">
            <h1 className="typo-sub-overview">노웨잇</h1>
            {NOWAIT_PROJECT_HIGHLIGHTS.map((highlight) => (
              <li className="ml-2" key={highlight.id}>
                <a
                  href={`#${highlight.id}`}
                  className="typo-sub-headline underline decoration-[#999999]"
                >
                  {highlight.id}. {highlight.title}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mb-3">
            <h1 className="typo-sub-overview">마이셀렉트샵</h1>
            {MYSELECTSHOP_PROJECT_HIGHLIGHTS.map((highlight) => (
              <li className="ml-2" key={highlight.id}>
                <a
                  href={`#${highlight.id}`}
                  className="typo-sub-headline underline decoration-[#999999]"
                >
                  {highlight.id}. {highlight.title}
                </a>
              </li>
            ))}
          </ul>
          <ul>
            {/* <h1 className="typo-sub-overview">서비스 설명</h1> */}
            {SERVICE_HIGHLIGHTS.map((service) => (
              <li className="ml-2" key={service.id}>
                <a
                  href={`#${service.id}`}
                  className="typo-sub-headline underline decoration-[#999999]"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <Divider /> */}
    </>
  );
};

export default HeroSection;
