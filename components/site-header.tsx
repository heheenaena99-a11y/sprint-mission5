import Link from "next/link";
import { Suspense } from "react";

import { logoutAction } from "@/app/actions";
import { ButtonLink } from "@/components/button-link";
import { getCurrentUser } from "@/lib/repository";

const navItems = [
  { href: "/assessments", label: "평가 목록" },
  { href: "/assessments/1", label: "작성 예시" },
  { href: "/assessments/new", label: "새 평가 작성" },
];

export function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 lg:gap-2">
      <span
        aria-hidden
        className="grid size-5 grid-cols-2 gap-0.5 lg:size-[22px]"
      >
        <span className="rounded-[2px] bg-risk-high" />
        <span className="rounded-[2px] bg-risk-mid" />
        <span className="rounded-[2px] bg-risk-low" />
        <span className="rounded-[2px] bg-primary" />
      </span>
      <span className="text-[17px] font-bold sm:text-lg lg:text-[19px]">
        리스크노트
      </span>
    </Link>
  );
}

/** 비로그인: 로그인 링크 / 로그인: "○○님" + 로그아웃 버튼 */
async function HeaderAccount() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm font-bold text-primary hover:underline"
      >
        로그인
      </Link>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-3 lg:gap-4">
      <p className="flex min-w-0 text-sm font-medium">
        <span className="max-w-24 truncate sm:max-w-40">{user.name}</span>
        <span className="shrink-0">님</span>
      </p>
      <form action={logoutAction} className="shrink-0">
        <button
          type="submit"
          className="cursor-pointer text-sm font-bold text-primary hover:underline"
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}

/** 1024px 이상: 데스크톱 헤더 / 1023px 이하: 위에 붙는 앱 제목줄(로고 + 계정) */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white lg:static">
      <div className="flex h-14 items-center gap-9 px-4 sm:h-[60px] sm:px-7 lg:h-auto lg:px-12 lg:py-3.5">
        <Logo />
        <nav aria-label="주요 메뉴" className="hidden gap-9 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex min-w-0 items-center gap-9">
          {/* 쿠키는 요청마다 달라서 Suspense 안에서 읽는다 (cacheComponents).
              잘못된 로그인 상태가 잠깐 보이지 않게 대체 화면은 비워 둔다 */}
          <Suspense fallback={null}>
            <HeaderAccount />
          </Suspense>
          <ButtonLink href="/assessments/new" className="hidden lg:inline-flex">
            위험성평가 시작하기
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
