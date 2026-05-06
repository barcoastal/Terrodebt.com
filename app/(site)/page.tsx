import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { HowItWorks } from "@/components/site/HowItWorks";
import { VerticalGrid } from "@/components/site/VerticalGrid";
import { CaseStudyCarousel } from "@/components/site/CaseStudyCarousel";
import { FounderSection } from "@/components/site/FounderSection";
import { Faq } from "@/components/site/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <VerticalGrid />
      <CaseStudyCarousel />
      <FounderSection />
      <Faq />
    </>
  );
}
