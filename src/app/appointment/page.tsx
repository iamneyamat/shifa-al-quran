import { AppointmentForm } from "@/components/appointment-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "অ্যাপয়েন্টমেন্ট",
  description: "শিফা আল কুরআন এ রুকইয়াহ শারইয়াহ চিকিৎসার জন্য অ্যাপয়েন্টমেন্ট নিন।",
};

export default function AppointmentPage() {
  return (
    <div className="relative min-h-screen bg-light-bg-main dark:bg-[#020817] flex flex-col font-sans overflow-hidden">
      
      {/* Global Page Pattern Overlay */}
      <div 
        className="fixed inset-0 z-[5] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Soft Background Gradients for Depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400/10 dark:bg-emerald-800/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white mb-4 md:mb-6 tracking-tight">
              অ্যাপয়েন্টমেন্ট <span className="text-emerald-600 dark:text-emerald-400">বুকিং</span>
            </h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-6 md:mb-8" />
            <p className="text-lg md:text-xl text-light-text dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              আপনার সমস্যার বিবরণ দিয়ে নিচের ফর্মটি পূরণ করুন। আমাদের প্রতিনিধি আপনার সাথে দ্রুত যোগাযোগ করে সময় নিশ্চিত করবেন।
            </p>
          </div>
          
          <div className="relative">
            {/* Glowing effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[40px] blur opacity-20 pointer-events-none" />
            
            <div className="relative bg-white/80 dark:bg-slate-900/70 backdrop-blur-3xl rounded-[40px] shadow-2xl border border-white dark:border-slate-800 p-6 md:p-12 overflow-hidden">
              <AppointmentForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
