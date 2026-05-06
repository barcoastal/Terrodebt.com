import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { VisitorTracker } from "@/components/site/VisitorTracker";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <VisitorTracker />
      <SiteFooter />
    </>
  );
}
