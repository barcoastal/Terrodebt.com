"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReviewLink } from "./ReviewLink";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: { pathname: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reviewHref = pathname === "/" ? "#free-review" : "/contact#review-request";

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-hairline">
      {/* Utility bar */}
      <div className="hidden md:block bg-ink text-paper">
        <div className="mx-auto max-w-content px-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] h-8">
          <span className="text-paper/85">
            Strategic financial consulting <span className="text-paper/40">·</span> Fort Lauderdale, FL
          </span>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-paper/75 hover:text-pine-bright no-underline transition">About</Link>
            <Link href="/contact" className="text-paper/75 hover:text-pine-bright no-underline transition">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-paper">
        <div className="mx-auto max-w-content px-4 sm:px-6 flex items-center justify-between gap-3 h-20 lg:h-24">
          <Link href="/" className="flex shrink-0 items-center gap-1 sm:gap-2 no-underline" aria-label="Business Debt Insider home">
            <Image src="/logos/bdi-icon.svg" alt="" width={56} height={56} priority className="h-8 sm:h-10 lg:h-11 w-auto" />
            <Image src="/logos/freshline-lockup.svg" alt="Business Debt Insider" width={224} height={56} priority className="h-7 sm:h-9 lg:h-10 w-auto" />
          </Link>
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-5 text-[11px] font-mono uppercase tracking-[0.12em] text-ink">
            {NAV.map((n) => {
              const active = pathname === n.href || pathname?.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`no-underline transition ${active ? "text-pine" : "text-ink hover:text-pine"}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ReviewLink
              href={reviewHref}
              placement="site-header"
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-11 items-center bg-pine text-paper px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold no-underline hover:bg-ink transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
            >
              Free review <span className="hidden sm:inline ml-2" aria-hidden>→</span>
            </ReviewLink>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center border border-hairline bg-paper text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-navigation" className="lg:hidden border-t border-hairline bg-paper">
          <nav aria-label="Mobile navigation" className="px-6 py-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block py-3 text-sm font-mono uppercase tracking-[0.18em] text-ink no-underline border-b border-hairline last:border-b-0 hover:text-pine"
              >
                {n.label}
              </Link>
            ))}
            <ReviewLink
              href={reviewHref}
              placement="site-mobile-menu"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center bg-pine text-paper px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.18em] no-underline"
            >
              Get my free debt review →
            </ReviewLink>
          </nav>
        </div>
      )}
    </header>
  );
}
