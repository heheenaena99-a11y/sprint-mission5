import Link from "next/link";

import { SectionHeading } from "@/components/landing/section-heading";

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "위험성평가는 누가 해야 하나요?",
    answer:
      "사업주가 실시하고, 관리감독자와 근로자가 함께 참여합니다. 리스크노트는 그 작성 과정을 돕는 도구예요.",
  },
  {
    question: "빈도와 강도는 어떻게 정하나요?",
    answer:
      "빈도는 사고가 얼마나 자주 일어날 수 있는지, 강도는 다쳤을 때 얼마나 심각한지를 1~5점으로 고릅니다. 두 점수를 곱한 값이 위험도예요.",
  },
  {
    question: "작성한 평가는 어디서 다시 볼 수 있나요?",
    answer: (
      <>
        <Link
          href="/assessments"
          className="font-bold text-link hover:underline"
        >
          평가 목록
        </Link>
        에서 카드로 모아 볼 수 있고, 카드를 누르면 공종별 위험요인과 감소대책을
        확인할 수 있어요.
      </>
    ),
  },
  {
    question: "리스크노트는 실제 서비스인가요?",
    answer:
      "아니요. 스프린트 미션5 과제로 만든 가상 서비스이며, 화면 속 평가와 체험 계정은 예시 데이터이고, 가입한 계정은 이 브라우저에만 저장돼요.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="flex scroll-mt-28 flex-col items-start bg-tint px-5 py-9 sm:px-9 sm:py-12 lg:scroll-mt-24 lg:items-center lg:gap-12 lg:px-[120px] lg:py-28"
    >
      <SectionHeading id="faq-title" title="자주 묻는 질문" />

      {/* 답변은 항상 펼친 상태 (열고 닫기 없음) */}
      <dl className="w-full">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="flex flex-col gap-1.5 border-b border-[#d6e0f0] py-4 lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-6 lg:gap-y-3 lg:py-7"
          >
            <dt className="lg:col-span-2 lg:grid lg:grid-cols-subgrid lg:items-center">
              {/* 번호는 데스크톱에서만 */}
              <span className="hidden text-muted-foreground lg:inline">
                {String(index + 1).padStart(2, "0")}/
              </span>
              <span className="text-[15px] leading-[1.4] font-bold lg:text-xl lg:leading-[1.5]">
                {faq.question}
              </span>
            </dt>
            <dd className="text-sm leading-[1.55] text-muted-foreground lg:col-start-2 lg:text-base lg:leading-[1.6]">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
