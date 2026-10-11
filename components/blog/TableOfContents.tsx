"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/toc";

export default function TableOfContents({
  headings,
}: {
  headings: TocHeading[];
}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const minLevel = Math.min(...headings.map((heading) => heading.level));

  return (
    <nav className="sticky top-24 hidden h-fit w-56 shrink-0 self-start xl:block">
      <p className="typo-navi mb-3 text-white/40 uppercase tracking-wider">
        목차
      </p>
      <ul className="space-y-1 border-l border-white/10">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                style={{
                  paddingLeft: `${(heading.level - minLevel) * 12 + 16}px`,
                }}
                className={`typo-navi -ml-px block line-clamp-2 border-l py-1 pr-2 transition-colors ${
                  isActive
                    ? "border-white text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
