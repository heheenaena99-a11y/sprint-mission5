import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { InPageNav } from "@/components/landing/in-page-nav";
import { Overview } from "@/components/landing/overview";
import { RiskGrades } from "@/components/landing/risk-grades";
import { Stats } from "@/components/landing/stats";
import { Steps } from "@/components/landing/steps";
import { AppTabBar } from "@/components/app-tab-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <InPageNav />
        <Overview searchParams={searchParams} />
        <Steps />
        <RiskGrades />
        <Stats />
        <Features />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <AppTabBar active="home" />
    </>
  );
}
