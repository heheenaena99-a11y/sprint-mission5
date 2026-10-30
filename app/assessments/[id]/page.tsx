import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/back-link";
import { ButtonLink } from "@/components/button-link";
import { HazardTable } from "@/components/hazard-table";
import { RiskBadge } from "@/components/risk-badge";
import { AppTabBar } from "@/components/app-tab-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatCard } from "@/components/stat-card";
import { findAssessmentById, getAllAssessments } from "@/lib/repository";
import { getMaxRiskScore, getRiskDistribution } from "@/lib/service";

export function generateStaticParams() {
  return getAllAssessments().map((assessment) => ({ id: assessment.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/assessments/[id]">): Promise<Metadata> {
  const { id } = await params;
  const assessment = findAssessmentById(id);

  if (!assessment) {
    return { title: "평가를 찾을 수 없음 | 리스크노트" };
  }

  return {
    title: `${assessment.title} | 리스크노트`,
    description: `${assessment.category} · ${assessment.date} 작성 · 공종 ${assessment.hazards.length}개의 위험성평가 상세`,
  };
}

export default async function AssessmentDetailPage({
  params,
}: PageProps<"/assessments/[id]">) {
  const { id } = await params;
  const assessment = findAssessmentById(id);

  if (!assessment) notFound();

  const maxScore = getMaxRiskScore(assessment);
  const distribution = getRiskDistribution(assessment);

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-start gap-7 px-5 pt-10 pb-20 md:px-[120px] md:pt-14 md:pb-[120px]">
        <BackLink />

        <div className="flex flex-col gap-2.5">
          <p className="text-[15px] font-bold text-link">
            {assessment.category}
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <h1 className="text-[32px] leading-[1.25] font-bold md:text-[48px]">
              {assessment.title}
            </h1>
            <RiskBadge score={maxScore} />
          </div>
          <p className="text-muted-foreground">
            작성일 {assessment.date} · 작성자 {assessment.author}
          </p>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-3">
          <StatCard label="공종 수">{assessment.hazards.length}개</StatCard>
          <StatCard label="최고 위험도">
            {maxScore}
            <RiskBadge score={maxScore} />
          </StatCard>
          <StatCard label="등급 분포">{distribution}</StatCard>
        </div>

        <div className="w-full">
          <HazardTable hazards={assessment.hazards} />
        </div>

        <p className="text-sm text-muted-foreground">
          위험도 = 빈도 × 강도 · 1~8 낮음 / 9~15 보통 / 16~25 높음
        </p>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/assessments" variant="outline">
            목록으로
          </ButtonLink>
          <ButtonLink href="/assessments/new">새 평가 작성</ButtonLink>
        </div>
      </main>
      <SiteFooter />
      <AppTabBar active="assessments" />
    </>
  );
}
