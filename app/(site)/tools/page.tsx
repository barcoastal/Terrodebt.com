import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free MCA Debt Calculators | Effective APR, Stack Burden, Health Check",
  description: "Free calculators for stacked merchant cash advance debt. Calculate effective APR, total stack burden, and debt risk score. No email required, runs in your browser.",
};

const TOOLS = [
  {
    href: "/tools/apr-calculator",
    eyebrow: "Calculator",
    title: "Effective APR Calculator",
    body: "Convert factor rate and term to a real annualized rate. See what your MCA actually costs.",
    accent: "Most popular",
  },
  {
    href: "/tools/stack-calculator",
    eyebrow: "Calculator",
    title: "Stacked MCA Calculator",
    body: "Add every active advance and see total daily burden, weighted APR, and projected payoff.",
  },
  {
    href: "/tools/health-check",
    eyebrow: "Self-assessment",
    title: "MCA Health Check",
    body: "Five questions. Get a risk score and a program recommendation. No email required.",
  },
];

export default function ToolsIndex() {
  return (
    <article>
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Free tools</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tighter">Free MCA tools.</h1>
          <p className="mt-5 text-lg text-muted max-w-2xl">No email gate, no signup. Run the math, then decide whether to talk to us.</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-3 gap-6">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="group surface-card p-8 no-underline transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">{t.eyebrow}</span>
              {t.accent && <span className="bg-electric/10 text-electric text-xs font-medium px-2 py-0.5 rounded-full">{t.accent}</span>}
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate">{t.title}</h2>
            <p className="mt-2 text-muted leading-relaxed flex-1">{t.body}</p>
            <span className="mt-4 font-mono text-xs uppercase tracking-wider text-electric">Open tool →</span>
          </Link>
        ))}
      </section>
    </article>
  );
}
