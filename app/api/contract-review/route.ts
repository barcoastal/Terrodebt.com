import { NextRequest, NextResponse } from "next/server";
import { extractPdfText } from "@/lib/contract-extract";
import { analyzeContract } from "@/lib/contract-analyze";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ ok: false, error: "no file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > 10 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "file too large (10MB max)" }, { status: 400 });
  }

  try {
    const { text } = await extractPdfText(buffer);
    if (text.length < 200) {
      return NextResponse.json({ ok: false, error: "could not extract text from PDF" }, { status: 400 });
    }

    const analysis = await analyzeContract(text);

    const review = await db.contractReview.create({
      data: {
        contractText: text,
        contractFilename: file.name,
        aiSummary: analysis as unknown as object,
        effectiveApr: analysis.effectiveApr,
        totalPayback: analysis.totalPayback,
        redFlags: analysis.redFlags as unknown as object,
      },
    });

    return NextResponse.json({ ok: true, reviewId: review.id, analysis });
  } catch (e) {
    console.error("contract-review failed", e);
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "unknown" }, { status: 500 });
  }
}
