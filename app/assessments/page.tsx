import type { Metadata } from "next";
import { Suspense } from "react";
import { cn } from "cn";

import { AssessmentCard } from "@/components/assessment-card";
import { ButtonLink } from "@/components/button-link";
import { FormNotice } from "@/components/form-alert";
import { Pill } from "@/components/pill";
import { AppTabBar } from "@/components/app-tab-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { filterAssessmentsByLevel, getAllAssessments } from "@/lib/repository";
import { riskLevelLabel } from "@/lib/service";
import type { riskLevelType } from "@/lib/types";

export const metadata: Metadata = {
  title: "위험성평가 목록 | 리스크노트",
  description: "작성한 위험성평가를 위험등급과 함께 한곳에서 확인하세요.",
};

type ListProps = {
  searchParams: PageProps<"/assessments">["searchParams"];
};

const levels: riskLevelType[] = ["high", "mid", "low"];

/** ?level= 값이 low·mid·high 가 아니면 전체(null) */
function toLevel(value: string | string[] | undefined): riskLevelType | null {
  return levels.find((level) => level === value) ?? null;
}

export default function AssessmentsPage({
  searchParams,
}: PageProps<"/assessments">) {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col gap-4 bg-canvas px-5 pt-5 pb-6 sm:gap-5 sm:px-9 sm:pt-7 sm:pb-7 lg:gap-8 lg:bg-white lg:px-[120px] lg:pt-[72px] lg:pb-[120px]">
        {/* searchParams 는 요청마다 달라서 Suspense 안에서 읽는다 (cacheComponents) */}
        <Suspense fallback={<AssessmentList level={null} welcome={false} />}>
          <AssessmentListFromParams searchParams={searchParams} />
        </Suspense>
      </main>
      <SiteFooter />
      <AppTabBar active="assessments" />
    </>
  );
}

async function AssessmentListFromParams({ searchParams }: ListProps) {
  const { level, welcome } = await searchParams;
  return <AssessmentList level={toLevel(level)} welcome={welcome === "1"} />;
}

/** 제목·등급 필터 알약·카드 목록 — level 이 null 이면 전체, welcome 이면 로그인 안내 */
function AssessmentList({
  level,
  welcome,
}: {
  level: riskLevelType | null;
  welcome: boolean;
}) {
  const all = getAllAssessments();
  const shown = level ? filterAssessmentsByLevel(level) : all;

  // 알약 숫자는 거르기 전 전체 기준
  const filters = [
    { key: null, label: "전체", href: "/assessments", count: all.length },
    ...levels.map((key) => ({
      key,
      label: riskLevelLabel[key],
      href: `/assessments?level=${key}`,
      count: filterAssessmentsByLevel(key).length,
    })),
  ];

  return (
    <>
      {welcome && (
        <FormNotice title="로그인했어요(데모)">
          세션·쿠키는 저장하지 않아요. 새로고침하거나 다른 페이지로 가면 로그인
          상태가 유지되지 않습니다.
        </FormNotice>
      )}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <h1 className="text-2xl leading-[1.3] font-bold sm:text-[28px] lg:text-[48px] lg:leading-[1.25]">
            위험성평가 목록
          </h1>
          <p className="text-sm text-muted-foreground lg:text-[17px]">
            {level ? (
              <>
                {riskLevelLabel[level]} 평가 {shown.length}건
              </>
            ) : (
              <>
                작성한 평가 {shown.length}건
                <span className="hidden sm:inline">
                  {" "}
                  · 위험도가 높은 작업부터 확인하세요.
                </span>
              </>
            )}
          </p>
        </div>
        {/* 앱 화면에서는 탭 바의 "새 평가"를 쓰므로 숨김 */}
        <ButtonLink href="/assessments/new" className="hidden lg:inline-flex">
          새 평가 작성
        </ButtonLink>
      </div>

      <nav
        aria-label="위험등급 필터"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:flex-wrap lg:gap-2.5"
      >
        {filters.map((filter) => {
          const selected = filter.key === level;
          return (
            <Pill
              key={filter.label}
              href={filter.href}
              selected={selected}
              current="page"
              className={cn(
                "shrink-0 px-3.5 py-[7px] text-[13px] leading-[1.2] font-bold lg:px-[18px] lg:py-2 lg:text-sm lg:leading-[1.5] lg:font-medium",
                // 앱 화면: 선택 안 된 알약은 흰 배경 + 옅은 테두리
                !selected && "max-lg:border-[#c9d1de] max-lg:bg-white",
              )}
            >
              {filter.label} {filter.count}
            </Pill>
          );
        })}
      </nav>

      {shown.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 lg:gap-6">
          {shown.map((assessment) => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          해당 등급의 평가가 없어요.
        </p>
      )}
    </>
  );
}
