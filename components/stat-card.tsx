type StatCardProps = {
  label: string;
  children: React.ReactNode;
};

export function StatCard({ label, children }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-card border border-border bg-white px-7 py-6">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2.5 text-[26px] leading-[1.2] font-bold md:text-[30px]">
        {children}
      </div>
    </div>
  );
}
