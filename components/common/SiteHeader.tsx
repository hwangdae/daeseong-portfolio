import Link from "next/link";

const GITHUB_URL = "https://github.com/hwangdae";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#1a1a1d]/80 backdrop-blur">
      <div className="max-w-275 mx-auto flex h-16 items-center justify-between px-6 md:px-16">
        <Link
          href="/"
          className="typo-navi text-white/80 transition-colors hover:text-white"
        >
          황대성{" "}
          <span className="text-white/30">| Frontend Developer</span>
        </Link>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="typo-navi text-white/60 transition-colors hover:text-white"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
