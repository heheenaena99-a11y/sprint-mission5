"use client";

import { useActionState } from "react";

import { signUpAction } from "@/app/actions";
import { CheckField } from "@/components/check-field";
import { FormErrorAlert } from "@/components/form-alert";
import { FormField } from "@/components/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import type { formStateType, signUpFormType } from "@/lib/types";

const initialState: formStateType<signUpFormType> = {
  values: {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    company: "",
    agreeTerms: false,
    agreePrivacy: false,
  },
  errors: [],
  submitCount: 0,
};

/** 회원가입 폼 — 검사는 서버(signUpAction), 결과만 여기서 보여준다 */
export function SignUpForm() {
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState,
  );
  const errorOf = (field: string) =>
    state.errors.find((error) => error.field === field)?.message;
  const { values } = state;

  return (
    // 제출마다 key 를 바꿔 돌려받은 값으로 다시 채운다 (비밀번호 칸은 비움)
    <form
      key={state.submitCount}
      action={formAction}
      noValidate
      className="flex flex-col gap-5"
    >
      <FormErrorAlert errors={state.errors} />
      <FormField
        id="name"
        label="이름"
        placeholder="홍길동"
        autoComplete="name"
        defaultValue={values.name}
        error={errorOf("name")}
      />
      <FormField
        id="email"
        label="이메일"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        defaultValue={values.email}
        error={errorOf("email")}
      />
      <FormField
        id="password"
        label="비밀번호"
        type="password"
        placeholder="4자 이상"
        autoComplete="new-password"
        error={errorOf("password")}
      />
      <FormField
        id="password-confirm"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호 다시 입력"
        autoComplete="new-password"
        error={errorOf("password-confirm")}
      />
      <FormField
        id="company"
        label="사업장 이름"
        placeholder="예: 리스크물류"
        autoComplete="organization"
        defaultValue={values.company}
      />
      <CheckField
        id="agree-terms"
        label="이용약관에 동의합니다"
        defaultChecked={values.agreeTerms}
        error={errorOf("agree-terms")}
      />
      <CheckField
        id="agree-privacy"
        label="개인정보 수집·이용에 동의합니다"
        defaultChecked={values.agreePrivacy}
        error={errorOf("agree-privacy")}
      />
      <SubmitButton pending={pending} className="w-full">
        회원가입
      </SubmitButton>
    </form>
  );
}
