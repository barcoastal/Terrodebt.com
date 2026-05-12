import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TerraDebt | Modern Business Debt Restructure",
  description:
    "TerraDebt is a modern business debt restructure firm covering MCA, SBA, equipment, vendor, bank, and tax debt. Coordinated workouts, real attorney coordination.",
};

export default function About() {
  return (
    <article>
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">About</span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tighter">The business debt restructure firm we wished existed.</h1>
            <p className="mt-5 text-lg text-muted">TerraDebt brings modern tools and disciplined execution to a category stuck in 2018.</p>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden surface-card-elevated">
            <Image src="/images/founder-scene.png" alt="TerraDebt founder" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">Why we exist</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Business debt is a math problem with a clock on it.</h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-slate leading-relaxed">
            <p>Most owners we talk to did not stack four MCAs, default on an SBA loan, or fall behind on payroll taxes because they wanted to. A diesel price spike, an employee who left, a piece of equipment that broke, a client who paid 90 days late. And once the debt started compounding, every new layer looked like the only option.</p>
            <p>The relief category that exists to help these owners is mostly stuck in 2018 and mostly single-product. One firm pitches MCA settlement. Another pitches SBA modification. A third pitches tax resolution. Most owners need help across two or three product categories at the same time, and they end up coordinating multiple firms or going without help on the rest.</p>
            <p>TerraDebt was built around a different default. We work across six product categories: MCA debt relief, SBA loan modification, equipment finance restructure, vendor and supplier debt, bank loan workouts, and business tax debt. We give merchants free calculators on day one so the math is clear before any consultation. We work with owners before they default, not just after a lawsuit lands. And when legal defense is required, we coordinate licensed attorneys in the merchant&apos;s state instead of pretending we are one.</p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">How we are different</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Four things that set us apart.</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {[
              { n: "01", title: "Six product categories, one team.", body: "Most relief firms pitch a single product. We work across MCA, SBA, equipment, vendor, bank, and tax debt because most cases need more than one. The intake assessment maps every obligation and sequences the workouts in the right order." },
              { n: "02", title: "Free tools, day one.", body: "Every merchant gets free calculators with no email required. You see your effective APR, your daily debit burden, and a program fit before any consultation. The math is on your side of the table from the start." },
              { n: "03", title: "Pre-default, not just post-lawsuit.", body: "Most relief firms only engage once an owner is sued or has frozen accounts. We work with owners who are still current. The earlier we engage, the more options stay on the table across every product category." },
              { n: "04", title: "Real attorneys, real states.", body: "When legal defense is needed, we coordinate licensed counsel in the merchant's state, not a generic referral. We are not pretending to be a law firm. We work with them." },
            ].map((p) => (
              <div key={p.n} className="surface-card p-6">
                <span className="font-mono text-sm text-electric">{p.n}</span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-slate leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">What we are not</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Set expectations, plainly.</h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-slate leading-relaxed">
            <p>We are not a law firm. We coordinate licensed attorneys in your state when legal defense is required. We are not authorized to give legal advice on our own.</p>
            <p>We are not a consumer debt relief service. Consumer debt relief works on credit cards, medical bills, and personal loans under consumer credit law. Our work is on commercial debt against the business entity. The legal frameworks, the lenders, and the workout playbooks are entirely different.</p>
            <p>We do not guarantee specific savings or specific outcomes. Real numbers depend on your lender mix, your contract terms, your business cash flow, and how the lenders respond. We will tell you what is realistic for your situation up front, and then we will execute against it.</p>
            <p>We are not a quick fix. Most programs run 6 to 18 months. The quick fix industry that promises 30 day resolutions is the same one that often makes the situation worse.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
