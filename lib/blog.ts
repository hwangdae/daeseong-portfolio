import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export { slugify, isValidSlug } from "./slugify";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  problem: string;
  solution: string;
  result: string;
  thumbnail: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface SavePostInput {
  title: string;
  description: string;
  date: string;
  content: string;
  problem: string;
  solution: string;
  result: string;
  thumbnail: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

function filePath(slug: string) {
  return path.join(BLOG_DIR, `${slug}.md`);
}

export function postExists(slug: string) {
  return fs.existsSync(filePath(slug));
}

function readMeta(slug: string): BlogPostMeta | null {
  const full = filePath(slug);
  if (!fs.existsSync(full)) return null;

  const raw = fs.readFileSync(full, "utf-8");
  const { data } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    problem: data.problem ?? "",
    solution: data.solution ?? "",
    result: data.result ?? "",
    thumbnail: data.thumbnail ?? "",
  };
}

export function getAllPosts(): BlogPostMeta[] {
  ensureDir();

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));
  const posts = files
    .map((file) => readMeta(file.replace(/\.md$/, "")))
    .filter((post): post is BlogPostMeta => post !== null);

  return posts.sort((a, b) => (a.date < b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const full = filePath(slug);
  if (!fs.existsSync(full)) return null;

  const raw = fs.readFileSync(full, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    problem: data.problem ?? "",
    solution: data.solution ?? "",
    result: data.result ?? "",
    thumbnail: data.thumbnail ?? "",
    content,
  };
}

/** 빈 태그(`<p></p>` 등)만 있는 본문은 내용이 없는 것으로 봅니다. 이미지만 있는 본문은 내용이 있는 것으로 봅니다. */
export function hasPostContent(content: string) {
  if (/<(img|iframe|video)\b/i.test(content)) return true;

  const text = content
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return text.length > 0;
}

function writePost(slug: string, input: SavePostInput) {
  ensureDir();
  const file = matter.stringify(input.content, {
    title: input.title,
    description: input.description,
    date: input.date,
    problem: input.problem,
    solution: input.solution,
    result: input.result,
    thumbnail: input.thumbnail,
  });
  fs.writeFileSync(filePath(slug), file, "utf-8");
}

export function createPost(slug: string, input: SavePostInput) {
  if (postExists(slug)) {
    throw new Error(`이미 존재하는 slug입니다: ${slug}`);
  }
  writePost(slug, input);
}

export function updatePost(slug: string, input: SavePostInput) {
  if (!postExists(slug)) {
    throw new Error(`존재하지 않는 글입니다: ${slug}`);
  }
  writePost(slug, input);
}

export function deletePost(slug: string) {
  const full = filePath(slug);
  if (fs.existsSync(full)) {
    fs.unlinkSync(full);
  }
}
