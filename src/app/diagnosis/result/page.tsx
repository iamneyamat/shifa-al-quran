import React, { Suspense } from "react";
import { Metadata } from "next";
import { DiagnosisResultView } from "@/features/diagnosis/components/diagnosis-result";

export const metadata: Metadata = {
  title: "ডায়াগনোসিস ফলাফল ও প্রেসক্রিপশন | শাফা আল কুরআন",
  description:
    "আপনার রুকইয়াহ লক্ষণসমূহের সুন্নাহসম্মত ফলাফল এবং বিশেষ আত্মিক চিকিৎসা গাইডলাইন।",
};

export default function DiagnosisResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 flex items-center justify-center text-emerald-400">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-400" />
        </div>
      }
    >
      <DiagnosisResultView />
    </Suspense>
  );
}
