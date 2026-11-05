"use server";

// 폼 제출(Server Action) — service(판단) → repository(조회) 순서로 검사하고, 통과하면 이동한다.
// 쿠키 쓰기는 여기서만 한다. 새 평가는 저장하지 않음 (AGENTS.md "데이터")

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  encodeUsers,
  isUsersCookieTooLarge,
  sessionCookieName,
  sessionCookieOptions,
  usersCookieName,
  usersCookieOptions,
} from "@/lib/auth-cookie";
import { checkLogin, hashPassword } from "@/lib/auth-service";
import { findUserByEmail, getSignedUpUsers } from "@/lib/repository";
import {
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

  const signedIn = await checkLogin(
    await findUserByEmail(form.email),
    form.password,
  );
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

  // 비밀번호 뺀 signedIn 만 사용 — 쿠키에는 이메일만 남긴다
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, signedIn.email, sessionCookieOptions);
  redirect("/assessments?welcome=1");
}

/** 로그아웃 — 로그인 상태 쿠키만 지운다 (가입 계정은 남김) */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
  redirect("/");
}

/** 회원가입 — 형식 검사(service) → 이메일 중복 조회(repository) → 쿠키에 저장 */
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
  if (errors.length === 0 && (await findUserByEmail(form.email))) {
    errors.push({
      field: "email",
      label: "이메일",
      message: "이미 가입된 이메일이에요",
    });
  }
  if (errors.length > 0) return { values, errors, submitCount };

  const email = form.email.toLowerCase();
  const usersCookie = encodeUsers([
    ...(await getSignedUpUsers()),
    { name: form.name, email, ...(await hashPassword(form.password)) },
  ]);
  if (isUsersCookieTooLarge(usersCookie)) {
    return {
      values,
      errors: [
        {
          field: "email",
          label: "이메일",
          message: "이 브라우저에는 계정을 더 저장할 수 없어요",
        },
      ],
      submitCount,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(usersCookieName, usersCookie, usersCookieOptions);

  // 로그인 화면에 이메일을 채워 둔다
  redirect(`/login?email=${encodeURIComponent(email)}&joined=1`);
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
