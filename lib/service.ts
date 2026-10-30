// 위험도·등급 계산

import type {
  assessmentType,
  riskLevelType,
  userClientType,
  userDataType,
} from "@/lib/types";

export const riskLevelLabel: Record<riskLevelType, string> = {
  low: "낮음",
  mid: "보통",
  high: "높음",
};

/** 위험도 = 빈도(1~5) × 강도(1~5) */
export const getRiskScore = (frequency: number, severity: number): number =>
  frequency * severity;

/** 1~8 낮음, 9~15 보통, 16~25 높음 */
export function getRiskLevel(score: number): riskLevelType {
  if (score >= 16) return "high";
  if (score >= 9) return "mid";
  return "low";
}

/** 평가 안에서 가장 높은 위험도 */
export function getMaxRiskScore(assessment: assessmentType): number {
  return Math.max(
    ...assessment.hazards.map((h) => getRiskScore(h.frequency, h.severity)),
  );
}

/** 평가의 최고 위험도 등급 */
export function getRiskLevelOfAssessment(
  assessment: assessmentType,
): riskLevelType {
  return getRiskLevel(getMaxRiskScore(assessment));
}

/** 등급별 개수 */
export function getRiskLevelCounts(
  levels: riskLevelType[],
): Record<riskLevelType, number> {
  const counts: Record<riskLevelType, number> = { low: 0, mid: 0, high: 0 };
  for (const level of levels) counts[level] += 1;
  return counts;
}

/** 등급 분포 문구 (예: "높음 1 · 보통 2") */
export function getRiskDistribution(assessment: assessmentType): string {
  const counts = getRiskLevelCounts(
    assessment.hazards.map((h) =>
      getRiskLevel(getRiskScore(h.frequency, h.severity)),
    ),
  );
  const order: riskLevelType[] = ["high", "mid", "low"];

  return order
    .filter((level) => counts[level] > 0)
    .map((level) => `${riskLevelLabel[level]} ${counts[level]}`)
    .join(" · ");
}

/** 화면용 사용자로 변환 (비밀번호 제외) */
export function toUserClient(user: userDataType): userClientType {
  const { name, email } = user;
  return { name, email };
}

/** 평가들의 유해·위험요인 총 개수 */
export function countHazards(assessments: assessmentType[]): number {
  return assessments.reduce(
    (total, assessment) => total + assessment.hazards.length,
    0,
  );
}
