import type { Metadata } from "next";

import { AuthCard } from "@/components/auth-card";
import { ButtonLink } from "@/components/button-link";
import { CheckField } from "@/components/check-field";
import { FormField } from "@/components/form-field";
import { AppTabBar } from "@/components/app-tab-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "회원가입 | 리스크노트",
  description:
    "사업장 정보를 입력하고 리스크노트로 첫 위험성평가를 시작하세요.",
};

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <AuthCard
        title="회원가입"
        description="사업장 정보를 입력하고 첫 평가를 시작하세요."
        switchText="이미 계정이 있나요?"
        switchHref="/login"
        switchLabel="로그인"
      >
        <FormField
          id="name"
          label="이름"
          placeholder="홍길동"
          autoComplete="name"
        />
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
          placeholder="8자 이상"
          autoComplete="new-password"
        />
        <FormField
          id="password-confirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 다시 입력"
          autoComplete="new-password"
        />
        <FormField
          id="company"
          label="사업장 이름"
          placeholder="예: 리스크물류"
          autoComplete="organization"
        />
        <CheckField id="agree-terms" label="이용약관에 동의합니다" />
        <CheckField
          id="agree-privacy"
          label="개인정보 수집·이용에 동의합니다"
        />
        {/* 실제 가입 없음 — 목록으로 이동만 */}
        <ButtonLink href="/assessments" className="w-full">
          회원가입
        </ButtonLink>
      </AuthCard>
      <SiteFooter />
      <AppTabBar active="login" />
    </>
  );
}
