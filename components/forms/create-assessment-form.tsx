"use client";

import Link from "next/link";
import { useActionState } from "react";

import { createAssessmentAction } from "@/app/actions";
import { ButtonLink } from "@/components/button-link";
import { CheckField } from "@/components/check-field";
import { FormErrorAlert } from "@/components/form-alert";
import { FormCard } from "@/components/form-card";
import { FormField } from "@/components/form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { RiskBadge } from "@/components/risk-badge";
import type {
  createAssessmentFormType,
  formStateType,
  hazardFormType,
} from "@/lib/types";

/** 유해·위험요인 카드 개수 범위 (?hazards=) */
const minHazards = 1;
const maxHazards = 5;

const emptyHazard: hazardFormType = {
  step: "",
  hazard: "",
  frequency: "",
  severity: "",
  measure: "",
};

/**
 * 새 평가 작성 폼 — 검사는 서버(createAssessmentAction), 결과만 여기서 보여준다.
 * 카드 개수(count)는 주소 ?hazards= 로 정해지고, 추가·삭제는 링크다 (입력값은 초기화됨).
 */
export function CreateAssessmentForm({ count }: { count: number }) {
  const initialState: formStateType<createAssessmentFormType> = {
    values: {
      title: "",
      category: "",
      author: "",
      date: "",
      hazards: Array.from({ length: count }, () => emptyHazard),
      agreeWorkers: false,
      agreeShare: false,
    },
    errors: [],
    submitCount: 0,
  };
  const [state, formAction, pending] = useActionState(
    createAssessmentAction,
    initialState,
  );
  const errorOf = (field: string) =>
    state.errors.find((error) => error.field === field)?.message;
  const { values } = state;
  const numbers = Array.from({ length: count }, (_, index) => index + 1);

  return (
    // 제출마다 key 를 바꿔 돌려받은 값으로 다시 채운다
    <form
      key={state.submitCount}
      action={formAction}
      noValidate
      className="flex w-full flex-col items-start gap-6"
    >
      <input type="hidden" name="hazards" value={count} />
      <div className="w-full empty:hidden">
        <FormErrorAlert errors={state.errors} />
      </div>

      <FormCard title="1. 작업 정보">
        <FormField
          id="title"
          label="작업명"
          placeholder="예: 사다리 이용 조명 교체"
          defaultValue={values.title}
          error={errorOf("title")}
        />
        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <FormField
            id="category"
            label="작업구분"
            placeholder="예: 시설 유지보수"
            defaultValue={values.category}
            error={errorOf("category")}
          />
          <FormField
            id="author"
            label="작성자"
            placeholder="예: 김민지"
            autoComplete="name"
            defaultValue={values.author}
            error={errorOf("author")}
          />
          <FormField
            id="date"
            label="작성일"
            placeholder="2026-10-30"
            defaultValue={values.date}
          />
        </div>
      </FormCard>

      {numbers.map((n) => {
        const h = values.hazards[n - 1] ?? emptyHazard;
        return (
          <FormCard
            key={n}
            id={`hazard-${n}`}
            title={`2. 유해·위험요인 ${n}`}
            className="scroll-mt-20 lg:scroll-mt-6"
            action={
              // 마지막 카드(2개 이상일 때)에만 삭제 — 마지막 카드 하나를 줄인다
              n === count && count > minHazards ? (
                <Link
                  href={`/assessments/new?hazards=${count - 1}#hazard-${count - 1}`}
                  className="shrink-0 text-sm font-bold text-muted-foreground hover:text-risk-high hover:underline"
                >
                  삭제
                </Link>
              ) : undefined
            }
          >
            <FormField
              id={`step-${n}`}
              label="공종"
              placeholder="예: 사다리 오르기"
              defaultValue={h.step}
            />
            <FormField
              id={`hazard-${n}-text`}
              label="유해·위험요인"
              placeholder="예: 발을 헛디뎌 떨어짐"
              defaultValue={h.hazard}
              error={errorOf(`hazard-${n}-text`)}
            />
            <div className="flex w-full flex-col gap-4 sm:flex-row">
              <FormField
                id={`frequency-${n}`}
                label="빈도 (1~5)"
                placeholder="4"
                type="number"
                defaultValue={h.frequency}
                error={errorOf(`frequency-${n}`)}
              />
              <FormField
                id={`severity-${n}`}
                label="강도 (1~5)"
                placeholder="4"
                type="number"
                defaultValue={h.severity}
                error={errorOf(`severity-${n}`)}
              />
            </div>
            <div className="flex w-full items-center gap-2.5 rounded-xl bg-tint-strong px-[18px] py-3.5">
              <p className="font-bold">위험도 = 4 × 4 = 16</p>
              <RiskBadge score={16} />
            </div>
            <FormField
              id={`measure-${n}`}
              label="감소대책"
              placeholder="예: 3점 지지, 안전모 착용"
              multiline
              defaultValue={h.measure}
              error={errorOf(`measure-${n}`)}
            />
          </FormCard>
        );
      })}

      {count < maxHazards ? (
        <ButtonLink
          href={`/assessments/new?hazards=${count + 1}#hazard-${count + 1}`}
          variant="outline"
          className="text-[15px]"
        >
          + 유해·위험요인 추가
        </ButtonLink>
      ) : (
        <p className="text-sm text-muted-foreground">
          최대 {maxHazards}개까지 추가할 수 있어요
        </p>
      )}

      <FormCard title="3. 확인">
        <CheckField
          id="agree-workers"
          label="작업자 의견을 듣고 작성했습니다"
          defaultChecked={values.agreeWorkers}
          error={errorOf("agree-workers")}
        />
        <CheckField
          id="agree-share"
          label="평가 결과를 작업자에게 공유하겠습니다"
          defaultChecked={values.agreeShare}
          error={errorOf("agree-share")}
        />
      </FormCard>

      <div className="flex w-full justify-end gap-3">
        <ButtonLink href="/assessments" variant="outline">
          취소
        </ButtonLink>
        <SubmitButton pending={pending}>작성 완료</SubmitButton>
      </div>
    </form>
  );
}
