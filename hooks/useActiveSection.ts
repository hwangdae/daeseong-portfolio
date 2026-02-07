"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: number[]) {
  const [activeId, setActiveId] = useState<number>(0);
  console.log("useActiveSection activeId:", activeId);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(Number(entry.target.id));
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", // 화면 중앙 기준
        threshold: 0,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(String(id));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}