import Link from "next/link";
import { Suspense } from "react";
import { cn } from "cn";
import { House, List, LogOut, Plus, User } from "lucide-react";

import { logoutAction } from "@/app/actions";
import { getCurrentUser } from "@/lib/repository";

type TabKey = "home" | "assessments" | "new" | "login";

const tabs: {
  key: Exclude<TabKey, "login">;
  href: string;
  label: string;
}[] = [
  { key: "home", href: "/", label: "홈" },
  { key: "assessments", href: "/assessments", label: "평가 목록" },
  { key: "new", href: "/assessments/new", label: "새 평가" },
];

const icons = { home: House, assessments: List };

const tabClassName = (isActive: boolean) =>
  cn(
    "flex flex-col items-center justify-center gap-1 text-[11px] leading-[1.2]",
    isActive ? "font-bold text-primary" : "font-medium text-tab-muted",
  );

/** 마지막 탭 — 비로그인: 로그인 링크 / 로그인: 로그아웃 버튼 */
async function AccountTab({ isActive }: { isActive: boolean }) {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link
        href="/login"
        aria-current={isActive ? "page" : undefined}
        className={tabClassName(isActive)}
      >
        <User aria-hidden className="size-[22px]" strokeWidth={1.8} />
        로그인
      </Link>
    );
  }

  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className={cn(tabClassName(false), "w-full cursor-pointer")}
      >
        <LogOut aria-hidden className="size-[22px]" strokeWidth={1.8} />
        로그아웃
      </button>
    </form>
  );
}

/** 1023px 이하 앱 화면의 아래 탭 바 (현재 탭은 페이지에서 active로 넘긴다) */
export function AppTabBar({ active }: { active?: TabKey }) {
  return (
    <>
      {/* 고정된 탭 바만큼 아래 여백 — 내용과 마지막 버튼이 가려지지 않게 */}
      <div
        aria-hidden
        className="h-[calc(4rem+env(safe-area-inset-bottom))] lg:hidden"
      />
      <nav
        aria-label="앱 메뉴"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <ul className="flex h-16 items-center px-2">
          {tabs.map((tab) => {
            const isActive = tab.key === active;
            const Icon = tab.key === "new" ? null : icons[tab.key];
            return (
              <li key={tab.key} className="flex-1">
                <Link
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={tabClassName(isActive)}
                >
                  {Icon ? (
                    <Icon
                      aria-hidden
                      className="size-[22px]"
                      strokeWidth={1.8}
                    />
                  ) : (
                    <span className="flex h-7 w-10 items-center justify-center rounded-lg bg-primary text-white">
                      <Plus
                        aria-hidden
                        className="size-[18px]"
                        strokeWidth={2.2}
                      />
                    </span>
                  )}
                  {tab.label}
                </Link>
              </li>
            );
          })}
          <li className="flex-1">
            {/* 쿠키는 요청마다 달라서 Suspense 안에서 읽는다 (cacheComponents) */}
            <Suspense fallback={null}>
              <AccountTab isActive={active === "login"} />
            </Suspense>
          </li>
        </ul>
      </nav>
    </>
  );
}
