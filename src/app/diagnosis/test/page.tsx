import React, { Suspense } from "react";
import { Metadata } from "next";
import { DiagnosisQuiz } from "@/features/diagnosis/components/diagnosis-quiz";

export const metadata: Metadata = {
  title: "সেলফ রুকইয়া টেস্ট",
  description:
    "আপনার আত্মিক ও শারীরিক লক্ষণসমূহ যাচাই করে রুকইয়া প্রেসক্রিপশন ও গাইডলাইন লাভ করুন।",
  robots: { index: false, follow: false },
};

export default function DiagnosisTestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 flex items-center justify-center text-emerald-400">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-400" />
        </div>
      }
    >
      <DiagnosisQuiz />
    </Suspense>
  );
}
