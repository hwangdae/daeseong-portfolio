import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const WantedSans = localFont({
  src: "../font/WantedSansVariable.woff2",
});

export const metadata: Metadata = {
  title: "황대성 포트폴리오",
  description: "프론트엔드 개발자 황대성 포트폴리오 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${WantedSans.className}`}>{children}</body>
    </html>
  );
}
