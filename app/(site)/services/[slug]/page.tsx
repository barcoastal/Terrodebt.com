import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/site/Reveal";
import { findProduct, getProductSlugs, PRODUCTS } from "@/lib/product-content";

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

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const others = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <article>
      {/* Hero with form */}
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 pt-16 md:pt-20 pb-16 md:pb-20 grid md:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="md:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 bg-white border border-border text-slate text-[11px] font-medium px-2.5 py-1 rounded-full shadow-soft">
                <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                {product.heroEyebrow}
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.04]">
                {product.headlineLead} <span className="text-electric">{product.headlineAccent}</span> {product.headlineTail}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted max-w-xl leading-relaxed">
                {product.subline}
              </p>
              <ul className="mt-7 space-y-2.5 text-base max-w-xl">
                {product.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-slate">
                    <svg className="w-5 h-5 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                <span>Category</span>
                <span className="text-border">·</span>
                <span className="text-slate">{product.category}</span>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <LeadForm source={`service-${product.slug}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-slate text-white">
        <div className="mx-auto max-w-content px-6 py-14 md:py-16 grid grid-cols-3 gap-6 md:gap-10">
          {product.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div>
                <div className="font-mono text-3xl md:text-5xl font-bold text-electric tracking-tighter leading-none">{s.value}</div>
                <div className="mt-3 text-xs md:text-sm font-semibold text-white leading-snug">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What it is */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">What it is</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{product.name}, defined.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:col-span-2 space-y-4 text-slate leading-relaxed">
              {product.whatItIs.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who it fits / Who it doesn't fit */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="surface-card p-7 h-full">
              <span className="font-mono text-xs uppercase tracking-wider text-electric">Who it fits</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">You are a fit if</h2>
              <ul className="mt-6 space-y-3">
                {product.whoItFits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-slate">
                    <svg className="w-5 h-5 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="surface-card p-7 h-full">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Who it doesn&apos;t fit</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">This is not for you if</h2>
              <ul className="mt-6 space-y-3">
                {product.whoItDoesntFit.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-muted">
                    <svg className="w-5 h-5 mt-0.5 text-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Methods grid */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Methods</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">How we resolve {product.shortName.toLowerCase()} cases.</h2>
              <p className="mt-4 text-muted leading-relaxed">
                The method is chosen for the specific case. Most cases use more than one.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-5 auto-rows-fr">
            {product.methods.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.05} className="h-full">
                <div className="surface-card p-6 md:p-7 h-full">
                  <span className="font-mono text-sm text-electric">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-3 text-slate leading-relaxed">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Typical scenario</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">An example case.</h2>
              <p className="mt-4 text-muted leading-relaxed">
                Anonymized but representative. Real outcomes vary with lender mix, contract terms, and operations.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:col-span-2 surface-card p-7 md:p-8 space-y-4 text-slate leading-relaxed">
              {product.scenario.split("\n\n").map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={renderInlineMarkdown(para)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pitfalls */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Pitfalls</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Risks to watch for.</h2>
              <p className="mt-4 text-muted leading-relaxed">
                Every debt type has its own enforcement playbook. We map the exposure at intake.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:col-span-2 space-y-5 text-slate leading-relaxed">
              {product.pitfalls.split("\n\n").map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={renderInlineMarkdown(para)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Common questions</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{product.name} FAQ</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-3">
            {product.faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04}>
                <details className="group surface-card transition-all hover:border-electric/30 open:shadow-[var(--shadow-elevated)]">
                  <summary className="cursor-pointer list-none flex justify-between items-center p-6 text-base md:text-lg font-semibold text-slate tracking-tight">
                    <span>{item.q}</span>
                    <span className="text-electric text-2xl group-open:rotate-45 transition-transform duration-300 leading-none flex-shrink-0 ml-4">+</span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-sm md:text-base text-muted leading-relaxed">{item.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other products */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <Reveal>
            <div className="flex items-baseline justify-between flex-wrap gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Other product categories</span>
              <Link href="/services" className="font-mono text-xs uppercase tracking-wider text-electric no-underline hover:underline">
                View all services →
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.05}>
                <Link href={`/services/${o.slug}`} className="surface-card p-6 h-full no-underline block transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-electric">{o.category}</span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate">{o.name}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{o.metaDescription.split(".")[0]}.</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate text-white">
        <div className="mx-auto max-w-content px-6 py-16 md:py-20 text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-white/60">Ready when you are</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05]">
            Free assessment on your {product.shortName.toLowerCase()} situation.
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Tell us the numbers in 60 seconds. We will review the documents and tell you what is realistic.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/get-started" className="bg-electric text-white px-6 py-3 rounded-xl text-sm font-semibold no-underline hover:opacity-90 transition shadow-[var(--shadow-glow)]">
              Start my free assessment
            </Link>
            <Link href="/services" className="border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-semibold no-underline hover:bg-white/10 transition">
              See all services
            </Link>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="bg-offwhite border-t border-border">
        <div className="mx-auto max-w-content px-6 py-12 text-xs text-muted leading-relaxed">
          <p>
            <span className="font-mono uppercase tracking-wider text-slate">Disclosure.</span>{" "}
            TerraDebt is a trade name of GRL Recovery LLC. We are not a law firm and do not provide legal advice. When legal defense is required, we coordinate licensed attorneys in your state. We do not guarantee specific savings or outcomes. Real results depend on your lender mix, contract terms, business cash flow, and how lenders respond. Programs typically run 6 to 18 months. Past results referenced in our case studies do not predict future outcomes.
          </p>
        </div>
      </section>
    </article>
  );
}

function renderInlineMarkdown(text: string): { __html: string } {
  // Convert **bold** to <strong>, escape rest
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const withBold = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return { __html: withBold };
}
