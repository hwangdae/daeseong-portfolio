import { PROJECT_HIGHLIGHTS } from "@/constant/title";
import React from "react";

interface NavigationProps {
  activeId: number;
}

const Navigation = ({ activeId }: NavigationProps) => {
  return (
    <nav className="w-1 h-auto bg-[#333333] fixed right-6 bottom-8 flex flex-col">
      {PROJECT_HIGHLIGHTS.map((highlight) => {
        const isActive = activeId === highlight.id;
        return (
          <a
            key={highlight.id}
            href={`#${highlight.id}`}
            className="relative group"
          >
            {/* 막대 */}
            <span
              className={`block w-1 h-7.5 ${isActive ? "bg-[#eeeeee]" : "bg-[#333333]"} `}
            />

            {/* 제목 키워드 */}
            {activeId > 0 && (
              <span
                className={`absolute right-6 top-0 whitespace-nowrap text-sm px-1.5 ${isActive ? "text-[#eeeeee]" : "text-[#333333]"}`}
              >
                {highlight.keyword}
              </span>
            )}
          </a>
        );
      })}
    </nav>
  );
};

export default Navigation;
