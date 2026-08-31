"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { bucketFromAmount, type LeadInput } from "@/lib/lead-schema";
import { submitLead } from "@/app/actions/submit-lead";

const TOTAL_STEPS = 3;

function fmt(n: number) {
  return n >= 1_000_000 ? "$1M+" : "$" + Math.round(n).toLocaleString("en-US");
}

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-slate placeholder-muted outline-none transition focus:border-electric";

export function SliderLeadForm({
  source = "mca-lp",
  question = "How Much Debt Does Your Business Have?",
}: {
  source?: string;
  question?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(100_000);
  const [hasMca, setHasMca] = useState<boolean | undefined>(undefined);
  const [contact, setContact] = useState({ businessName: "", firstName: "", lastName: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(k: keyof typeof contact, v: string) {
    setContact((c) => ({ ...c, [k]: v }));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const meta = readClientMeta();
      const payload: LeadInput = {
        debtAmount: amount,
        debtAmountBucket: bucketFromAmount(amount),
        hasMcaDebt: hasMca,
        ...contact,
        source,
        consent: true,
      };
      const result = await submitLead({ ...payload, ...meta });
      if (result.ok) router.push("/thank-you");
      else setError(result.error ?? "Submission failed");
    } catch {
      setError("Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="assessment" className="surface-card-elevated sticky top-24 p-7">
      <div className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted">
        Step {step} / {TOTAL_STEPS}
      </div>

      {step === 1 && (
        <>
          <div className="mb-1 text-[17px] font-bold text-slate">{question}</div>
          <div className="mb-4 text-[28px] font-extrabold tabular-nums text-electric">{fmt(amount)}</div>
          <input
            type="range"
            min={0}
            max={1_000_000}
            step={10_000}
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="lp-slider w-full cursor-pointer"
            aria-label="Total active MCA advances"
          />
          <div className="mb-5 mt-1 flex justify-between text-[10.5px] text-muted">
            <span>$0</span><span>$250K</span><span>$500K</span><span>$750K</span><span>$1M+</span>
          </div>
          <p className="mb-5 text-[12.5px] leading-relaxed text-muted">
            Select your total MCA balance to see your custom relief options
          </p>
          <button
            onClick={() => setStep(2)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-electric py-3 text-[15px] font-bold text-white transition hover:bg-electric-soft"
          >
            Check Free Eligibility →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-5 text-[17px] font-bold text-slate">Do you have more than one active advance?</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ].map((o) => (
              <button
                key={o.label}
                onClick={() => { setHasMca(o.value); setStep(3); }}
                className="rounded-lg border border-border bg-white py-4 text-[15px] font-bold text-slate transition hover:border-electric hover:text-electric"
              >
                {o.label}
              </button>
            ))}
          </div>
          <p className="mt-5 text-[12.5px] leading-relaxed text-muted">
            Stacked advances are our specialty. Single-advance situations work too.
          </p>
          <button onClick={() => setStep(1)} className="mt-4 text-xs text-muted hover:text-slate">← Back</button>
        </>
      )}

      {step === 3 && (
        <>
          <div className="mb-4 text-[17px] font-bold text-slate">Where should the advisor reach you?</div>
          <div className="grid gap-2.5">
            <input className={inputCls} placeholder="Business name" value={contact.businessName} onChange={(e) => update("businessName", e.target.value)} />
            <div className="grid grid-cols-2 gap-2.5">
              <input className={inputCls} placeholder="First name" value={contact.firstName} onChange={(e) => update("firstName", e.target.value)} />
              <input className={inputCls} placeholder="Last name" value={contact.lastName} onChange={(e) => update("lastName", e.target.value)} />
            </div>
            <input className={inputCls} placeholder="Phone" inputMode="tel" value={contact.phone} onChange={(e) => update("phone", e.target.value)} />
            <input className={inputCls} placeholder="Email" inputMode="email" value={contact.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
          <button
            onClick={submit}
            disabled={submitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-electric py-3 text-[15px] font-bold text-white transition hover:bg-electric-soft disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Get my free assessment →"}
          </button>
          <button onClick={() => setStep(2)} className="mt-3 text-xs text-muted hover:text-slate">← Back</button>
        </>
      )}

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
        <svg className="h-3.5 w-3.5 text-electric" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        SSL secured. Your information is never sold or shared for marketing.
      </div>
      <div className="mt-2 text-center text-[11px] leading-relaxed text-muted">
        By submitting, you consent to Business Debt Insider contacting you. See our{" "}
        <a href="/privacy" className="text-electric">Privacy Policy</a>.
      </div>

      <style jsx global>{`
        .lp-slider {
          appearance: none;
          height: 4px;
          border-radius: 2px;
          background: #e5e5e5;
          outline: none;
        }
        .lp-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #064e3b;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }
        .lp-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #064e3b;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }
      `}</style>
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
  } catch {
    return {};
  }
}

function readCookie(name: string): string | undefined {
  try {
    const m = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : undefined;
  } catch {
    return undefined;
  }
}
