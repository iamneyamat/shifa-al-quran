import { DiagnosisCategory, Question } from "./index";
import { DiagnosisResult } from "../utils/diagnosisEngine";

export interface EvaluatedQuestion {
  question: Question;
  answerWeight: number;
  answerLabel: string;
  severity: "high" | "medium" | "low" | "none";
}

export interface QuranicVerseItem {
  surahName: string;
  arabicName: string;
  reference?: string;
  arabicText: string;
  translationBn: string;
  instruction: string;
}

export interface AssessmentReportData {
  category: DiagnosisCategory;
  result: DiagnosisResult;
  userAnswers: Record<string, number>;
  reportId: string;
  reportDate: string;
  evaluatedQuestions: EvaluatedQuestion[];
  quranicVerses: QuranicVerseItem[];
}
