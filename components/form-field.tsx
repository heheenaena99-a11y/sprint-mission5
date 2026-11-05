import { cn } from "cn";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  multiline?: boolean;
  className?: string;
  /** 처음 채워 둘 값 (검사 실패 후 입력값 유지에 사용) */
  defaultValue?: string;
  /** 검사 오류 문구 — 있으면 칸 아래 빨간 글자 + aria-invalid */
  error?: string;
};

const boxClassName =
  "border-input-border bg-white px-3.5 text-[15px] placeholder:text-muted-foreground md:text-[15px]";

/** 라벨 + 입력칸 묶음 (shadcn Label·Input·Textarea) */
export function FormField({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  multiline = false,
  className,
  defaultValue,
  error,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const invalidProps = error
    ? { "aria-invalid": true, "aria-describedby": errorId }
    : {};

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {multiline ? (
        <Textarea
          id={id}
          name={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={cn(boxClassName, "min-h-[104px] py-3")}
          {...invalidProps}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          className={cn(boxClassName, "h-auto py-3")}
          {...invalidProps}
        />
      )}
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
