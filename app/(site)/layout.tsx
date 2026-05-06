import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { VisitorTracker } from "@/components/site/VisitorTracker";
import { Analytics } from "@/components/site/Analytics";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <Analytics measurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
      <VisitorTracker />
      <SiteFooter />
    </>
  );
}
