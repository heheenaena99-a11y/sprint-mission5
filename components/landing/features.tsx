import Image from "next/image";

import { SectionHeading } from "@/components/landing/section-heading";

const features = [
  {
    icon: "/icons/calc.svg",
    title: "위험도 자동 계산",
    description: "빈도와 강도를 고르면 위험도가 바로 계산됩니다.",
  },
  {
    icon: "/icons/steps.svg",
    title: "단계별 작성",
    description: "법정 절차 순서대로 화면이 이어져 빠뜨릴 걱정이 없습니다.",
  },
  {
    icon: "/icons/color.svg",
    title: "등급별 색 표시",
    description: "낮음·보통·높음을 색으로 나눠 한눈에 구분합니다.",
  },
  {
    icon: "/icons/list.svg",
    title: "평가 목록 관리",
    description: "작업별 평가를 카드로 모아 보고 상세로 이동합니다.",
  },
  {
    icon: "/icons/shield.svg",
    title: "감소대책 정리",
    description: "위험요인마다 대책을 함께 적어 개선까지 이어집니다.",
  },
  {
    icon: "/icons/phone.svg",
    title: "모바일에서도 확인",
    description: "현장에서 휴대폰으로 평가 내용을 열어 볼 수 있습니다.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="flex scroll-mt-28 flex-col items-start gap-4 px-5 py-9 sm:gap-5 sm:px-9 sm:py-12 lg:scroll-mt-24 lg:items-center lg:gap-12 lg:px-[120px] lg:py-28"
    >
      <SectionHeading id="features-title" title="현장에서 바로 쓰는 기능" />

      <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
        {features.map((feature) => (
          <li
            key={feature.title}
            className="flex flex-col items-start gap-2 rounded-xl bg-row p-3.5 sm:p-4 lg:gap-4 lg:rounded-none lg:bg-transparent lg:p-0"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-tint-strong sm:size-9 lg:size-[52px] lg:rounded-xl">
              <Image
                src={feature.icon}
                alt={`${feature.title} 아이콘`}
                width={26}
                height={26}
                className="size-[18px] sm:size-5 lg:size-[26px]"
              />
            </span>
            <h3 className="text-sm leading-[1.3] font-bold sm:text-[15px] lg:text-[22px]">
              {feature.title}
            </h3>
            <p className="hidden leading-[1.6] text-muted-foreground lg:block">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
