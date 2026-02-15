import {
  MYSELECTSHOP_PROJECT_HIGHLIGHTS,
  NOWAIT_PROJECT_HIGHLIGHTS,
  SERVICE_HIGHLIGHTS,
} from "@/constant/title";

interface NavigationProps {
  activeId: number;
}

const Navigation = ({ activeId }: NavigationProps) => {
  const ALL_PROJECT_HIGHLIGHTS = [
    ...NOWAIT_PROJECT_HIGHLIGHTS,
    ...MYSELECTSHOP_PROJECT_HIGHLIGHTS,
    ...SERVICE_HIGHLIGHTS,
  ];
  return (
    <nav className="w-1 h-auto bg-[#333333] fixed right-6 bottom-17 flex flex-col">
      {activeId > 0 &&
        ALL_PROJECT_HIGHLIGHTS.map((highlight) => {
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

              <span
                className={`absolute right-6 top-0 whitespace-nowrap typo-navi px-1.5 ${isActive ? "text-[#eeeeee]" : "text-[#333333]"}`}
              >
                {highlight.keyword}
              </span>
            </a>
          );
        })}
    </nav>
  );
};

export default Navigation;
