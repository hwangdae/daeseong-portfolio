import { notFound, redirect } from "next/navigation";
import SiteHeader from "@/components/common/SiteHeader";
import BlogEditor from "@/components/blog/BlogEditor";
import { getPostBySlug } from "@/lib/blog";
import { isAuthenticated } from "@/lib/auth";

interface BlogEditPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  const { slug } = await params;

  if (!(await isAuthenticated())) {
    redirect(`/blog/login?redirect=/blog/write/${slug}`);
  }

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="max-w-275 mx-auto px-6 py-16 md:px-16">
        <h1 className="typo-headline mb-10">글 수정</h1>
        <BlogEditor mode="edit" post={post} />
      </div>
    </div>
  );
}
