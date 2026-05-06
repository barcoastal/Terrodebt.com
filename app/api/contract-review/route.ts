import { NextRequest, NextResponse } from "next/server";
import { extractPdfText } from "@/lib/contract-extract";

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
    return NextResponse.json({ ok: true, text, filename: file.name });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "unknown" }, { status: 500 });
  }
}
