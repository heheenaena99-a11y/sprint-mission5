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
}: FormFieldProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {multiline ? (
        <Textarea
          id={id}
          name={id}
          placeholder={placeholder}
          className={cn(boxClassName, "min-h-[104px] py-3")}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(boxClassName, "h-auto py-3")}
        />
      )}
    </div>
  );
}
