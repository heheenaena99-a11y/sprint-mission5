type FormCardProps = {
  title: string;
  children: React.ReactNode;
};

/** 작성 화면의 흰색 섹션 카드 */
export function FormCard({ title, children }: FormCardProps) {
  return (
    <section className="flex w-full flex-col gap-5 rounded-card border border-border bg-white p-6 md:p-8">
      <h2 className="text-[22px] leading-[1.3] font-medium">{title}</h2>
      {children}
    </section>
  );
}
