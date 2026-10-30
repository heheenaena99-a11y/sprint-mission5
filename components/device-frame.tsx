import { cn } from "cn";

/** 틀 없이 남은 화면 전체로 보여줄 화면 폭 구간 */
type Fullscreen = "below-sm" | "below-lg" | "lg-up";

type DeviceFrameProps = {
  kind: "phone" | "pc";
  /** iframe 원래 크기 (그 크기의 레이아웃이 나온다) */
  width: number;
  height: number;
  /** 축소·확대 비율 --s 를 정하는 클래스 (Tailwind "[--s:0.6] sm:[--s:0.8]" 또는 globals.css 의 stage-* 클래스) */
  scaleClassName: string;
  name: string;
  title: string;
  src?: string;
  /** 이름 아래에 붙는 링크 등 (예: "이 화면만 크게 보기 →") */
  action?: React.ReactNode;
  /** 이 구간에서는 틀 없이 iframe 을 부모 영역 전체로 (iframe title 은 유지) */
  fullscreen?: Fullscreen;
};

type FullPart =
  "figure" | "frame" | "inner" | "bar" | "screen" | "iframe" | "caption";

/** 틀 없음 구간별 클래스 — Tailwind 가 읽을 수 있게 문자열 그대로 둔다 */
const fullClassName: Record<Fullscreen, Record<FullPart, string>> = {
  "below-sm": {
    figure: "max-sm:h-full max-sm:w-full max-sm:gap-0",
    frame:
      "max-sm:h-full max-sm:w-full max-sm:rounded-none max-sm:border-0 max-sm:shadow-none",
    inner: "max-sm:h-full max-sm:w-full max-sm:rounded-none",
    bar: "max-sm:hidden",
    screen: "max-sm:h-full max-sm:w-full",
    iframe: "max-sm:h-full max-sm:w-full max-sm:[transform:none]",
    caption: "max-sm:hidden",
  },
  "below-lg": {
    figure: "max-lg:h-full max-lg:w-full max-lg:gap-0",
    frame:
      "max-lg:h-full max-lg:w-full max-lg:rounded-none max-lg:border-0 max-lg:shadow-none",
    inner: "max-lg:h-full max-lg:w-full max-lg:rounded-none",
    bar: "max-lg:hidden",
    screen: "max-lg:h-full max-lg:w-full",
    iframe: "max-lg:h-full max-lg:w-full max-lg:[transform:none]",
    caption: "max-lg:hidden",
  },
  "lg-up": {
    figure: "lg:h-full lg:w-full lg:gap-0",
    frame: "lg:h-full lg:w-full lg:rounded-none lg:border-0 lg:shadow-none",
    inner: "lg:h-full lg:w-full lg:rounded-none",
    bar: "lg:hidden",
    screen: "lg:h-full lg:w-full",
    iframe: "lg:h-full lg:w-full lg:[transform:none]",
    caption: "lg:hidden",
  },
};

/**
 * 기기 틀 + iframe (자바스크립트 없이 CSS만)
 * iframe은 원래 크기(--w × --h)로 두고 transform: scale(--s)로 줄이거나 키운 뒤,
 * 바깥 상자를 원래 크기 × --s로 맞춘다. fullscreen 구간에서는 틀 없이 부모 영역을 채운다.
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
  fullscreen,
}: DeviceFrameProps) {
  const full = fullscreen ? fullClassName[fullscreen] : undefined;

  const screen = (
    <div
      className={cn(
        "relative h-[calc(var(--h)*var(--s))] w-[calc(var(--w)*var(--s))] overflow-hidden bg-white",
        full?.screen,
      )}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className={cn(
          "absolute top-0 left-0 h-(--h) w-(--w) origin-top-left border-0 [transform:scale(var(--s))]",
          full?.iframe,
        )}
      />
    </div>
  );

  return (
    <figure
      className={cn(
        "flex flex-col items-center gap-3",
        scaleClassName,
        full?.figure,
      )}
      style={
        { "--w": `${width}px`, "--h": `${height}px` } as React.CSSProperties
      }
    >
      {kind === "phone" ? (
        <div
          className={cn(
            "rounded-[28px] border-[10px] border-[#1d1c1d] bg-[#1d1c1d] shadow-[0_20px_50px_0_rgba(11,31,58,0.18)]",
            full?.frame,
          )}
        >
          <div className={cn("overflow-hidden rounded-[18px]", full?.inner)}>
            {screen}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-[0_20px_50px_0_rgba(11,31,58,0.14)]",
            full?.frame,
          )}
        >
          {/* 브라우저 창 모양 위쪽 막대 */}
          <div
            aria-hidden
            className={cn(
              "flex h-9 shrink-0 items-center gap-3 border-b border-border bg-[#f1f3f6] px-3",
              full?.bar,
            )}
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
      <figcaption
        className={cn(
          "flex flex-col items-center gap-1 text-center text-sm",
          full?.caption,
        )}
      >
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
