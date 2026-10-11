import {
  MYSELECTSHOP_PROJECT_HIGHLIGHTS,
  NOWAIT_PROJECT_HIGHLIGHTS,
  SERVICE_HIGHLIGHTS,
} from "@/constant/title";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-top justify-between mb-24">
      <header id={`${0}`} className="mb-10">
        <h1 className="typo-headline">황대성 포트폴리오</h1>
      </header>
      <div>
        <div className="mb-6">
          <h2 className="typo-overview">Portfolio Overview</h2>
          <div className="w-full h-[1px] bg-white/15"></div>
        </div>
        <ul className="mb-6">
          <h1 className="typo-sub-overview mb-2">노웨잇</h1>
          <div className="flex flex-col space-y-1.5">
            {NOWAIT_PROJECT_HIGHLIGHTS.map((highlight) => (
              <li key={highlight.id}>
                <a
                  href={`#${highlight.id}`}
                  className="group inline-flex items-baseline gap-2 typo-sub-headline transition-colors hover:text-white"
                >
                  <span className="text-white/25">
                    {String(highlight.id).padStart(2, "0")}
                  </span>
                  <span className="underline decoration-white/20 underline-offset-2 group-hover:decoration-white/60">
                    {highlight.title}
                  </span>
                </a>
              </li>
            ))}
          </div>
        </ul>
        <ul className="mb-6">
          <h1 className="typo-sub-overview mb-2">마이셀렉트샵</h1>
          <div className="flex flex-col space-y-1.5">
            {MYSELECTSHOP_PROJECT_HIGHLIGHTS.map((highlight) => (
              <li key={highlight.id}>
                <a
                  href={`#${highlight.id}`}
                  className="group inline-flex items-baseline gap-2 typo-sub-headline transition-colors hover:text-white"
                >
                  <span className="text-white/25">
                    {String(highlight.id).padStart(2, "0")}
                  </span>
                  <span className="underline decoration-white/20 underline-offset-2 group-hover:decoration-white/60">
                    {highlight.title}
                  </span>
                </a>
              </li>
            ))}
          </div>
        </ul>
        <ul>
          <div className="flex flex-col space-y-1.5">
            {SERVICE_HIGHLIGHTS.map((service) => (
              <li key={service.id}>
                <a
                  href={`#${service.id}`}
                  className="group inline-flex items-baseline gap-2 typo-sub-headline transition-colors hover:text-white"
                >
                  <span className="underline decoration-white/20 underline-offset-2 group-hover:decoration-white/60">
                    {service.title}
                  </span>
                </a>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;
