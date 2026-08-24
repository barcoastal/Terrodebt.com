import type { Metadata } from "next";
import { SLIDER_LP_CONFIGS } from "@/lib/slider-lp-config";
import { SliderLp } from "@/components/lp/SliderLp";

const lp = SLIDER_LP_CONFIGS["mca"];

export const metadata: Metadata = {
  title: lp.metaTitle,
  description: lp.metaDescription,
  robots: { index: false, follow: false },
};

export default function McaLandingPage() {
  return <SliderLp lp={lp} />;
}
