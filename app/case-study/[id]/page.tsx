import CaseStudyDetail from "@/components/caseStudy/CaseStudyDetail";
import SiteHeader from "@/components/common/SiteHeader";
import { CASE_STUDIES } from "@/constant/caseStudies";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CaseStudyPageProps {
  params: Promise<{ id: string }>;
}

function getCaseStudy(id: string) {
  return CASE_STUDIES.find((caseStudy) => caseStudy.id === Number(id));
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((caseStudy) => ({ id: String(caseStudy.id) }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const caseStudy = getCaseStudy(id);

  if (!caseStudy) {
    return { title: "황대성 포트폴리오" };
  }

  return {
    title: `${caseStudy.title} | 황대성 포트폴리오`,
    description: caseStudy.problem[0]?.title,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const caseStudy = getCaseStudy(id);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="max-w-275 mx-auto overflow-hidden px-6 py-16 md:px-16">
        <Link
          href="/"
          className="typo-navi mb-12 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-white/60 transition-colors hover:border-white/30 hover:text-white"
        >
          ← 목록으로 돌아가기
        </Link>
        <div className="max-w-[760px]">
          <CaseStudyDetail caseStudy={caseStudy} />
        </div>
      </div>
    </div>
  );
}
