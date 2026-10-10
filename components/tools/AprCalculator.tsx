"use client";
import { useMemo, useState } from "react";
import { estimateMcaCost } from "@/lib/mca-cost";

const inputClass = "w-full bg-transparent border-b-2 border-hairline focus:border-pine outline-none py-3 text-2xl font-semibold text-ink";
const dollars = (value: number) => value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const percent = (value: number) => Number.isFinite(value) && value < 1e7 ? `${value.toLocaleString("en-US", { maximumFractionDigits: 1 })}%` : "Above display range";

export function AprCalculator() {
  const [funded, setFunded] = useState("100000");
  const [payback, setPayback] = useState("145000");
  const [fees, setFees] = useState("0");
  const [payments, setPayments] = useState("26");
  const [intervalDays, setIntervalDays] = useState<1 | 7>(7);
  const result = useMemo(() => {
    if ([funded, payback, fees, payments].some((value) => value.trim() === "")) return null;
    return estimateMcaCost({ funded: Number(funded), upfrontFees: Number(fees), payback: Number(payback), payments: Number(payments), intervalDays });
  }, [funded, payback, fees, payments, intervalDays]);
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="border border-hairline p-6 md:p-8 space-y-6">
        <Field id="mca-funded" label="Gross advance amount ($)"><input id="mca-funded" type="number" min="1" max="1000000000000" step="any" value={funded} onChange={(e) => setFunded(e.target.value)} className={inputClass} /></Field>
        <Field id="mca-fees" label="Upfront fees withheld ($)"><input id="mca-fees" type="number" min="0" step="any" value={fees} onChange={(e) => setFees(e.target.value)} className={inputClass} /><p className="mt-2 text-sm text-muted">Include fees deducted from the advance. Net proceeds equal the gross advance minus these fees.</p></Field>
        <Field id="mca-payback" label="Total scheduled payments ($)"><input id="mca-payback" type="number" min="1" max="1000000000000" step="any" value={payback} onChange={(e) => setPayback(e.target.value)} className={inputClass} /><p className="mt-2 text-sm text-muted">Include all charges paid through the schedule. A 1.45 factor on $100,000 gives $145,000 before any additional charges.</p></Field>
        <Field id="mca-frequency" label="Payment frequency"><select id="mca-frequency" value={intervalDays} onChange={(e) => setIntervalDays(Number(e.target.value) as 1 | 7)} className="w-full border border-hairline bg-paper p-3 text-ink"><option value={7}>Weekly — every 7 calendar days</option><option value={1}>Daily — every calendar day</option></select></Field>
        <Field id="mca-payments" label="Number of equal payments"><input id="mca-payments" type="number" min="1" max="3650" step="1" value={payments} onChange={(e) => setPayments(e.target.value)} className={inputClass} /><p className="mt-2 text-sm text-muted">First payment occurs one full period after funding. Daily means seven days a week; this model does not reproduce a weekdays-only schedule.</p></Field>
      </div>
      <div aria-live="polite" aria-atomic="true" className="space-y-5">
        {!result ? <p role="status" className="border border-hairline p-6">Enter positive funding, fees below funding, total payments at least equal to net proceeds, and 1–3,650 whole payments.</p> : <>
          <div className="border border-hairline bg-paper-mute p-6 md:p-8">
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted">Estimated APR · equal-payment model</h2>
            <p className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-pine break-words">{percent(result.estimatedApr)}</p>
            <p className="mt-4 text-sm leading-relaxed">Based on {dollars(result.netProceeds)} received and {payments} payments of {dollars(result.payment)} over {result.termDays.toLocaleString()} calendar days. Payments are rounded here for display only.</p>
          </div>
          <dl className="grid sm:grid-cols-2 gap-4">
            <Stat label="Total financing cost" value={dollars(result.totalCost)} />
            <Stat label="Payback / gross advance" value={`${result.factorRate.toFixed(3)}×`} />
            <Stat label="Effective annual rate" value={percent(result.effectiveAnnualRate)} />
            <Stat label="Simple annualized cost" value={percent(result.simpleAnnualizedCost)} />
          </dl>
          <p className="text-sm leading-relaxed text-muted">APR uses the payment-period rate multiplied by periods per year. The effective annual rate compounds that rate. Simple annualized cost ignores the declining balance; it is not APR. See the assumptions below before comparing offers.</p>
        </>}
      </div>
    </div>
  );
}
function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return <div><label htmlFor={id} className="block font-mono text-xs uppercase tracking-wider text-muted">{label}</label>{children}</div>;
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div className="border border-hairline p-4"><dt className="text-sm text-muted">{label}</dt><dd className="mt-2 font-mono text-lg font-semibold break-words">{value}</dd></div>;
}
