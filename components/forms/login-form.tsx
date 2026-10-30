"use client";

import { useActionState } from "react";

import { loginAction } from "@/app/actions";
import { FormErrorAlert } from "@/components/form-alert";
import { FormField } from "@/components/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import type { formStateType, loginFormType } from "@/lib/types";

/** 로그인 폼 — 검사는 서버(loginAction), 결과만 여기서 보여준다 */
export function LoginForm({ defaultEmail = "" }: { defaultEmail?: string }) {
  const initialState: formStateType<loginFormType> = {
    values: { email: defaultEmail, password: "" },
    errors: [],
    submitCount: 0,
  };
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );
  const errorOf = (field: string) =>
    state.errors.find((error) => error.field === field)?.message;

  return (
    // 제출마다 key 를 바꿔 돌려받은 값으로 다시 채운다 (비밀번호는 비움)
    <form
      key={state.submitCount}
      action={formAction}
      noValidate
      className="flex flex-col gap-5"
    >
      <FormErrorAlert errors={state.errors} />
      <FormField
        id="email"
        label="이메일"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        defaultValue={state.values.email}
        error={errorOf("email")}
      />
      <FormField
        id="password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        autoComplete="current-password"
        error={errorOf("password")}
      />
      <SubmitButton pending={pending} className="w-full">
        로그인
      </SubmitButton>
    </form>
  );
}
