import { cn } from "cn";

type DeviceFrameProps = {
  kind: "phone" | "pc";
  /** iframe 원래 크기 (그 크기의 레이아웃이 나온다) */
  width: number;
  height: number;
  /** 화면 폭 구간별 축소 비율 — Tailwind 클래스로 --s 값을 정한다 (예: "[--s:0.6] sm:[--s:0.8]") */
  scaleClassName: string;
  name: string;
  title: string;
  src?: string;
  /** 이름 아래에 붙는 링크 등 (예: "이 화면만 크게 보기 →") */
  action?: React.ReactNode;
};

/**
 * 기기 틀 + iframe (자바스크립트 없이 CSS만)
 * iframe은 원래 크기로 두고 transform: scale(--s)로 줄인 뒤, 바깥 상자를 원래 크기 × --s로 맞춘다.
 */
export function DeviceFrame({
  kind,
  width,
  height,
  scaleClassName,
  name,
  title,
  src = "/",
  action,
}: DeviceFrameProps) {
  const screen = (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        width: `calc(${width}px * var(--s))`,
        height: `calc(${height}px * var(--s))`,
      }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="absolute top-0 left-0 origin-top-left border-0"
        style={{ width, height, transform: "scale(var(--s))" }}
      />
    </div>
  );

  return (
    <figure className={cn("flex flex-col items-center gap-3", scaleClassName)}>
      {kind === "phone" ? (
        <div className="rounded-[28px] border-[10px] border-[#1d1c1d] bg-[#1d1c1d] shadow-[0_20px_50px_0_rgba(11,31,58,0.18)]">
          <div className="overflow-hidden rounded-[18px]">{screen}</div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_20px_50px_0_rgba(11,31,58,0.14)]">
          {/* 브라우저 창 모양 위쪽 막대 */}
          <div
            aria-hidden
            className="flex h-9 items-center gap-3 border-b border-border bg-[#f1f3f6] px-3"
          >
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-xs text-muted-foreground">
              risknote.vercel.app
            </span>
          </div>
          {screen}
        </div>
      )}
      <figcaption className="flex flex-col items-center gap-1 text-center text-sm">
        <span>
          <span className="font-bold">{name}</span>
          <span className="text-muted-foreground">
            {" "}
            · {width}×{height}
          </span>
        </span>
        {action}
      </figcaption>
    </figure>
  );
}
