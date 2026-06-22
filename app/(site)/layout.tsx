import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { VisitorTracker } from "@/components/site/VisitorTracker";
import { TrackingScripts } from "@/components/site/TrackingScripts";
import { OrgJsonLd } from "@/components/seo/OrgJsonLd";

// Revalidate the shared layout (incl. TrackingScripts, which reads DB-backed
// pixel/script settings) at most every 5 min so tracking changes made in
// /admin/settings propagate site-wide without a redeploy.
export const revalidate = 300;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrgJsonLd />
      <SiteHeader />
      <main>{children}</main>
      <TrackingScripts />
      <VisitorTracker />
      <SiteFooter />
    </>
  );
}
