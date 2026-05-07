"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProgressBar } from "./ProgressBar";
import { bucketFromAmount, type LeadInput } from "@/lib/lead-schema";
import { submitLead } from "@/app/actions/submit-lead";

const initial: LeadInput = {
  debtAmount: 100_000,
  hasMcaDebt: true,
  debtAmountBucket: null,
  businessName: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  source: "homepage",
};

const TOTAL_STEPS = 6;

export function LeadForm({ source = "homepage" }: { source?: string }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState<LeadInput>({ ...initial, source });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof LeadInput>(k: K, v: LeadInput[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  function next() { setDirection(1); setStep((s) => Math.min(s + 1, TOTAL_STEPS)); }
  function back() { setDirection(-1); setStep((s) => Math.max(s - 1, 1)); }

  async function handleSubmit() {
    setSubmitting(true); setError(null);
    try {
      const meta = readClientMeta();
      const payload: LeadInput = {
        ...data,
        debtAmountBucket: bucketFromAmount(data.debtAmount),
        hasMcaDebt: data.debtAmount > 0,
      };
      const result = await submitLead({ ...payload, ...meta });
      if (result.ok) setDone(true);
      else setError(result.error ?? "Submission failed");
    } catch {
      setError("Submission failed");
    } finally { setSubmitting(false); }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface-card-elevated p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="mx-auto w-14 h-14 rounded-full bg-electric/10 flex items-center justify-center"
        >
          <svg className="w-7 h-7 text-electric" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </motion.div>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">You&apos;ll hear from us within the hour.</h3>
        <p className="text-muted mt-2">Watch for a call from a TerraDebt advisor. If you&apos;d rather book a time, call us at 1-800-TERRA-00.</p>
      </motion.div>
    );
  }

  return (
    <div className="surface-card-elevated p-8 md:p-10 relative overflow-hidden">
      <ProgressBar step={step} total={TOTAL_STEPS} />
      <div className="flex items-center justify-between mt-4">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">{`Step ${step} / ${TOTAL_STEPS}`}</span>
        {step > 1 && <button onClick={back} className="text-muted text-sm hover:text-slate transition">← Back</button>}
      </div>

      <div className="mt-8 min-h-[260px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 1 && (
              <DebtStep value={data.debtAmount} onChange={(v) => update("debtAmount", v)} onAdvance={next} />
            )}
            {step === 2 && <TextStep label="What's your business name?" placeholder="Acme Trucking LLC" value={data.businessName} onChange={(v) => update("businessName", v)} onAdvance={next} valid={data.businessName.trim().length > 0} />}
            {step === 3 && <TextStep label="What's your first name?" placeholder="Jordan" value={data.firstName} onChange={(v) => update("firstName", v)} onAdvance={next} valid={data.firstName.trim().length > 0} />}
            {step === 4 && <TextStep label="And your last name?" placeholder="Pierce" value={data.lastName} onChange={(v) => update("lastName", v)} onAdvance={next} valid={data.lastName.trim().length > 0} />}
            {step === 5 && <TextStep label="Best phone to reach you?" placeholder="(555) 123-4567" type="tel" value={data.phone} onChange={(v) => update("phone", v)} onAdvance={next} valid={data.phone.trim().length >= 7} />}
            {step === 6 && <TextStep label="Your email?" placeholder="you@business.com" type="email" value={data.email} onChange={(v) => update("email", v)} onAdvance={handleSubmit} valid={/\S+@\S+\.\S+/.test(data.email)} submit submitting={submitting} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
    </div>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-2xl md:text-3xl font-semibold tracking-tight text-slate mb-6 leading-tight">{label}</label>
      {children}
    </div>
  );
}

function DebtStep({ value, onChange, onAdvance }: { value: number; onChange: (v: number) => void; onAdvance: () => void }) {
  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); onAdvance(); }
  }
  const formatted = `$${value.toLocaleString()}${value >= 1_000_000 ? "+" : ""}`;
  return (
    <Question label="How much MCA debt do you have?">
      <div onKeyDown={onKey}>
        <div className="font-mono text-5xl md:text-6xl font-bold text-electric tracking-tighter">{formatted}</div>
        <input
          type="range"
          min={0}
          max={1_000_000}
          step={5_000}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full mt-6 accent-electric"
          aria-label="MCA debt amount"
        />
        <div className="mt-2 flex justify-between font-mono text-xs text-muted">
          <span>$0</span>
          <span>$250K</span>
          <span>$500K</span>
          <span>$750K</span>
          <span>$1M+</span>
        </div>
        <p className="mt-6 text-sm text-muted">Slide to your approximate total across all advances. We&apos;ll tailor the call from here.</p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button onClick={onAdvance}
          className="bg-slate text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-slate-soft transition flex items-center gap-2">
          Continue
          <span aria-hidden>→</span>
        </button>
        <span className="font-mono text-xs text-muted">press <kbd className="bg-offwhite border border-border rounded px-1.5 py-0.5">Enter</kbd></span>
      </div>
    </Question>
  );
}

function TextStep({ label, placeholder, type = "text", value, onChange, onAdvance, valid, submit, submitting }: {
  label: string; placeholder?: string; type?: string; value: string; onChange: (v: string) => void; onAdvance: () => void; valid: boolean; submit?: boolean; submitting?: boolean;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && valid && !submitting) { e.preventDefault(); onAdvance(); }
  }
  return (
    <Question label={label}>
      <input ref={ref} type={type} value={value} placeholder={placeholder} onKeyDown={onKey} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b-2 border-border focus:border-electric outline-none px-0 py-3 text-2xl md:text-3xl font-medium text-slate transition placeholder:text-muted/60" />
      <div className="mt-8 flex items-center justify-between">
        <button onClick={onAdvance} disabled={!valid || !!submitting}
          className="bg-slate text-white px-5 py-3 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-soft transition flex items-center gap-2">
          {submit ? (submitting ? "Submitting..." : "Get my analysis") : "Continue"}
          <span aria-hidden>→</span>
        </button>
        <span className="font-mono text-xs text-muted">press <kbd className="bg-offwhite border border-border rounded px-1.5 py-0.5">Enter</kbd></span>
      </div>
    </Question>
  );
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
