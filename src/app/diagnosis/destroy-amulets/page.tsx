import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Scissors,
  BookOpen,
  Droplets,
  Flame,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  FileX2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "তাবিজ নষ্টের নিয়ম | শাফা আল কুরআন",
  description:
    "শিরকী তাবিজ, জাদুর নকশা ও কুফরি জিনিস শরীয়াহসম্মত সুন্নাহ পদ্ধতিতে নষ্ট ও নিষ্ক্রিয়করণের পূর্ণাঙ্গ নির্দেশিকা।",
};

export default function DestroyAmuletsPage() {
  const steps = [
    {
      stepNum: "01",
      icon: Scissors,
      title: "আলাদা করা ও বাধন কাটা",
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10 border-amber-500/20",
      description:
        "সন্দেহজনক কোনো তাবিজ, সুতোর গিরা অথবা জাদুর উপাদান পাওয়া গেলে, অযু অবস্থায় বিসমিল্লাহ বলে সেগুলো বের করে আলাদা আলাদা করে ফেলুন। কোনো গিরা বা বাধন থাকলে কাঁচি দিয়ে কেটে ফেলুন এবং শক্ত মেটাল বা প্লাস্টিক দিয়ে বাঁধা থাকলে তা ভেঙে কাঁচা কাগজ ও নকশা বের করুন।",
    },
    {
      stepNum: "02",
      icon: BookOpen,
      title: "কুরআনের বিশেষ আয়াত পাঠ ও ফুঁ দেওয়া",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      description:
        "একটি পাত্রে পরিষ্কার পানি নিন। এরপর নিচের আয়াতগুলো ৩ বার অথবা ৭ বার করে পাঠ করুন এবং পানিতে ফুঁ দিন:",
      surahs: [
        "সূরা আল-ফাতিহা ও আয়াতুল কুরসি",
        "সূরা আল-আরাফ (আয়াত ১১৭-১২২)",
        "সূরা ইউনুস (আয়াত ৮১-৮২)",
        "সূরা ত্বাহা (আয়াত ৬৯)",
        "সূরা ইখলাস, সূরা ফালাক ও সূরা নাস",
      ],
    },
    {
      stepNum: "03",
      icon: Droplets,
      title: "রুকইয়াহর পানিতে ডুবিয়ে রাখা",
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-500/10 border-teal-500/20",
      description:
        "আয়াত পাঠ শেষে তাবিজের টুকরো, জাদুর নকশা ও কাগজের লেখাগুলো ওই রুকইয়াহ করা পানিতে কিছুক্ষণ ডুবিয়ে রাখুন। পানি সব কাগজে ও কালিতে প্রবেশ করলে ইনশাআল্লাহ জাদুর কুফরি প্রভাব বিনষ্ট হয়ে যাবে।",
    },
    {
      stepNum: "04",
      icon: Flame,
      title: "পুড়িয়ে ফেলা বা চিরতরে ধ্বংস করা",
      color: "text-rose-500 dark:text-rose-400",
      bgColor: "bg-rose-500/10 border-rose-500/20",
      description:
        "পরিশেষে পানি থেকে তুলে শুকনো করে আগুনে পুড়িয়ে ছাই করে ফেলুন অথবা এমনভাবে নষ্ট করুন যেন তা আর কখনো ব্যবহারযোগ্য না থাকে। অবশিষ্ট পানি নির্জন স্থানে বা ঘাস/মাটিতে ঢেলে দিন।",
    },
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-24 overflow-hidden font-sans">
      {/* Dynamic Ambient Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Navigation Back Button */}
        <div className="mb-8">
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors bg-white/5 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" /> ডায়াগনোসিস পোর্টালে ফিরুন
          </Link>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-gold-ink text-xs font-semibold mb-4 shadow-sm backdrop-blur-md">
            <FileX2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>শরীয়াহসম্মত সুন্নাহ পদ্ধতি</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight leading-tight mb-4">
            শিরকী তাবিজ বা জাদুর নকশা <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-600 dark:from-emerald-400 dark:to-amber-300">নষ্ট করার নিয়ম</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-300 leading-relaxed">
            বাসায়, পোশাকে বা ঘরের কোনো স্থানে সন্দেহজনক তাবিজ বা বান-টোনার উপাদান পাওয়া গেলে বিচলিত না হয়ে সুন্নাহসম্মত উপায়ে তা নিষ্ক্রিয় করুন।
          </p>
        </div>

        {/* 4 Steps Section */}
        <div className="space-y-6 mb-12">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.stepNum}
                className="rounded-3xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-xl p-6 sm:p-8 transition-all hover:border-emerald-500/40"
              >
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bgColor} border flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                        ধাপ {item.stepNum}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                        {item.title}
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {item.surahs && (
                      <div className="pt-2">
                        <div className="text-xs font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> পাঠযোগ্য নির্দিষ্ট রুকইয়াহ আয়াতসমূহ:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 dark:text-zinc-200">
                          {item.surahs.map((surah, idx) => (
                            <li
                              key={idx}
                              className="px-3 py-2 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 font-medium"
                            >
                              • {surah}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Note Card */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900/10 via-amber-500/10 to-emerald-900/10 border border-emerald-500/30 p-6 sm:p-8 mb-10 text-center">
          <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mb-2">
            গুরুত্বপূর্ণ আত্মিক সতর্কতা
          </h3>
          <p className="text-sm text-slate-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            তাবিজ খোলার সময় মনে কোনো ভীতি বা শঙ্কা রাখবেন না। আয়াতুল কুরসি পাঠ করে পূর্ণ ঈমান ও তাওয়াক্কুলের সাথে নিষ্ক্রিয়করণ সম্পন্ন করুন। একমাত্র আল্লাহ তাআলাই সকল ক্ষতি থেকে রক্ষাকারী।
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white font-semibold text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> ডায়াগনোসিস পোর্টালে ফিরুন
          </Link>
          <a
            href="https://wa.me/8801353301772?text=আসসালামু%20আলাইকুম,%20তাবিজ%20নষ্টের%20ব্যাপারে%20পরামর্শ%20চাই।"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/20"
          >
            <MessageCircle className="w-4 h-4" /> সরাসরি রাকির পরামর্শ নিন
          </a>
        </div>
      </div>
    </div>
  );
}
