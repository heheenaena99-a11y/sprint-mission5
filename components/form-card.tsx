import { cn } from "cn";

type FormCardProps = {
  title: string;
  /** 카드 위치 (주소 #앵커로 이동할 때) */
  id?: string;
  /** 제목 옆에 붙는 링크 등 (예: "삭제") */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/** 작성 화면의 흰색 섹션 카드 */
export function FormCard({
  title,
  id,
  action,
  className,
  children,
}: FormCardProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex w-full flex-col gap-5 rounded-card border border-border bg-white p-6 md:p-8",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[22px] leading-[1.3] font-medium">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
