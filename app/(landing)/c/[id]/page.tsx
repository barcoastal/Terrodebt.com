import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SLIDER_LP_CONFIGS, getSliderLpIds } from "@/lib/slider-lp-config";
import { SliderLp } from "@/components/lp/SliderLp";

export async function generateStaticParams() {
  return getSliderLpIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lp = SLIDER_LP_CONFIGS[id];
  if (!lp) return {};
  return {
    title: lp.metaTitle,
    description: lp.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function CampaignLandingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lp = SLIDER_LP_CONFIGS[id];
  if (!lp) notFound();
  return <SliderLp lp={lp} />;
}
