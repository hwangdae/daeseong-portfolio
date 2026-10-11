import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "blog_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30일

function getSecret() {
  const secret = process.env.BLOG_AUTH_SECRET;
  if (!secret) {
    throw new Error("BLOG_AUTH_SECRET 환경변수가 설정되어 있지 않습니다.");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyPassword(password: string) {
  const expected = process.env.BLOG_ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("BLOG_ADMIN_PASSWORD 환경변수가 설정되어 있지 않습니다.");
  }
  // 항상 같은 길이의 해시끼리 비교해 타이밍 공격과 길이 불일치 문제를 함께 방지
  return safeEqual(sign(password), sign(expected));
}

export function createSessionToken() {
  return sign("blog-admin-session");
}

export function isValidSessionToken(token: string | undefined) {
  if (!token) return false;
  return safeEqual(token, createSessionToken());
}

export async function isAuthenticated() {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}
