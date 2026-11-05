import Link from "next/link";

import { RiskBadge } from "@/components/risk-badge";
import { getMaxRiskScore } from "@/lib/service";
import type { assessmentType } from "@/lib/types";

export function AssessmentCard({ assessment }: { assessment: assessmentType }) {
  const maxScore = getMaxRiskScore(assessment);

  return (
    <Link
      href={`/assessments/${assessment.id}`}
      className="flex flex-col gap-2 rounded-[14px] border border-border bg-white p-4 transition-shadow sm:p-[18px] lg:gap-3 lg:rounded-card lg:p-7 hover:shadow-[0_8px_32px_0_rgba(11,31,58,0.08)]"
    >
      <p className="text-xs leading-[1.5] font-bold text-link lg:text-sm">
        {assessment.category}
      </p>
      <h2 className="text-lg leading-[1.3] font-bold sm:text-[19px] lg:text-2xl">
        {assessment.title}
      </h2>
      <p className="text-xs leading-[1.5] text-muted-foreground lg:text-sm">
        작성일 {assessment.date} · 공종 {assessment.hazards.length}개
      </p>
      <hr className="hidden border-border lg:block" />
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground lg:text-sm">
            최고 위험도
          </span>
          <span className="text-[17px] leading-[1.2] font-bold lg:text-xl">
            {maxScore}
          </span>
          <RiskBadge score={maxScore} />
        </span>
        <span className="text-[13px] font-bold whitespace-nowrap text-link lg:text-[15px]">
          자세히 →
        </span>
      </div>
    </Link>
  );
}
