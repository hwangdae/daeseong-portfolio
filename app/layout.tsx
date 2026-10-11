import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import UtmTracker from "@/components/common/UtmTracker";
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
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MKDFCVCS');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${WantedSans.className}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MKDFCVCS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <UtmTracker />
        {children}
      </body>
    </html>
  );
}
