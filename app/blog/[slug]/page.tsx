import Link from "next/link";
import { Metadata } from "next";
import SiteHeader from "@/components/common/SiteHeader";
import DeletePostButton from "@/components/blog/DeletePostButton";
import TableOfContents from "@/components/blog/TableOfContents";
import { getPostBySlug, hasPostContent } from "@/lib/blog";
import { isAuthenticated } from "@/lib/auth";
import { highlightCodeBlocks } from "@/lib/highlight";
import { extractToc } from "@/lib/toc";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "황대성 포트폴리오" };
  }

  return {
    title: `${post.title} | 황대성 포트폴리오`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const authed = await isAuthenticated();

  if (!post) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="max-w-275 mx-auto px-6 py-16 md:px-16">
          <div className="mb-12">
            <Link
              href="/"
              className="typo-navi inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              ← 목록으로 돌아가기
            </Link>
          </div>
          <p className="typo-body text-white/50">
            블로그 글이 준비중입니다.
          </p>
        </div>
      </div>
    );
  }

  const hasContent = hasPostContent(post.content);
  const { html, headings } = extractToc(highlightCodeBlocks(post.content));

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="max-w-275 mx-auto px-6 py-16 md:px-16">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="typo-navi inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-white/60 transition-colors hover:border-white/30 hover:text-white"
          >
            ← 목록으로 돌아가기
          </Link>
          {authed && (
            <div className="flex items-center gap-4">
              <Link
                href={`/blog/write/${post.slug}`}
                className="typo-navi text-white/60 transition-colors hover:text-white"
              >
                수정
              </Link>
              <DeletePostButton slug={post.slug} />
            </div>
          )}
        </div>

        <div className="flex items-start gap-12">
          <article className="min-w-0 max-w-[760px] flex-1">
            <h1 className="typo-headline mb-10">{post.title}</h1>
            {hasContent ? (
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className="typo-body text-white/50">
                블로그 글이 준비중입니다.
              </p>
            )}
          </article>
          {hasContent && <TableOfContents headings={headings} />}
        </div>
      </div>
    </div>
  );
}
