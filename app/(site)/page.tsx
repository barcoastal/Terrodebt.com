import { FeaturedEditorial } from "@/components/site/FeaturedEditorial";
import { TopicShelves } from "@/components/site/TopicShelves";
import { CalculatorsRow } from "@/components/site/CalculatorsRow";
import { IndustriesCompact } from "@/components/site/IndustriesCompact";
import { MethodologyStrip } from "@/components/site/MethodologyStrip";
import { NewsletterStrip } from "@/components/site/NewsletterStrip";

export default function Home() {
  return (
    <>
      <FeaturedEditorial />
      <TopicShelves />
      <CalculatorsRow />
      <IndustriesCompact />
      <MethodologyStrip />
      <NewsletterStrip source="homepage-strip" />
    </>
  );
}
