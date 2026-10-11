import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deletePost, postExists, updatePost } from "@/lib/blog";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { slug } = await params;

  if (!postExists(slug)) {
    return NextResponse.json(
      { error: "존재하지 않는 글입니다." },
      { status: 404 },
    );
  }

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const description =
    typeof body?.description === "string" ? body.description.trim() : "";
  const date = typeof body?.date === "string" ? body.date : "";
  const content = typeof body?.content === "string" ? body.content : "";
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

  updatePost(slug, {
    title,
    description,
    date,
    content,
    problem,
    solution,
    result,
    thumbnail,
  });

  return NextResponse.json({ slug });
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { slug } = await params;
  deletePost(slug);

  return NextResponse.json({ ok: true });
}
