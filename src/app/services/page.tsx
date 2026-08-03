import type { Metadata } from "next";
import { ServicesSection } from "@/components/home/services";

export const metadata: Metadata = {
  title: "আমাদের সেবাসমূহ",
  description: "শিফা আল কুরআন এ আমরা কী কী রোগের চিকিৎসা প্রদান করি তার বিস্তারিত বিবরণ।",
};

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 pt-10">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            আমাদের সেবাসমূহ
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            আমরা সম্পূর্ণ শরীয়াহ সম্মত উপায়ে বিভিন্ন আধ্যাত্মিক ও শারীরিক সমস্যার রুকইয়াহ করে থাকি। নিচে আমাদের প্রধান সেবাসমূহ বিস্তারিতভাবে তুলে ধরা হলো।
          </p>
        </div>
      </div>
      
      {/* Reusing the services section from home, but it's self-contained */}
      <ServicesSection />
    </div>
  );
}
