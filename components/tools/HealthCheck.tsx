"use client";
import { useState, useMemo } from "react";

type Choice = { label: string; weight: number };
type Question = { id: string; q: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    id: "count",
    q: "How many active MCAs do you currently have?",
    choices: [
      { label: "1", weight: 5 },
      { label: "2", weight: 12 },
      { label: "3", weight: 18 },
      { label: "4", weight: 22 },
      { label: "5 or more", weight: 25 },
    ],
  },
  {
    id: "balance",
    q: "Total MCA debt balance?",
    choices: [
      { label: "Less than $25K", weight: 4 },
      { label: "$25K to $75K", weight: 10 },
      { label: "$75K to $200K", weight: 15 },
      { label: "$200K to $500K", weight: 20 },
      { label: "More than $500K", weight: 25 },
    ],
  },
  {
    id: "status",
    q: "Are you current on payments?",
    choices: [
      { label: "Current and comfortable", weight: 4 },
      { label: "Current but stretched", weight: 10 },
      { label: "Behind 1 to 2 weeks", weight: 16 },
      { label: "Behind 30 days or more", weight: 22 },
      { label: "In default", weight: 25 },
    ],
  },
  {
    id: "legal",
    q: "Has any lender taken legal or collection action?",
    choices: [
      { label: "None", weight: 4 },
      { label: "Aggressive collection calls", weight: 10 },
      { label: "Threats of COJ filing", weight: 16 },
      { label: "COJ filed or lawsuit served", weight: 22 },
      { label: "Account frozen or judgment entered", weight: 25 },
    ],
  },
  {
    id: "burden",
    q: "Daily MCA debit as a percent of daily revenue?",
    choices: [
      { label: "Less than 10%", weight: 4 },
      { label: "10% to 25%", weight: 10 },
      { label: "25% to 40%", weight: 16 },
      { label: "40% to 60%", weight: 22 },
      { label: "More than 60%", weight: 25 },
    ],
  },
];

export function HealthCheck() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState<number>(0);

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);
  const score = useMemo(() => Object.values(answers).reduce((s, w) => s + w, 0), [answers]);

  function pick(qId: string, weight: number) {
    setAnswers((a) => ({ ...a, [qId]: weight }));
    if (step < QUESTIONS.length - 1) setStep(step + 1);
  }

  if (allAnswered) {
    return <Result score={score} onReset={() => { setAnswers({}); setStep(0); }} />;
  }

  const q = QUESTIONS[step];
  return (
    <div className="surface-card-elevated p-8 md:p-10 max-w-2xl">
      <div className="flex gap-1.5 w-full mb-6">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition ${i <= step ? "bg-electric" : "bg-border"}`} />
        ))}
      </div>
      <span className="font-mono text-xs uppercase tracking-wider text-muted">Question {step + 1} / {QUESTIONS.length}</span>
      <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate leading-tight">{q.q}</h2>
      <div className="mt-6 grid gap-2">
        {q.choices.map((c) => (
          <button key={c.label} onClick={() => pick(q.id, c.weight)} className="text-left h-14 px-5 rounded-xl border border-border bg-white text-slate hover:border-electric hover:bg-electric/5 hover:-translate-y-0.5 transition-all flex items-center justify-between">
            <span className="font-medium">{c.label}</span>
            <span className="text-electric opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>→</span>
          </button>
        ))}
      </div>
      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mt-6 text-muted text-sm hover:text-slate">← Back</button>
      )}
    </div>
  );
}

function Result({ score, onReset }: { score: number; onReset: () => void }) {
  const tier = score < 35 ? { label: "Manageable", tone: "good", program: "Restructure", body: "Your stack is putting pressure on cash flow but is not yet in a critical zone. A restructure program could reduce daily debits without affecting your lender relationships." }
    : score < 65 ? { label: "Stressed", tone: "fair", program: "Restructure or settlement", body: "You are in a meaningful pressure zone. Depending on whether you can stay current, restructure or a partial settlement program is appropriate. Acting now widens your options." }
    : score < 90 ? { label: "Critical", tone: "warn", program: "Settlement, possibly with legal coordination", body: "You are at meaningful default risk if you are not already there. A settlement program is likely the right path. If COJ filings are imminent, legal defense should be coordinated in parallel." }
    : { label: "Emergency", tone: "danger", program: "Legal defense + settlement", body: "Active legal exposure and severe cash flow burden. You need legal defense in parallel with any debt resolution. Contact us today, not next week." };

  return (
    <div className="surface-card-elevated p-10 max-w-2xl">
      <div className="font-mono text-xs uppercase tracking-wider text-muted">Your result</div>
      <div className="mt-3 flex items-baseline gap-4">
        <div className="font-mono text-7xl font-bold tracking-tighter text-electric">{score}</div>
        <div className={`text-lg font-semibold ${tier.tone === "danger" ? "text-red-600" : tier.tone === "warn" ? "text-amber-700" : tier.tone === "fair" ? "text-slate" : "text-emerald-700"}`}>{tier.label}</div>
      </div>
      <p className="mt-4 text-slate leading-relaxed">{tier.body}</p>
      <div className="mt-6 surface-card p-5">
        <div className="font-mono text-xs uppercase tracking-wider text-muted">Program likely fit</div>
        <div className="mt-1 text-lg font-semibold text-slate">{tier.program}</div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/services/mca-debt-relief" className="bg-slate text-white px-4 py-2 rounded-xl text-sm font-medium no-underline hover:bg-slate-soft transition">Talk to us</a>
        <button onClick={onReset} className="border border-border text-slate px-4 py-2 rounded-xl text-sm font-medium hover:border-electric transition">Reset</button>
      </div>
      <p className="mt-6 text-xs text-muted leading-relaxed">This is a self-assessment, not a diagnosis. The recommendation is a starting point for a conversation, not a guarantee of program eligibility.</p>
    </div>
  );
}
