import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import { getRiskLevel, riskLevelLabel } from "@/lib/service";
import type { riskLevelType } from "@/lib/types";

const levelClassName: Record<riskLevelType, string> = {
  low: "bg-risk-low-bg text-risk-low",
  mid: "bg-risk-mid-bg text-risk-mid",
  high: "bg-risk-high-bg text-risk-high",
};

type RiskBadgeProps = {
  /** 등급을 직접 주거나, 위험도 점수를 주면 등급을 계산한다 */
  level?: riskLevelType;
  score?: number;
  className?: string;
};

export function RiskBadge({ level, score, className }: RiskBadgeProps) {
  const resolved = level ?? getRiskLevel(score ?? 0);

  return (
    <Badge
      className={cn(
        "h-auto px-2.5 py-1 text-[13px] leading-none",
        levelClassName[resolved],
        className,
      )}
    >
      {riskLevelLabel[resolved]}
    </Badge>
  );
}
