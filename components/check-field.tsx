import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CheckFieldProps = {
  id: string;
  label: string;
  /** 처음 체크 상태 (기본: 체크됨 — 시안 모양) */
  defaultChecked?: boolean;
  /** 검사 오류 문구 — 있으면 아래 빨간 글자 + aria-invalid */
  error?: string;
};

/**
 * 체크박스 + 라벨 묶음 (shadcn Checkbox·Label). 폼 제출 시 체크되면 name=id 로 "on" 을 보낸다.
 * id 는 눈에 보이는 체크박스에 둔다 (경고 상자 링크 #id 가 그 체크박스로 이동·포커스).
 * 숨은 input 은 id-input — 라벨은 이것과 연결해 라벨을 눌러도 체크된다.
 */
export function CheckField({
  id,
  label,
  defaultChecked = true,
  error,
}: CheckFieldProps) {
  const errorId = `${id}-error`;
  const inputId = `${id}-input`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2.5">
        <Checkbox
          id={inputId}
          render={(props) => <span {...props} id={id} />}
          name={id}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="size-5 border-foreground data-checked:border-foreground data-checked:bg-foreground"
        />
        <Label htmlFor={inputId} className="font-normal">
          {label}
        </Label>
      </div>
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
