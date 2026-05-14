import Link from "next/link";
import Image from "next/image";
import { VisitorTracker } from "@/components/site/VisitorTracker";
import { Analytics } from "@/components/site/Analytics";
import { OrgJsonLd } from "@/components/seo/OrgJsonLd";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrgJsonLd />
      <header className="border-b border-border bg-white">
        <div className="mx-auto max-w-content flex items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center no-underline" aria-label="Freshline Advisory home">
            <Image src="/logos/freshline-lockup.svg" alt="Freshline Advisory" width={170} height={26} priority />
          </Link>
          <Link href="#assessment" className="bg-slate text-white px-4 py-2 rounded-lg text-sm font-medium no-underline hover:bg-slate-soft transition">
            Get free assessment
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <Analytics measurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
      <VisitorTracker />
      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-content px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted">
          <div>
            <span className="font-medium text-slate">GRL Recovery LLC</span>
            <span className="mx-2 text-border">·</span>
            <span>6301 NW 5th Way 5100, Fort Lauderdale, FL 33309</span>
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
