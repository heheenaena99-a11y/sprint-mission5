import Link from "next/link";
import { cn } from "cn";
import { House, List, Plus, User } from "lucide-react";

type TabKey = "home" | "assessments" | "new" | "login";

const tabs: { key: TabKey; href: string; label: string }[] = [
  { key: "home", href: "/", label: "홈" },
  { key: "assessments", href: "/assessments", label: "평가 목록" },
  { key: "new", href: "/assessments/new", label: "새 평가" },
  { key: "login", href: "/login", label: "로그인" },
];

const icons = { home: House, assessments: List, login: User };

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
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 text-[11px] leading-[1.2]",
                    isActive
                      ? "font-bold text-primary"
                      : "font-medium text-tab-muted",
                  )}
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
        </ul>
      </nav>
    </>
  );
}
