import type { Metadata } from "next";

import { AuthCard } from "@/components/auth-card";
import { SignUpForm } from "@/components/forms/signup-form";
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
        <SignUpForm />
      </AuthCard>
      <SiteFooter />
      <AppTabBar active="login" />
    </>
  );
}
