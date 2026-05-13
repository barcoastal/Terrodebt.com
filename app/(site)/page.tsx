import { HubHero } from "@/components/site/HubHero";
import { CoverageList } from "@/components/site/CoverageList";
import { SituationPicker } from "@/components/site/SituationPicker";
import { ToolsRow } from "@/components/site/ToolsRow";
import { ArticlesBlock } from "@/components/site/ArticlesBlock";
import { IndustryGrid } from "@/components/site/IndustryGrid";
import { AboutStrip } from "@/components/site/AboutStrip";
import { HelpLink } from "@/components/site/HelpLink";

export default function Home() {
  return (
    <>
      <HubHero />
      <CoverageList />
      <SituationPicker />
      <ToolsRow />
      <ArticlesBlock />
      <IndustryGrid />
      <AboutStrip />
      <HelpLink />
    </>
  );
}
