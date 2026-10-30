// 리스크노트 가짜 데이터 — 실제 저장·로그인 기능 없음 (AGENTS.md "데이터")
// 타입은 lib/types.ts, 찾기는 lib/repository.ts, 계산은 lib/service.ts

import type {
  assessmentType,
  deviceType,
  industryType,
  userDataType,
} from "@/lib/types";

/** 공개용 체험 비밀번호 (가짜) — 로그인 화면 안내와 users[0]이 함께 사용 */
export const demoPassword = "1234";

export const users: userDataType[] = [
  { name: "김민지", email: "a@a.com", password: demoPassword },
  { name: "박문수", email: "s@s.com", password: "5678" },
];

export const assessments: assessmentType[] = [
  {
    id: "1",
    title: "사다리 이용 조명 교체",
    category: "시설 유지보수",
    date: "2026-10-20",
    author: "김민지",
    hazards: [
      {
        order: 1,
        step: "사다리 설치",
        hazard: "바닥 미끄러짐으로 사다리 넘어짐",
        frequency: 3,
        severity: 4,
        measure: "미끄럼 방지 받침 사용, 2인 1조 작업",
      },
      {
        order: 2,
        step: "사다리 오르기",
        hazard: "발을 헛디뎌 떨어짐",
        frequency: 4,
        severity: 4,
        measure: "3점 지지, 안전모 착용",
      },
      {
        order: 3,
        step: "조명 교체",
        hazard: "전원 미차단으로 감전",
        frequency: 2,
        severity: 5,
        measure: "작업 전 전원 차단·확인",
      },
    ],
  },
  {
    id: "2",
    title: "지게차 자재 하역",
    category: "운반·하역",
    date: "2026-10-22",
    author: "박문수",
    hazards: [
      {
        order: 1,
        step: "자재 적재",
        hazard: "쌓은 화물이 떨어져 맞음",
        frequency: 3,
        severity: 5,
        measure: "적재 높이 제한, 결속 상태 확인",
      },
      {
        order: 2,
        step: "지게차 운행",
        hazard: "보행자와 부딪힘",
        frequency: 4,
        severity: 5,
        measure: "보행 통로 분리, 유도자 배치",
      },
      {
        order: 3,
        step: "하역 작업",
        hazard: "경사로에서 지게차 넘어짐",
        frequency: 2,
        severity: 5,
        measure: "경사로 적재 운행 금지, 정격 하중 준수",
      },
    ],
  },
  {
    id: "3",
    title: "배전반 정기 점검",
    category: "전기설비",
    date: "2026-10-27",
    author: "김민지",
    hazards: [
      {
        order: 1,
        step: "차단기 개방",
        hazard: "전원 차단 확인 누락으로 감전",
        frequency: 2,
        severity: 5,
        measure: "검전기로 무전압 확인",
      },
      {
        order: 2,
        step: "내부 점검",
        hazard: "충전부에 닿아 감전",
        frequency: 3,
        severity: 4,
        measure: "절연 장갑 착용, 잠금·표지 부착",
      },
      {
        order: 3,
        step: "커버 닫기",
        hazard: "문틈에 손가락 끼임",
        frequency: 2,
        severity: 2,
        measure: "손잡이 사용, 천천히 닫기",
      },
    ],
  },
  {
    id: "4",
    title: "창고 선반 정리",
    category: "일반 작업",
    date: "2026-10-29",
    author: "박문수",
    hazards: [
      {
        order: 1,
        step: "물건 내리기",
        hazard: "선반 위 물건이 떨어져 맞음",
        frequency: 2,
        severity: 3,
        measure: "무거운 물건은 아래 칸 보관",
      },
      {
        order: 2,
        step: "상자 옮기기",
        hazard: "무리한 자세로 허리 부담",
        frequency: 3,
        severity: 2,
        measure: "대차 사용, 무릎 굽혀 들기",
      },
      {
        order: 3,
        step: "바닥 정리",
        hazard: "바닥 물건에 걸려 넘어짐",
        frequency: 2,
        severity: 2,
        measure: "통로에 물건 두지 않기",
      },
    ],
  },
  {
    id: "5",
    title: "프레스 금형 교체",
    category: "제조 공장",
    date: "2026-10-24",
    author: "박문수",
    hazards: [
      {
        order: 1,
        step: "금형 운반",
        hazard: "금형이 떨어져 발을 다침",
        frequency: 3,
        severity: 4,
        measure: "운반 대차 사용, 안전화 착용",
      },
      {
        order: 2,
        step: "금형 장착",
        hazard: "프레스 오작동으로 손 끼임",
        frequency: 3,
        severity: 5,
        measure: "전원 차단 후 잠금·표지, 안전블록 설치",
      },
      {
        order: 3,
        step: "시운전",
        hazard: "방호장치 미작동으로 끼임",
        frequency: 2,
        severity: 5,
        measure: "작업 전 방호장치 작동 확인",
      },
    ],
  },
  {
    id: "6",
    title: "튀김 조리",
    category: "음식점 주방",
    date: "2026-10-25",
    author: "김민지",
    hazards: [
      {
        order: 1,
        step: "기름 교체",
        hazard: "뜨거운 기름에 화상",
        frequency: 3,
        severity: 4,
        measure: "기름을 식힌 뒤 교체, 내열 장갑 착용",
      },
      {
        order: 2,
        step: "튀김 조리",
        hazard: "기름이 튀어 화상",
        frequency: 4,
        severity: 3,
        measure: "재료 물기 제거, 앞치마 착용",
      },
      {
        order: 3,
        step: "바닥 청소",
        hazard: "기름 묻은 바닥에 미끄러짐",
        frequency: 4,
        severity: 3,
        measure: "미끄럼 방지 신발, 바로 닦기",
      },
    ],
  },
  {
    id: "7",
    title: "비계 위 외벽 도장",
    category: "소규모 건설",
    date: "2026-10-28",
    author: "박문수",
    hazards: [
      {
        order: 1,
        step: "비계 설치",
        hazard: "부재가 떨어져 맞음",
        frequency: 3,
        severity: 4,
        measure: "아래쪽 출입 통제, 안전모 착용",
      },
      {
        order: 2,
        step: "비계 위 도장",
        hazard: "비계에서 떨어짐",
        frequency: 4,
        severity: 5,
        measure: "안전난간 설치, 안전대 착용",
      },
      {
        order: 3,
        step: "자재 올리기",
        hazard: "무리한 자세로 허리 부담",
        frequency: 3,
        severity: 2,
        measure: "도르래 사용, 2인 1조",
      },
    ],
  },
];

/** 랜딩 업종 알약 ↔ 예시 평가 연결표 (/?industry=slug) */
export const industries: industryType[] = [
  { slug: "logistics", name: "물류 창고", assessmentId: "2" },
  { slug: "manufacturing", name: "제조 공장", assessmentId: "5" },
  { slug: "facility", name: "시설 관리", assessmentId: "1" },
  { slug: "kitchen", name: "음식점 주방", assessmentId: "6" },
  { slug: "construction", name: "소규모 건설", assessmentId: "7" },
];

/** 기기별 미리보기 기기 목록 (/preview, /preview/[device]) */
export const devices: deviceType[] = [
  {
    slug: "fold-folded",
    name: "갤럭시 Z 폴드8 접은 화면",
    kind: "phone",
    width: 475,
    height: 605,
  },
  {
    slug: "fold-unfolded",
    name: "갤럭시 Z 폴드8 펼친 화면",
    kind: "phone",
    width: 932,
    height: 560,
  },
  { slug: "pc", name: "PC", kind: "pc", width: 1440, height: 900 },
];
