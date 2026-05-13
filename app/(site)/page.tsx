import { HeroSplit } from "@/components/site/HeroSplit";
import { CoverageBlock } from "@/components/site/CoverageBlock";
import { ApproachStrip } from "@/components/site/ApproachStrip";
import { IndustryGrid } from "@/components/site/IndustryGrid";
import { StatBand } from "@/components/site/StatBand";
import { ArticlesBlock } from "@/components/site/ArticlesBlock";
import { AboutStrip } from "@/components/site/AboutStrip";
import { Closer } from "@/components/site/Closer";

export default function Home() {
  return (
    <>
      <HeroSplit />
      <CoverageBlock />
      <ApproachStrip />
      <IndustryGrid />
      <StatBand />
      <ArticlesBlock />
      <AboutStrip />
      <Closer />
    </>
  );
}
