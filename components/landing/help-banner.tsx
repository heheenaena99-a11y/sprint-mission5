import { ButtonLink } from "@/components/button-link";

export function HelpBanner() {
  return (
    <div className="flex w-full flex-col gap-6 rounded-card border border-border bg-white px-6 py-8 md:flex-row md:items-center md:px-11 md:py-9">
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-[22px] leading-[1.3] font-bold md:text-2xl">
          어떤 작업부터 평가해야 할지 모르겠나요?
        </p>
        <p className="text-muted-foreground">
          작성된 예시를 보고 우리 사업장에 맞게 따라 써 보세요.
        </p>
      </div>
      <ButtonLink
        href="/assessments/1"
        size="lg"
        className="self-start md:self-auto"
      >
        작성 예시 보기
      </ButtonLink>
    </div>
  );
}
