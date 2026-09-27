import { Metadata } from "next";
import { DiagnosisPortal } from "@/features/diagnosis/components/diagnosis-portal";

export const metadata: Metadata = {
  title: "সেলফ রুকইয়াহ ডায়াগনোসিস — শিফা আল কুরআন",
  description: "কুরআন ও সুন্নাহর আলোকে আপনার ও আপনার পরিবারের আত্মিক ও শারীরিক লক্ষণসমূহ যাচাই করুন এবং সুন্নাহসম্মত রুকইয়াহ প্রেসক্রিপশন পান।",
};

export default function DiagnosisPage() {
  return <DiagnosisPortal />;
}
