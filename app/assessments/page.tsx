import type { Metadata } from "next";
import { cn } from "cn";

import { AssessmentCard } from "@/components/assessment-card";
import { ButtonLink } from "@/components/button-link";
import { Pill } from "@/components/pill";
import { AppTabBar } from "@/components/app-tab-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { filterAssessmentsByLevel, getAllAssessments } from "@/lib/repository";

export const metadata: Metadata = {
  title: "위험성평가 목록 | 리스크노트",
  description: "작성한 위험성평가를 위험등급과 함께 한곳에서 확인하세요.",
};

export default function AssessmentsPage() {
  const assessments = getAllAssessments();
  const filters = [
    { label: "전체", count: assessments.length },
    { label: "높음", count: filterAssessmentsByLevel("high").length },
    { label: "보통", count: filterAssessmentsByLevel("mid").length },
    { label: "낮음", count: filterAssessmentsByLevel("low").length },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col gap-4 bg-canvas px-5 pt-5 pb-6 sm:gap-5 sm:px-9 sm:pt-7 sm:pb-7 lg:gap-8 lg:bg-white lg:px-[120px] lg:pt-[72px] lg:pb-[120px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <h1 className="text-2xl leading-[1.3] font-bold sm:text-[28px] lg:text-[48px] lg:leading-[1.25]">
              위험성평가 목록
            </h1>
            <p className="text-sm text-muted-foreground lg:text-[17px]">
              작성한 평가 {assessments.length}건
              <span className="hidden sm:inline">
                {" "}
                · 위험도가 높은 작업부터 확인하세요.
              </span>
            </p>
          </div>
          {/* 앱 화면에서는 탭 바의 "새 평가"를 쓰므로 숨김 */}
          <ButtonLink href="/assessments/new" className="hidden lg:inline-flex">
            새 평가 작성
          </ButtonLink>
        </div>

        {/* 등급 필터는 모양만 (AGENTS.md "인터랙션") */}
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:flex-wrap lg:gap-2.5">
          {filters.map((filter, index) => (
            <Pill
              key={filter.label}
              selected={index === 0}
              className={cn(
                "shrink-0 px-3.5 py-[7px] text-[13px] leading-[1.2] font-bold lg:px-[18px] lg:py-2 lg:text-sm lg:leading-[1.5] lg:font-medium",
                // 앱 화면: 선택 안 된 알약은 흰 배경 + 옅은 테두리
                index !== 0 && "max-lg:border-[#c9d1de] max-lg:bg-white",
              )}
            >
              {filter.label} {filter.count}
            </Pill>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 lg:gap-6">
          {assessments.map((assessment) => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))}
        </div>
      </main>
      <SiteFooter />
      <AppTabBar active="assessments" />
    </>
  );
}
