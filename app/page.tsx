import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/common/SiteHeader";
import { getAllPosts } from "@/lib/blog";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

const SUMMARY_COLUMNS = [
  { label: "문제", key: "problem" as const },
  { label: "해결 과정", key: "solution" as const },
  { label: "결과", key: "result" as const },
];

/** 요약 문구의 `**텍스트**`를 굵게 표시합니다. */
function renderEmphasis(text: string) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-[#d1d1d1]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

export default async function Home() {
  const posts = getAllPosts();
  const authed = await isAuthenticated();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="max-w-275 mx-auto px-6 py-16 md:px-16">
        <div className="mb-12 flex items-end justify-between">
          <h1 className="typo-headline">Blog</h1>
          {authed && (
            <Link
              href="/blog/write"
              className="typo-navi rounded-full border border-white/10 px-4 py-2 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              글쓰기
            </Link>
          )}
        </div>

        {posts.length > 0 && (
          <div className="mb-16">
            <div className="mb-6">
              <h2 className="typo-overview">Contents</h2>
              <div className="h-[1px] w-full bg-white/15" />
            </div>
            <ul className="flex flex-col space-y-1.5">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <a
                    href={`#${post.slug}`}
                    className="group inline-flex items-baseline gap-2 typo-sub-headline transition-colors hover:text-white"
                  >
                    <span className="text-white/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="underline decoration-white/20 underline-offset-2 group-hover:decoration-white/60">
                      {post.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {posts.length === 0 ? (
          <p className="typo-body text-white/50">아직 작성된 글이 없습니다.</p>
        ) : (
          <ol className="border-t border-white/10">
            {posts.map((post) => {
              const hasSummary = post.problem || post.solution || post.result;

              return (
                <li
                  key={post.slug}
                  id={post.slug}
                  className="scroll-mt-24 border-b border-white/10"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="post-card group block px-2 py-10 transition-colors hover:bg-white/[0.03] md:px-4"
                  >
                    <h2 className="typo-section-title mb-6 transition-colors group-hover:text-white/80">
                      {post.title}
                    </h2>

                    {hasSummary ? (
                      <div className="flex flex-col gap-6">
                        {SUMMARY_COLUMNS.map((column) => {
                          const text = post[column.key];
                          if (!text) return null;

                          const items = text.split("\n").filter(Boolean);

                          return (
                            <div key={column.key}>
                              <p className="typo-navi mb-2 text-white/40 uppercase tracking-wider">
                                {column.label}
                              </p>
                              <ul className="list-disc space-y-1 pl-4 marker:text-white">
                                {items.map((item, i) => (
                                  <li key={i} className="typo-body-sub">
                                    <span className="line-clamp-2">
                                      {renderEmphasis(item)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      post.description && (
                        <p className="typo-body text-white/60">
                          {post.description}
                        </p>
                      )
                    )}

                    {post.thumbnail && (
                      <div className="relative mt-6 h-72 w-full overflow-hidden rounded-xl bg-white/5">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          sizes="(min-width: 768px) 700px, 100vw"
                          className="object-contain"
                        />
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
