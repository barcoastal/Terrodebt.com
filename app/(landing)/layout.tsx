import Link from "next/link";
import Image from "next/image";
import { VisitorTracker } from "@/components/site/VisitorTracker";
import { TrackingScripts } from "@/components/site/TrackingScripts";
import { OrgJsonLd } from "@/components/seo/OrgJsonLd";

// Revalidate at most every 5 min so DB-backed tracking settings (TrackingScripts)
// propagate without a redeploy.
export const revalidate = 300;

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrgJsonLd />
      <header className="border-b border-border bg-white">
        <div className="mx-auto max-w-content flex items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-3.5">
          <Link href="/" className="flex min-w-0 items-center gap-2 no-underline md:gap-3" aria-label="Business Debt Insider home">
            <Image src="/logos/bdi-icon.svg" alt="" width={48} height={48} priority className="h-9 w-auto md:h-12" />
            <Image src="/logos/freshline-lockup.svg" alt="Business Debt Insider" width={200} height={50} priority className="h-9 w-auto md:h-12" />
          </Link>
          <Link href="#assessment" className="shrink-0 whitespace-nowrap rounded-lg bg-slate px-3 py-1.5 text-xs font-medium text-white no-underline transition hover:bg-slate-soft md:px-4 md:py-2 md:text-sm">
            Free assessment
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <TrackingScripts />
      <VisitorTracker />
      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-content px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted">
          <div>
            <span className="font-medium text-slate">GRL Recovery LLC</span>
            <span className="mx-2 text-border">·</span>
            <span>6301 NW 5th Way 5100, Fort Lauderdale, FL 33309</span>
            <span className="mx-2 text-border">·</span>
            <span>
              Owned and operated by Shai Tamam, Phone:{" "}
              <a href="tel:+13054949487" className="hover:text-slate">305-494-9487</a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate">Privacy</Link>
            <Link href="/terms" className="hover:text-slate">Terms</Link>
            <Link href="/disclosure" className="hover:text-slate">Disclosure</Link>
            <span>© {new Date().getFullYear()} GRL Recovery LLC</span>
          </div>
        </div>
      </footer>
    </>
  );
}
