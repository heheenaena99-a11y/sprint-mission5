import Link from "next/link";

type AuthCardProps = {
  title: string;
  description: string;
  switchText: string;
  switchHref: string;
  switchLabel: string;
  /** 전환 링크 아래에 붙는 내용 (예: 체험 계정 안내) */
  footer?: React.ReactNode;
  children: React.ReactNode;
};

/** 로그인·회원가입 공통 카드 (그라데이션 배경 + 흰 카드 + 전환 링크) */
export function AuthCard({
  title,
  description,
  switchText,
  switchHref,
  switchLabel,
  footer,
  children,
}: AuthCardProps) {
  return (
    <main className="flex flex-1 justify-center bg-[linear-gradient(to_bottom,#e3edff,#f5f9ff_50%,#ffffff)] px-5 pt-12 pb-20 md:pt-20 md:pb-[120px]">
      <div className="flex h-fit w-full max-w-[460px] flex-col gap-5 rounded-card border border-border bg-white p-6 shadow-[0_8px_32px_0_rgba(13,23,38,0.08)] md:p-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] leading-[1.25] font-bold md:text-[32px]">
            {title}
          </h1>
          <p className="text-[15px] text-muted-foreground">{description}</p>
        </div>
        {children}
        <p className="flex justify-center gap-1.5 text-sm leading-[1.5]">
          <span className="text-muted-foreground">{switchText}</span>
          <Link
            href={switchHref}
            className="font-bold text-link hover:underline"
          >
            {switchLabel}
          </Link>
        </p>
        {footer}
      </div>
    </main>
  );
}
