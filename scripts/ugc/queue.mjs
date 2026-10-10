import fs from "node:fs";
import { writeState } from "./runtime.mjs";

export function clockParts(date, timeZone) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date).map(p => [p.type, p.value]));
  return { day: `${parts.year}-${parts.month}-${parts.day}`, hour: Number(parts.hour), minute: Number(parts.minute) };
}

export function dueSlots(date, config) {
  const { day, hour, minute } = clockParts(date, config.timeZone);
  return config.hours.filter(h => hour * 60 + minute >= h * 60 && hour * 60 + minute < h * 60 + 90)
    .map((h) => ({ id: `${day}-${h}`, day, hour: h, slot: config.hours.indexOf(h) }));
}

export function reserveCredits({ file, id, credits, limit = 210, now = new Date() }) {
  if (!id || !Number.isFinite(credits) || credits <= 0 || !Number.isFinite(limit) || limit <= 0) throw new Error("Invalid credit reservation");
  const day = clockParts(now, "Europe/Bucharest").day;
  const ledger = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
  const entries = ledger[day] || {};
  const total = Object.values(entries).reduce((a, b) => a + b, 0);
  const proposed = total - (entries[id] || 0) + Math.max(entries[id] || 0, credits);
  if (proposed > Math.min(210, limit)) throw new Error(`Daily plan-credit limit reached (${proposed} > ${Math.min(210, limit)})`);
  entries[id] = Math.max(entries[id] || 0, credits);
  ledger[day] = entries;
  writeState(file, ledger);
  return proposed;
}

const industries = [
  ["restaurant", "an independent restaurant before opening", "your agreements and payment schedule", "MCA payments every day?"],
  ["auto-repair", "a small auto repair shop reception", "each MCA agreement and its payment dates", "More than one MCA?"],
  ["construction", "a contractor's site office", "your MCA paperwork in one folder", "Where are your MCA agreements?"],
  ["salon", "a neighborhood salon between appointments", "your MCA payment dates on one calendar", "Running a salon with MCA payments?"],
  ["retail", "an independent retail shop before opening", "your questions about MCA fees and services", "Comparing MCA relief providers?"],
  ["trucking", "a small trucking dispatch office", "your MCA agreements and recent statements", "MCA paperwork scattered everywhere?"],
  ["ecommerce", "a small ecommerce packing workspace", "your MCA payment schedule and agreements", "Reviewing your MCA payments this week?"],
];

export function buildContent(day, slot) {
  const n = Math.round((Date.parse(day + "T00:00:00Z") - Date.parse("2026-10-10T00:00:00Z")) / 86400000);
  const [industry, setting, item, hook] = industries[((n % 7) + 7) % 7];
  const owner = slot === 0;
  const spoken = owner
    ? `${hook} Start with ${item}. Visit our website to learn more.`
    : `A quick MCA tip for business owners: gather ${item}. Write down your questions. Find educational guides on our website.`;
  return {
    slug: `ugc-${day}-${owner ? "owner" : "tip"}-${industry}`,
    spoken,
    prompt: `Photorealistic vertical 15-second UGC video. Use the reference character sheet ONLY as identity reference for ONE man, Alex in the brown suit. Never show the sheet. Setting: ${setting}. Natural daylight, authentic handheld phone-camera realism. ${owner ? "Medium two-person shot: Alex speaks to an adult business owner who listens silently and nods." : "Alex faces the camera, medium close-up, speaking directly to the viewer."} Only Alex speaks, clearly and naturally with an American accent. Exact dialogue, said ONCE: ${JSON.stringify(spoken)} Finish speaking by second 13, then hold a friendly silent expression. No extra dialogue, repeated words, music, logos, text, screens, or generated website UI. Keep Alex's face and brown suit identical to the reference. All characters are fictional. No customer testimonials or claims of savings, debt cancellation, guaranteed outcomes, or legal representation.`,
    caption: `${hook} Organize ${item} and prepare your questions. Explore MCA guides at businessdebtinsider.com.\n\nAI-generated presenter${owner ? " and fictional business-owner scene" : ""}. Educational content.\n\n#MCA #MerchantCashAdvance #BusinessOwners #BusinessDebtInsider`,
  };
}
