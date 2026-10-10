import path from "node:path";
import { ROOT } from "./runtime.mjs";
import { correctedPreview, finalPreview } from "./prompts.mjs";
import { reviewVideo } from "./review.mjs";
const selected = process.argv.includes("--final") ? finalPreview : correctedPreview;
console.log(JSON.stringify(await reviewVideo({
  videoFile: path.join(ROOT, "logs/ugc", selected.id, "reel.mp4"),
  referenceFile: path.join(ROOT, "brand-social/ugc/alex-reference.png"),
  spoken: selected.spoken,
  outputFile: path.join(ROOT, "logs/ugc", selected.id, "review.json"),
}), null, 2));
