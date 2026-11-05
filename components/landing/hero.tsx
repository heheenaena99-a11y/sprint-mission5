import { ButtonLink } from "@/components/button-link";
import { RiskBadge } from "@/components/risk-badge";
import { findAssessmentById } from "@/lib/repository";
import { getMaxRiskScore, getRiskScore } from "@/lib/service";

export function Hero() {
  const preview = findAssessmentById("2");

  return (
    <section className="flex flex-col gap-7 bg-[linear-gradient(to_bottom,#e3edff,#ffffff)] px-5 py-8 sm:flex-row sm:items-center sm:px-9 sm:py-10 lg:flex-col lg:bg-[linear-gradient(to_bottom,#e3edff,#f5f9ff_45%,#ffffff)] lg:px-[120px] lg:py-24">
      <div className="flex flex-col items-start gap-3.5 sm:flex-1 lg:items-center lg:gap-7">
        {/* 앱 화면에서만 보이는 작은 글자 */}
        <p className="text-[13px] leading-[1.5] font-bold text-primary lg:hidden">
          5~50인 사업장 위험성평가 도우미
        </p>
        <h1 className="text-[30px] leading-[1.25] font-bold sm:text-4xl sm:leading-[1.22] lg:text-center lg:text-[64px] lg:leading-[1.15]">
          위험성평가,
          <br />
          단계만 따라오면 완성
        </h1>
        <p className="text-[15px] leading-[1.55] text-muted-foreground lg:max-w-2xl lg:text-center lg:text-xl">
          <span className="sm:hidden">
            작업을 고르고 위험요인과 대책을 입력하면 평가표가 만들어져요.
          </span>
          <span className="hidden sm:inline">
            작업을 고르고 위험요인과 대책을 입력하면 평가표가 만들어지고,{" "}
            <br className="hidden lg:inline" />
            작성한 기록은 한곳에 모여요.
          </span>
        </p>
        <div className="flex w-full flex-col items-start gap-3.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3 lg:justify-center lg:gap-2">
          <ButtonLink
            href="/assessments/new"
            size="lg"
            className="w-full rounded-md py-3.5 sm:w-auto sm:px-6 lg:rounded-button lg:px-10 lg:pt-[19px] lg:pb-5"
          >
            위험성평가 시작하기
          </ButtonLink>
          <ButtonLink
            href="/assessments/1"
            variant="text"
            size="lg"
            className="px-0 py-0 text-sm sm:px-0 lg:px-10 lg:pt-[19px] lg:pb-5 lg:text-[15px]"
          >
            작성 예시 보기&nbsp;&nbsp;→
          </ButtonLink>
        </div>
      </div>

      {preview && (
        <div
          aria-label="앱 미리보기"
          className="flex w-full flex-col gap-2.5 rounded-[14px] border border-border bg-white p-4 shadow-[0_10px_28px_0_rgba(11,31,58,0.1)] sm:w-[400px] sm:shrink-0 sm:p-[18px] lg:w-full lg:max-w-[1040px] lg:gap-4 lg:rounded-card lg:p-8 lg:shadow-[0_20px_50px_0_rgba(11,31,58,0.14)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="hidden text-[13px] text-muted-foreground lg:block">
                {preview.category} · 작성일 {preview.date}
              </p>
              <p className="text-[17px] leading-[1.3] font-bold lg:text-2xl">
                {preview.title}
              </p>
            </div>
            <RiskBadge score={getMaxRiskScore(preview)} />
          </div>

          <ul className="flex flex-col gap-2.5 lg:gap-4">
            {preview.hazards.map((h) => {
              const score = getRiskScore(h.frequency, h.severity);
              return (
                <li
                  key={h.order}
                  className="flex items-center gap-2 rounded-lg bg-row px-3 py-2.5 sm:px-3.5 sm:py-[11px] lg:gap-3 lg:rounded-[10px] lg:px-[18px] lg:py-3.5"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-[1.3]">
                    <p className="text-sm font-medium sm:font-bold lg:text-[15px]">
                      {h.step}
                    </p>
                    <p className="hidden text-sm text-muted-foreground lg:block">
                      {h.hazard}
                    </p>
                  </div>
                  <span className="hidden text-sm font-medium whitespace-nowrap text-muted-foreground lg:inline">
                    {h.frequency} × {h.severity}
                  </span>
                  <span className="text-base leading-[1.2] font-bold lg:text-xl">
                    {score}
                  </span>
                  <RiskBadge score={score} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
