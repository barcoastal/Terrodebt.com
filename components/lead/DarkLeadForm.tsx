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
  "w-full rounded-lg border border-white/10 bg-[#0A0F0E] px-3.5 py-2.5 text-sm text-white placeholder-[#5A706A] outline-none transition focus:border-[#00C896]";

export function DarkLeadForm({ source = "mca-lp" }: { source?: string }) {
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
    <div id="assessment" className="sticky top-24 rounded-2xl border border-white/10 bg-[#161E1D] p-7">
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#5A706A]">
        Step {step} / {TOTAL_STEPS}
      </div>

      {step === 1 && (
        <>
          <div className="mb-1 text-[17px] font-bold text-white">
            How much in MCA advances are currently active on your account?
          </div>
          <div className="mb-4 text-[28px] font-extrabold tabular-nums text-[#00C896]">{fmt(amount)}</div>
          <input
            type="range"
            min={0}
            max={1_000_000}
            step={10_000}
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="dark-slider w-full cursor-pointer"
            aria-label="Total active MCA advances"
          />
          <div className="mb-5 mt-1 flex justify-between text-[10.5px] text-[#5A706A]">
            <span>$0</span><span>$250K</span><span>$500K</span><span>$750K</span><span>$1M+</span>
          </div>
          <p className="mb-5 text-[12.5px] leading-relaxed text-[#5A706A]">
            Slide to your approximate total across all active advances. We&apos;ll tailor the call from here.
          </p>
          <button
            onClick={() => setStep(2)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00C896] py-3 text-[15px] font-bold text-black transition hover:bg-[#00E6AC]"
          >
            Continue →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-5 text-[17px] font-bold text-white">Do you have more than one active advance?</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ].map((o) => (
              <button
                key={o.label}
                onClick={() => { setHasMca(o.value); setStep(3); }}
                className="rounded-lg border border-white/10 bg-[#0A0F0E] py-4 text-[15px] font-bold text-white transition hover:border-[#00C896] hover:text-[#00C896]"
              >
                {o.label}
              </button>
            ))}
          </div>
          <p className="mt-5 text-[12.5px] leading-relaxed text-[#5A706A]">
            Stacked advances are our specialty. Single-advance situations work too.
          </p>
          <button onClick={() => setStep(1)} className="mt-4 text-xs text-[#5A706A] hover:text-white">← Back</button>
        </>
      )}

      {step === 3 && (
        <>
          <div className="mb-4 text-[17px] font-bold text-white">Where should the advisor reach you?</div>
          <div className="grid gap-2.5">
            <input className={inputCls} placeholder="Business name" value={contact.businessName} onChange={(e) => update("businessName", e.target.value)} />
            <div className="grid grid-cols-2 gap-2.5">
              <input className={inputCls} placeholder="First name" value={contact.firstName} onChange={(e) => update("firstName", e.target.value)} />
              <input className={inputCls} placeholder="Last name" value={contact.lastName} onChange={(e) => update("lastName", e.target.value)} />
            </div>
            <input className={inputCls} placeholder="Phone" inputMode="tel" value={contact.phone} onChange={(e) => update("phone", e.target.value)} />
            <input className={inputCls} placeholder="Email" inputMode="email" value={contact.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
          <button
            onClick={submit}
            disabled={submitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#00C896] py-3 text-[15px] font-bold text-black transition hover:bg-[#00E6AC] disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Get my free assessment →"}
          </button>
          <button onClick={() => setStep(2)} className="mt-3 text-xs text-[#5A706A] hover:text-white">← Back</button>
        </>
      )}

      <div className="mt-4 text-center text-[11px] leading-relaxed text-[#5A706A]">
        By submitting, you consent to Business Debt Insider contacting you. See our{" "}
        <a href="/privacy" className="text-[#00C896]">Privacy Policy</a>.
      </div>

      <style jsx global>{`
        .dark-slider {
          appearance: none;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.12);
          outline: none;
        }
        .dark-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #00c896;
          border: 2px solid #0a0f0e;
          cursor: pointer;
        }
        .dark-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #00c896;
          border: 2px solid #0a0f0e;
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
    };
  } catch {
    return {};
  }
}
