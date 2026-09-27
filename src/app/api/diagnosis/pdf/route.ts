import { NextRequest, NextResponse } from "next/server";
import { diagnosisCategories } from "@/features/diagnosis/data/diagnosisData";
import { calculateDiagnosisResult } from "@/features/diagnosis/utils/diagnosisEngine";
import { AssessmentReportData, EvaluatedQuestion } from "@/features/diagnosis/types/report";
import { getQuranicVersesForPrescription } from "@/features/diagnosis/server/quranicData";
import { generateAssessmentPdf } from "@/features/diagnosis/server/pdfGenerator";
import { formatBengaliDate } from "@/features/diagnosis/server/reportTemplate";

function buildReportData(
  categoryId: string,
  userAnswers: Record<string, number> = {}
): AssessmentReportData {
  const category =
    diagnosisCategories.find((c) => c.id === categoryId) || diagnosisCategories[0];

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
  try {
    const body = await req.json().catch(() => ({}));
    const categoryId = body.categoryId || body.category || "waswas";
    const answers = body.answers || body.userAnswers || {};

    const reportData = buildReportData(categoryId, answers);
    const pdfBuffer = await generateAssessmentPdf(reportData);

    const filename = `Shifa-Al-Quran-Assessment-Report-${reportData.category.id.toUpperCase()}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("API /api/diagnosis/pdf POST failed:", error);
    return NextResponse.json(
      { error: "Failed to generate assessment PDF report" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category") || searchParams.get("categoryId") || "waswas";

    const reportData = buildReportData(categoryId, {});
    const pdfBuffer = await generateAssessmentPdf(reportData);

    const filename = `Shifa-Al-Quran-Assessment-Report-${reportData.category.id.toUpperCase()}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("API /api/diagnosis/pdf GET failed:", error);
    return NextResponse.json(
      { error: "Failed to generate assessment PDF report" },
      { status: 500 }
    );
  }
}
