import { EditorialHero } from "@/components/site/EditorialHero";
import { TopicAreas } from "@/components/site/TopicAreas";
import { ResearchBand } from "@/components/site/ResearchBand";
import { FeaturedEssays } from "@/components/site/FeaturedEssays";
import { AprComparison } from "@/components/site/AprComparison";
import { AboutTerraDebt } from "@/components/site/AboutTerraDebt";
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
      <AboutTerraDebt />
      <FaqQuiet />
      <EditorialClose />
    </>
  );
}
