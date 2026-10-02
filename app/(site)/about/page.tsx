import Link from "next/link";
import type { Metadata } from "next";
import { SubscribeForm } from "@/components/site/SubscribeForm";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About — Fort Lauderdale Business Debt Practice",
  description: "Learn about Business Debt Insider, the commercial financial consulting practice of GRL Recovery LLC, its scope, and its publishing standards.",
};

export default function About() {
  return (
    <article>
      {/* Cover */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-14 md:py-20 grid md:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-wider text-electric">About the practice</span>
            <h1 className="mt-4 font-bold tracking-tighter text-slate text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              The business debt restructure company we wished existed.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              Modern tools and disciplined execution for a category stuck in 2018. Plain-spoken research and coordinated workouts across five coverage areas.
            </p>
          </div>
          <div className="md:col-span-5 border border-rule bg-white p-8">
            <h2 className="text-2xl font-semibold">The organization behind BDI</h2>
            <p className="mt-4 leading-relaxed">Business Debt Insider is a trade name of GRL Recovery LLC, a Florida limited liability company formed April 1, 2026.</p>
            <p className="mt-4 leading-relaxed">6301 NW 5th Way, Suite 5100<br />Fort Lauderdale, FL 33309</p>
            <Link href="/trust" className="mt-5 inline-block text-electric underline">Scope, fees, and due diligence</Link>
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <Block eyebrow="Why we exist" title="Business debt is a math problem with a clock on it.">
        <p>
          Most owners we talk to did not stack four MCAs, default on a bank line, or fall behind on payroll taxes because they wanted to. A diesel price spike, an employee who left, a piece of equipment that broke, a client who paid 90 days late. Once the debt started compounding, every new layer looked like the only option.
        </p>
        <p>
          The relief category that exists to help these owners is mostly stuck in 2018 and mostly single-product. One company pitches MCA settlement. Another pitches bank workouts. A third pitches tax resolution. Most owners need help across two or three product categories at the same time, and they end up coordinating multiple providers or going without help on the rest.
        </p>
        <p>
          Our approach starts with the full debt position. We work across five coverage areas: MCA debt relief, equipment finance restructure, vendor and supplier debt, bank loan workouts, and business tax debt. We give merchants free calculators on day one so the math is clear before any consultation. We work with owners before they default, not just after a lawsuit lands. And when legal defense is required, we coordinate licensed attorneys in the merchant&apos;s state instead of pretending we are one.
        </p>
      </Block>

      {/* How we are different */}
      <section className="bg-white border-y border-rule">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="max-w-2xl border-b border-rule pb-5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">How we are different</span>
            <h2 className="mt-2 font-bold tracking-tighter text-slate text-3xl md:text-4xl leading-tight">
              Four things that set us apart.
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-px bg-rule border border-rule">
            {[
              { n: "01", title: "Five coverage areas, one team.", body: "Most relief companies pitch a single product. We work across MCA, equipment, vendor, bank, and tax debt because most cases need more than one. The intake assessment maps every obligation and sequences the workouts in the right order." },
              { n: "02", title: "Free tools, day one.", body: "Every merchant gets free calculators with no email required. You see your effective APR, your daily debit burden, and a program fit before any consultation. The math is on your side of the table from the start." },
              { n: "03", title: "Pre-default, not just post-lawsuit.", body: "Most relief companies only engage once an owner is sued or has frozen accounts. We work with owners who are still current. The earlier we engage, the more options stay on the table across every product category." },
              { n: "04", title: "Real attorneys, real states.", body: "When legal defense is needed, we coordinate licensed counsel in the merchant's state, not a generic referral. We are not pretending to be a law firm. We work with them." },
            ].map((p) => (
              <div key={p.n} className="bg-white p-6 md:p-8">
                <span className="font-mono text-sm text-electric">{p.n}</span>
                <h3 className="mt-2 font-semibold tracking-tight text-slate text-xl md:text-2xl leading-snug">{p.title}</h3>
                <p className="mt-3 text-slate leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we are not */}
      <Block eyebrow="What we are not" title="Set expectations, plainly." alt>
        <p>We are not a law firm. When legal defense is required, attorney availability, jurisdiction, and scope must be confirmed through a separate engagement. We are not authorized to give legal advice on our own.</p>
        <p>We are not a consumer debt relief service. Consumer debt relief works on credit cards, medical bills, and personal loans under consumer credit law. Our work is on commercial debt against the business entity. The legal frameworks, the lenders, and the workout playbooks are entirely different.</p>
        <p>We do not guarantee specific savings or specific outcomes. Real numbers depend on your lender mix, your contract terms, your business cash flow, and how the lenders respond. We will tell you what is realistic for your situation up front, and then we will execute against it.</p>
        <p>We are not a quick fix. The time required depends on the debt, creditor responses, any court proceedings, and the accepted repayment schedule. Reaching an agreement and completing payments are different milestones.</p>
      </Block>

      {/* Methodology */}
      <Block eyebrow="Methodology" title="How we analyze a debt situation.">
        <p>
          Every engagement starts the same way: we map the full debt position. Every active obligation, the contract terms, the lien positions, the cross-default clauses, the personal guarantees, the current and projected daily and monthly cash impact. We collect tax returns, bank statements, contract PDFs, and the lender or creditor correspondence that has already landed.
        </p>
        <p>
          From there we build a sequence. Not every workout goes in the obvious order. A merchant with stacked MCAs and a stretched bank line might need MCA reconciliation first to stop the daily debit bleed, but if the bank has an active acceleration notice the bank work has to start in parallel to preserve the option. Cross-default clauses, lien priorities, and statute of limitations dates all shape the sequence.
        </p>
        <p>
          We pick the methods inside each product category for the specific case. Settlement, restructure, modification, forbearance, OIC, lien release, COJ defense, levy release. Most cases use more than one. We do not run a single playbook through every client. We do not run a script.
        </p>
        <p>
          Throughout, we treat the math as the truth. If the numbers do not support a workout, we tell the merchant. If a partial settlement is more honest than a stretched-out modification, we say so. The math protects everyone in the room.
        </p>
      </Block>

      <Block eyebrow="Publishing" title="Guidance published by the organization.">
        <p>Our articles use the Business Debt Insider organization byline. We do not currently publish individual author or reviewer biographies, and that byline does not indicate attorney or accountant review.</p>
        <p>We link official sources where relevant and distinguish general background resources from rules summarized on a specific page. A worked example is not a client result or a promise of savings.</p>
        <p><Link href="/editorial-policy" className="text-electric underline">Read our editorial standards and correction process</Link>, and check the <Link href="/disclosure" className="text-electric underline">business disclosures</Link> before choosing a provider.</p>
      </Block>

      {/* Close */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
            <div className="bg-cream p-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Newsletter</span>
              <h3 className="mt-2 font-semibold tracking-tight text-slate text-xl md:text-2xl">Get the newsletter.</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed max-w-md">
                Weekly notes on business debt restructure. New articles, working numbers, and case anatomies.
              </p>
              <div className="mt-5">
                <SubscribeForm source="about" />
              </div>
            </div>
            <div className="bg-cream p-8 flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Direct</span>
              <h3 className="mt-2 font-semibold tracking-tight text-slate text-xl md:text-2xl">Talk to the team.</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed max-w-md">
                Free assessment scoped to your situation.
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
    </article>
  );
}

function Block({ eyebrow, title, children, alt }: { eyebrow: string; title: string; children: React.ReactNode; alt?: boolean }) {
  return (
    <section className={alt ? "bg-white border-y border-rule" : "bg-offwhite border-b border-rule"}>
      <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-12">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{eyebrow}</span>
          <h2 className="mt-3 font-bold tracking-tighter text-slate text-3xl md:text-4xl leading-tight">{title}</h2>
        </div>
        <div className="md:col-span-2 space-y-4 text-slate leading-relaxed">{children}</div>
      </div>
    </section>
  );
}
