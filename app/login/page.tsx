import type { Metadata } from "next";

import { AuthCard } from "@/components/auth-card";
import { ButtonLink } from "@/components/button-link";
import { CheckField } from "@/components/check-field";
import { FormField } from "@/components/form-field";
import { AppTabBar } from "@/components/app-tab-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { demoPassword } from "@/lib/data";
import { getDemoUser } from "@/lib/repository";
import type { userClientType } from "@/lib/types";

export const metadata: Metadata = {
  title: "로그인 | 리스크노트",
  description: "리스크노트에 로그인하고 위험성평가를 작성·관리하세요.",
};

export default function LoginPage() {
  const demoUser: userClientType = getDemoUser();

  return (
    <>
      <SiteHeader />
      <AuthCard
        title="로그인"
        description="리스크노트에 오신 것을 환영합니다."
        switchText="아직 계정이 없나요?"
        switchHref="/signup"
        switchLabel="회원가입"
        footer={
          <div className="flex flex-col gap-1 rounded-xl bg-tint-strong px-4 py-3.5 text-[13px] leading-[1.5]">
            <p className="font-bold">체험용 계정 (가짜 데이터)</p>
            <p className="text-muted-foreground">
              {demoUser.email} / {demoPassword} ({demoUser.name})
            </p>
          </div>
        }
      >
        <FormField
          id="email"
          label="이메일"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
        />
        <FormField
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          autoComplete="current-password"
        />
        <CheckField id="remember" label="로그인 상태 유지" />
        {/* 실제 로그인 없음 — 목록으로 이동만 */}
        <ButtonLink href="/assessments" className="w-full">
          로그인
        </ButtonLink>
      </AuthCard>
      <SiteFooter />
      <AppTabBar active="login" />
    </>
  );
}
