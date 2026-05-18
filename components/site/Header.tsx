"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
        <div className="mx-auto max-w-content px-6 flex items-center justify-between gap-6 h-24 md:h-28">
          <Link href="/" className="flex items-center no-underline" aria-label="Business Debt Insider home">
            <Image src="/logos/freshline-lockup.svg" alt="Business Debt Insider" width={224} height={56} priority className="h-12 md:h-14 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-[11px] font-mono uppercase tracking-[0.18em] text-ink">
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
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center bg-pine text-paper px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.18em] no-underline hover:bg-ink transition"
            >
              Initial review →
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden inline-flex items-center justify-center border border-ink bg-paper p-2 text-ink"
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
        <div className="md:hidden border-t border-hairline bg-paper">
          <nav className="px-6 py-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block py-3 text-sm font-mono uppercase tracking-[0.18em] text-ink no-underline border-b border-hairline last:border-b-0 hover:text-pine"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center bg-pine text-paper px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.18em] no-underline"
            >
              Initial review →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
