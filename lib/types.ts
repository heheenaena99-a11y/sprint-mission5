// 리스크노트 타입 모음

/** 저장용 사용자 (비밀번호 포함) */
export type userDataType = {
  name: string;
  email: string;
  password: string;
};

/** 화면용 사용자 (비밀번호 제외) */
export type userClientType = Omit<userDataType, "password">;

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
