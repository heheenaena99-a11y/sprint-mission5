import type { formErrorType } from "@/lib/types";

/** 폼 맨 위 경고 상자 — "N개 항목을 확인해 주세요" + 항목 목록 (각 항목은 그 칸으로 이동) */
export function FormErrorAlert({ errors }: { errors: formErrorType[] }) {
  if (errors.length === 0) return null;

  return (
    <div
      role="alert"
      className="flex flex-col gap-2 rounded-xl border border-risk-high/30 bg-risk-high-bg px-4 py-3.5 text-sm"
    >
      <p className="font-bold text-risk-high">
        {errors.length}개 항목을 확인해 주세요
      </p>
      <ul className="flex list-disc flex-col gap-1 pl-5 text-foreground">
        {errors.map((error) => (
          <li key={`${error.field}-${error.message}`}>
            <a href={`#${error.field}`} className="hover:underline">
              {error.label}: {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 안내 상자 (성공·데모 안내) */
export function FormNotice({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="status"
      className="flex flex-col gap-1 rounded-xl bg-tint-strong px-4 py-3.5 text-sm leading-[1.5]"
    >
      <p className="font-bold">{title}</p>
      {children && <p className="text-muted-foreground">{children}</p>}
    </div>
  );
}
