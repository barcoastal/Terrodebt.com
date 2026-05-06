import { ORG_LD } from "@/lib/structured-data";

export function OrgJsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />;
}
