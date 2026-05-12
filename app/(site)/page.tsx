import { EditorialHero } from "@/components/site/EditorialHero";
import { TopicAreas } from "@/components/site/TopicAreas";
import { ResearchBand } from "@/components/site/ResearchBand";
import { FeaturedEssays } from "@/components/site/FeaturedEssays";
import { AprComparison } from "@/components/site/AprComparison";
import { AboutTheFirm } from "@/components/site/AboutTheFirm";
import { FaqQuiet } from "@/components/site/FaqQuiet";
import { EditorialClose } from "@/components/site/EditorialClose";

export default function Home() {
  return (
    <>
      <EditorialHero />
      <TopicAreas />
      <FeaturedEssays />
      <ResearchBand />
      <AprComparison />
      <AboutTheFirm />
      <FaqQuiet />
      <EditorialClose />
    </>
  );
}
