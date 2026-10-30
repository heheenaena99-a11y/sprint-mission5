import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CheckFieldProps = {
  id: string;
  label: string;
};

/** 체크박스 + 라벨 묶음 (shadcn Checkbox·Label, 시안처럼 체크된 상태로 표시) */
export function CheckField({ id, label }: CheckFieldProps) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox
        id={id}
        defaultChecked
        className="size-5 border-foreground data-checked:border-foreground data-checked:bg-foreground"
      />
      <Label htmlFor={id} className="font-normal">
        {label}
      </Label>
    </div>
  );
}
