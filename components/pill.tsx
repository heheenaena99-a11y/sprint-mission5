import Link from "next/link";
import { cn } from "cn";

type PillProps = {
  selected?: boolean;
  /** brand: 선택 시 보라(랜딩 업종), ink: 선택 시 진한 글자색(목록 필터) */
  tone?: "brand" | "ink";
  /** 있으면 이동 링크, 없으면 모양만 */
  href?: string;
  /** 선택된 링크 알약의 aria-current 값 (기본 "true", 페이지 필터는 "page") */
  current?: "true" | "page";
  className?: string;
  children: React.ReactNode;
};

const toneClassName = {
  brand: {
    base: "border-[#c9d1de] font-bold",
    selected: "border-primary bg-primary text-white",
  },
  ink: {
    base: "border-foreground font-medium",
    selected: "bg-foreground text-white",
  },
};

/** 알약 모양 (href 가 있으면 링크 — 랜딩 업종, 목록 등급 필터, 미리보기 기기) */
export function Pill({
  selected = false,
  tone = "ink",
  href,
  current = "true",
  className,
  children,
}: PillProps) {
  const pillClassName = cn(
    "inline-flex items-center rounded-full border px-5 py-2.5 text-[15px] leading-[1.5] whitespace-nowrap",
    toneClassName[tone].base,
    selected && toneClassName[tone].selected,
    href && !selected && "hover:bg-tint",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-current={selected ? current : undefined}
        className={pillClassName}
      >
        {children}
      </Link>
    );
  }

  return <span className={pillClassName}>{children}</span>;
}
