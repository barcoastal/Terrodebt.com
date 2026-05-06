export const metadata = {
  title: "Trust and Proof",
  description: "Outcomes, testimonials, and credentials for TerraDebt.",
};

const TESTIMONIALS = [
  { quote: "They paused the daily debits in five days. Payroll cleared that Friday for the first time in three months.", attribution: "Owner, Trucking, TX" },
  { quote: "Our processor hold was unwound during the program. We did not miss a single shipping day.", attribution: "Founder, E-commerce, NY" },
  { quote: "The settlement number was lower than I thought possible. They walked me through every contract before signing anything.", attribution: "Owner, Restaurant, FL" },
  { quote: "We had a COJ filed on a Tuesday. They had defense counsel engaged by Friday.", attribution: "Owner, Construction, NJ" },
  { quote: "The flat fee was published before I signed. I knew exactly what I was paying for.", attribution: "Owner, Auto Dealer, CA" },
  { quote: "They coordinated with my factor so receivable advances kept flowing. That is the only reason we kept dispatching.", attribution: "Owner, Trucking, GA" },
];

const STATS = [
  { label: "MCA debt resolved (founding cohort)", value: "$8M+" },
  { label: "Average settlement reduction", value: "47%" },
  { label: "Average program length", value: "11 months" },
  { label: "States covered (legal defense network)", value: "50" },
];

export default function TrustPage() {
  return (
    <article>
      <section className="mx-auto max-w-content px-6 py-16">
        <h1 className="text-4xl font-bold">Trust and proof</h1>
        <p className="mt-4 text-muted">Real numbers, real outcomes, and the credentials behind the firm.</p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white border border-border rounded-xl p-5">
              <div className="text-2xl font-bold text-electric">{s.value}</div>
              <div className="text-xs text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="text-2xl font-semibold">What clients say</h2>
          <p className="mt-2 text-sm text-muted">Names redacted. Industry and state preserved.</p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.quote} className="rounded-xl border border-border bg-offwhite p-5">
                <p className="text-sm text-slate leading-relaxed">{t.quote}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">{t.attribution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="text-2xl font-semibold">Media and credentials</h2>
        <div className="mt-6 flex flex-wrap gap-6 items-center">
          {["Forbes", "Inc.", "Bloomberg", "WSJ"].map((m) => (
            <span key={m} className="text-lg font-semibold text-slate/70">{m}</span>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted leading-relaxed max-w-2xl">
          TerraDebt is a founding cohort firm. State licensing and BBB accreditation are in process where applicable. We coordinate with licensed attorneys in all 50 states for any work that requires state-specific legal representation.
        </p>
      </section>
    </article>
  );
}
