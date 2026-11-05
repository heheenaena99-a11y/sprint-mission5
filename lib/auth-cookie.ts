// 로그인 쿠키 이름·옵션과 rn_users 값 변환 (읽기는 repository, 쓰기는 app/actions.ts)

import type { userStoredType } from "@/lib/types";

export const usersCookieName = "rn_users";
export const sessionCookieName = "rn_session";

const baseCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
} as const;

/** 가입 계정 — 브라우저를 닫아도 30일 유지 */
export const usersCookieOptions = {
  ...baseCookieOptions,
  maxAge: 60 * 60 * 24 * 30,
};

/** 로그인 상태 — maxAge·expires 없는 세션 쿠키 (브라우저를 닫으면 삭제) */
export const sessionCookieOptions = baseCookieOptions;

/** 브라우저 쿠키 한도(약 4KB)를 넘으면 조용히 버려지므로 여유를 두고 막는다 */
const maxUsersCookieLength = 3800;

export function isUsersCookieTooLarge(value: string): boolean {
  return value.length > maxUsersCookieLength;
}

function isStoredUser(value: unknown): value is userStoredType {
  if (typeof value !== "object" || value === null) return false;
  const { name, email, passwordSalt, passwordHash } = value as userStoredType;
  return [name, email, passwordSalt, passwordHash].every(
    (field) => typeof field === "string",
  );
}

/** 한글 이름도 쿠키에 그대로 넣을 수 있게 base64url 로 바꾼다 */
export function encodeUsers(users: userStoredType[]): string {
  return Buffer.from(JSON.stringify(users), "utf8").toString("base64url");
}

/** 없거나 망가진 값은 빈 목록, 형식이 틀린 항목은 제외 */
export function decodeUsers(value: string | undefined): userStoredType[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(
      Buffer.from(value, "base64url").toString("utf8"),
    );
    return Array.isArray(parsed) ? parsed.filter(isStoredUser) : [];
  } catch {
    return [];
  }
}
