import { redirect } from "next/navigation";
import SiteHeader from "@/components/common/SiteHeader";
import BlogEditor from "@/components/blog/BlogEditor";
import { isAuthenticated } from "@/lib/auth";

export default async function BlogWritePage() {
  if (!(await isAuthenticated())) {
    redirect("/blog/login?redirect=/blog/write");
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="max-w-275 mx-auto px-6 py-16 md:px-16">
        <h1 className="typo-headline mb-10">새 글 작성</h1>
        <BlogEditor mode="create" />
      </div>
    </div>
  );
}
