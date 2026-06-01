import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-paper border-b border-hairline">
      <div className="mx-auto max-w-content px-6 py-20 md:py-28">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
          404
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl md:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
          That page is not where it used to be.
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-ink leading-relaxed">
          The link may have moved, the article may have been retired, or the URL may have a typo. A few places that probably have what you were looking for:
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-8 max-w-3xl">
          <NavBlock
            eyebrow="Services"
            items={[
              { href: "/services/business-debt-relief", label: "Business Debt Relief" },
              { href: "/services/business-debt-restructuring", label: "Business Debt Restructuring" },
              { href: "/services/business-debt-resolution", label: "Business Debt Resolution" },
              { href: "/services/bankruptcy-alternative", label: "Bankruptcy Alternative" },
            ]}
          />
          <NavBlock
            eyebrow="Tools"
            items={[
              { href: "/tools/apr-calculator", label: "Effective APR Calculator" },
              { href: "/tools/stack-calculator", label: "MCA Stack Calculator" },
              { href: "/tools/health-check", label: "Debt Health Check" },
              { href: "/insights", label: "All insights" },
            ]}
          />
          <NavBlock
            eyebrow="Industries"
            items={[
              { href: "/industries/trucking", label: "Trucking" },
              { href: "/industries/restaurants", label: "Restaurants" },
              { href: "/industries/healthcare-practices", label: "Healthcare practices" },
              { href: "/industries", label: "All industries" },
            ]}
          />
          <NavBlock
            eyebrow="Talk to the practice"
            items={[
              { href: "/contact", label: "Schedule an initial review" },
              { href: "/about", label: "About the practice" },
              { href: "/glossary", label: "Business debt glossary" },
              { href: "/", label: "Home" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function NavBlock({ eyebrow, items }: { eyebrow: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {eyebrow}
      </span>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="text-base text-ink no-underline border-b border-hairline pb-0.5 hover:text-pine hover:border-pine transition"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
