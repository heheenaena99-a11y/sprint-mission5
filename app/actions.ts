"use server";

// 폼 제출(Server Action) — service(판단) → repository(조회) 순서로 검사하고, 통과하면 이동한다.
// 실제 저장·세션은 없음 (가짜 데이터, AGENTS.md "데이터")

import { redirect } from "next/navigation";

import { findUserByEmail } from "@/lib/repository";
import {
  checkLogin,
  validateCreateAssessmentForm,
  validateLoginForm,
  validateSignUpForm,
} from "@/lib/service";
import type {
  createAssessmentFormType,
  formStateType,
  loginFormType,
  signUpFormType,
} from "@/lib/types";

const text = (formData: FormData, name: string) =>
  String(formData.get(name) ?? "");

const checked = (formData: FormData, name: string) =>
  formData.get(name) === "on";

/** 로그인 — 형식 검사(service) → 사용자 찾기(repository) → 비밀번호 판단(service) */
export async function loginAction(
  prev: formStateType<loginFormType>,
  formData: FormData,
): Promise<formStateType<loginFormType>> {
  const form: loginFormType = {
    email: text(formData, "email").trim(),
    password: text(formData, "password"),
  };
  // 실패해도 이메일은 유지, 비밀번호 칸만 비운다
  const values = { ...form, password: "" };
  const submitCount = prev.submitCount + 1;

  const errors = validateLoginForm(form);
  if (errors.length > 0) return { values, errors, submitCount };

  const signedIn = checkLogin(findUserByEmail(form.email), form.password);
  if (!signedIn) {
    // 이메일·비밀번호 중 어느 쪽이 틀렸는지 구분하지 않는다
    const message = "이메일 또는 비밀번호가 맞지 않아요";
    return {
      values,
      errors: [
        { field: "email", label: "이메일", message },
        { field: "password", label: "비밀번호", message },
      ],
      submitCount,
    };
  }

  // 세션·쿠키 저장 없이 목록으로 (비밀번호 뺀 signedIn 만 사용)
  redirect("/assessments?welcome=1");
}

/** 회원가입 — 형식 검사(service) → 이메일 중복 조회(repository) */
export async function signUpAction(
  prev: formStateType<signUpFormType>,
  formData: FormData,
): Promise<formStateType<signUpFormType>> {
  const form: signUpFormType = {
    name: text(formData, "name").trim(),
    email: text(formData, "email").trim(),
    password: text(formData, "password"),
    passwordConfirm: text(formData, "password-confirm"),
    company: text(formData, "company").trim(),
    agreeTerms: checked(formData, "agree-terms"),
    agreePrivacy: checked(formData, "agree-privacy"),
  };
  const values = { ...form, password: "", passwordConfirm: "" };
  const submitCount = prev.submitCount + 1;

  const errors = validateSignUpForm(form);
  if (errors.length === 0 && findUserByEmail(form.email)) {
    errors.push({
      field: "email",
      label: "이메일",
      message: "이미 가입된 이메일이에요",
    });
  }
  if (errors.length > 0) return { values, errors, submitCount };

  // 실제로 저장하지 않음 — 로그인 화면에 이메일을 채워 둔다
  redirect(`/login?email=${encodeURIComponent(form.email)}&joined=1`);
}

/** 새 평가 작성 — 필수·범위·중복 검사(service) */
export async function createAssessmentAction(
  prev: formStateType<createAssessmentFormType>,
  formData: FormData,
): Promise<formStateType<createAssessmentFormType>> {
  const count = Math.min(
    5,
    Math.max(1, Number(text(formData, "hazards")) || 1),
  );
  const form: createAssessmentFormType = {
    title: text(formData, "title").trim(),
    category: text(formData, "category").trim(),
    author: text(formData, "author").trim(),
    date: text(formData, "date").trim(),
    hazards: Array.from({ length: count }, (_, index) => {
      const n = index + 1;
      return {
        step: text(formData, `step-${n}`).trim(),
        hazard: text(formData, `hazard-${n}-text`).trim(),
        frequency: text(formData, `frequency-${n}`).trim(),
        severity: text(formData, `severity-${n}`).trim(),
        measure: text(formData, `measure-${n}`).trim(),
      };
    }),
    agreeWorkers: checked(formData, "agree-workers"),
    agreeShare: checked(formData, "agree-share"),
  };
  const submitCount = prev.submitCount + 1;

  const errors = validateCreateAssessmentForm(form);
  if (errors.length > 0) return { values: form, errors, submitCount };

  // 실제로 저장하지 않음
  redirect("/assessments/new/complete");
}
