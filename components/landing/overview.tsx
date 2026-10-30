import Link from "next/link";
import { Suspense } from "react";

import { Pill } from "@/components/pill";
import { RiskBadge } from "@/components/risk-badge";
import { SectionHeading } from "@/components/landing/section-heading";
import {
  findAssessmentById,
  findIndustryBySlug,
  getIndustries,
} from "@/lib/repository";
import { getRiskScore } from "@/lib/service";

const defaultIndustrySlug = "logistics";

type OverviewProps = {
  searchParams: PageProps<"/">["searchParams"];
};

export function Overview({ searchParams }: OverviewProps) {
  return (
    <section
      id="overview"
      aria-labelledby="overview-title"
      className="flex scroll-mt-28 flex-col items-start gap-4 px-5 py-8 sm:gap-5 sm:px-9 sm:py-12 lg:scroll-mt-24 lg:items-center lg:gap-12 lg:px-[120px] lg:py-28"
    >
      <SectionHeading
        id="overview-title"
        title="업종별 예시로 미리 보세요"
        description="버튼을 누르면 그 업종의 평가표 예시로 바뀝니다."
      />

      {/* searchParams는 요청마다 달라서 Suspense 안에서 읽는다 (cacheComponents) */}
      <Suspense fallback={<IndustryExample slug={defaultIndustrySlug} />}>
        <IndustryExampleFromParams searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function IndustryExampleFromParams({ searchParams }: OverviewProps) {
  const { industry } = await searchParams;
  const slug = typeof industry === "string" ? industry : defaultIndustrySlug;

  return <IndustryExample slug={slug} />;
}

/** 업종 알약 + 선택된 업종의 예시 평가 카드 */
function IndustryExample({ slug }: { slug: string }) {
  const selected =
    findIndustryBySlug(slug) ?? findIndustryBySlug(defaultIndustrySlug);
  const example = selected && findAssessmentById(selected.assessmentId);

  if (!selected || !example) return null;

  const firstStep = example.hazards[0].step;
  const lastStep = example.hazards[example.hazards.length - 1].step;

  return (
    <>
      <nav
        aria-label="업종 선택"
        className="-mx-5 flex w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 sm:mx-0 sm:w-full sm:px-0 lg:w-auto lg:flex-wrap lg:justify-center lg:gap-2.5 lg:overflow-visible"
      >
        {getIndustries().map((industry) => (
          <Pill
            key={industry.slug}
            href={`/?industry=${industry.slug}#overview`}
            selected={industry.slug === selected.slug}
            tone="brand"
            className="shrink-0 px-3.5 py-2 text-[13px] leading-[1.2] sm:px-4 sm:py-[9px] sm:text-sm lg:px-5 lg:py-2.5 lg:text-[15px] lg:leading-[1.5]"
          >
            {industry.name}
          </Pill>
        ))}
      </nav>

      <div className="flex w-full flex-col gap-2.5 rounded-[14px] border border-border bg-white p-[18px] sm:flex-row sm:items-center sm:gap-6 sm:p-6 lg:gap-10 lg:rounded-card lg:p-12">
        <div className="contents flex-1 flex-col gap-2.5 sm:flex sm:min-w-0 lg:gap-4">
          <p className="text-[13px] leading-[1.5] font-bold text-link lg:text-[15px]">
            {selected.name}
          </p>
          <h3 className="text-lg leading-[1.35] font-bold sm:text-[22px] sm:leading-[1.3] lg:text-[36px]">
            {example.title},
            <br className="hidden sm:inline" /> 이렇게 평가해요
          </h3>
          <p className="hidden text-sm leading-[1.55] text-muted-foreground sm:block lg:text-[17px] lg:leading-[1.6]">
            {firstStep}부터 {lastStep}까지 공종을 나누고, 공종마다 다칠 수 있는
            원인과 빈도·강도를 적으면 가장 위험한 단계가 바로 보입니다.
          </p>
          <Link
            href={`/assessments/${example.id}`}
            className="order-last text-sm font-bold text-link hover:underline sm:order-none lg:text-base"
          >
            평가 상세 보기 →
          </Link>
        </div>

        <ul className="flex w-full flex-col gap-2.5 sm:w-[400px] sm:shrink-0 sm:gap-2 lg:w-[500px] lg:gap-2.5">
          {example.hazards.map((h) => {
            const score = getRiskScore(h.frequency, h.severity);
            return (
              <li
                key={h.order}
                className="flex items-center gap-2 rounded-lg bg-row px-3 py-2.5 sm:px-3.5 sm:py-[11px] lg:gap-3 lg:rounded-xl lg:px-5 lg:py-4"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-[1.3]">
                  <p className="text-sm font-bold lg:text-[15px]">
                    {h.order}&nbsp;&nbsp;{h.step}
                  </p>
                  <p className="text-xs text-muted-foreground lg:text-sm">
                    {h.hazard}
                  </p>
                </div>
                <span className="text-base leading-[1.2] font-bold lg:text-xl">
                  {score}
                </span>
                <RiskBadge score={score} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
