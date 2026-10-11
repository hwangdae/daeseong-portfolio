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
    <nav className="hidden lg:flex w-1 h-auto fixed right-6 bottom-17 flex-col gap-0.5">
      {activeId > 0 &&
        ALL_PROJECT_HIGHLIGHTS.map((highlight) => {
          const isActive = activeId === highlight.id;
          return (
            <a
              key={highlight.id}
              href={`#${highlight.id}`}
              className="group relative"
            >
              {/* 막대 */}
              <span
                className={`block w-1 h-7 transition-colors ${isActive ? "bg-white" : "bg-white/15 group-hover:bg-white/40"} `}
              />

              {/* 제목 키워드 */}
              <span
                className={`absolute right-6 top-0 whitespace-nowrap typo-navi px-1.5 transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-transparent group-hover:text-white/60"
                }`}
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
