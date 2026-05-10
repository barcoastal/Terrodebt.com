import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { HeroBeam } from "@/components/site/HeroBeam";
import { Process } from "@/components/site/Process";
import { IndustriesShowcase } from "@/components/site/IndustriesShowcase";
import { FounderSection } from "@/components/site/FounderSection";
import { Faq } from "@/components/site/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HeroBeam />
      <Process />
      <IndustriesShowcase />
      <FounderSection />
      <Faq />
    </>
  );
}
