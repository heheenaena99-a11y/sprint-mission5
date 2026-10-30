import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppTabBar } from "@/components/app-tab-bar";
import { DeviceFrame } from "@/components/device-frame";
import { Pill } from "@/components/pill";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { findDeviceBySlug, getDevices } from "@/lib/repository";

/**
 * 틀 하나를 화면 폭에 맞게 최대한 크게 — 구간별 고정 비율(--s), 자바스크립트 없음.
 * 각 구간의 가장 좁은 폭에서 여백·테두리를 빼고도 넘치지 않는 값. 폰은 실제 크기(×1)까지만.
 */
const scaleClassName: Record<string, string> = {
  "fold-folded": "[--s:0.6] sm:[--s:1]",
  "fold-unfolded":
    "[--s:0.3] sm:[--s:0.58] md:[--s:0.72] lg:[--s:0.95] xl:[--s:1]",
  pc: "[--s:0.21] sm:[--s:0.39] md:[--s:0.48] lg:[--s:0.63] xl:[--s:0.8] 2xl:[--s:0.97]",
};

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

export default async function DevicePreviewPage({
  params,
}: PageProps<"/preview/[device]">) {
  const { device: slug } = await params;
  const device = findDeviceBySlug(slug);

  if (!device) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center gap-8 bg-canvas px-5 py-6 sm:px-9 sm:py-8 lg:px-12 lg:py-10">
        <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            href="/preview"
            className="text-[15px] font-bold text-primary hover:underline"
          >
            ←&nbsp;&nbsp;전체 보기
          </Link>
          <nav
            aria-label="기기 선택"
            className="-mx-5 flex w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 sm:mx-0 sm:w-auto sm:px-0"
          >
            {getDevices().map((item) => (
              <Pill
                key={item.slug}
                href={`/preview/${item.slug}`}
                selected={item.slug === device.slug}
                tone="brand"
                className="shrink-0 px-4 py-2 text-sm leading-[1.2]"
              >
                {item.name}
              </Pill>
            ))}
          </nav>
        </div>

        <DeviceFrame
          kind={device.kind}
          width={device.width}
          height={device.height}
          scaleClassName={scaleClassName[device.slug]}
          name={device.name}
          title={`리스크노트 홈 — ${device.name} 크게 보기`}
        />
      </main>
      <SiteFooter />
      <AppTabBar />
    </>
  );
}
