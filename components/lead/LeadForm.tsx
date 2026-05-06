"use client";
import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { debtBuckets, type LeadInput } from "@/lib/lead-schema";
import { submitLead } from "@/app/actions/submit-lead";

const initial: LeadInput = {
  hasMcaDebt: true,
  debtAmountBucket: null,
  businessName: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  source: "homepage",
};

const TOTAL_STEPS = 7;

export function LeadForm({ source = "homepage" }: { source?: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadInput>({ ...initial, source });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof LeadInput>(k: K, v: LeadInput[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const meta = readClientMeta();
      const result = await submitLead({ ...data, ...meta });
      if (result.ok) setDone(true);
      else setError(result.error ?? "Submission failed");
    } catch {
      setError("Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  function next() { setStep((s) => Math.min(s + 1, TOTAL_STEPS)); }
  function back() { setStep((s) => Math.max(s - 1, 1)); }

  if (done) {
    return (
      <div className="rounded-xl border border-border bg-white p-8 text-center">
        <h3 className="text-xl font-semibold">Thanks — we'll call you within 1 business hour.</h3>
        <p className="text-muted mt-2">Watch for a call from a TerraDebt advisor. If you'd rather book a time, call us at 1-800-TERRA-00.</p>
      </div>
    );
  }

  if (data.hasMcaDebt === false && step === 2) {
    return (
      <div className="rounded-xl border border-border bg-white p-8">
        <h3 className="text-xl font-semibold">We focus on MCA-specific situations.</h3>
        <p className="text-muted mt-2">Drop your email and we'll send a free guide to small-business debt options.</p>
        <input type="email" placeholder="you@business.com" className="mt-4 w-full border border-border rounded-md px-3 py-2"
               value={data.email} onChange={(e) => update("email", e.target.value)} />
        <button onClick={handleSubmit} disabled={!data.email || submitting} className="mt-4 w-full bg-electric text-white px-4 py-2 rounded-md font-medium disabled:opacity-50">{submitting ? "Sending..." : "Send guide"}</button>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white p-8">
      <ProgressBar step={step} total={TOTAL_STEPS} />
      <div className="mt-6 min-h-[200px]">
        {step === 1 && (
          <Question label="Do you have MCA debt?">
            <div className="flex gap-3">
              <Choice active={data.hasMcaDebt === true} onClick={() => { update("hasMcaDebt", true); next(); }}>Yes</Choice>
              <Choice active={data.hasMcaDebt === false} onClick={() => { update("hasMcaDebt", false); next(); }}>No</Choice>
            </div>
          </Question>
        )}
        {step === 2 && data.hasMcaDebt && (
          <Question label="How much MCA debt do you currently owe?">
            <div className="grid grid-cols-2 gap-2">
              {debtBuckets.map((b) => (
                <Choice key={b} active={data.debtAmountBucket === b} onClick={() => { update("debtAmountBucket", b); next(); }}>
                  {bucketLabel(b)}
                </Choice>
              ))}
            </div>
          </Question>
        )}
        {step === 3 && (
          <Question label="What's your business name?">
            <Input value={data.businessName} onChange={(v) => update("businessName", v)} placeholder="Acme Trucking LLC" />
          </Question>
        )}
        {step === 4 && (
          <Question label="What's your first name?">
            <Input value={data.firstName} onChange={(v) => update("firstName", v)} placeholder="Jordan" />
          </Question>
        )}
        {step === 5 && (
          <Question label="And your last name?">
            <Input value={data.lastName} onChange={(v) => update("lastName", v)} placeholder="Pierce" />
          </Question>
        )}
        {step === 6 && (
          <Question label="Best phone to reach you?">
            <Input value={data.phone} onChange={(v) => update("phone", v)} placeholder="(555) 123-4567" type="tel" />
          </Question>
        )}
        {step === 7 && (
          <Question label="Your email?">
            <Input value={data.email} onChange={(v) => update("email", v)} placeholder="you@business.com" type="email" />
          </Question>
        )}
      </div>
      <div className="flex justify-between mt-6">
        {step > 1 ? <button onClick={back} className="text-muted text-sm">← Back</button> : <span />}
        {step >= 3 && step < 7 && (
          <button onClick={next} disabled={!isStepValid(step, data)} className="bg-electric text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50">Next →</button>
        )}
        {step === 7 && (
          <button onClick={handleSubmit} disabled={!isStepValid(7, data) || submitting} className="bg-electric text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50">{submitting ? "Submitting..." : "Get my analysis"}</button>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
    </div>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-lg font-semibold text-slate mb-4">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full border border-border rounded-md px-3 py-3 text-base" />;
}

function Choice({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`px-4 py-3 rounded-md border text-sm font-medium ${active ? "border-electric bg-electric/5 text-electric" : "border-border bg-white text-slate hover:border-electric"}`}>{children}</button>
  );
}

function bucketLabel(b: string) {
  switch (b) {
    case "<25k": return "Less than $25K";
    case "25k-75k": return "$25K – $75K";
    case "75k-200k": return "$75K – $200K";
    case "200k-500k": return "$200K – $500K";
    case "500k+": return "$500K+";
    default: return b;
  }
}

function isStepValid(step: number, d: LeadInput) {
  if (step === 3) return d.businessName.trim().length > 0;
  if (step === 4) return d.firstName.trim().length > 0;
  if (step === 5) return d.lastName.trim().length > 0;
  if (step === 6) return d.phone.trim().length >= 7;
  if (step === 7) return /\S+@\S+\.\S+/.test(d.email);
  return true;
}

function readClientMeta() {
  try {
    const get = (k: string) => localStorage.getItem(`td_${k}`) ?? undefined;
    return {
      utmSource: get("utm_source"),
      utmMedium: get("utm_medium"),
      utmCampaign: get("utm_campaign"),
      utmContent: get("utm_content"),
      utmTerm: get("utm_term"),
      gclid: get("gclid"),
      fbclid: get("fbclid"),
    };
  } catch { return {}; }
}
