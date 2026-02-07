"use client";
import HeroSection from "./heroSection/HeroSection";
import CaseStudySection from "./caseStudySection/CaseStudySection";
import Navigation from "../navigation/Navigation";
import { PROJECT_HIGHLIGHTS } from "@/constant/title";
import { useActiveSection } from "@/hooks/useActiveSection";

const Main = () => {
  const activeId = useActiveSection(PROJECT_HIGHLIGHTS.map((item) => item.id));

  return (
    <div className="bg-white max-w-[1200px] mx-auto my-8 py-32 px-16 overflow-hidden">
      <HeroSection />
      <CaseStudySection />
      <Navigation activeId={activeId} />
    </div>
  );
};

export default Main;
