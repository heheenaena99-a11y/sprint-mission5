const steps = ["사전준비", "요인 파악", "위험성 결정", "감소대책", "기록"];

/** 작성 단계 표시 — current 단계까지 진한 모양 (작성: 2, 완료: 5) */
export function Stepper({ current }: { current: number }) {
  return (
    <ol aria-label="작성 단계" className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => {
        const done = index + 1 <= current;
        return (
          <li key={step} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden className="h-px w-6 bg-border" />}
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
                  done ? "text-sm font-bold" : "text-sm text-muted-foreground"
                }
              >
                {step}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
