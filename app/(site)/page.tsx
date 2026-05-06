import { LeadForm } from "@/components/lead/LeadForm";

export default function Home() {
  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <span className="inline-block bg-electric/10 text-electric text-xs font-medium px-3 py-1 rounded-full">Transparent flat fee</span>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate leading-tight">MCA debt relief, with a published flat fee.</h1>
        <p className="mt-4 text-lg text-muted">No upfront fees. No monthly retainers. We tell you the number before you sign anything.</p>
        <ul className="mt-6 space-y-2 text-sm text-slate">
          <li>✓ Flat fee, published</li>
          <li>✓ No upfront cost</li>
          <li>✓ Pre-default and post-default programs</li>
          <li>✓ Free AI contract review</li>
        </ul>
      </div>
      <LeadForm source="homepage" />
    </section>
  );
}
