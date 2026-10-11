import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createPost, isValidSlug, postExists, slugify } from "@/lib/blog";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const description =
    typeof body?.description === "string" ? body.description.trim() : "";
  const date = typeof body?.date === "string" ? body.date : "";
  const content = typeof body?.content === "string" ? body.content : "";
  const requestedSlug =
    typeof body?.slug === "string" ? body.slug.trim() : "";
  const problem = typeof body?.problem === "string" ? body.problem.trim() : "";
  const solution =
    typeof body?.solution === "string" ? body.solution.trim() : "";
  const result = typeof body?.result === "string" ? body.result.trim() : "";
  const thumbnail =
    typeof body?.thumbnail === "string" ? body.thumbnail.trim() : "";

  if (!title || !content || !date) {
    return NextResponse.json(
      { error: "제목, 날짜, 본문은 필수입니다." },
      { status: 400 },
    );
  }

  const slug = requestedSlug || slugify(title);

  if (!isValidSlug(slug)) {
    return NextResponse.json(
      { error: "slug는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다." },
      { status: 400 },
    );
  }

  if (postExists(slug)) {
    return NextResponse.json(
      { error: "이미 존재하는 slug입니다." },
      { status: 409 },
    );
  }

  createPost(slug, {
    title,
    description,
    date,
    content,
    problem,
    solution,
    result,
    thumbnail,
  });

  return NextResponse.json({ slug }, { status: 201 });
}
