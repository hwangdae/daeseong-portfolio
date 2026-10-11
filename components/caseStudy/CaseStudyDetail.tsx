import SectionBlock from "@/components/common/SectionBlock";
import { CaseStudy } from "@/constant/caseStudies";
import Image from "next/image";

export default function CaseStudyDetail({
  caseStudy,
}: {
  caseStudy: CaseStudy;
}) {
  return (
    <article className="w-full">
      <p className="typo-navi mb-3 text-white/40 uppercase tracking-wider">
        Case Study {String(caseStudy.id).padStart(2, "0")}
      </p>
      <h1 className="typo-headline mb-14">{caseStudy.title}</h1>

      {/* 문제 / 원인 / 시도 */}
      <section>
        {/* 문제 상황 */}
        <SectionBlock title="문제 상황">
          <ul className="pl-2 list-disc marker:text-white/25 ml-5 space-y-1">
            {caseStudy.problem.map((text, i) => (
              <li key={i}>
                <h2 className="typo-subtitle">{text.title}</h2>
                {text.media && (
                  <Image
                    className="mt-3 rounded-xl"
                    width={text.media?.width}
                    height={text.media?.height}
                    src={text.media?.url ?? ""}
                    alt="문제 상황 이미지"
                  />
                )}
              </li>
            ))}
          </ul>
        </SectionBlock>
        {/* 문제 원인 */}
        <SectionBlock title="문제 원인">
          <ul className="pl-2 list-disc marker:text-white/25 ml-5 space-y-1">
            {caseStudy.causes.map((cause, i) => (
              <li key={i} className="typo-subtitle">
                {cause}
              </li>
            ))}
          </ul>
        </SectionBlock>
        {/* 시도한 방법 */}
        {caseStudy.failedAttempts && (
          <SectionBlock title="시도한 방법">
            <ul className="pl-2 list-disc marker:text-white/25 ml-5 space-y-2">
              {caseStudy.failedAttempts.map((attempt, i) => (
                <li key={i} className="typo-subtitle">
                  <h3 className="mb-1.5">{attempt.title}</h3>
                  <ul className="list-square marker:text-white/20 ml-5">
                    {attempt.subTitle?.map((sub, j) => (
                      <li key={j} className="typo-body">
                        {sub}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}
      </section>

      {/* 해결 / 결과 */}
      <section>
        <SectionBlock title="해결 방법">
          <ul className="pl-2 list-disc marker:text-white/25 ml-5 space-y-2">
            {caseStudy.solution.map((solution, i) => (
              <li key={i} className="typo-subtitle">
                <h3 className="mb-1.5">{solution.title}</h3>
                {solution.subTitle && (
                  <ul className="list-square marker:text-white/20 list-inside ml-5">
                    {solution.subTitle.map((sub, j) => (
                      <li
                        key={j}
                        className="typo-body whitespace-pre-line pl-5 -indent-5"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}

                {/* 비디오 */}
                {/* {solution.media?.type === "video" && (
                  <div className="mt-4">
                    <div
                      className={`relative aspect-video ${solution.media.mediaWidth} rounded-xl overflow-hidden`}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${
                          solution.media.url.split("v=")[1]
                        }`}
                        title="MapManage"
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    </div>

                    {solution.media.description && (
                      <ul className="mt-3">
                        {solution.media.description.map((desc, j) => (
                          <li key={j}>
                            <h4
                              className="typo-subtitle mb-2"
                              dangerouslySetInnerHTML={{ __html: desc }}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )} */}

                {/* 이미지 */}
                {solution.media?.type === "image" && (
                  <div className="mt-4 pl-4 -indent-4">
                    <Image
                      className="rounded-xl"
                      src={solution.media.url}
                      alt="solution image"
                      width={solution.media.imageWidth ?? 800}
                      height={solution.media.height ?? 450}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </SectionBlock>
        {/* 결과 */}
        <SectionBlock title="결과">
          <ul className="pl-2 list-disc marker:text-white/25 ml-5 space-y-2">
            {caseStudy.result.map((result, i) => (
              <li key={i} className="typo-subtitle">
                <h3>{result.title}</h3>
                {result.image && (
                  <Image
                    className="mt-3 rounded-xl"
                    src={result.image.url}
                    width={result.image.width}
                    height={result.image.height}
                    alt="결과 이미지"
                  />
                )}
              </li>
            ))}
          </ul>
        </SectionBlock>
      </section>
    </article>
  );
}
