import Link from "next/link";

const TOOLS = [
  {
    href: "/tools/apr-calculator",
    title: "Effective APR calculator",
    body: "Convert factor rate and term length into an annualized rate. See what your MCA actually costs.",
  },
  {
    href: "/tools/stack-calculator",
    title: "Stacked MCA calculator",
    body: "Add every active advance to see total daily burden, weighted APR, and projected payoff.",
  },
  {
    href: "/tools/health-check",
    title: "MCA health check",
    body: "Five questions. Get a risk score and a program recommendation in 60 seconds.",
  },
];

export function ToolsRow() {
  return (
    <section className="bg-white border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Free tools
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter text-slate leading-tight">
              Run the math before anything else.
            </h2>
          </div>
          <Link href="/tools" className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline border-b border-electric pb-0.5">
            All tools →
          </Link>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-0 md:gap-px md:bg-rule">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white p-7 border-t border-rule md:border-t-0 first:border-t-0 no-underline transition hover:bg-offwhite block"
            >
              <h3 className="text-lg font-semibold tracking-tight text-slate group-hover:text-electric transition">
                {t.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {t.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-electric">
                Open tool →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted max-w-xl">
          All calculators run in your browser. No login, no email, no signup.
        </p>
      </div>
    </section>
  );
}
