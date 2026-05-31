import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  { href: "/services/forensic-audit", label: "Forensic Financial Auditing" },
  { href: "/services/liquidity-engineering", label: "Liquidity Engineering" },
  { href: "/services/creditor-liaison", label: "Creditor Liaison & Communication" },
  { href: "/services/operational-restructuring", label: "Operational Restructuring" },
];

const SECONDARY = [
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/tools", label: "Tools" },
  { href: "/programs", label: "Programs" },
  { href: "/mca-defense", label: "MCA defense by state" },
  { href: "/glossary", label: "Glossary" },
  { href: "/trust", label: "Trust & outcomes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclosure", label: "Disclosure" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-paper border-t border-hairline">
      {/* Compliance band */}
      <div className="bg-paper-mute border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink leading-relaxed">
            GRL Recovery LLC <span className="text-muted">·</span> Strategic financial consulting <span className="text-muted">·</span> Not a law firm <span className="text-muted">·</span> Not a lender <span className="text-muted">·</span> We coordinate with state-licensed counsel for legal defense matters <span className="text-muted">·</span> Clients are encouraged to consult independent counsel for legal matters
          </p>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-content px-6 py-14 grid gap-10 md:grid-cols-12 text-sm">
        <div className="md:col-span-3">
          <div className="mb-5 flex items-center gap-3">
            <Image src="/logos/bdi-icon.svg" alt="" width={48} height={48} className="h-12 w-auto" />
            <Image
              src="/logos/freshline-lockup.svg"
              alt="Business Debt Insider"
              width={200}
              height={50}
              className="h-12 w-auto"
            />
          </div>
          <p className="text-ink leading-relaxed text-sm">
            Business Debt Insider is the trade name of GRL Recovery LLC, a strategic financial consulting practice based in Fort Lauderdale, FL. The practice serves small and mid-sized enterprises navigating stacked short-term debt.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
            Services
          </div>
          <ul className="space-y-2.5 text-ink">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="no-underline text-ink hover:text-pine transition"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
            Practice
          </div>
          <ul className="space-y-2.5 text-ink">
            {SECONDARY.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="no-underline text-ink hover:text-pine transition"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
            Office
          </div>
          <address className="not-italic text-ink leading-relaxed text-sm">
            <span className="font-semibold block">GRL Recovery LLC</span>
            6301 NW 5th Way, Suite 5100<br />
            Fort Lauderdale, FL 33309
          </address>
          <p className="mt-3 text-sm text-ink">
            <Link href="mailto:hello@businessdebtinsider.com" className="text-ink hover:text-pine no-underline">
              hello@businessdebtinsider.com
            </Link>
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-pine no-underline transition"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-content px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.16em] text-muted">
          <div>
            &copy; {new Date().getFullYear()} GRL Recovery LLC. Business Debt Insider is a trade name of GRL Recovery LLC. Entity formed April 1, 2026.
          </div>
          <div className="text-muted">
            Strategic financial consulting <span className="text-hairline">·</span> Fort Lauderdale, FL
          </div>
        </div>
      </div>
    </footer>
  );
}
