import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { findProduct, getProductSlugs, PRODUCTS } from "@/lib/product-content";
import { db } from "@/lib/db";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { Toc, type TocItem } from "@/components/site/Toc";
import { RelatedShelf } from "@/components/site/RelatedShelf";
import { NewsletterStrip } from "@/components/site/NewsletterStrip";
import { CompareTable } from "@/components/site/CompareTable";

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = findProduct(slug);
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.metaDescription,
  };
}

const SECTIONS: { id: string; label: string }[] = [
  { id: "what-it-is", label: "What it is" },
  { id: "who-it-fits", label: "Who it fits" },
  { id: "methods", label: "Methods" },
  { id: "scenario", label: "Typical scenario" },
  { id: "pitfalls", label: "Pitfalls" },
  { id: "faq", label: "FAQ" },
];

const COMPARE_BY_SLUG: Record<string, { eyebrow: string; heading: string; optionA: string; optionB: string; rows: { feature: string; optionA: string; optionB: string }[] }> = {
  "mca-debt-relief": {
    eyebrow: "Compare",
    heading: "Settlement vs Restructure on MCA debt",
    optionA: "Settlement",
    optionB: "Restructure",
    rows: [
      { feature: "Typical outcome", optionA: "Lump sum payoff at 40 to 60 cents on the dollar", optionB: "Renegotiated terms, longer schedule, lower daily debit" },
      { feature: "Timeline", optionA: "8 to 14 months", optionB: "12 to 18 months" },
      { feature: "Daily debits", optionA: "Paused via reconciliation, replaced with escrow funding", optionB: "Modified daily debit or moved to weekly/monthly schedule" },
      { feature: "Credit impact", optionA: "Temporary hit during settlement, then recovers", optionB: "Lower impact, performing modification" },
      { feature: "Best when", optionA: "Stack is large, balances need reduction, business is operational", optionB: "Business wants to keep paying but at a different rate or pace" },
      { feature: "Personal guaranty", optionA: "Released on each settled contract with clean closeout", optionB: "Stays in place but loan returns to performing status" },
    ],
  },
  "sba-loan-modification": {
    eyebrow: "Compare",
    heading: "Modification vs Offer in Compromise on SBA loans",
    optionA: "Modification",
    optionB: "Offer in Compromise",
    rows: [
      { feature: "What it is", optionA: "Permanent change to rate, term, payment, or amortization", optionB: "Partial settlement of the SBA balance" },
      { feature: "Qualification", optionA: "Documented hardship plus credible recovery pro forma", optionB: "Cannot reasonably pay full balance under collection period" },
      { feature: "Timeline", optionA: "60 to 120 days", optionB: "6 to 12 months" },
      { feature: "Reviewer", optionA: "SBA lender (sometimes SBA itself above thresholds)", optionB: "SBA lender and the SBA, sometimes Treasury" },
      { feature: "Personal guaranty", optionA: "Stays in place under modified terms", optionB: "Can be released as part of the OIC closeout" },
      { feature: "Best when", optionA: "Business is recoverable and the math supports a path back", optionB: "Reasonable collection potential is below the full balance" },
    ],
  },
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const toc: TocItem[] = SECTIONS.map((s) => ({ id: s.id, text: s.label }));
  const otherTopics = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
  const compare = COMPARE_BY_SLUG[product.slug];

  let recent: { id: string; slug: string; title: string; excerpt: string | null; heroImage: string | null }[] = [];
  try {
    recent = await db.article.findMany({
      where: {
        published: true,
        OR:
          product.slug === "mca-debt-relief"
            ? [{ slug: { contains: "mca" } }, { slug: { contains: "reverse" } }, { slug: { contains: "coj" } }, { slug: { contains: "ucc" } }]
            : product.slug === "sba-loan-modification"
            ? [{ slug: { contains: "sba" } }, { slug: { contains: "loan-modification" } }]
            : product.slug === "equipment-finance-restructure"
            ? [{ slug: { contains: "equipment" } }]
            : product.slug === "vendor-supplier-debt"
            ? [{ slug: { contains: "vendor" } }]
            : product.slug === "bank-loan-workout"
            ? [{ slug: { contains: "bank" } }, { slug: { contains: "covenant" } }]
            : [{ slug: { contains: "tax" } }, { slug: { contains: "irs" } }],
      },
      orderBy: { publishedAt: "desc" },
      take: 4,
      select: { id: true, slug: true, title: true, excerpt: true, heroImage: true },
    });
    if (recent.length < 3) {
      const fillers = await db.article.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 4,
        select: { id: true, slug: true, title: true, excerpt: true, heroImage: true },
      });
      const seen = new Set(recent.map((r) => r.slug));
      for (const f of fillers) {
        if (seen.has(f.slug)) continue;
        recent.push(f);
        if (recent.length >= 4) break;
      }
    }
  } catch {}

  return (
    <article>
      {/* Breadcrumb */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-4">
          <Breadcrumb items={[{ label: "Topics", href: "/services" }, { label: product.name }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-10 md:py-14">
          <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
            {product.heroEyebrow}
          </span>
          <h1 className="mt-3 font-bold tracking-tighter text-slate text-4xl md:text-5xl lg:text-6xl leading-[1.04] max-w-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted leading-relaxed max-w-3xl">
            {product.subline}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
            <span>By the TerraDebt team</span>
            <span className="text-rule">·</span>
            <span>Updated {new Date().toISOString().slice(0, 10)}</span>
            <span className="text-rule">·</span>
            <span>{Math.max(8, Math.round(((product.whatItIs + product.scenario + product.pitfalls).split(/\s+/).length) / 220))} min read</span>
          </div>
          <div className="mt-6">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate no-underline border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
            >
              Talk to the team about {product.shortName.toLowerCase()}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
            {product.stats.map((s) => (
              <div key={s.label} className="bg-white p-5">
                <div className="font-mono text-2xl md:text-3xl font-bold text-slate tracking-tight leading-none">{s.value}</div>
                <div className="mt-2 text-sm text-slate leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-col body */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16 grid md:grid-cols-12 gap-10">
          <aside className="hidden md:block md:col-span-2">
            <div className="sticky top-32">
              <Toc items={toc} label="In this guide" />
            </div>
          </aside>

          <div className="md:col-span-7 space-y-12">
            <Section id="what-it-is" eyebrow="What it is" title={`${product.name}, defined`}>
              {product.whatItIs.split("\n\n").map((p, i) => (
                <p key={i} className="text-slate leading-relaxed">
                  {p}
                </p>
              ))}
            </Section>

            <Section id="who-it-fits" eyebrow="Who it fits" title="The fit test">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-rule bg-white p-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-electric">Fits</span>
                  <ul className="mt-3 space-y-2.5">
                    {product.whoItFits.map((b) => (
                      <li key={b} className="flex gap-2 items-start text-sm text-slate">
                        <svg className="w-4 h-4 mt-0.5 text-electric shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-rule bg-white p-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Does not fit</span>
                  <ul className="mt-3 space-y-2.5">
                    {product.whoItDoesntFit.map((b) => (
                      <li key={b} className="flex gap-2 items-start text-sm text-muted">
                        <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="methods" eyebrow="Methods" title={`How we resolve ${product.shortName.toLowerCase()} cases`}>
              <p className="text-muted leading-relaxed">
                The method is chosen for the specific case. Most cases use more than one.
              </p>
              <div className="mt-4 space-y-5">
                {product.methods.map((m, i) => (
                  <div key={m.title} className="border-l-2 border-electric pl-4">
                    <span className="font-mono text-xs text-electric">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-1 font-semibold tracking-tight text-slate text-lg leading-snug">{m.title}</h3>
                    <p className="mt-2 text-slate leading-relaxed">{m.body}</p>
                  </div>
                ))}
              </div>
              {compare && (
                <div className="mt-8">
                  <CompareTable
                    eyebrow={compare.eyebrow}
                    heading={compare.heading}
                    optionALabel={compare.optionA}
                    optionBLabel={compare.optionB}
                    rows={compare.rows}
                  />
                </div>
              )}
            </Section>

            <Section id="scenario" eyebrow="Typical scenario" title="An example case">
              <p className="text-muted leading-relaxed text-sm">
                Anonymized but representative. Real outcomes vary with lender mix, contract terms, and operations.
              </p>
              <div className="mt-4 border-l-2 border-rule pl-5 space-y-4">
                {product.scenario.split("\n\n").map((para, i) => (
                  <p key={i} className="text-slate leading-relaxed" dangerouslySetInnerHTML={renderInlineMarkdown(para)} />
                ))}
              </div>
            </Section>

            <Section id="pitfalls" eyebrow="Pitfalls" title="Risks to watch for">
              <p className="text-muted leading-relaxed text-sm">
                Every debt type has its own enforcement playbook. We map exposure at intake.
              </p>
              <div className="mt-4 space-y-4">
                {product.pitfalls.split("\n\n").map((para, i) => (
                  <p key={i} className="text-slate leading-relaxed" dangerouslySetInnerHTML={renderInlineMarkdown(para)} />
                ))}
              </div>
            </Section>

            <Section id="faq" eyebrow="FAQ" title={`${product.name} FAQ`}>
              <div className="divide-y divide-rule border-y border-rule">
                {product.faq.map((item) => (
                  <details key={item.q} className="group py-4">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-6 text-slate">
                      <span className="font-semibold tracking-tight text-base md:text-lg leading-snug">{item.q}</span>
                      <span className="text-muted text-xl group-open:rotate-45 transition-transform duration-200 leading-none shrink-0 mt-1">+</span>
                    </summary>
                    <p className="mt-3 text-sm md:text-base text-muted leading-relaxed pr-10">{item.a}</p>
                  </details>
                ))}
              </div>
            </Section>
          </div>

          {/* Right sidebar */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-32 space-y-6">
              <div className="border border-rule bg-white p-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Other coverage areas
                </span>
                <ul className="mt-3 space-y-2.5">
                  {otherTopics.map((o) => (
                    <li key={o.slug} className="border-t border-rule pt-2.5 first:border-t-0 first:pt-0">
                      <Link
                        href={`/services/${o.slug}`}
                        className="text-sm font-medium text-slate leading-snug hover:text-electric no-underline transition block"
                      >
                        {o.name}
                      </Link>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                        {o.category}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-rule bg-offwhite p-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
                  Use the calculator
                </span>
                <p className="mt-2 text-sm font-semibold text-slate leading-snug">
                  {product.slug === "mca-debt-relief" ? "Effective APR Calculator" : "Debt Health Check"}
                </p>
                <p className="mt-1.5 text-xs text-muted leading-relaxed">
                  {product.slug === "mca-debt-relief"
                    ? "Compute the real annualized cost of your advance."
                    : "10-question diagnostic across your debt mix."}
                </p>
                <Link
                  href={product.slug === "mca-debt-relief" ? "/tools/apr-calculator" : "/tools/health-check"}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
                >
                  Open tool
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="border border-rule bg-slate text-white p-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-electric-soft">
                  Talk to the team
                </span>
                <p className="mt-2 text-sm font-semibold leading-snug">
                  Free assessment scoped to your {product.shortName.toLowerCase()} situation
                </p>
                <Link
                  href="/get-started"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white border-b border-white pb-0.5 hover:border-electric-soft hover:text-electric-soft transition"
                >
                  Request an assessment
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <RelatedShelf
        items={recent.map((r) => ({
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt,
          heroImage: r.heroImage,
          topic: product.shortName,
        }))}
        heading={`Read next on ${product.shortName}`}
        eyebrow="Related guides"
        allHref="/articles"
      />

      <NewsletterStrip source={`service-${product.slug}`} />

      {/* Disclosure */}
      <section className="bg-offwhite border-t border-rule">
        <div className="mx-auto max-w-content px-6 py-10 text-xs text-muted leading-relaxed">
          <p>
            <span className="font-mono uppercase tracking-wider text-slate">Disclosure.</span>{" "}
            TerraDebt is a trade name of GRL Recovery LLC. We are not a law firm and do not provide legal advice. When legal defense is required, we coordinate licensed attorneys in your state. We do not guarantee specific savings or outcomes. Real results depend on your lender mix, contract terms, business cash flow, and how lenders respond. Programs typically run 6 to 18 months. Past results referenced in our case studies do not predict future outcomes.
          </p>
        </div>
      </section>
    </article>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{eyebrow}</span>
      <h2 className="mt-1 font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function renderInlineMarkdown(text: string): { __html: string } {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const withBold = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return { __html: withBold };
}
