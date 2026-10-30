import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { FormNotice } from "@/components/form-alert";
import { Stepper } from "@/components/stepper";
import { AppTabBar } from "@/components/app-tab-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "작성 완료 | 리스크노트",
  description: "위험성평가 작성을 마쳤어요. (데모 — 실제로 저장되지 않아요)",
};

/** 새 평가 작성 성공 화면 — 단계 1~5 모두 완료 */
export default function AssessmentCompletePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 justify-center px-5 pt-10 pb-20 md:pt-16 md:pb-[120px]">
        <div className="flex w-full max-w-[840px] flex-col items-start gap-6">
          <Stepper current={5} />
          <h1 className="text-[32px] leading-[1.25] font-bold md:text-[48px]">
            작성을 마쳤어요
          </h1>
          <FormNotice title="데모라 실제로 저장되지 않아요">
            입력한 평가는 목록에 추가되지 않습니다.
          </FormNotice>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/assessments" variant="outline">
              평가 목록
            </ButtonLink>
            <ButtonLink href="/assessments/new">새 평가</ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
      <AppTabBar active="new" />
    </>
  );
}
