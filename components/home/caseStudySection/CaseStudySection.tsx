import { Divider } from "@/components/common/Divider";
import SectionBlock from "@/components/common/SectionBlock";
import {
  CASE_STUDIES,
  CaseStudy,
  SERVICE_DESCRIPTION,
} from "@/constant/caseStudies";
import Image from "next/image";

export default function CaseStudySection() {
  return (
    <section className="mx-auto">
      {CASE_STUDIES.map((caseStudy: CaseStudy) => (
        <div key={caseStudy.id}>
          <article id={`${caseStudy.id}`} className="my-32 scroll-mt-32 w-full">
            <h2 className="typo-section-title mb-6">
              {caseStudy.id}. {caseStudy.title}
            </h2>

            {/* 문제 / 원인 / 시도 */}
            <section>
              {/* 문제 상황 */}
              <SectionBlock title="문제 상황">
                <ul className="pl-2 list-disc ml-5 space-y-1">
                  {caseStudy.problem.map((text, i) => (
                    <li key={i}>
                      <h1 className="typo-subtitle">{text.title}</h1>
                      {text.media && (
                        <Image
                          className="mt-3"
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
                <ul className="pl-2 list-disc ml-5 space-y-1">
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
                  <ul className="pl-2 list-disc ml-5 space-y-2">
                    {caseStudy.failedAttempts.map((attempt, i) => (
                      <li key={i} className="typo-subtitle">
                        <h3 className="mb-1.5">{attempt.title}</h3>
                        <ul className="list-square ml-5">
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
                <ul className="pl-2 list-disc ml-5 space-y-2">
                  {caseStudy.solution.map((solution, i) => (
                    <li key={i} className="typo-subtitle">
                      <h3 className="mb-1.5">{solution.title}</h3>
                      {solution.subTitle && (
                        <ul className="list-square list-inside ml-5">
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
                      {solution.media?.type === "video" && (
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
                      )}

                      {/* 이미지 */}
                      {solution.media?.type === "image" && (
                        <div className="mt-4 pl-4 -indent-4">
                          <Image
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
                <ul className="pl-2 list-disc ml-5 space-y-2">
                  {caseStudy.result.map((result, i) => (
                    <li key={i} className="typo-subtitle">
                      <h3>{result.title}</h3>
                      {result.image && (
                        <Image
                          className="mt-3"
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
          {/* {CASE_STUDIES.length !== caseStudy.id && <Divider />} */}
          <Divider />
        </div>
      ))}

      <ul id={`14`} className="w-full my-32 scroll-mt-32">
        <h1 className="typo-section-title mb-6">서비스 설명</h1>
        {SERVICE_DESCRIPTION.map((service) => {
          return (
            <li className="mb-10 " key={service.id}>
              <h2 className="typo-section-subtitle mb-2">{service.title}</h2>
              <p className="typo-body mb-4">{service.description}</p>
              <Image
                src={service.image.url}
                width={service.image.width}
                height={service.image.height}
                alt="서비스 이미지"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
