import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";
import { SubscribeForm } from "@/components/site/SubscribeForm";
import { findProduct, getProductSlugs, PRODUCTS } from "@/lib/product-content";
import { db } from "@/lib/db";

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

  let recent: { id: string; slug: string; title: string; excerpt: string | null }[] = [];
  try {
    recent = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { id: true, slug: true, title: true, excerpt: true },
    });
  } catch {}

  return (
    <article>
      {/* Editorial hero, single column */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 pt-6">
          <div className="flex items-center justify-between border-y border-rule py-3 text-[11px] font-mono uppercase tracking-wider text-muted">
            <span>{product.category}</span>
            <span>TerraDebt Research</span>
          </div>
        </div>
        <div className="mx-auto max-w-content px-6 pt-12 pb-16 md:pt-16 md:pb-20 grid md:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="md:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
              {product.heroEyebrow}
            </span>
            <h1 className="mt-4 font-serif-tight font-bold text-slate text-4xl md:text-5xl lg:text-6xl leading-[1.04]">
              {product.headline}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              {product.subline}
            </p>
            <ul className="mt-7 space-y-2.5 text-base max-w-2xl">
              {product.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-slate">
                  <svg className="w-5 h-5 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-[11px] font-mono uppercase tracking-wider text-muted">
              By the TerraDebt Research team
            </div>
          </div>
          <aside className="md:col-span-4 md:sticky md:top-24">
            <div className="bg-cream border border-rule p-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">About this topic</span>
              <h2 className="mt-2 font-serif font-bold text-slate text-lg leading-snug">
                Need a real conversation?
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Our assessment is free and scoped to your debt mix. Most calls run 20 to 30 minutes.
              </p>
              <Link
                href="/get-started"
                className="mt-4 inline-flex items-center gap-2 text-slate text-sm font-medium no-underline border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
              >
                Talk to the team
                <span aria-hidden>→</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* By the numbers, editorial */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-12 md:py-14">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">By the numbers</span>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
            {product.stats.map((s) => (
              <div key={s.label} className="bg-offwhite p-6">
                <div className="font-mono text-3xl md:text-4xl font-bold text-slate tracking-tight leading-none">{s.value}</div>
                <div className="mt-3 text-sm text-slate leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="bg-white border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">What it is</span>
              <h2 className="mt-3 font-serif-tight font-bold text-slate text-3xl md:text-4xl leading-tight">
                {product.name}, defined.
              </h2>
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
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="bg-white border border-rule p-7 h-full">
              <span className="font-mono text-[11px] uppercase tracking-wider text-electric">Who it fits</span>
              <h2 className="mt-2 font-serif font-bold text-slate text-2xl md:text-3xl leading-tight">You are a fit if</h2>
              <ul className="mt-6 space-y-3">
                {product.whoItFits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-slate">
                    <svg className="w-5 h-5 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-white border border-rule p-7 h-full">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Who it does not fit</span>
              <h2 className="mt-2 font-serif font-bold text-slate text-2xl md:text-3xl leading-tight">This is not for you if</h2>
              <ul className="mt-6 space-y-3">
                {product.whoItDoesntFit.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-muted">
                    <svg className="w-5 h-5 mt-0.5 text-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Methods grid */}
      <section className="bg-white border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal>
            <div className="max-w-2xl border-b border-rule pb-5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Methods</span>
              <h2 className="mt-2 font-serif-tight font-bold text-slate text-3xl md:text-4xl leading-tight">
                How we resolve {product.shortName.toLowerCase()} cases.
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                The method is chosen for the specific case. Most cases use more than one.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-px bg-rule border border-rule auto-rows-fr">
            {product.methods.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.05} className="h-full">
                <div className="bg-white p-6 md:p-8 h-full">
                  <span className="font-mono text-sm text-electric">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-serif font-bold text-slate text-xl md:text-2xl leading-snug">{m.title}</h3>
                  <p className="mt-3 text-slate leading-relaxed">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Typical scenario</span>
              <h2 className="mt-3 font-serif-tight font-bold text-slate text-3xl md:text-4xl leading-tight">An example case.</h2>
              <p className="mt-4 text-muted leading-relaxed">
                Anonymized but representative. Real outcomes vary with lender mix, contract terms, and operations.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:col-span-2 bg-cream border border-rule p-7 md:p-8 space-y-4 text-slate leading-relaxed">
              {product.scenario.split("\n\n").map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={renderInlineMarkdown(para)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pitfalls */}
      <section className="bg-white border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Pitfalls</span>
              <h2 className="mt-3 font-serif-tight font-bold text-slate text-3xl md:text-4xl leading-tight">Risks to watch for.</h2>
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
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="border-b border-rule pb-5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Common questions</span>
            <h2 className="mt-2 font-serif-tight font-bold text-slate text-3xl md:text-4xl leading-tight">{product.name} FAQ</h2>
          </div>
          <div className="divide-y divide-rule">
            {product.faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6 text-slate">
                  <span className="font-serif text-lg md:text-xl leading-snug">{item.q}</span>
                  <span className="text-muted text-xl group-open:rotate-45 transition-transform duration-200 leading-none flex-shrink-0 mt-1">+</span>
                </summary>
                <p className="mt-3 text-sm md:text-base text-muted leading-relaxed pr-10">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* More from TerraDebt */}
      {recent.length > 0 && (
        <section className="bg-white border-b border-rule">
          <div className="mx-auto max-w-content px-6 py-16">
            <div className="flex items-end justify-between gap-6 border-b border-rule pb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">More from TerraDebt</span>
              <Link href="/articles" className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline">
                All essays →
              </Link>
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-8">
              {recent.map((a) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="group block no-underline">
                  <h3 className="font-serif font-bold text-slate text-lg md:text-xl leading-snug group-hover:underline decoration-1 underline-offset-4">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{a.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other product categories */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="flex items-baseline justify-between flex-wrap gap-3 border-b border-rule pb-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Other topic areas</span>
            <Link href="/services" className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline">
              View all topics →
            </Link>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-px bg-rule border border-rule">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="bg-offwhite hover:bg-cream p-6 h-full no-underline block transition-colors">
                <span className="font-mono text-[10px] uppercase tracking-wider text-electric">{o.category}</span>
                <h3 className="mt-2 font-serif font-bold text-slate text-lg md:text-xl leading-snug">{o.name}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{o.metaDescription.split(".")[0]}.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial close: subscribe + talk */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
            <div className="bg-cream p-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">The brief</span>
              <h3 className="mt-2 font-serif font-bold text-slate text-xl md:text-2xl">Get the newsletter.</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed max-w-md">
                Weekly notes on business debt restructure. New essays and research.
              </p>
              <div className="mt-5">
                <SubscribeForm source={`service-${product.slug}`} />
              </div>
            </div>
            <div className="bg-cream p-8 flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Direct</span>
              <h3 className="mt-2 font-serif font-bold text-slate text-xl md:text-2xl">Talk to the team.</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed max-w-md">
                Free assessment scoped to your {product.shortName.toLowerCase()} situation.
              </p>
              <div className="mt-auto pt-5">
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 text-slate text-sm font-medium no-underline border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
                >
                  Request an assessment
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="bg-offwhite border-t border-rule">
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
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const withBold = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return { __html: withBold };
}
