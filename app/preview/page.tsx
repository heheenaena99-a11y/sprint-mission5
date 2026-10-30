import type { Metadata } from "next";
import Link from "next/link";

import { DeviceFrame } from "@/components/device-frame";
import { PreviewBar } from "@/components/preview-bar";
import { getDevices } from "@/lib/repository";

export const metadata: Metadata = {
  title: "기기별 미리보기 | 리스크노트",
  description:
    "리스크노트 화면을 갤럭시 Z 폴드8 접은·펼친 화면과 PC 크기로 미리 봅니다.",
};

/** 화면 폭 구간별 고정 축소 비율(--s) — 넓은 화면: 폰 2개 나란히 + PC 아래 */
const scaleClassName: Record<string, string> = {
  "fold-folded": "[--s:0.6] sm:[--s:0.8] lg:[--s:0.6] xl:[--s:0.75]",
  "fold-unfolded": "[--s:0.32] sm:[--s:0.55] lg:[--s:0.6] xl:[--s:0.75]",
  pc: "[--s:0.21] sm:[--s:0.4] lg:[--s:0.6] xl:[--s:0.75]",
};

/** 틀 아래 링크 — 폴드는 단독 보기, PC는 실제 사이트로 */
const actions: Record<string, { href: string; label: string }> = {
  "fold-folded": {
    href: "/preview/fold-folded",
    label: "이 화면만 크게 보기 →",
  },
  "fold-unfolded": {
    href: "/preview/fold-unfolded",
    label: "이 화면만 크게 보기 →",
  },
  pc: { href: "/", label: "PC 화면으로 열기 →" },
};

/** 전시용 화면 — 사이트 헤더·탭 바·푸터 없이 위 막대만 */
export default function PreviewPage() {
  const devices = getDevices();
  const phones = devices.filter((device) => device.kind === "phone");
  const pcs = devices.filter((device) => device.kind === "pc");

  const renderFrame = (device: (typeof devices)[number]) => (
    <DeviceFrame
      key={device.slug}
      kind={device.kind}
      width={device.width}
      height={device.height}
      scaleClassName={scaleClassName[device.slug]}
      name={device.name}
      title={`리스크노트 홈 — ${device.name} 미리보기`}
      action={
        <Link
          href={actions[device.slug].href}
          className="font-bold text-primary hover:underline"
        >
          {actions[device.slug].label}
        </Link>
      }
    />
  );

  return (
    <>
      <PreviewBar />
      <main className="flex flex-1 flex-col items-center gap-10 bg-canvas px-5 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-2xl leading-[1.3] font-bold sm:text-[28px] lg:text-[40px] lg:leading-[1.25]">
            리스크노트 기기별 미리보기
          </h1>
          <p className="text-sm leading-[1.55] text-muted-foreground lg:text-[17px]">
            같은 주소가 화면 크기에 따라 이렇게 바뀝니다. 틀 안에서 스크롤하고
            눌러 볼 수 있어요.
          </p>
          <p className="text-sm leading-[1.55] text-muted-foreground lg:text-[15px]">
            휴대폰·PC에서 실제로 볼 때는 risknote.vercel.app 을 그대로 열면
            화면에 꽉 차게 보여요.
          </p>
        </div>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-end lg:justify-center">
          {phones.map(renderFrame)}
        </div>
        {pcs.map(renderFrame)}
      </main>
    </>
  );
}
