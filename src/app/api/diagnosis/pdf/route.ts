import { NextRequest, NextResponse } from "next/server";
import { diagnosisCategories } from "@/features/diagnosis/data/diagnosisData";
import { calculateDiagnosisResult } from "@/features/diagnosis/utils/diagnosisEngine";
import { AssessmentReportData, EvaluatedQuestion } from "@/features/diagnosis/types/report";
import { getQuranicVersesForPrescription } from "@/features/diagnosis/server/quranicData";
import { generateAssessmentPdf } from "@/features/diagnosis/server/pdfGenerator";
import { formatBengaliDate, renderFullReportHtml } from "@/features/diagnosis/server/reportTemplate";

function buildReportData(
  categoryId: string,
  userAnswers: Record<string, number> = {}
): AssessmentReportData {
  const normId = (categoryId || "general").toLowerCase().trim();
  const category =
    diagnosisCategories.find((c) => c.id.toLowerCase() === normId) || diagnosisCategories[0];

  // If no answers provided, default to realistic assessment values
  const answers: Record<string, number> = { ...userAnswers };
  if (Object.keys(answers).length === 0 && category.questions) {
    category.questions.forEach((q, idx) => {
      answers[q.id] = idx % 2 === 0 ? 1 : 2;
    });
  }

  const result = calculateDiagnosisResult(category, answers);

  const evaluatedQuestions: EvaluatedQuestion[] = (category.questions || []).map((q) => {
    const weight = answers[q.id] ?? 0;
    const label = weight === 2 ? "হ্যাঁ" : weight === 1 ? "মাঝে মধ্যে" : "না";
    const severity: "high" | "medium" | "low" | "none" =
      weight === 2 ? "high" : weight === 1 ? "medium" : "none";

    return {
      question: q,
      answerWeight: weight,
      answerLabel: label,
      severity,
    };
  });

  const quranicVerses = getQuranicVersesForPrescription(
    result.prescription.recommendedSurahs || []
  );

  const reportId = `SAQ-${category.id.toUpperCase()}-8824`;
  const reportDate = formatBengaliDate(new Date());

  return {
    category,
    result,
    userAnswers: answers,
    reportId,
    reportDate,
    evaluatedQuestions,
    quranicVerses,
  };
}

export async function POST(req: NextRequest) {
  let reportData: AssessmentReportData | null = null;
  let filename = "Shifa-Al-Quran-Assessment-Report.pdf";

  try {
    const body = await req.json().catch(() => ({}));
    const categoryId = body.categoryId || body.category || "waswas";
    const answers = body.answers || body.userAnswers || {};

    reportData = buildReportData(categoryId, answers);
    filename = `Shifa-Al-Quran-Assessment-Report-${reportData.category.id.toUpperCase()}.pdf`;

    // Attempt direct headless Chromium PDF generation
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
    console.warn("Headless Chromium PDF generation unavailable or failed, serving self-contained vector report HTML:", error);

    // If reportData was built (or build it now with defaults)
    if (!reportData) {
      reportData = buildReportData("waswas", {});
      filename = `Shifa-Al-Quran-Assessment-Report-${reportData.category.id.toUpperCase()}.pdf`;
    }

    try {
      const html = renderFullReportHtml(reportData);
      return NextResponse.json(
        {
          success: true,
          fallback: true,
          filename,
          html,
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
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
  let reportData: AssessmentReportData | null = null;
  let filename = "Shifa-Al-Quran-Assessment-Report.pdf";

  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category") || searchParams.get("categoryId") || "waswas";
    const format = searchParams.get("format");

    reportData = buildReportData(categoryId, {});
    filename = `Shifa-Al-Quran-Assessment-Report-${reportData.category.id.toUpperCase()}.pdf`;

    if (format === "html") {
      const html = renderFullReportHtml(reportData);
      return new NextResponse(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store, max-age=0",
        },
      });
    }

    const pdfBuffer = await generateAssessmentPdf(reportData);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.warn("Direct Chromium PDF GET failed, serving fallback HTML:", error);
    if (!reportData) {
      reportData = buildReportData("waswas", {});
    }
    const html = renderFullReportHtml(reportData);
    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}
