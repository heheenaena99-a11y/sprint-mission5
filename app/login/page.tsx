import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthCard } from "@/components/auth-card";
import { FormNotice } from "@/components/form-alert";
import { LoginForm } from "@/components/forms/login-form";
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

export default function LoginPage({ searchParams }: PageProps<"/login">) {
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
        {/* ?email=&joined=1 (회원가입 직후) 은 요청마다 달라서 Suspense 안에서 읽는다 */}
        <Suspense fallback={<LoginForm />}>
          <LoginFromParams searchParams={searchParams} />
        </Suspense>
      </AuthCard>
      <SiteFooter />
      <AppTabBar active="login" />
    </>
  );
}

async function LoginFromParams({
  searchParams,
}: Pick<PageProps<"/login">, "searchParams">) {
  const { email, joined } = await searchParams;
  const defaultEmail = typeof email === "string" ? email : "";

  return (
    <div className="flex flex-col gap-5">
      {joined === "1" && (
        <FormNotice title="회원가입이 완료되었어요">
          데모라 실제로 저장되지 않아요. 체험 계정으로 로그인해 보세요.
        </FormNotice>
      )}
      <LoginForm key={defaultEmail} defaultEmail={defaultEmail} />
    </div>
  );
}
