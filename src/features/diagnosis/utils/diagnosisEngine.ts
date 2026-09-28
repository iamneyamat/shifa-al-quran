import { DiagnosisCategory, Prescription } from "../types";

export interface DiagnosisResult {
  category: DiagnosisCategory;
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: "low" | "medium" | "high";
  levelTitle: string;
  levelColor: {
    text: string;
    bg: string;
    border: string;
    glow: string;
    badgeBg: string;
  };
  prescription: Prescription;
}

export function calculateDiagnosisResult(
  category: DiagnosisCategory,
  selectedAnswers: Record<string, number>
): DiagnosisResult {
  const questions = category.questions || [];
  let totalScore = 0;
  
  questions.forEach((q) => {
    const weight = selectedAnswers[q.id] ?? 0;
    totalScore += weight;
  });

  const maxScore = questions.length * 2; // Each question max weight is 2 ('হ্যাঁ')
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  let level: "low" | "medium" | "high" = "low";
  let levelTitle = "স্বাভাবিক / হালকা প্রভাব";
  let levelColor = {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100/80 dark:bg-emerald-500/10",
    border: "border-emerald-300 dark:border-emerald-500/30",
    glow: "rgba(16, 185, 129, 0.3)",
    badgeBg: "bg-emerald-100 border-emerald-300/80 text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
  };

  if (percentage > 65) {
    level = "high";
    levelTitle = "উচ্চ ঝুঁকি (গভীর রুকইয়াহ প্রয়োজন)";
    levelColor = {
      text: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100/80 dark:bg-rose-500/10",
      border: "border-rose-300 dark:border-rose-500/30",
      glow: "rgba(244, 63, 94, 0.4)",
      badgeBg: "bg-rose-100 border-rose-300/80 text-rose-950 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30",
    };
  } else if (percentage > 30) {
    level = "medium";
    levelTitle = "মাঝারি ঝুঁকি (নিয়মিত রুকইয়াহ প্রয়োজন)";
    levelColor = {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100/80 dark:bg-amber-500/10",
      border: "border-amber-300 dark:border-amber-500/30",
      glow: "rgba(245, 158, 11, 0.35)",
      badgeBg: "bg-amber-100 border-amber-300/80 text-amber-950 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30",
    };
  }

  // Fallback prescription if category missing specific prescriptions
  const defaultPrescription: Prescription = {
    level,
    title: levelTitle,
    summary:
      "আপনার উত্তরসমূহ বিশ্লেষণ করে প্রস্তুতকৃত সুন্নাহসম্মত নির্দেশিকা। মাসনুন আমল ও নিয়মিত জিকির বজায় রাখুন।",
    steps: [
      "প্রতিদিন সকালে ও সন্ধ্যায় মাসনুন দোয়া ও হিসনুল মুসলিমের জিকির আদায় করুন।",
      "সূরা ফাতিহা, আয়াতুল কুরসি ও তিন কুল পড়ে শরীরে ফুঁ দিন ও পানি পান করুন।",
      "পাঁচ ওয়াক্ত সালাত সময়মত জামায়াতে আদায় করুন এবং কবিরা গুনাহ থেকে বেঁচে থাকুন।",
    ],
    recommendedSurahs: ["সূরা আল-ফাতিহা", "আয়াতুল কুরসি", "তিন কুল (ইখলাস, ফালাক, নাস)"],
    audioLinks: [{ title: "রুকইয়াহ অডিও কালেকশন", href: "/audio" }],
  };

  const prescription = category.prescriptions?.[level] || defaultPrescription;

  return {
    category,
    totalScore,
    maxScore,
    percentage,
    level,
    levelTitle,
    levelColor,
    prescription,
  };
}
