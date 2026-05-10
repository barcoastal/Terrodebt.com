import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "MCA Debt Relief Services | TerraDebt",
  description: "TerraDebt restructures, settles, and defends stacked merchant cash advances. Free assessment, free calculators, counsel in all 50 states.",
};

export default function McaDebtReliefServices() {
  return (
    <article>
      {/* Hero */}
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-20 md:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-white border border-border text-slate text-xs font-medium px-3 py-1.5 rounded-full shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
              MCA debt relief services
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] max-w-4xl">
              Don&apos;t let stacked MCAs run your <span className="text-electric">cash flow</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              We restructure, settle, or defend merchant cash advance debt with programs scoped to your specific situation. Free assessment, free calculators, and licensed counsel in all 50 states.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#assessment" className="bg-slate text-white px-5 py-3 rounded-xl text-sm font-medium no-underline hover:bg-slate-soft transition inline-flex items-center gap-2">
                Get free assessment <span aria-hidden>→</span>
              </Link>
              <Link href="/tools" className="bg-white text-slate border border-border px-5 py-3 rounded-xl text-sm font-medium no-underline hover:border-electric transition">
                Run the free calculators
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What is MCA debt relief */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">What it is</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">MCA debt relief, defined.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:col-span-2 space-y-4 text-slate leading-relaxed">
              <p>MCA debt relief is the structured process of restoring cash flow to a business that has stacked one or more merchant cash advances. It is not a single product. It is a set of tools (restructure, settlement, legal defense, and program management) chosen to fit the merchant&apos;s situation.</p>
              <p>Our work has three primary outcomes. We pause damaging daily debits, reduce or restructure the underlying debt, and rebuild a path to bankable credit. The exact mix depends on whether you are still current, whether legal action has been taken, and what your lender mix looks like.</p>
              <ul className="mt-6 space-y-3">
                {[
                  { k: "Restructure", v: "Renegotiate terms and daily debits with each lender, without settling." },
                  { k: "Settle", v: "Negotiate a discounted lump sum payoff per lender, typically 40 to 60 percent." },
                  { k: "Defend", v: "Coordinate licensed counsel when COJ filings, account freezes, or lawsuits are in play." },
                ].map((o) => (
                  <li key={o.k} className="flex gap-4 items-start">
                    <span className="font-mono text-xs uppercase tracking-wider text-electric mt-1 min-w-[6.5rem]">{o.k}</span>
                    <span className="text-slate">{o.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Proof block */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 pt-12 pb-20">
          <Reveal>
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden surface-card-elevated">
              <Image src="/images/hero.png" alt="A small business owner in their workplace" fill className="object-cover" sizes="(max-width: 768px) 100vw, 1152px" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate/75 via-slate/40 to-transparent" />
              <div className="absolute inset-y-0 left-0 flex items-center max-w-xl p-8 md:p-12">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-white/70">Proof, not theatrics</span>
                  <p className="mt-3 text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">Read the math before you commit.</p>
                  <p className="mt-3 text-white/80 text-sm md:text-base">Our articles walk through effective APR, settlement vs restructure, and how to read your contract. Education first, no inflated dollar counters.</p>
                  <Link href="/articles" className="mt-5 inline-flex items-center gap-2 text-white text-sm font-medium no-underline border border-white/20 hover:bg-white/10 px-4 py-2 rounded-lg transition">
                    Read the articles <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Restructure process */}
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Restructure process</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">How MCA payment restructuring works.</h2>
              <p className="mt-4 text-lg text-muted">When you are still current and want to preserve lender relationships, restructure is the right path. We renegotiate the daily debit and term with each lender, without settling.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                title: "Financial analysis",
                body: "We collect every active MCA contract, map your daily debit total, and calculate effective APR per advance. This produces a clear picture of which advances are choking cash flow most and which lenders have the most flexibility.",
              },
              {
                n: "02",
                title: "Lender outreach",
                body: "We initiate formal communication with each MCA holder. For lenders we have worked with before, we use existing channels. For new ones, we open a documented dialogue that protects you legally.",
              },
              {
                n: "03",
                title: "Negotiated terms",
                body: "We secure extended terms, lower daily debits, or modified payment structures per lender. The result is a single, manageable monthly schedule that fits your actual cash flow rather than the lender&apos;s ideal.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="surface-card p-6 h-full">
                  <span className="font-mono text-sm text-electric">{s.n}</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-slate leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Image break */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <Reveal>
            <div className="grid md:grid-cols-5 gap-10 items-center">
              <div className="md:col-span-2 relative aspect-[4/5] rounded-2xl overflow-hidden surface-card-elevated">
                <Image src="/images/process-call.png" alt="A merchant on a call with their TerraDebt advisor" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div className="md:col-span-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Why merchants choose us</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">A relief firm built around the merchant, not the close.</h2>
                <p className="mt-4 text-lg text-muted leading-relaxed">Most relief firms quote you a percentage of savings without explaining how their program actually works. We give you free calculators that surface effective APR and stack burden, walk you through the math during your assessment, and only build a program that fits your specific situation. We coordinate licensed attorneys in your state when legal defense is needed, instead of pretending we are one.</p>
                <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  {[
                    "Free 60-second assessment",
                    "Free MCA calculators",
                    "Pre-default and post-default programs",
                    "Counsel in 50 states",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-slate">
                      <svg className="w-4 h-4 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Settlement process */}
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Settlement process</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">How MCA debt settlement works.</h2>
              <p className="mt-4 text-lg text-muted">When restructure is not enough, settlement reduces the principal owed. We negotiate a discounted payoff with each lender, typically 40 to 60 percent of the balance.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {[
              {
                n: "01",
                title: "Build the settlement fund",
                body: "Daily debits pause through formal reconciliation. The cash that was leaving your accounts now accrues into a TerraDebt-managed escrow. This builds the leverage we need to settle quickly when lenders are ready.",
              },
              {
                n: "02",
                title: "Prepare the offer per lender",
                body: "We audit every contract for stacking violations, jurisdictional issues, and procedural defects. The audit shapes the offer. A lender who funded after a documented stacking restriction is in a different negotiating position than one who did not.",
              },
              {
                n: "03",
                title: "Negotiate in parallel",
                body: "We engage every lender at once, not sequentially. Parallel negotiation protects you from a single lender holding out for full payment while others are willing to settle.",
              },
              {
                n: "04",
                title: "Pay and resolve",
                body: "Settlements close on a per-lender basis. As each one closes, we disburse from escrow and document the resolution. By the end of the program, every original advance is closed.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="surface-card p-6 h-full">
                  <span className="font-mono text-sm text-electric">{s.n}</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-slate leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Qualification */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Qualification</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Is MCA relief right for your business?</h2>
              <p className="mt-4 text-muted">Most merchants we work with check at least two of these boxes. If any of them describe your situation, the assessment is worth the call.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
              {[
                "Daily MCA debits are eating into payroll, fuel, or inventory.",
                "You have stacked two or more advances.",
                "You have considered a reverse consolidation and want a real opinion.",
                "You are receiving aggressive collection contact.",
                "You feel locked into a borrowing cycle you cannot break.",
                "A COJ has been filed or your account has been frozen.",
              ].map((b) => (
                <div key={b} className="surface-card p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-electric flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="text-slate text-sm leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA + form */}
      <section id="assessment" className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Get started</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Free assessment, no commitment.</h2>
              <p className="mt-4 text-lg text-muted leading-relaxed">Tell us your situation in 60 seconds. We will review the contracts, calculate effective APR, and tell you what is realistic for your business. If we are not the right fit, we will say so.</p>
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                <Stat label="Avg savings" value="47%" />
                <Stat label="Avg timeline" value="11mo" />
                <Stat label="States covered" value="50" />
              </div>
            </div>
          </Reveal>
          <div>
            <LeadForm source="services-mca-debt-relief" />
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="bg-offwhite border-t border-border">
        <div className="mx-auto max-w-content px-6 py-12 text-xs text-muted leading-relaxed">
          <p>
            <span className="font-mono uppercase tracking-wider text-slate">Disclosure.</span>{" "}
            TerraDebt is not a law firm and does not provide legal advice. When legal defense is required, we coordinate licensed attorneys in your state. We do not guarantee specific savings or specific outcomes. Real results depend on your lender mix, contract terms, business cash flow, and how lenders respond. Programs typically run 6 to 18 months. Settlement may impact your business credit profile. Past results referenced in our case studies do not predict future outcomes.
          </p>
        </div>
      </section>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-3">
      <div className="font-mono text-lg font-semibold text-electric">{value}</div>
      <div className="text-xs text-muted mt-0.5">{label}</div>
    </div>
  );
}
