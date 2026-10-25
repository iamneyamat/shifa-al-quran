import { NextRequest, NextResponse } from "next/server";
import { diagnosisCategories } from "@/features/diagnosis/data/diagnosisData";

export const dynamic = "force-dynamic";
import { calculateDiagnosisResult } from "@/features/diagnosis/utils/diagnosisEngine";
import { AssessmentReportData, EvaluatedQuestion } from "@/features/diagnosis/types/report";
import { getQuranicVersesForPrescription } from "@/features/diagnosis/server/quranicData";
import { generateAssessmentPdf } from "@/features/diagnosis/server/pdfGenerator";
import { formatBengaliDate, renderFullReportHtml } from "@/features/diagnosis/server/reportTemplate";

// Best-effort per-IP throttle for this expensive endpoint. On serverless
// platforms the map is per-instance, so this is a first line of defence,
// not a substitute for platform-level rate limiting.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;
const rateHits = new Map<string, number[]>();

function isRateLimited(req: NextRequest): boolean {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const hits = (rateHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateHits.set(ip, hits);
  return hits.length > RATE_MAX;
}

function validatedReportData(
  rawCategoryId: string | null | undefined,
  userAnswers: unknown
): AssessmentReportData {
  const normId = (rawCategoryId || "").toLowerCase().trim();
  const category = diagnosisCategories.find(
    (c) => c.id.toLowerCase() === normId
  );
  if (!category) {
    throw Object.assign(new Error("Unknown diagnosis category"), {
      status: 400,
    });
  }
  if (!userAnswers || typeof userAnswers !== "object" || Array.isArray(userAnswers)) {
    throw Object.assign(new Error("Answers are required"), { status: 400 });
  }
  const answers = userAnswers as Record<string, unknown>;
  const knownIds = new Set((category.questions || []).map((q) => q.id));
  if (Object.keys(answers).length === 0) {
    throw Object.assign(new Error("Answers are required"), { status: 400 });
  }
  if (Object.keys(answers).length > knownIds.size) {
    throw Object.assign(new Error("Too many answers"), { status: 400 });
  }
  const cleanAnswers: Record<string, number> = {};
  for (const [id, value] of Object.entries(answers)) {
    if (!knownIds.has(id)) {
      throw Object.assign(new Error(`Unknown question: ${id}`), { status: 400 });
    }
    if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > 2) {
      throw Object.assign(new Error(`Invalid answer for ${id}`), { status: 400 });
    }
    cleanAnswers[id] = value;
  }

  const result = calculateDiagnosisResult(category, cleanAnswers);

  const evaluatedQuestions: EvaluatedQuestion[] = (category.questions || []).map((q) => {
    const weight = cleanAnswers[q.id] ?? 0;
    const label = weight === 2 ? "হ্যাঁ" : weight === 1 ? "মাঝে মধ্যে" : "না";
    const severity: "high" | "medium" | "low" | "none" =
      weight === 2 ? "high" : weight === 1 ? "medium" : "none";
    return { question: q, answerWeight: weight, answerLabel: label, severity };
  });

  const quranicVerses = getQuranicVersesForPrescription(
    result.prescription.recommendedSurahs || []
  );

  // Unique per request, generated in the handler (never in render output).
  const reportId = `SAQ-${category.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;
  const reportDate = formatBengaliDate(new Date());

  return {
    category,
    result,
    userAnswers: cleanAnswers,
    reportId,
    reportDate,
    evaluatedQuestions,
    quranicVerses,
  };
}

function errorResponse(error: unknown) {
  const status =
    error instanceof Error && "status" in error
      ? (error as { status: number }).status
      : 500;
  const message =
    status === 400
      ? (error as Error).message
      : "Failed to generate assessment report";
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: NextRequest) {
  if (isRateLimited(req)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }
  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > 64_000) {
    return NextResponse.json({ error: "Request body too large" }, { status: 413 });
  }

  let reportData: AssessmentReportData | null = null;
  let filename = "Shifa-Al-Quran-Assessment-Report.pdf";

  try {
    const body = await req.json().catch(() => ({}));
    const categoryId = body.categoryId || body.category;
    const answers = body.answers ?? body.userAnswers;
    reportData = validatedReportData(categoryId, answers);
    filename = `Shifa-Al-Quran-Assessment-Report-${reportData.category.id.toUpperCase()}.pdf`;

    const pdfBuffer = await generateAssessmentPdf(reportData);
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      "status" in error &&
      (error as { status: number }).status === 400
    ) {
      return errorResponse(error);
    }
    console.warn("Headless Chromium PDF generation unavailable or failed, serving self-contained vector report HTML:", error);
    if (!reportData) {
      return errorResponse(error);
    }
    try {
      const html = renderFullReportHtml(reportData);
      return NextResponse.json(
        { success: true, fallback: true, filename, html },
        { status: 200, headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    } catch (renderError) {
      console.error("HTML report render failed:", renderError);
      return NextResponse.json(
        { error: "Failed to generate assessment report" },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: NextRequest) {
  if (isRateLimited(req)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }
  // GET carries no answers, so it cannot produce a real personal report.
  // Returning a fabricated report here was the audit bug; require POST.
  return NextResponse.json(
    { error: "Use POST with categoryId and answers to generate a report." },
    { status: 400 }
  );
}
