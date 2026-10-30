// 데이터 찾기 (lib/data.ts에서 읽기만)

import { assessments, devices, industries, users } from "@/lib/data";
import { getRiskLevelOfAssessment, toUserClient } from "@/lib/service";
import type {
  assessmentType,
  deviceType,
  industryType,
  riskLevelType,
  userClientType,
  userDataType,
} from "@/lib/types";

export function getAllAssessments(): assessmentType[] {
  return assessments;
}

export function findAssessmentById(id: string): assessmentType | null {
  return assessments.find((assessment) => assessment.id === id) ?? null;
}

export function findUserByEmail(email: string): userDataType | null {
  return users.find((user) => user.email === email) ?? null;
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
