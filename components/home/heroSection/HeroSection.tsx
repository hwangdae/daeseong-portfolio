import { Divider } from "@/components/common/Divider";
import { PROJECT_HIGHLIGHTS } from "@/constant/title";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="flex flex-col items-top justify-between mb-40">
        <header id={`${0}`}>
          <h1 className="typo-headline">포트폴리오</h1>
          {/* <h2 className="typo-subtitle mb-4">프론트엔드 개발자 황대성</h2> */}

          {/* <p className="typo-text">
            이메일 <span>hwangdeveloper@naver.com</span>
          </p>
          <p className="typo-text">
            전화번호 <span>010-2406-8022</span>
          </p> */}
        </header>
        <ul>
          {PROJECT_HIGHLIGHTS.map((highlight) => (
            <li className="" key={highlight.id}>
              <a
                href={`#${highlight.id}`}
                className="typo-text text-[#777777] underline decoration-[#999999]"
              >
                {highlight.id}. {highlight.title}
              </a>
            </li>
          ))}
        </ul>
        
      </div>
      <Divider />
    </>
  );
};

export default HeroSection;
