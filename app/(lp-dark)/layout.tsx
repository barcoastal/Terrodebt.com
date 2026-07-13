import Link from "next/link";
import { VisitorTracker } from "@/components/site/VisitorTracker";
import { TrackingScripts } from "@/components/site/TrackingScripts";
import { OrgJsonLd } from "@/components/seo/OrgJsonLd";

export const revalidate = 300;

// Dark landing chrome: standalone nav + disclosure footer, no site header.
export default function DarkLandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0F0E] text-[#F0F5F4]">
      <OrgJsonLd />
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#0A0F0E]/90 px-6 py-4 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#00C896] text-[13px] font-extrabold text-black">B</span>
          <span className="text-sm font-bold tracking-tight text-white">
            Business<span className="text-[#00C896]">Debt</span>Insider
          </span>
        </Link>
        <a
          href="#assessment"
          className="rounded-lg bg-[#00C896] px-4 py-2 text-[13px] font-bold text-black no-underline transition hover:bg-[#00E6AC]"
        >
          Get free assessment
        </a>
      </nav>

      <main>{children}</main>
      <TrackingScripts />
      <VisitorTracker />

      <footer className="mx-auto max-w-5xl border-t border-white/10 px-6 py-8">
        <div className="mb-5 rounded-lg border border-white/10 bg-[#111817] p-5 text-xs leading-relaxed text-[#5A706A]">
          <strong className="text-[#8FA89F]">Disclosure.</strong> Business Debt Insider is a trade
          name of GRL Recovery LLC. We are not a law firm and do not provide legal advice. When
          legal coordination is required, we work with licensed attorneys in your state. Program
          outcomes vary based on advance mix, contract terms, status, and other factors. Most
          programs resolve in 6 to 18 months. Restructuring activity may impact your business
          credit profile.
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#5A706A]">
          <span>GRL Recovery LLC · 6301 NW 5th Way 5100, Fort Lauderdale, FL 33309</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-[#00C896]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#00C896]">Terms</Link>
            <Link href="/disclosure" className="hover:text-[#00C896]">Disclosure</Link>
            <span>© {new Date().getFullYear()} GRL Recovery LLC</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
