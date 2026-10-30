import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cn } from "cn";

import { DeviceFrame } from "@/components/device-frame";
import { Pill } from "@/components/pill";
import { PreviewBar } from "@/components/preview-bar";
import { findDeviceBySlug, getDevices } from "@/lib/repository";

/**
 * 기기별 단독 보기 규칙
 * - stage: 틀 배율 (globals.css 의 stage-* — 폭·높이 미디어쿼리 단계별, 최대 ×1.4)
 * - fullscreen: 이 구간에서는 틀 없이 남은 화면 전체 (위 막대·알약 줄 제외)
 * - mainFull: 틀 없는 구간에서 무대 여백 없애기
 */
const stage = {
  "fold-folded": {
    stage: "stage-fold-folded",
    fullscreen: "below-sm",
    mainFull: "max-sm:p-0",
  },
  "fold-unfolded": {
    stage: "stage-fold-unfolded",
    fullscreen: "below-lg",
    mainFull: "max-lg:p-0",
  },
  pc: { stage: "stage-pc", fullscreen: "lg-up", mainFull: "lg:p-0" },
} as const;

export function generateStaticParams() {
  return getDevices().map((device) => ({ device: device.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/preview/[device]">): Promise<Metadata> {
  const { device: slug } = await params;
  const device = findDeviceBySlug(slug);

  if (!device) {
    return { title: "기기를 찾을 수 없음 | 리스크노트" };
  }

  return {
    title: `${device.name} 미리보기 | 리스크노트`,
    description: `리스크노트 홈을 ${device.name}(${device.width}×${device.height}) 크기로 크게 봅니다.`,
  };
}

/** 전시용 화면 — 화면 높이에 고정, 바깥은 스크롤 없이 iframe 안에서만 스크롤 */
export default async function DevicePreviewPage({
  params,
}: PageProps<"/preview/[device]">) {
  const { device: slug } = await params;
  const device = findDeviceBySlug(slug);

  if (!device || !(device.slug in stage)) notFound();

  const rule = stage[device.slug as keyof typeof stage];

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-canvas">
      <PreviewBar />
      <nav
        aria-label="기기 선택"
        className="flex h-12 shrink-0 items-center gap-2 overflow-x-auto border-b border-border bg-white px-4 sm:justify-center sm:px-6"
      >
        {getDevices().map((item) => (
          <Pill
            key={item.slug}
            href={`/preview/${item.slug}`}
            selected={item.slug === device.slug}
            tone="brand"
            className="shrink-0 px-3.5 py-1.5 text-[13px] leading-[1.2]"
          >
            {item.name}
          </Pill>
        ))}
      </nav>

      <main
        className={cn(
          "flex min-h-0 flex-1 items-center justify-center overflow-auto p-4",
          rule.mainFull,
        )}
      >
        <DeviceFrame
          kind={device.kind}
          width={device.width}
          height={device.height}
          scaleClassName={rule.stage}
          fullscreen={rule.fullscreen}
          name={device.name}
          title={`리스크노트 홈 — ${device.name} 크게 보기`}
        />
      </main>
    </div>
  );
}
