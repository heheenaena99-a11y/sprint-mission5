import { HelpBanner } from "@/components/landing/help-banner";
import { SectionHeading } from "@/components/landing/section-heading";
import { RiskBadge } from "@/components/risk-badge";
import type { riskLevelType } from "@/lib/types";

const grades: {
  level: riskLevelType;
  range: string;
  summary: string;
  actions: string[];
}[] = [
  {
    level: "low",
    range: "1 ~ 8",
    summary: "낮음 · 현재 수준 유지",
    actions: [
      "현재 관리 상태 유지",
      "정기 평가 때 다시 확인",
      "근로자에게 결과 공유",
    ],
  },
  {
    level: "mid",
    range: "9 ~ 15",
    summary: "보통 · 개선 계획 수립",
    actions: ["개선 계획 세우기", "보호구·작업 방법 보완", "개선 후 다시 평가"],
  },
  {
    level: "high",
    range: "16 ~ 25",
    summary: "높음 · 즉시 개선",
    actions: [
      "작업 전 바로 개선",
      "개선 전 작업 중지 검토",
      "관리자 확인 후 재개",
    ],
  },
];

export function RiskGrades() {
  return (
    <section
      id="risk-grades"
      aria-labelledby="risk-grades-title"
      className="flex scroll-mt-28 flex-col items-start gap-3 bg-tint px-5 py-9 sm:gap-5 sm:px-9 sm:py-12 lg:scroll-mt-24 lg:items-center lg:gap-12 lg:px-[120px] lg:py-28"
    >
      <SectionHeading
        id="risk-grades-title"
        title="위험도에 맞는 대응 찾기"
        description="위험도 = 빈도(1~5) × 강도(1~5). 점수에 따라 등급과 할 일이 정해집니다."
        appDescription="위험도 = 빈도(1~5) × 강도(1~5)"
      />

      <div className="grid w-full gap-3 sm:grid-cols-3 lg:gap-6">
        {grades.map((grade) => (
          <div
            key={grade.level}
            className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 sm:flex-col sm:items-start sm:gap-2 sm:p-[18px] lg:gap-4 lg:rounded-card lg:p-8"
          >
            <RiskBadge level={grade.level} />
            <p className="text-[22px] leading-[1.2] font-bold whitespace-nowrap sm:text-[26px] lg:text-[44px]">
              {grade.range}
            </p>
            {/* 앱: 짧은 설명 / 데스크톱: 등급 · 설명 + 할 일 목록 */}
            <p className="flex-1 text-right text-sm leading-[1.5] font-medium text-muted-foreground sm:text-left lg:hidden">
              {grade.summary.split(" · ")[1]}
            </p>
            <p className="hidden font-bold text-muted-foreground lg:block">
              {grade.summary}
            </p>
            <hr className="hidden w-full border-border lg:block" />
            <ul className="hidden flex-col gap-4 text-[15px] lg:flex">
              {grade.actions.map((action) => (
                <li key={action} className="flex items-center gap-2.5">
                  <span aria-hidden className="font-bold text-link">
                    ✓
                  </span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 도움 배너는 데스크톱에서만 */}
      <div className="hidden w-full lg:block">
        <HelpBanner />
      </div>
    </section>
  );
}
