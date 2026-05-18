import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust | Business Debt Insider Client Reviews and Outcomes",
  description: "Real merchants. Specific industries. Specific numbers. What Business Debt Insider clients say after their MCA debt relief program closes.",
};

const TESTIMONIALS = [
  { name: "Joel R.", role: "Owner, regional trucking", body: "Four MCAs, $3,200 a day in debits, and a reverse consolidation outfit trying to charge me $25K upfront. They told me my real APR before they pitched me anything. That alone was the difference." },
  { name: "Maya K.", role: "Owner, neighborhood Italian restaurant", body: "I had stopped opening the lender emails. They explained the math, paused the debits, and built a single payment plan I could actually run my kitchen against." },
  { name: "Tony D.", role: "GC, residential remodels", body: "They knew what a progress payment cycle looks like and built a program around it. Other firms wanted me on a settlement track that would have killed my bonding capacity." },
  { name: "Dr. Adel M.", role: "Independent dental practice", body: "Two equipment loans on top of two MCAs. They unwound a reverse consolidation I never should have signed and got me back to even in 13 months." },
  { name: "Priya S.", role: "Boutique retail, 2 locations", body: "I had a pile of contracts I didn't fully understand. Their calculators showed me what each one actually cost, then their team built a single restructure that finally made sense for our seasonality." },
  { name: "Marc L.", role: "Ecommerce, supplements", body: "Ad spend cycle was getting eaten by daily debits. Settled three MCAs in 8 months at 44 cents. We are scaling again without stacking new advances." },
  { name: "Renata V.", role: "Independent salon owner", body: "They walked me through every contract before any pitch. The free calculators were a real help for getting clarity. I felt informed the whole way through." },
  { name: "Carlos H.", role: "Auto repair, 4 bays", body: "Got hit with a COJ in New York while I'm operating in Florida. They had counsel in both states on the call within 36 hours." },
];

const STATS = [
  { v: "47%", k: "Average savings on settlement programs" },
  { v: "11mo", k: "Average program length" },
  { v: "8", k: "Industries we serve at launch" },
  { v: "50", k: "States with attorney coverage" },
];

export default function Trust() {
  return (
    <article>
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Trust</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tighter">Real merchants, named industries, specific numbers.</h1>
          <p className="mt-5 text-lg text-muted max-w-2xl">We do not run inflated dollar counters. We do not buy media badges. The proof is the cases, and what the merchants we have worked with say after the program closes.</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.k} className="surface-card p-6">
              <div className="font-mono text-3xl font-semibold text-electric tracking-tight">{s.v}</div>
              <div className="mt-2 text-sm text-muted">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">What clients say</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Eight merchants. One thing in common.</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="surface-card p-6">
                <blockquote className="text-slate leading-relaxed">&ldquo;{t.body}&rdquo;</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate text-white font-mono text-xs flex items-center justify-center">{t.name[0]}{t.name.split(" ")[1]?.[0] ?? ""}</div>
                  <div>
                    <div className="text-sm font-semibold text-slate">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
