import Link from "next/link";

/** 1024px 이상에서만 보인다 (앱 화면은 아래 탭 바 사용) */
export function SiteFooter() {
  return (
    <footer className="hidden border-t border-border bg-white lg:block">
      <div className="flex flex-row items-center justify-between gap-2 px-[120px] py-8">
        <p className="text-[15px] font-bold">리스크노트</p>
        <div className="flex items-center gap-4 text-[13px]">
          <Link
            href="/preview"
            className="font-bold text-primary hover:underline"
          >
            기기별 미리보기
          </Link>
          <p className="text-muted-foreground">
            © 2026 리스크노트 · 스프린트 미션5 과제용 가상 서비스
          </p>
        </div>
      </div>
    </footer>
  );
}
