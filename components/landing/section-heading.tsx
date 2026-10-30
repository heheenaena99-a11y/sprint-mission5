import { cn } from "cn";

type SectionHeadingProps = {
  title: React.ReactNode;
  /** 1024px 이상(데스크톱)에서만 보이는 설명 */
  description?: string;
  /** 1023px 이하(앱)에서만 보이는 짧은 설명 */
  appDescription?: string;
  id?: string;
  /** 짙은 띠(band) 위에서 쓸 때 */
  onDark?: boolean;
};

/** 랜딩 섹션 공통 제목 — 앱: 왼쪽 정렬 22px/26px, 데스크톱: 가운데 48px */
export function SectionHeading({
  title,
  description,
  appDescription,
  id,
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div className="flex w-full flex-col items-start gap-3 text-left lg:items-center lg:gap-4 lg:text-center">
      <h2
        id={id}
        className={cn(
          "text-[22px] leading-[1.3] font-bold sm:text-[26px] lg:text-[48px] lg:leading-[1.25]",
          onDark && "text-white",
        )}
      >
        {title}
      </h2>
      {appDescription && (
        <p
          className={cn(
            "text-sm leading-[1.5] lg:hidden",
            onDark ? "text-band-muted" : "text-muted-foreground",
          )}
        >
          {appDescription}
        </p>
      )}
      {description && (
        <p
          className={cn(
            "hidden leading-[1.5] lg:block lg:text-[19px]",
            onDark ? "text-band-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
