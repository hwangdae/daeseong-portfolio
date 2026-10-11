"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { markSiteEntered, pushDataLayer, resolveUtm } from "@/lib/utm";

const NON_POST_BLOG_PATHS = ["/blog/login", "/blog/write"];

function getPostSlug(pathname: string): string | null {
  if (!pathname.startsWith("/blog/")) return null;
  if (NON_POST_BLOG_PATHS.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return decodeURIComponent(pathname.slice("/blog/".length));
}

export default function UtmTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const utm = resolveUtm();

    if (markSiteEntered()) {
      pushDataLayer({
        event: "site_enter",
        landing_page: window.location.pathname,
        referrer: document.referrer || undefined,
        ...utm,
      });
    }

    if (pathname === "/") {
      pushDataLayer({ event: "blog_list_view", ...utm });
      return;
    }

    const slug = getPostSlug(pathname);
    if (slug) {
      pushDataLayer({ event: "blog_post_view", post_slug: slug, ...utm });
    }
  }, [pathname]);

  return null;
}
