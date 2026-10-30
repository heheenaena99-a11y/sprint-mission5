// 리스크노트 타입 모음

/** 저장용 사용자 (비밀번호 포함) */
export type userDataType = {
  name: string;
  email: string;
  password: string;
};

/** 화면용 사용자 (비밀번호 제외) */
export type userClientType = Omit<userDataType, "password">;

/** 쿠키에 저장하는 가입 계정 (비밀번호 원문 대신 salt·바꾼 값) */
export type userStoredType = userClientType & {
  passwordSalt: string;
  passwordHash: string;
};

/** 로그인 확인 대상 — 체험 계정 또는 가입 계정 */
export type userAccountType = userDataType | userStoredType;

export type hazardType = {
  order: number;
  step: string;
  hazard: string;
  frequency: number; // 빈도 1~5
  severity: number; // 강도 1~5
  measure: string;
};

export type assessmentType = {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  hazards: hazardType[];
};

export type riskLevelType = "low" | "mid" | "high";

/** 랜딩 업종 (slug는 주소 ?industry= 값) */
export type industryType = {
  slug: string;
  name: string;
  assessmentId: string;
};

/** 기기별 미리보기 (slug는 주소 /preview/[device] 값) */
export type deviceType = {
  slug: string;
  name: string;
  kind: "phone" | "pc";
  width: number;
  height: number;
};

/* ── 폼 입력 (11회차: Server Action 으로 제출, 검사는 service) ── */

export type loginFormType = {
  email: string;
  password: string;
};

export type signUpFormType = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  company: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
};

/** 새 평가 작성 — 유해·위험요인 카드 하나 (빈도·강도는 입력 그대로 문자열) */
export type hazardFormType = {
  step: string;
  hazard: string;
  frequency: string;
  severity: string;
  measure: string;
};

export type createAssessmentFormType = {
  title: string;
  category: string;
  author: string;
  date: string;
  hazards: hazardFormType[];
  agreeWorkers: boolean;
  agreeShare: boolean;
};

/** 검사 오류 하나 — field 는 입력칸 id (경고 상자 목록에서 그 칸으로 이동) */
export type formErrorType = {
  field: string;
  label: string;
  message: string;
};

/** useActionState 상태 — 실패 시 입력값(비밀번호 제외)과 오류를 돌려준다 */
export type formStateType<T> = {
  values: T;
  errors: formErrorType[];
  /** 제출할 때마다 1씩 늘려 폼 key 로 쓴다 (돌려받은 값으로 다시 채우기) */
  submitCount: number;
};
