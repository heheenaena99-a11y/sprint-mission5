// 위험도·등급 계산 + 폼 입력 검사(판단)

import type {
  assessmentType,
  createAssessmentFormType,
  formErrorType,
  loginFormType,
  riskLevelType,
  signUpFormType,
  userAccountType,
  userClientType,
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
export function toUserClient(user: userAccountType): userClientType {
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

/* ── 폼 입력 검사 (판단만 — 조회는 repository, 연결은 app/actions.ts) ── */

const requiredMessage = "입력해 주세요";

/** 이메일 형식 (아이디@도메인.끝) */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** 1~5 정수 */
function isScore(value: string): boolean {
  return /^[1-5]$/.test(value.trim());
}

export function validateLoginForm(form: loginFormType): formErrorType[] {
  const errors: formErrorType[] = [];
  if (!form.email.trim()) {
    errors.push({ field: "email", label: "이메일", message: requiredMessage });
  } else if (!isEmail(form.email.trim())) {
    errors.push({
      field: "email",
      label: "이메일",
      message: "이메일 형식이 아니에요 (예: you@company.com)",
    });
  }
  if (!form.password) {
    errors.push({
      field: "password",
      label: "비밀번호",
      message: requiredMessage,
    });
  }
  return errors;
}

export function validateSignUpForm(form: signUpFormType): formErrorType[] {
  const errors: formErrorType[] = [];
  if (!form.name.trim()) {
    errors.push({ field: "name", label: "이름", message: requiredMessage });
  }
  if (!form.email.trim()) {
    errors.push({ field: "email", label: "이메일", message: requiredMessage });
  } else if (!isEmail(form.email.trim())) {
    errors.push({
      field: "email",
      label: "이메일",
      message: "이메일 형식이 아니에요 (예: you@company.com)",
    });
  }
  if (!form.password) {
    errors.push({
      field: "password",
      label: "비밀번호",
      message: requiredMessage,
    });
  } else if (form.password.length < 4) {
    errors.push({
      field: "password",
      label: "비밀번호",
      message: "4자 이상 입력해 주세요",
    });
  }
  if (!form.passwordConfirm) {
    errors.push({
      field: "password-confirm",
      label: "비밀번호 확인",
      message: requiredMessage,
    });
  } else if (form.password && form.passwordConfirm !== form.password) {
    errors.push({
      field: "password-confirm",
      label: "비밀번호 확인",
      message: "비밀번호가 서로 달라요",
    });
  }
  if (!form.agreeTerms) {
    errors.push({
      field: "agree-terms",
      label: "이용약관 동의",
      message: "동의해 주세요",
    });
  }
  if (!form.agreePrivacy) {
    errors.push({
      field: "agree-privacy",
      label: "개인정보 수집·이용 동의",
      message: "동의해 주세요",
    });
  }
  return errors;
}

export function validateCreateAssessmentForm(
  form: createAssessmentFormType,
): formErrorType[] {
  const errors: formErrorType[] = [];
  if (!form.title.trim()) {
    errors.push({ field: "title", label: "작업명", message: requiredMessage });
  }
  if (!form.category.trim()) {
    errors.push({
      field: "category",
      label: "작업구분",
      message: requiredMessage,
    });
  }
  if (!form.author.trim()) {
    errors.push({ field: "author", label: "작성자", message: requiredMessage });
  }

  // 유해·위험요인 중복 — 앞뒤 공백·대소문자 무시
  const seen = new Set<string>();

  form.hazards.forEach((h, index) => {
    const n = index + 1;
    const prefix = `유해·위험요인 ${n}`;
    const key = h.hazard.trim().toLowerCase();

    if (!key) {
      errors.push({
        field: `hazard-${n}-text`,
        label: `${prefix} 내용`,
        message: requiredMessage,
      });
    } else if (seen.has(key)) {
      errors.push({
        field: `hazard-${n}-text`,
        label: `${prefix} 내용`,
        message: "중복된 유해·위험요인이에요",
      });
    } else {
      seen.add(key);
    }

    for (const [name, label, value] of [
      ["frequency", "빈도", h.frequency],
      ["severity", "강도", h.severity],
    ] as const) {
      if (!value.trim()) {
        errors.push({
          field: `${name}-${n}`,
          label: `${prefix} ${label}`,
          message: requiredMessage,
        });
      } else if (!isScore(value)) {
        errors.push({
          field: `${name}-${n}`,
          label: `${prefix} ${label}`,
          message: "1~5 사이 정수로 입력해 주세요",
        });
      }
    }

    if (!h.measure.trim()) {
      errors.push({
        field: `measure-${n}`,
        label: `${prefix} 감소대책`,
        message: requiredMessage,
      });
    }
  });

  if (!form.agreeWorkers) {
    errors.push({
      field: "agree-workers",
      label: "작업자 의견 확인",
      message: "확인해 주세요",
    });
  }
  if (!form.agreeShare) {
    errors.push({
      field: "agree-share",
      label: "결과 공유 확인",
      message: "확인해 주세요",
    });
  }
  return errors;
}
