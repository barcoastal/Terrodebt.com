import { anthropic } from "./anthropic";

export type ContractAnalysis = {
  summary: string;
  effectiveApr: number | null;
  totalPayback: number | null;
  fundedAmount: number | null;
  factorRate: number | null;
  termDays: number | null;
  dailyPayment: number | null;
  redFlags: string[];
  options: string[];
};

const SYSTEM = `You are an expert MCA contract analyst. Given a merchant cash advance contract, extract specific financial terms and identify red flags. Return JSON only, no prose.

Always include:
- summary: 1-2 sentence plain-English summary of the deal
- fundedAmount: dollar amount the merchant received
- totalPayback: total dollar amount the merchant must pay back
- factorRate: factor rate (e.g., 1.45)
- effectiveApr: effective annualized rate as a number (e.g., 132.5 means 132.5%)
- termDays: estimated term in days
- dailyPayment: daily debit amount
- redFlags: array of plain-English concerns (COJ clause, personal guarantee, reconciliation language, stacking restrictions, prepayment penalty, etc.)
- options: array of next-step suggestions tailored to this contract

If a field is unknowable, set it to null. Never invent.`;

export async function analyzeContract(text: string): Promise<ContractAnalysis> {
  const client = anthropic();
  const truncated = text.slice(0, 30000);
  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    system: SYSTEM,
    messages: [{ role: "user", content: `Analyze this MCA contract:\n\n${truncated}` }],
  });
  const block = msg.content[0];
  const raw = block.type === "text" ? block.text : "";
  const jsonStart = raw.indexOf("{");
  const jsonEnd = raw.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) throw new Error("Claude did not return JSON");
  const json = raw.slice(jsonStart, jsonEnd + 1);
  return JSON.parse(json) as ContractAnalysis;
}
