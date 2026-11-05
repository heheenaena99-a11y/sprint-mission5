import { ButtonLink } from "@/components/button-link";

/** 짙은 띠 — 마지막 행동 유도 (펼친 화면: 글과 버튼 한 줄) */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="flex flex-col items-center gap-4 bg-band px-5 py-9 sm:flex-row sm:justify-between sm:px-9 sm:py-11 lg:flex-col lg:justify-center lg:gap-7 lg:px-[120px] lg:py-[104px]"
    >
      <h2
        id="final-cta-title"
        className="text-center text-[22px] leading-[1.3] font-bold text-white sm:text-left sm:text-2xl lg:text-center lg:text-[48px] lg:leading-[1.25]"
      >
        지금 첫 위험성평가를
        <br className="sm:hidden lg:inline" /> 작성해 보세요
      </h2>
      <div className="flex w-full flex-wrap justify-center gap-3 sm:w-auto">
        <ButtonLink
          href="/assessments/new"
          variant="white"
          size="lg"
          className="w-full rounded-md py-3.5 sm:w-auto sm:px-6 lg:rounded-button lg:px-10 lg:pt-[19px] lg:pb-5"
        >
          위험성평가 시작하기
        </ButtonLink>
        {/* 앱 화면에서는 숨김 */}
        <ButtonLink
          href="/assessments/1"
          variant="white-outline"
          size="lg"
          className="hidden lg:inline-flex"
        >
          작성 예시 보기
        </ButtonLink>
      </div>
    </section>
  );
}
