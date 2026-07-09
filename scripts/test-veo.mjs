// One-off: test Veo 3.1 video generation with the BDI Gemini key.
import fs from "node:fs";

const env = Object.fromEntries(
  fs.readFileSync(new URL("../.env", import.meta.url), "utf8").split("\n")
    .filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)])
);
const KEY = env.GEMINI_API_KEY;
const BASE = "https://generativelanguage.googleapis.com/v1beta";

const start = await fetch(`${BASE}/models/veo-3.1-fast-generate-preview:predictLongRunning`, {
  method: "POST",
  headers: { "x-goog-api-key": KEY, "content-type": "application/json" },
  body: JSON.stringify({
    instances: [{
      prompt: "Cinematic close-up of a small business owner at a desk late at night, reviewing a stack of merchant cash advance statements, calm determined expression, moody dark office lit by a single desk lamp with a subtle green accent light, slow push-in, professional documentary style. No text overlays.",
    }],
    parameters: { aspectRatio: "9:16", durationSeconds: 8 },
  }),
}).then((r) => r.json());
if (!start.name) { console.error("START FAILED:", JSON.stringify(start).slice(0, 500)); process.exit(1); }
console.log("operation:", start.name);

let op;
for (let i = 0; i < 60; i++) {
  await new Promise((r) => setTimeout(r, 10000));
  op = await fetch(`${BASE}/${start.name}`, { headers: { "x-goog-api-key": KEY } }).then((r) => r.json());
  process.stdout.write(".");
  if (op.done) break;
}
console.log();
if (!op?.done) { console.error("TIMEOUT"); process.exit(1); }
if (op.error) { console.error("OP ERROR:", JSON.stringify(op.error).slice(0, 500)); process.exit(1); }

const video = op.response?.generateVideoResponse?.generatedSamples?.[0]?.video
  || op.response?.generatedVideos?.[0]?.video;
if (!video) { console.error("NO VIDEO IN RESPONSE:", JSON.stringify(op.response).slice(0, 800)); process.exit(1); }
const uri = video.uri || video.name;
console.log("video uri:", uri);

const dl = await fetch(uri.includes("://") ? uri : `${BASE}/${uri}:download?alt=media`, { headers: { "x-goog-api-key": KEY } });
const buf = Buffer.from(await dl.arrayBuffer());
fs.writeFileSync("/tmp/bdi-veo-test.mp4", buf);
console.log("saved /tmp/bdi-veo-test.mp4", buf.length, "bytes");
