import { SectionHeading } from "@/components/landing/section-heading";

const steps = [
  { title: "사전준비", description: "평가할 작업과 작성일을 정해요" },
  {
    title: "유해·위험요인 파악",
    description: "공종별로 다칠 수 있는 원인을 적어요",
  },
  {
    title: "위험성 결정",
    description: "빈도와 강도를 골라 위험도를 계산해요",
  },
  {
    title: "감소대책 수립",
    description: "등급이 높은 요인부터 대책을 세워요",
  },
  {
    title: "기록·공유",
    description: "평가표를 저장하고 목록에서 확인해요",
  },
];

/** 짙은 띠 — 작성 흐름 5단계 (접은 화면: 세로 목록, 펼친 화면: 3열, 데스크톱: 5열) */
export function Steps() {
  return (
    <section
      id="steps"
      aria-labelledby="steps-title"
      className="flex scroll-mt-28 flex-col items-start gap-3 bg-band px-5 py-9 sm:gap-5 sm:px-9 sm:py-12 lg:scroll-mt-24 lg:items-center lg:gap-12 lg:px-[120px] lg:py-28"
    >
      <SectionHeading
        id="steps-title"
        onDark
        title={
          <>
            법정 절차 5단계를
            <br className="sm:hidden lg:inline" /> 화면 순서 그대로
          </>
        }
        description="처음 쓰는 사람도 순서대로 따라가면 평가표가 완성됩니다."
      />

      <ol className="grid w-full gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[auto_1fr] items-center gap-x-3.5 gap-y-0.5 rounded-xl bg-white/[0.07] px-4 py-3.5 sm:flex sm:flex-col sm:items-start sm:gap-2 sm:p-4 lg:gap-3.5 lg:rounded-card lg:px-6 lg:py-7"
          >
            <span className="row-span-2 text-xl leading-[1.1] font-bold text-[#93b4f5] lg:text-[28px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] leading-[1.3] font-bold text-white lg:text-[19px] lg:leading-[1.35]">
              {step.title}
            </span>
            <span className="text-[13px] leading-[1.4] text-band-muted lg:text-[15px] lg:leading-[1.55]">
              {step.description}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
