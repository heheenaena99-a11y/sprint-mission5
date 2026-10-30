import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";

/** 폼 제출 버튼 — ButtonLink(primary) 와 같은 모양 */
export function SubmitButton({
  pending,
  className,
  children,
}: {
  pending: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        buttonVariants(),
        "h-auto rounded-button px-4 py-3 text-sm font-bold",
        className,
      )}
    >
      {pending ? "확인하는 중…" : children}
    </button>
  );
}
