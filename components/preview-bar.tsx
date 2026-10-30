import Link from "next/link";

/** 미리보기(전시용) 화면 위 얇은 막대 — 높이 44px */
export function PreviewBar() {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between border-b border-border bg-white px-4 text-sm font-bold sm:px-6">
      <Link href="/" className="text-foreground hover:text-primary">
        ←&nbsp;&nbsp;리스크노트
      </Link>
      <Link href="/preview" className="text-primary hover:underline">
        기기별 한눈에 보기
      </Link>
    </div>
  );
}
