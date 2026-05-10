import { Hero } from "@/components/site/Hero";
import { StatsBand } from "@/components/site/StatsBand";
import { FeatureBento } from "@/components/site/FeatureBento";
import { AprComparison } from "@/components/site/AprComparison";
import { HeroBeam } from "@/components/site/HeroBeam";
import { Process } from "@/components/site/Process";
import { IndustriesShowcase } from "@/components/site/IndustriesShowcase";
import { FeaturedArticles } from "@/components/site/FeaturedArticles";
import { FounderSection } from "@/components/site/FounderSection";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <FeatureBento />
      <AprComparison />
      <HeroBeam />
      <Process />
      <IndustriesShowcase />
      <FeaturedArticles />
      <FounderSection />
      <Faq />
      <FinalCta />
    </>
  );
}
