import type { Metadata } from "next";

import { BackLink } from "@/components/back-link";
import { ButtonLink } from "@/components/button-link";
import { CheckField } from "@/components/check-field";
import { FormCard } from "@/components/form-card";
import { FormField } from "@/components/form-field";
import { RiskBadge } from "@/components/risk-badge";
import { AppTabBar } from "@/components/app-tab-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "새 위험성평가 작성 | 리스크노트",
  description:
    "법정 절차 순서대로 작업 정보와 유해·위험요인을 입력해 위험성평가를 작성하세요.",
};

const steps = ["사전준비", "요인 파악", "위험성 결정", "감소대책", "기록"];
const currentStep = 2;

export default function NewAssessmentPage() {
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

          <ol
            aria-label="작성 단계"
            className="flex flex-wrap items-center gap-2"
          >
            {steps.map((step, index) => {
              const done = index + 1 <= currentStep;
              return (
                <li key={step} className="flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden className="h-px w-6 bg-border" />
                  )}
                  <span className="flex items-center gap-1.5">
                    <span
                      className={
                        done
                          ? "flex size-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-white"
                          : "flex size-6 items-center justify-center rounded-full bg-border text-xs font-bold text-muted-foreground"
                      }
                    >
                      {index + 1}
                    </span>
                    <span
                      className={
                        done
                          ? "text-sm font-bold"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {step}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>

          {/* 저장 기능 없음 — 모양만 (AGENTS.md "인터랙션") */}
          <FormCard title="1. 작업 정보">
            <FormField
              id="title"
              label="작업명"
              placeholder="예: 사다리 이용 조명 교체"
            />
            <div className="flex w-full flex-col gap-4 sm:flex-row">
              <FormField
                id="category"
                label="작업구분"
                placeholder="예: 시설 유지보수"
              />
              <FormField id="date" label="작성일" placeholder="2026-10-30" />
            </div>
          </FormCard>

          <FormCard title="2. 유해·위험요인 1">
            <FormField id="step" label="공종" placeholder="예: 사다리 오르기" />
            <FormField
              id="hazard"
              label="유해·위험요인"
              placeholder="예: 발을 헛디뎌 떨어짐"
            />
            <div className="flex w-full flex-col gap-4 sm:flex-row">
              <FormField
                id="frequency"
                label="빈도 (1~5)"
                placeholder="4"
                type="number"
              />
              <FormField
                id="severity"
                label="강도 (1~5)"
                placeholder="4"
                type="number"
              />
            </div>
            <div className="flex w-full items-center gap-2.5 rounded-xl bg-tint-strong px-[18px] py-3.5">
              <p className="font-bold">위험도 = 4 × 4 = 16</p>
              <RiskBadge score={16} />
            </div>
            <FormField
              id="measure"
              label="감소대책"
              placeholder="예: 3점 지지, 안전모 착용"
              multiline
            />
          </FormCard>

          {/* 위험요인 추가는 모양만 */}
          <span className="inline-flex items-center rounded-button border border-primary px-4 py-3 text-[15px] font-bold text-primary">
            + 유해·위험요인 추가
          </span>

          <FormCard title="3. 확인">
            <CheckField
              id="agree-workers"
              label="작업자 의견을 듣고 작성했습니다"
            />
            <CheckField
              id="agree-share"
              label="평가 결과를 작업자에게 공유하겠습니다"
            />
          </FormCard>

          <div className="flex w-full justify-end gap-3">
            <ButtonLink href="/assessments" variant="outline">
              취소
            </ButtonLink>
            <ButtonLink href="/assessments">작성 완료</ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
      <AppTabBar active="new" />
    </>
  );
}
