"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { bucketFromAmount, type LeadInput } from "@/lib/lead-schema";
import { submitLead } from "@/app/actions/submit-lead";

import { AMOUNT_OPTIONS, type AmountOption } from "./amount-options";

const TOTAL_STEPS = 3;

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
  const [choice, setChoice] = useState<AmountOption | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const amount = choice?.value ?? 0;
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

      {step === 1 && !disqualified && (
        <>
          <div className="mb-1 text-[17px] font-bold text-slate">{question}</div>
          <p className="mb-4 mt-1 text-[12.5px] leading-relaxed text-muted">
            Select your total balance to see your custom relief options
          </p>
          <div className="relative mb-5">
            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={pickerOpen}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-white px-3.5 py-3 text-[15px] font-semibold text-slate outline-none transition focus:border-electric"
            >
              <span className={choice ? "" : "text-muted"}>{choice?.label ?? "Select"}</span>
              <svg
                className={`h-3 w-3 text-electric transition-transform ${pickerOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 8"
                fill="none"
              >
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {pickerOpen && (
              <ul
                role="listbox"
                className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-lg border border-border bg-white shadow-soft"
              >
                {AMOUNT_OPTIONS.map((o) => (
                  <li key={o.label}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={choice?.label === o.label}
                      onClick={() => { setChoice(o); setPickerOpen(false); }}
                      className={`w-full px-3.5 py-2.5 text-left text-[14px] font-medium transition ${
                        choice?.label === o.label
                          ? "bg-electric/10 text-electric"
                          : "text-slate hover:bg-offwhite"
                      }`}
                    >
                      {o.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={() => {
              if (!choice) return;
              if (choice.qualifies) setStep(2);
              else setDisqualified(true);
            }}
            disabled={!choice}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-electric py-3 text-[15px] font-bold text-white transition hover:bg-electric-soft disabled:opacity-50"
          >
            Check Free Eligibility →
          </button>
        </>
      )}

      {disqualified && (
        <div className="py-2">
          <div className="mb-2 text-[17px] font-bold text-slate">
            Our programs start at $20,000 in business debt.
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Below that level, professional fees would eat the benefit, so enrolling you would be
            wrong. The good news: at your size, direct negotiation usually works. Start with our
            free guides on{" "}
            <a href="/insights/business-debt-negotiation" className="text-electric">
              negotiating with creditors
            </a>{" "}
            and{" "}
            <a href="/insights/business-debt-management-plan" className="text-electric">
              building a debt management plan
            </a>
            .
          </p>
          <button
            onClick={() => { setDisqualified(false); setChoice(null); }}
            className="mt-4 text-xs text-muted hover:text-slate"
          >
            ← Back
          </button>
        </div>
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
