"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  consent: false,
};

const TOTAL_STEPS = 3;

export function LeadForm({ source = "homepage" }: { source?: string }) {
  const router = useRouter();
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
        hasMcaDebt: data.hasMcaDebt,
      };
      const result = await submitLead({ ...payload, ...meta });
      if (result.ok) {
        setDone(true);
        router.push("/thank-you");
      } else setError(result.error ?? "Submission failed");
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
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">Thanks. A Business Debt Insider advisor will reach out shortly.</h3>
        <p className="text-muted mt-2">Watch for an email and a call within one business hour.</p>
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

      <div className="mt-8 min-h-[280px]">
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
            {step === 2 && (
              <Question label="Do you have more than one MCA loan?">
                <div className="grid grid-cols-2 gap-3">
                  <Choice big active={data.hasMcaDebt === true} onClick={() => { update("hasMcaDebt", true); next(); }}>Yes</Choice>
                  <Choice big active={data.hasMcaDebt === false} onClick={() => { update("hasMcaDebt", false); next(); }}>No</Choice>
                </div>
                <p className="mt-6 text-sm text-muted">Stacked MCAs are our specialty. We work with single-MCA situations too.</p>
              </Question>
            )}
            {step === 3 && (
              <ContactStep
                data={data}
                onUpdate={update}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            )}
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

function Choice({ active, onClick, children, big }: { active?: boolean; onClick: () => void; children: React.ReactNode; big?: boolean }) {
  const sizing = big ? "h-20 text-lg" : "h-14 text-base";
  return (
    <button onClick={onClick}
      className={`group relative ${sizing} px-5 rounded-xl border text-left font-medium transition-all
        ${active ? "border-electric bg-electric/5 text-slate ring-2 ring-electric/20"
                 : "border-border bg-white text-slate hover:border-electric hover:bg-electric/5 hover:-translate-y-0.5 hover:shadow-soft"}`}>
      <span className="flex items-center justify-between">
        <span>{children}</span>
        <span className={`text-electric transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} aria-hidden>→</span>
      </span>
    </button>
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

function ContactStep({ data, onUpdate, onSubmit, submitting }: {
  data: LeadInput;
  onUpdate: <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const firstRef = useRef<HTMLInputElement | null>(null);
  const [consent, setConsent] = useState(false);
  useEffect(() => { firstRef.current?.focus(); }, []);

  const fieldsValid =
    data.businessName.trim().length > 0 &&
    data.firstName.trim().length > 0 &&
    data.lastName.trim().length > 0 &&
    data.phone.trim().length >= 7 &&
    /\S+@\S+\.\S+/.test(data.email);
  const valid = fieldsValid && consent;

  function onSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    if (valid && !submitting) {
      onUpdate("consent", true);
      onSubmit();
    }
  }

  return (
    <form onSubmit={onSubmitForm}>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate leading-tight">
        Where should we reach you?
      </h3>
      <p className="mt-2 text-muted text-sm">A Business Debt Insider advisor will reach out within one business hour.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Business name" className="sm:col-span-2">
          <input ref={firstRef} type="text" required value={data.businessName} onChange={(e) => onUpdate("businessName", e.target.value)} placeholder="Acme Trucking LLC" className={inputCls} />
        </Field>
        <Field label="First name">
          <input type="text" required value={data.firstName} onChange={(e) => onUpdate("firstName", e.target.value)} placeholder="Jordan" className={inputCls} />
        </Field>
        <Field label="Last name">
          <input type="text" required value={data.lastName} onChange={(e) => onUpdate("lastName", e.target.value)} placeholder="Pierce" className={inputCls} />
        </Field>
        <Field label="Phone">
          <input type="tel" required value={data.phone} onChange={(e) => onUpdate("phone", e.target.value)} placeholder="(555) 123-4567" className={inputCls} />
        </Field>
        <Field label="Email">
          <input type="email" required value={data.email} onChange={(e) => onUpdate("email", e.target.value)} placeholder="you@business.com" className={inputCls} />
        </Field>
      </div>

      <label className="mt-6 flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-border accent-electric"
          required
        />
        <span className="text-xs text-muted leading-relaxed">
          I agree to Business Debt Insider&apos;s{" "}
          <a href="/terms" target="_blank" rel="noreferrer" className="text-slate underline">Terms</a>
          {" "}and{" "}
          <a href="/privacy" target="_blank" rel="noreferrer" className="text-slate underline">Privacy Policy</a>
          , and consent to receive calls, texts, and emails from Business Debt Insider at the number and email provided, including marketing communications. Message and data rates may apply. Consent is not a condition of any service. Reply STOP to opt out.
        </span>
      </label>

      <button type="submit" disabled={!valid || submitting}
        className="mt-6 w-full bg-slate text-white px-5 py-4 rounded-xl text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-soft transition flex items-center justify-center gap-2">
        {submitting ? "Submitting..." : "Get my free assessment"}
        <span aria-hidden>→</span>
      </button>
      <p className="mt-3 text-xs text-muted text-center">No commitment. We will not sell your info.</p>
    </form>
  );
}

const inputCls = "w-full bg-white border border-border rounded-lg px-3 py-3 text-base text-slate focus:border-electric focus:ring-2 focus:ring-electric/20 outline-none transition placeholder:text-muted/60";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">{label}</label>
      {children}
    </div>
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
      affiliateClickid: get("affiliate_clickid"),
      tkclid: readCookie("tkclid") ?? get("tkclid"),
    };
  } catch { return {}; }
}

function readCookie(name: string): string | undefined {
  try {
    const m = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : undefined;
  } catch { return undefined; }
}
