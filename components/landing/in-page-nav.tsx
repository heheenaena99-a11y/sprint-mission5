const items = [
  { href: "#overview", label: "개요" },
  { href: "#steps", label: "작성 흐름" },
  { href: "#risk-grades", label: "위험도 등급" },
  { href: "#features", label: "기능" },
  { href: "#faq", label: "자주 묻는 질문" },
];

/** 바로가기 메뉴 — 스크롤하면 위에 붙는다 (앱: 앱 제목줄 바로 아래) */
export function InPageNav() {
  return (
    <nav
      aria-label="바로 가기"
      className="sticky top-14 z-30 w-full border-b border-border bg-white sm:top-[60px] lg:top-0"
    >
      <div className="overflow-x-auto px-4 py-2.5 sm:px-9 lg:px-5 lg:py-4">
        <div className="flex w-max items-center gap-4 sm:mx-auto">
          <span className="hidden text-sm font-medium text-muted-foreground lg:inline">
            바로 가기
          </span>
          <ul className="flex gap-1.5 lg:gap-1 lg:rounded-full lg:bg-[#e8effc] lg:p-1.5">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full bg-[#e8effc] px-3.5 py-2 text-[13px] leading-[1.2] font-medium whitespace-nowrap transition-shadow hover:bg-white hover:shadow-[0_1px_4px_0_rgba(11,31,58,0.1)] focus-visible:bg-white focus-visible:shadow-[0_1px_4px_0_rgba(11,31,58,0.1)] sm:px-4 sm:text-sm lg:bg-transparent lg:px-5 lg:py-2.5 lg:text-[15px] lg:leading-[1.5]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
