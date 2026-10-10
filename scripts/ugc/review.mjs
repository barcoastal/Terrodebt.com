import fs from "node:fs";
import { createHash } from "node:crypto";
import { readEnv, writeState } from "./runtime.mjs";

export async function reviewVideo({ videoFile, referenceFile, spoken, outputFile, fetchImpl = fetch }) {
  const bytes = fs.readFileSync(videoFile);
  const hash = createHash("sha256").update(bytes).digest("hex");
  if (fs.existsSync(outputFile)) {
    const prior = JSON.parse(fs.readFileSync(outputFile, "utf8"));
    if (prior.sha256 === hash && prior.spoken === spoken) return prior;
    throw new Error("Review file does not match current video/script");
  }
  const env = readEnv();
  if (!env.GEMINI_API_KEY) throw new Error("Missing video QA credential");
  // A single bounded QA request; never generates new media or retries a failed take.
  const r = await fetchImpl("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", {
    method: "POST", redirect: "error", signal: AbortSignal.timeout(120000),
    headers: { "x-goog-api-key": env.GEMINI_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [
      { text: `Review this 15-second branded reel and reference character image. Listen carefully to the ACTUAL audio, including the ending. Return JSON: {"transcript":string,"speechMatches":boolean,"identityMatches":boolean,"noMajorVisualDefects":boolean,"noInventedClaims":boolean,"issues":string[]}. The intended speech is: ${JSON.stringify(spoken)}. Mark speechMatches false for added, repeated, garbled or truncated words, including any unclear brand name if the script includes one. Do not infer words merely from these instructions. The brown-suit presenter must match the supplied character sheet. Additional adult business owners may appear. Reject any major deformations, generated website UI, or invented savings/customer results. Be strict; this controls automatic publishing.` },
      { inlineData: { mimeType: "image/png", data: fs.readFileSync(referenceFile).toString("base64") } },
      { inlineData: { mimeType: "video/mp4", data: bytes.toString("base64") } },
    ] }], generationConfig: { responseMimeType: "application/json", temperature: 0, maxOutputTokens: 2048 } }),
  });
  const body = await r.json();
  if (!r.ok) throw new Error(`Video review failed (${r.status})`);
  const review = JSON.parse(body.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "null");
  if (!review || !Array.isArray(review.issues)) throw new Error("Video review returned invalid output");
  const accepted = ["speechMatches", "identityMatches", "noMajorVisualDefects", "noInventedClaims"].every(k => review[k] === true) && review.issues.length === 0;
  const result = { sha256: hash, spoken, accepted, review, reviewedAt: new Date().toISOString() };
  writeState(outputFile, result);
  return result;
}
