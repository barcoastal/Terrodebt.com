"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "@/lib/product-content";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { SearchPanel } from "./SearchPanel";

const TOOLS = [
  { href: "/tools/apr-calculator", label: "Effective APR Calculator", desc: "Compute the real annualized cost of an MCA" },
  { href: "/tools/stack-calculator", label: "MCA Stack Calculator", desc: "Map your daily debit, factor rate, and timeline" },
  { href: "/tools/health-check", label: "Debt Health Check", desc: "10-question diagnostic across your debt mix" },
];

const POPULAR_GUIDES = [
  { href: "/articles/what-is-reverse-consolidation", label: "What is reverse consolidation" },
  { href: "/articles/mca-settlement-vs-restructure", label: "Settlement vs restructure" },
  { href: "/articles/effective-apr-explained", label: "Effective APR explained" },
  { href: "/articles/coj-defense-basics", label: "COJ defense basics" },
];

export function MegaHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-offwhite border-b border-rule transition-shadow ${
        scrolled ? "shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]" : ""
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Utility bar */}
      <div className="hidden md:block bg-slate text-white/85">
        <div className="mx-auto max-w-content px-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider h-8">
          <span>TerraDebt Information Hub</span>
          <div className="flex items-center gap-5">
            <Link href="/about" className="text-white/85 hover:text-electric no-underline transition">About</Link>
            <Link href="/contact" className="text-white/85 hover:text-electric no-underline transition">Contact</Link>
            <Link href="/get-started" className="text-white/85 hover:text-electric no-underline transition">Free assessment</Link>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="mx-auto max-w-content px-6 flex items-center justify-between gap-6 py-3">
        <div className="flex items-center gap-2 md:gap-8">
          <Link href="/" className="flex items-center no-underline" aria-label="TerraDebt home">
            <Image src="/logos/terradebt-lockup.svg" alt="TerraDebt" width={150} height={22} priority />
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm text-slate">
            <NavItem
              label="Topics"
              active={openMenu === "topics"}
              onEnter={() => setOpenMenu("topics")}
            />
            <NavItem
              label="Industries"
              active={openMenu === "industries"}
              onEnter={() => setOpenMenu("industries")}
            />
            <NavItem
              label="Tools"
              active={openMenu === "tools"}
              onEnter={() => setOpenMenu("tools")}
            />
            <NavItem
              label="Guides"
              active={openMenu === "guides"}
              onEnter={() => setOpenMenu("guides")}
            />
            <Link
              href="/about"
              className="px-3 py-2 no-underline text-slate hover:text-electric transition"
              onMouseEnter={() => setOpenMenu(null)}
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <SearchPanel />
          </div>
          <Link
            href="/get-started"
            className="hidden md:inline-block bg-slate text-white px-3.5 py-2 text-xs font-mono uppercase tracking-wider no-underline hover:bg-slate-soft transition"
          >
            Get a free assessment
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center border border-rule bg-white p-2 text-slate"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mega menus */}
      {openMenu === "topics" && (
        <MegaPanel onClose={() => setOpenMenu(null)}>
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <PanelHeading>All six coverage areas</PanelHeading>
              <div className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {PRODUCTS.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/services/${p.slug}`}
                    className="group flex items-baseline gap-3 border-t border-rule pt-3 no-underline text-slate hover:text-electric transition"
                  >
                    <span className="text-sm font-medium tracking-tight">{p.name}</span>
                    <span className="ml-auto text-muted group-hover:text-electric" aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <PanelHeading>Popular guides</PanelHeading>
              <ul className="mt-4 space-y-2.5 text-sm">
                {POPULAR_GUIDES.map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="text-slate hover:text-electric no-underline transition">
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <PanelHeading>Featured</PanelHeading>
              <Link href="/articles" className="mt-4 block border border-rule bg-offwhite p-4 no-underline transition hover:border-slate">
                <span className="font-mono text-[10px] uppercase tracking-wider text-electric">Editorial</span>
                <p className="mt-1.5 text-sm font-semibold text-slate leading-snug">All TerraDebt guides</p>
                <p className="mt-1 text-xs text-muted">Browse the full archive</p>
              </Link>
            </div>
          </div>
        </MegaPanel>
      )}

      {openMenu === "industries" && (
        <MegaPanel onClose={() => setOpenMenu(null)}>
          <PanelHeading>Coverage by industry</PanelHeading>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
            {VERTICAL_CONTENT.map((v) => (
              <Link
                key={v.slug}
                href={`/industries/${v.slug}`}
                className="group flex items-baseline gap-3 border-t border-rule pt-3 no-underline text-slate hover:text-electric transition"
              >
                <span className="text-sm font-medium tracking-tight">{v.name}</span>
                <span className="ml-auto text-muted group-hover:text-electric" aria-hidden>→</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-rule">
            <Link
              href="/industries"
              className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline"
            >
              All industries →
            </Link>
          </div>
        </MegaPanel>
      )}

      {openMenu === "tools" && (
        <MegaPanel onClose={() => setOpenMenu(null)}>
          <PanelHeading>Calculators and tools</PanelHeading>
          <div className="mt-4 grid md:grid-cols-3 gap-px bg-rule border border-rule">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="bg-offwhite p-5 no-underline transition hover:bg-white"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-electric">Tool</span>
                <p className="mt-1.5 text-sm font-semibold text-slate">{t.label}</p>
                <p className="mt-1.5 text-xs text-muted leading-relaxed">{t.desc}</p>
              </Link>
            ))}
          </div>
        </MegaPanel>
      )}

      {openMenu === "guides" && (
        <MegaPanel onClose={() => setOpenMenu(null)}>
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <PanelHeading>Recent guides</PanelHeading>
              <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
                {POPULAR_GUIDES.concat([
                  { href: "/articles/how-mca-debt-relief-actually-works", label: "How MCA debt relief actually works" },
                  { href: "/articles/ucc-liens-and-account-freezes", label: "UCC liens and account freezes" },
                  { href: "/articles/sba-loan-modification-basics", label: "SBA loan modification basics" },
                  { href: "/articles/irs-business-tax-debt-options", label: "IRS business tax debt options" },
                ]).map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="text-slate hover:text-electric no-underline transition">
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5">
              <PanelHeading>Resources</PanelHeading>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/articles" className="text-slate hover:text-electric no-underline transition">
                    All articles
                  </Link>
                </li>
                <li>
                  <Link href="/glossary" className="text-slate hover:text-electric no-underline transition">
                    Glossary
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-slate hover:text-electric no-underline transition">
                    All tools
                  </Link>
                </li>
                <li>
                  <Link href="/industries" className="text-slate hover:text-electric no-underline transition">
                    Industries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </MegaPanel>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-rule bg-offwhite">
          <div className="px-6 py-4">
            <SearchPanel />
          </div>
          <nav className="border-t border-rule">
            <MobileGroup label="Topics">
              {PRODUCTS.map((p) => (
                <MobileLink key={p.slug} href={`/services/${p.slug}`}>{p.name}</MobileLink>
              ))}
            </MobileGroup>
            <MobileGroup label="Industries">
              {VERTICAL_CONTENT.map((v) => (
                <MobileLink key={v.slug} href={`/industries/${v.slug}`}>{v.name}</MobileLink>
              ))}
            </MobileGroup>
            <MobileGroup label="Tools">
              {TOOLS.map((t) => (
                <MobileLink key={t.href} href={t.href}>{t.label}</MobileLink>
              ))}
            </MobileGroup>
            <MobileGroup label="Guides">
              <MobileLink href="/articles">All articles</MobileLink>
              <MobileLink href="/glossary">Glossary</MobileLink>
            </MobileGroup>
            <div className="border-t border-rule p-4">
              <MobileLink href="/about">About</MobileLink>
              <MobileLink href="/contact">Contact</MobileLink>
              <MobileLink href="/get-started">Free assessment</MobileLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ label, active, onEnter }: { label: string; active: boolean; onEnter: () => void }) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onClick={onEnter}
      className={`px-3 py-2 text-sm no-underline transition ${
        active ? "text-electric" : "text-slate hover:text-electric"
      }`}
    >
      {label}
    </button>
  );
}

function MegaPanel({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="absolute inset-x-0 top-full border-t border-rule bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="mx-auto max-w-content px-6 py-7">
        {children}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute right-6 top-3 text-muted hover:text-slate"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
    </div>
  );
}

function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{children}</span>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-rule">
      <div className="px-6 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</span>
      </div>
      <div className="px-6 py-3 flex flex-col">{children}</div>
    </div>
  );
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block py-1.5 text-sm text-slate no-underline hover:text-electric transition">
      {children}
    </Link>
  );
}
