// 데이터 찾기 (lib/data.ts와 로그인 쿠키에서 읽기만)

import { cookies } from "next/headers";

import {
  decodeUsers,
  sessionCookieName,
  usersCookieName,
} from "@/lib/auth-cookie";
import { assessments, devices, industries, users } from "@/lib/data";
import { getRiskLevelOfAssessment, toUserClient } from "@/lib/service";
import type {
  assessmentType,
  deviceType,
  industryType,
  riskLevelType,
  userAccountType,
  userClientType,
  userStoredType,
} from "@/lib/types";

export function getAllAssessments(): assessmentType[] {
  return assessments;
}

export function findAssessmentById(id: string): assessmentType | null {
  return assessments.find((assessment) => assessment.id === id) ?? null;
}

/** 이 브라우저 쿠키에 저장된 가입 계정들 */
export async function getSignedUpUsers(): Promise<userStoredType[]> {
  const cookieStore = await cookies();
  return decodeUsers(cookieStore.get(usersCookieName)?.value);
}

/** 체험 계정 + 가입 계정에서 찾기 (이메일 대소문자 무시) */
export async function findUserByEmail(
  email: string,
): Promise<userAccountType | null> {
  const key = email.toLowerCase();
  const accounts: userAccountType[] = [...users, ...(await getSignedUpUsers())];
  return accounts.find((user) => user.email.toLowerCase() === key) ?? null;
}

/** 로그인한 사용자 (화면용, 비밀번호 제외) — 없는 계정이면 비로그인(null) */
export async function getCurrentUser(): Promise<userClientType | null> {
  const cookieStore = await cookies();
  const email = cookieStore.get(sessionCookieName)?.value;
  if (!email) return null;

  const user = await findUserByEmail(email);
  return user ? toUserClient(user) : null;
}

/** 최고 위험도 등급이 level인 평가들 */
export function filterAssessmentsByLevel(
  level: riskLevelType,
): assessmentType[] {
  return assessments.filter(
    (assessment) => getRiskLevelOfAssessment(assessment) === level,
  );
}

/** 체험 계정 (화면용, 비밀번호 제외) */
export function getDemoUser(): userClientType {
  return toUserClient(users[0]);
}

export function getIndustries(): industryType[] {
  return industries;
}

export function findIndustryBySlug(slug: string): industryType | null {
  return industries.find((industry) => industry.slug === slug) ?? null;
}

export function getDevices(): deviceType[] {
  return devices;
}

export function findDeviceBySlug(slug: string): deviceType | null {
  return devices.find((device) => device.slug === slug) ?? null;
}
