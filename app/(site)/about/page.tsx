import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TerraDebt",
  description: "TerraDebt is the modern MCA debt relief brand. Why we exist, how we are different, what we are not.",
};

export default function About() {
  return (
    <article>
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">About</span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tighter">The MCA relief firm we wished existed.</h1>
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
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Stacked MCAs are a math problem with a clock on it.</h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-slate leading-relaxed">
            <p>Most owners we talk to did not stack four MCAs because they wanted to. They stacked because diesel costs spiked, an employee left, a piece of equipment broke, or a client paid 90 days late. And once the daily debits started, every new MCA looked like the only option.</p>
            <p>The relief category that exists to help these owners is mostly stuck in 2018. It charges retainers up front, hides its fee in legal hours, scares owners with worst-case language, and pitches before it listens. The brands that do publish reviews are the ones with the loudest PR machines, not necessarily the best outcomes.</p>
            <p>TerraDebt was built around a different default. We give merchants a free AI contract review on day one. We work with owners before they default, not just after a lawsuit lands. And when legal defense is required, we coordinate licensed attorneys in the merchant&apos;s state instead of pretending we are one.</p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">How we are different</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Four things that set us apart.</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {[
              { n: "01", title: "Free contract review, day one.", body: "Every merchant gets the AI contract review for free, no email required. You see the effective APR, the red flags, and the options before any consultation. We do not gate the math behind a sales call." },
              { n: "02", title: "Pre-default, not just post-lawsuit.", body: "Most relief firms only engage once an owner is sued or has frozen accounts. We work with owners who are still current on stacked MCAs. The earlier we engage, the more options stay on the table." },
              { n: "03", title: "Free AI contract review.", body: "Upload any MCA contract to our tool and we extract the effective APR, total payback, red flags, and your options in 30 seconds. No email gate. No sales call. Just the numbers." },
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
            <p>We are not a debt settlement service in the consumer sense. MCA debt is commercial debt. Our programs are different from credit-card-style debt settlement and the rules that govern them are different.</p>
            <p>We do not guarantee specific savings or specific outcomes. Real numbers depend on your lender mix, your contract terms, your business cash flow, and how the lenders respond. We will tell you what is realistic for your situation up front, and then we will execute against it.</p>
            <p>We are not a quick fix. Most programs run 6 to 18 months. The quick fix industry that promises 30 day resolutions is the same one that often makes the situation worse.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
