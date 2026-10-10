import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { firstPreviewPrompt, correctedPreview, finalPreview } from "./prompts.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const binary = process.env.HIGGSFIELD_CLI || "/Users/baralezrah/.local/bin/higgsfield";
const plan = JSON.parse(fs.readFileSync(new URL("content-plan.json", import.meta.url), "utf8"));
const selected = process.argv.includes("--final") ? finalPreview : process.argv.includes("--corrected") ? correctedPreview : null;
const args = ["seedance_2_5", "--mode", "omni_reference", "--duration", "15", "--resolution", "720p", "--aspect_ratio", "9:16", "--generate_audio", "true", "--image-references", path.join(root, plan.presenter.referenceFile), "--prompt", selected?.prompt || firstPreviewPrompt, "--json"];
const directory = path.join(root, "logs/ugc", selected?.id || "first-cli-preview");
const stateFile = path.join(directory, "submission.json");

function cli(action) {
  const result = spawnSync(binary, ["generate", action, ...args], { encoding: "utf8", timeout: 120000, maxBuffer: 4 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error(`Higgsfield CLI ${action} failed: ${result.error?.message || result.stderr.slice(0, 300)}`);
  return JSON.parse(result.stdout);
}

if (fs.existsSync(stateFile)) {
  // A lost submission response must be reconciled through job history before retrying.
  console.log(fs.readFileSync(stateFile, "utf8"));
  console.log("Submission already recorded. Inspect this job; do not create another preview.");
} else {
  const quote = cli("cost");
  console.log(JSON.stringify({ provider: "Higgsfield CLI", billing: "existing plan credits", quote }));
  if (process.argv.includes("--generate")) {
    if (!Number.isFinite(quote.credits) || quote.credits <= 0 || quote.credits > 105) throw new Error("Preview exceeds the verified 105-credit estimate; generation stopped");
    fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
    fs.writeFileSync(stateFile, JSON.stringify({ status: "submitting", quote, createdAt: new Date().toISOString() }), { flag: "wx", mode: 0o600 });
    const job = cli("create");
    fs.writeFileSync(stateFile, JSON.stringify({ status: "submitted", quote, job }, null, 2), { mode: 0o600 });
    console.log(JSON.stringify(job, null, 2));
  } else {
    console.log("Estimate only. Pass --generate to create this preview with existing plan credits.");
  }
}
