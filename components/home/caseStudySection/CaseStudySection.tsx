import {
  CASE_STUDIES,
  CaseStudy,
  SERVICE_DESCRIPTION,
} from "@/constant/caseStudies";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SUMMARY_COLUMNS: {
  label: string;
  getItems: (caseStudy: CaseStudy) => string[];
}[] = [
  {
    label: "문제",
    getItems: (caseStudy) => caseStudy.problem.map((item) => item.title),
  },
  {
    label: "해결 과정",
    getItems: (caseStudy) => caseStudy.solution.map((item) => item.title),
  },
  {
    label: "결과",
    getItems: (caseStudy) => caseStudy.result.map((item) => item.title),
  },
];

export default function CaseStudySection() {
  const [isServiceImgLoading, setIsServiceImgLoading] = useState(true);

  return (
    <section className="mx-auto">
      <div className="flex flex-col gap-6">
        {CASE_STUDIES.map((caseStudy: CaseStudy) => (
          <Link
            key={caseStudy.id}
            href={`/case-study/${caseStudy.id}`}
            className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/25 hover:bg-white/[0.05] md:p-10"
          >
            <article id={`${caseStudy.id}`} className="scroll-mt-28 w-full">
              <div className="mb-4 flex items-center justify-between">
                <span className="typo-navi text-white/30">
                  Case Study {String(caseStudy.id).padStart(2, "0")}
                </span>
                <span className="typo-navi text-white/40 transition-colors group-hover:text-white">
                  자세히 보기 →
                </span>
              </div>

              <h2 className="typo-section-title mb-6 transition-colors group-hover:text-white">
                {caseStudy.title}
              </h2>

              <div className="grid gap-6 sm:grid-cols-3">
                {SUMMARY_COLUMNS.map((column) => (
                  <div key={column.label}>
                    <p className="typo-navi mb-2 text-white/40 uppercase tracking-wider">
                      {column.label}
                    </p>
                    <ul className="space-y-1.5 list-disc marker:text-white/25 pl-4">
                      {column.getItems(caseStudy).map((text, i) => (
                        <li
                          key={i}
                          className="typo-body-sub line-clamp-2"
                        >
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* 서비스 설명 */}
      <ul
        id={`11`}
        className="mt-16 w-full scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10"
      >
        <h1 className="typo-section-title mb-6">서비스 설명</h1>
        {SERVICE_DESCRIPTION.map((service) => {
          return (
            <li className="mb-10 relative last:mb-0" key={service.id}>
              <h2 className="typo-section-subtitle mb-2">{service.title}</h2>
              <p className="typo-body mb-4">{service.description}</p>
              {isServiceImgLoading && (
                <ul className="grid grid-cols-9 gap-2 absolute inset-0 top-[135px]">
                  {Array.from({ length: 18 }, (_, i) => (
                    <div
                      key={i}
                      className="h-[210px] rounded-[12px] bg-white/5 animate-pulse"
                    />
                  ))}
                </ul>
              )}

              {/* 실제 이미지 */}
              <Image
                src={service.image.url}
                width={service.image.width}
                height={service.image.height}
                alt="서비스 이미지"
                onLoadingComplete={() => setIsServiceImgLoading(false)}
                className={`rounded-xl transition-opacity duration-300 ${
                  isServiceImgLoading ? "opacity-0" : "opacity-100"
                }`}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
