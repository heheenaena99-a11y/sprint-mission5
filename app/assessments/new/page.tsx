import type { Metadata } from "next";
import { Suspense } from "react";

import { BackLink } from "@/components/back-link";
import { CreateAssessmentForm } from "@/components/forms/create-assessment-form";
import { Stepper } from "@/components/stepper";
import { AppTabBar } from "@/components/app-tab-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "새 위험성평가 작성 | 리스크노트",
  description:
    "법정 절차 순서대로 작업 정보와 유해·위험요인을 입력해 위험성평가를 작성하세요.",
};

/** 유해·위험요인 카드 개수 범위 */
const minHazards = 1;
const maxHazards = 5;

/** ?hazards= 값을 1~5 정수로 맞춘다 (숫자가 아니면 1) */
function toHazardCount(value: string | string[] | undefined): number {
  const n = Number.parseInt(typeof value === "string" ? value : "", 10);
  if (Number.isNaN(n)) return minHazards;
  return Math.min(maxHazards, Math.max(minHazards, n));
}

export default function NewAssessmentPage({
  searchParams,
}: PageProps<"/assessments/new">) {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 justify-center px-5 pt-10 pb-20 md:pt-16 md:pb-[120px]">
        <div className="flex w-full max-w-[840px] flex-col items-start gap-6">
          <BackLink />
          <h1 className="text-[32px] leading-[1.25] font-bold md:text-[48px]">
            새 위험성평가 작성
          </h1>
          <p className="text-base text-muted-foreground md:text-[17px]">
            법정 절차 순서대로 작업 정보와 유해·위험요인을 입력하세요.
          </p>

          <Stepper current={2} />

          {/* searchParams 는 요청마다 달라서 Suspense 안에서 읽는다 (cacheComponents) */}
          <Suspense fallback={<CreateAssessmentForm count={minHazards} />}>
            <FormFromParams searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
      <AppTabBar active="new" />
    </>
  );
}

async function FormFromParams({
  searchParams,
}: Pick<PageProps<"/assessments/new">, "searchParams">) {
  const { hazards } = await searchParams;
  const count = toHazardCount(hazards);
  // 카드 개수가 바뀌면 폼 상태(이전 오류)도 새로 시작
  return <CreateAssessmentForm key={count} count={count} />;
}
