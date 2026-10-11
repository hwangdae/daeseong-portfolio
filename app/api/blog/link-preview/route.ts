import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

function extractAttr(tag: string, attr: string): string | null {
  const match = tag.match(new RegExp(`${attr}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? match[1] : null;
}

function parseMetaTags(html: string) {
  const metaTags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  const result: Record<string, string> = {};

  for (const tag of metaTags) {
    const key = extractAttr(tag, "property") ?? extractAttr(tag, "name");
    const content = extractAttr(tag, "content");
    if (key && content && !(key in result)) {
      result[key] = content;
    }
  }

  return result;
}

function parseTitleTag(html: string) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : null;
}

function parseFavicon(html: string, baseUrl: string) {
  const linkTags = html.match(/<link\s+[^>]*>/gi) ?? [];

  for (const tag of linkTags) {
    const rel = extractAttr(tag, "rel");
    if (rel && /icon/i.test(rel)) {
      const href = extractAttr(tag, "href");
      if (href) {
        try {
          return new URL(href, baseUrl).toString();
        } catch {
          continue;
        }
      }
    }
  }

  try {
    return new URL("/favicon.ico", baseUrl).toString();
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const rawUrl = typeof body?.url === "string" ? body.url.trim() : "";

  if (!rawUrl) {
    return NextResponse.json({ error: "URL을 입력해주세요." }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(rawUrl);
  } catch {
    return NextResponse.json(
      { error: "올바른 URL이 아닙니다." },
      { status: 400 },
    );
  }

  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return NextResponse.json(
      { error: "http/https 주소만 지원합니다." },
      { status: 400 },
    );
  }

  const fallback = {
    url: target.toString(),
    title: target.hostname,
    description: null,
    image: null,
    favicon: null,
    siteName: target.hostname,
  };

  try {
    const res = await fetch(target.toString(), {
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BlogBookmarkBot/1.0)",
      },
    });

    if (!res.ok) {
      return NextResponse.json(fallback);
    }

    const html = await res.text();
    const meta = parseMetaTags(html);

    const title = meta["og:title"] ?? parseTitleTag(html) ?? target.hostname;
    const description = meta["og:description"] ?? meta["description"] ?? null;
    const image = meta["og:image"]
      ? (() => {
          try {
            return new URL(meta["og:image"], target).toString();
          } catch {
            return null;
          }
        })()
      : null;
    const siteName = meta["og:site_name"] ?? target.hostname;
    const favicon = parseFavicon(html, target.toString());

    return NextResponse.json({
      url: target.toString(),
      title,
      description,
      image,
      siteName,
      favicon,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
