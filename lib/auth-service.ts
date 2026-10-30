// 비밀번호 변환·로그인 판단 — node:crypto 를 쓰는 서버 전용 파일
// (lib/service.ts 는 클라이언트 폼에서도 불러오므로 여기에 분리, 연결은 app/actions.ts)

import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import { toUserClient } from "@/lib/service";
import type {
  userAccountType,
  userClientType,
  userStoredType,
} from "@/lib/types";

const scryptAsync = promisify(scrypt);

const saltBytes = 16;
const hashBytes = 32;

async function deriveKey(password: string, salt: string): Promise<Buffer> {
  return (await scryptAsync(password, salt, hashBytes)) as Buffer;
}

/** 랜덤 salt 로 바꾼 값만 돌려준다 (원문은 저장하지 않음) */
export async function hashPassword(
  password: string,
): Promise<Pick<userStoredType, "passwordSalt" | "passwordHash">> {
  const passwordSalt = randomBytes(saltBytes).toString("hex");
  const key = await deriveKey(password, passwordSalt);
  return { passwordSalt, passwordHash: key.toString("hex") };
}

async function isSamePassword(
  user: userStoredType,
  password: string,
): Promise<boolean> {
  const saved = Buffer.from(user.passwordHash, "hex");
  const key = await deriveKey(password, user.passwordSalt);
  // 쿠키가 고쳐져 길이가 다르면 timingSafeEqual 이 오류를 내므로 먼저 거른다
  return saved.length === key.length && timingSafeEqual(saved, key);
}

/** 로그인 판단 — 사용자가 없거나(null) 비밀번호가 다르면 null, 맞으면 비밀번호 뺀 정보 */
export async function checkLogin(
  user: userAccountType | null,
  password: string,
): Promise<userClientType | null> {
  if (!user) return null;
  const matched =
    "password" in user
      ? user.password === password
      : await isSamePassword(user, password);
  return matched ? toUserClient(user) : null;
}
