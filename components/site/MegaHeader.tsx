"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "@/lib/product-content";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";

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

const CATEGORY_NAV = [
  { href: "/services/mca-debt-relief", label: "MCA Debt Relief" },
  { href: "/services/sba-loan-modification", label: "SBA Loans" },
  { href: "/services/equipment-finance-restructure", label: "Equipment" },
  { href: "/services/vendor-supplier-debt", label: "Vendor" },
  { href: "/services/bank-loan-workout", label: "Bank" },
  { href: "/services/business-tax-debt", label: "Tax Debt" },
];

export function MegaHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-40 bg-paper border-b border-ink"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Row 1: black utility bar */}
      <div className="hidden md:block bg-ink text-white">
        <div className="mx-auto max-w-content px-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] h-8">
          <span className="text-white/90">TerraDebt Information Hub</span>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-white/80 hover:text-electric-soft no-underline transition">About</Link>
            <Link href="/contact" className="text-white/80 hover:text-electric-soft no-underline transition">Contact</Link>
            <Link href="/#subscribe" className="text-white/80 hover:text-electric-soft no-underline transition">Subscribe</Link>
          </div>
        </div>
      </div>

      {/* Row 2: main bar, pure white */}
      <div className="bg-paper">
        <div className="mx-auto max-w-content px-6 flex items-center justify-between gap-6 h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center no-underline" aria-label="TerraDebt home">
              <Image src="/logos/terradebt-lockup.svg" alt="TerraDebt" width={150} height={22} priority />
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-[15px] font-semibold tracking-tight text-ink">
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
                className="px-4 py-2 no-underline text-ink hover:text-electric transition"
                onMouseEnter={() => setOpenMenu(null)}
              >
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/get-started"
              className="hidden md:inline-flex items-center bg-ink text-white px-5 py-3 text-xs font-mono uppercase tracking-[0.18em] no-underline hover:bg-electric hover:text-ink transition"
            >
              Free Assessment
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

      {/* Row 3: category subnav, with strong rules */}
      <div className="hidden md:block bg-paper border-t border-ink">
        <div className="mx-auto max-w-content px-6">
          <nav className="flex items-stretch divide-x divide-rule">
            {CATEGORY_NAV.map((c) => {
              const active = pathname?.startsWith(c.href);
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className={`group flex-1 text-center px-4 py-3 no-underline text-[12px] font-mono uppercase tracking-[0.14em] transition ${
                    active ? "text-electric" : "text-ink hover:text-electric"
                  }`}
                >
                  <span className={`inline-block pb-1 border-b-2 ${active ? "border-electric" : "border-transparent group-hover:border-electric"}`}>
                    {c.label}
                  </span>
                </Link>
              );
            })}
          </nav>
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
                    className="group flex items-baseline gap-3 border-t border-rule pt-3 no-underline text-ink hover:text-electric transition"
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
                    <Link href={g.href} className="text-ink hover:text-electric no-underline transition">
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <PanelHeading>Featured</PanelHeading>
              <Link href="/articles" className="mt-4 block border border-ink bg-paper p-4 no-underline transition hover:bg-ink hover:text-white group">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-electric">Editorial</span>
                <p className="mt-1.5 text-sm font-semibold text-ink group-hover:text-white leading-snug">All TerraDebt guides</p>
                <p className="mt-1 text-xs text-muted group-hover:text-white/70">Browse the full archive</p>
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
                className="group flex items-baseline gap-3 border-t border-rule pt-3 no-underline text-ink hover:text-electric transition"
              >
                <span className="text-sm font-medium tracking-tight">{v.name}</span>
                <span className="ml-auto text-muted group-hover:text-electric" aria-hidden>→</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-rule">
            <Link
              href="/industries"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric no-underline hover:underline"
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
                className="bg-paper p-5 no-underline transition hover:bg-paper-soft"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-electric">Tool</span>
                <p className="mt-1.5 text-sm font-semibold text-ink">{t.label}</p>
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
                    <Link href={g.href} className="text-ink hover:text-electric no-underline transition">
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5">
              <PanelHeading>Resources</PanelHeading>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/articles" className="text-ink hover:text-electric no-underline transition">All articles</Link></li>
                <li><Link href="/glossary" className="text-ink hover:text-electric no-underline transition">Glossary</Link></li>
                <li><Link href="/tools" className="text-ink hover:text-electric no-underline transition">All tools</Link></li>
                <li><Link href="/industries" className="text-ink hover:text-electric no-underline transition">Industries</Link></li>
              </ul>
            </div>
          </div>
        </MegaPanel>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink bg-paper">
          <nav>
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
      className={`px-4 py-2 text-[15px] font-semibold no-underline transition ${
        active ? "text-electric" : "text-ink hover:text-electric"
      }`}
    >
      {label}
    </button>
  );
}

function MegaPanel({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="absolute inset-x-0 top-full border-t border-ink bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="mx-auto max-w-content px-6 py-7">
        {children}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute right-6 top-3 text-muted hover:text-ink"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
    </div>
  );
}

function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{children}</span>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-rule">
      <div className="px-6 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{label}</span>
      </div>
      <div className="px-6 py-3 flex flex-col">{children}</div>
    </div>
  );
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block py-1.5 text-sm text-ink no-underline hover:text-electric transition">
      {children}
    </Link>
  );
}
