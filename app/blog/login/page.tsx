import SiteHeader from "@/components/common/SiteHeader";
import LoginForm from "@/components/blog/LoginForm";

interface BlogLoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function BlogLoginPage({
  searchParams,
}: BlogLoginPageProps) {
  const { redirect } = await searchParams;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="max-w-275 mx-auto px-6 py-24 md:px-16">
        <div className="mx-auto max-w-sm">
          <h1 className="typo-section-title mb-8">글쓰기 로그인</h1>
          <LoginForm redirectTo={redirect || "/blog/write"} />
        </div>
      </div>
    </div>
  );
}
