import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { buildReelInput, generateReel } from "./higgsfield.mjs";
import { reserveBudget } from "./budget.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const plan = JSON.parse(fs.readFileSync(new URL("./content-plan.json", import.meta.url), "utf8"));
const envPath = path.join(root, ".env.higgsfield");
const env = { ...(fs.existsSync(envPath) ? dotenv.parse(fs.readFileSync(envPath)) : {}), ...process.env };
const prompt = `Create a photorealistic vertical UGC-style reel, 15 seconds. The reference image is a character sheet of ONE man, Alex: use his portrait and full-body image ONLY as identity references. Show ONE Alex in his same brown suit, never the character-sheet layout. Set the scene in an independent restaurant before opening, warm daylight, tables visible, authentic handheld camera at eye level, clear natural voices, no music. Alex speaks with a fictional adult restaurant owner wearing a neutral apron. This is an illustrative conversation, not a real client testimonial. First 5 seconds, the owner says: "Busy restaurant, but my MCA payments keep coming." Cut to Alex who replies: "Start with every agreement, payment amount, and schedule. Find MCA guides at Business Debt Insider." Keep Alex's facial appearance consistent with the supplied reference. No invented success claims, no extra dialogue, no logos, no generated website screens, no on-screen lettering. Frame both faces clearly and finish on Alex's friendly, confident expression.`;
const input = buildReelInput({ prompt, referenceUrl: plan.presenter.referenceUrl, duration: plan.durationSeconds });

if (!process.argv.includes("--generate")) {
  console.log(JSON.stringify({ mode: "preflight_only", provider: "Higgsfield", presenter: plan.presenter.name, credentialsConfigured: !!env.HF_CREDENTIALS, dailyBudgetUsd: Number(env.BDI_UGC_DAILY_BUDGET_USD || 0), input }, null, 2));
  console.log("No generation or publishing performed. Pass --generate to create the first preview.");
} else {
  const directory = path.join(root, "logs/ugc/first-preview");
  const result = await generateReel(input, {
    credentials: env.HF_CREDENTIALS,
    stateFile: path.join(directory, "generation.json"),
    beforeSubmit: ({ jobId, usd }) => {
      const budget = reserveBudget({ file: path.join(root, "logs/ugc/budget.json"), jobId, usd: usd * 1.1, limitUsd: Number(env.BDI_UGC_DAILY_BUDGET_USD) });
      console.log(JSON.stringify({ quotedUsd: usd, ...budget }));
    },
  });
  const response = await fetch(result.videoUrl, { signal: AbortSignal.timeout(120000) });
  if (!response.ok) throw new Error(`Video download failed (${response.status})`);
  const file = path.join(directory, "restaurant-owner.mp4");
  fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()), { mode: 0o600 });
  console.log(JSON.stringify({ status: "preview_generated_not_published", file, requestId: result.requestId }));
}
