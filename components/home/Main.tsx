"use client";
import HeroSection from "./heroSection/HeroSection";
import CaseStudySection from "./caseStudySection/CaseStudySection";
import Navigation from "../navigation/Navigation";
import {
  MYSELECTSHOP_PROJECT_HIGHLIGHTS,
  NOWAIT_PROJECT_HIGHLIGHTS,
  SERVICE_HIGHLIGHTS,
} from "@/constant/title";
import { useActiveSection } from "@/hooks/useActiveSection";

const Main = () => {
  const { activeId, setActiveId } = useActiveSection(
    [
      ...NOWAIT_PROJECT_HIGHLIGHTS,
      ...MYSELECTSHOP_PROJECT_HIGHLIGHTS,
      ...SERVICE_HIGHLIGHTS,
    ].map((item) => item.id),
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveId(0);
  };

  return (
    <div className="bg-white max-w-275 mx-auto my-8 py-32 px-16 overflow-hidden">
      <HeroSection />
      <CaseStudySection />
      <Navigation activeId={activeId} />
      <div className="fixed bottom-10 right-6 z-50">
        <div className="relative flex items-center gap-7">
          <button
            onClick={scrollToTop}
            className="typo-navi text-white  cursor-pointer"
          >
            맨 위로 가기
          </button>
          <span className="block w-1 h-3 bg-[#eeeeee]" />
        </div>
      </div>
    </div>
  );
};

export default Main;
