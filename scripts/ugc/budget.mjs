import fs from "node:fs";
import path from "node:path";

// Reserve before submitting; unknown outcomes keep their reservation.
// No automatic refunds/retries that could turn a daily limit into extra spend.
export function reserveBudget({ file, jobId, usd, limitUsd, date = new Date() }) {
  if (!jobId || !Number.isFinite(usd) || usd <= 0 || !Number.isFinite(limitUsd) || limitUsd <= 0) throw new Error("Invalid generation budget");
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  const cents = Math.ceil(usd * 100);
  const limitCents = Math.floor(Math.min(limitUsd, 20) * 100);
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const lock = `${file}.lock`;
  const descriptor = fs.openSync(lock, "wx", 0o600);
  try {
    const ledger = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
    const reservations = ledger[day] ?? {};
    const prior = reservations[jobId] || 0;
    const total = Object.values(reservations).reduce((sum, value) => sum + value, 0);
    const proposed = total - prior + Math.max(prior, cents);
    if (proposed > limitCents) throw new Error(`Daily generation budget reached: proposed $${(proposed / 100).toFixed(2)} exceeds $${(limitCents / 100).toFixed(2)}`);
    reservations[jobId] = Math.max(prior, cents);
    ledger[day] = reservations;
    const temporary = `${file}.${process.pid}.tmp`;
    fs.writeFileSync(temporary, JSON.stringify(ledger, null, 2), { mode: 0o600 });
    fs.renameSync(temporary, file);
    return { day, reservedUsd: proposed / 100, limitUsd: limitCents / 100 };
  } finally { fs.closeSync(descriptor); fs.unlinkSync(lock); }
}
