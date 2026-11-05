import { filterAssessmentsByLevel, getAllAssessments } from "@/lib/repository";
import { countHazards } from "@/lib/service";

/** 짙은 띠 — 예시 데이터로 계산한 숫자 */
export function Stats() {
  const assessments = getAllAssessments();
  const stats = [
    {
      value: `${assessments.length}건`,
      label: "작성된 위험성평가",
      shortLabel: "평가",
    },
    {
      value: `${countHazards(assessments)}개`,
      label: "파악한 유해·위험요인",
      shortLabel: "위험요인",
    },
    {
      value: `${filterAssessmentsByLevel("high").length}건`,
      label: "즉시 개선이 필요한 높음 등급",
      shortLabel: "높음 등급",
    },
  ];

  return (
    <section
      aria-labelledby="stats-title"
      className="flex flex-col items-center gap-4 bg-band px-5 py-8 sm:gap-5 sm:px-9 sm:py-10 lg:gap-12 lg:px-[120px] lg:py-24"
    >
      <h2
        id="stats-title"
        className="text-center text-lg leading-[1.3] font-bold text-white sm:text-[22px] lg:text-[48px] lg:leading-[1.25]"
      >
        숫자로 보는 예시 데이터
      </h2>

      <dl className="grid w-full grid-cols-3 gap-2 text-center sm:gap-3 lg:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 lg:gap-2"
          >
            <dt className="order-2 text-xs leading-[1.4] text-band-muted sm:text-[13px] lg:text-[17px] lg:leading-[1.5]">
              {/* 접은 화면은 짧은 이름 */}
              <span className="sm:hidden">{stat.shortLabel}</span>
              <span className="hidden sm:inline">{stat.label}</span>
            </dt>
            <dd className="order-1 text-[28px] leading-[1.1] font-bold text-white sm:text-4xl lg:text-[64px]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="text-center text-[11px] leading-[1.4] text-[#9fb3d6] lg:text-[13px] lg:leading-[1.5]">
        <span className="lg:hidden">
          ※ 예시(가짜) 데이터로 계산한 숫자예요.
        </span>
        <span className="hidden lg:inline">
          ※ 화면 속 예시(가짜) 데이터로 계산한 숫자예요.
        </span>
      </p>
    </section>
  );
}
