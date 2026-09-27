"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Download,
  Headphones,
  MessageCircle,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Play,
} from "lucide-react";
import { diagnosisCategories } from "../data/diagnosisData";
import { calculateDiagnosisResult } from "../utils/diagnosisEngine";
import { useAudio } from "@/features/audio/context/AudioContext";

export function DiagnosisResultView() {
  const searchParams = useSearchParams();
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const [isDownloadingPdf, setIsDownloadingPdf] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState<Record<string, number> | null>(null);

  const categoryIdParam =
    searchParams.get("category") ||
    searchParams.get("categoryId") ||
    searchParams.get("type") ||
    "general";

  const category = useMemo(() => {
    return (
      diagnosisCategories.find((c) => c.id === categoryIdParam) || diagnosisCategories[0]
    );
  }, [categoryIdParam]);

  // Sync session storage answers client-side to prevent SSR hydration mismatch
  React.useEffect(() => {
    const stored = sessionStorage.getItem("ruqyah_diagnosis_session");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.categoryId === category.id && parsed.answers) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setUserAnswers(parsed.answers);
          return;
        }
      } catch (e) {
        console.error("Failed to parse diagnosis session", e);
      }
    }
    // Default fallback answers if no session stored
    const defaultAnswers: Record<string, number> = {};
    if (category.questions) {
      category.questions.forEach((q, idx) => {
        defaultAnswers[q.id] = idx % 2 === 0 ? 1 : 2;
      });
    }
    setUserAnswers(defaultAnswers);
  }, [category]);

  const resultData = useMemo(() => {
    const answers = userAnswers ? { ...userAnswers } : {};
    if (Object.keys(answers).length === 0 && category.questions) {
      category.questions.forEach((q, idx) => {
        answers[q.id] = idx % 2 === 0 ? 1 : 2;
      });
    }
    return calculateDiagnosisResult(category, answers);
  }, [category, userAnswers]);

  const { totalScore, maxScore, percentage, level, levelTitle, levelColor, prescription } =
    resultData;

  const handleDownloadPdf = async () => {
    if (typeof window === "undefined") return;
    setIsDownloadingPdf(true);

    try {
      const answersToSend =
        userAnswers && Object.keys(userAnswers).length > 0
          ? userAnswers
          : (() => {
              try {
                const stored = sessionStorage.getItem("ruqyah_diagnosis_session");
                if (stored) {
                  const parsed = JSON.parse(stored);
                  if (parsed.answers) return parsed.answers;
                }
              } catch {}
              return {};
            })();

      const response = await fetch("/api/diagnosis/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: category.id,
          answers: answersToSend,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/pdf")) {
        // Direct Chromium PDF binary download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Shifa-Al-Quran-Assessment-Report-${category.id.toUpperCase()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Defer revocation by 30 seconds to allow the browser's download manager to finish saving
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 30000);
      } else {
        // Serverless fallback: load self-contained vector report HTML and trigger native A4 print/PDF save
        const data = await response.json();
        if (data.html) {
          const iframe = document.createElement("iframe");
          iframe.style.position = "fixed";
          iframe.style.right = "0";
          iframe.style.bottom = "0";
          iframe.style.width = "0";
          iframe.style.height = "0";
          iframe.style.border = "0";
          document.body.appendChild(iframe);

          const doc = iframe.contentWindow?.document;
          if (doc) {
            doc.open();
            doc.write(data.html);
            doc.close();

            setTimeout(() => {
              try {
                iframe.contentWindow?.focus();
                iframe.contentWindow?.print();
              } catch (printErr) {
                console.error("Print trigger failed:", printErr);
              } finally {
                setTimeout(() => {
                  if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                  }
                }, 60000);
              }
            }, 400);
          }
        }
      }
    } catch (error) {
      console.error("Diagnosis PDF generation failed:", error);
      alert("রিপোর্ট তৈরি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `আসসালামু আলাইকুম, আমি শাফা আল কুরআন ওয়েবসাইট থেকে ${category.title} রুকইয়াহ ডায়াগনোসিস করেছি।\nফলাফল: ${levelTitle} (স্কোর: ${totalScore}/${maxScore}, ${percentage}%)।\nপরবর্তী নির্দেশিকা ও পরামর্শের জন্য সহায়তা চাই।`
  );

  const whatsappLink = `https://wa.me/8801353301772?text=${whatsappMessage}`;

  const appointmentUrl = `/appointment?category=${category.id}&level=${level}&title=${encodeURIComponent(
    levelTitle
  )}&score=${totalScore}&maxScore=${maxScore}`;

  return (
    <div className="relative min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden font-sans print:pt-4 print:pb-4 print:bg-white print:text-black">
      {/* Background Animated Ambient Lights (Screen Only) */}
      <div className="print:hidden absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="print:hidden absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation & Utilities Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 print:hidden">
          <Link
            href="/diagnosis"
            className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-700 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors bg-white/80 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> ক্যাটাগরি পোর্টালে ফিরুন
          </Link>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="inline-flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-md transition-colors disabled:opacity-50 cursor-pointer min-h-[40px]"
            >
              <Download className={`w-3.5 h-3.5 ${isDownloadingPdf ? "animate-pulse" : ""}`} />
              {isDownloadingPdf ? "রিপোর্ট প্রস্তুত করা হচ্ছে..." : "রিপোর্ট ডাউনলোড করুন (PDF)"}
            </button>
            <Link
              href={`/diagnosis/test?category=${category.id}`}
              className="inline-flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 hover:bg-emerald-200 dark:hover:bg-emerald-500/20 text-emerald-900 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 transition-colors shadow-sm min-h-[40px]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> পুনরায় টেস্ট করুন
            </Link>
          </div>
        </div>

        {/* Printable Official Header (Print Only) */}
        <div className="hidden print:block text-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">শিফা আল কুরআন — রুকইয়াহ শারইয়াহ সেন্টার</h1>
          <p className="text-xs text-gray-600">ওয়েবসাইট: https://saq.pro.bd | হটলাইন: 09639-000999 | হোয়াটসঅ্যাপ: 01353301772</p>
          <div className="text-xs font-mono text-gray-500 mt-1">ফলাফল তৈরি: {new Date().toLocaleDateString("bn-BD")}</div>
        </div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-4 sm:p-8 lg:p-10 mb-8 sm:mb-10 relative overflow-hidden print:border-none print:shadow-none print:bg-transparent print:p-0"
        >
          {/* Subtle Top Glow Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 print:hidden" />

          {/* Test Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-400 text-xs font-bold mb-3 shadow-sm print:hidden">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> রুকইয়াহ ডায়াগনোসিস ফলাফল
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 mb-2 print:text-xl print:text-black">
              {category.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 print:text-xs print:text-gray-600">
              আপনার শারীরিক ও মানসিক লক্ষণসমূহের সুন্নাহভিত্তিক গাণিতিক মূল্যায়ন
            </p>
          </div>

          {/* Liquid Glass Score Gauge Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center mb-8 sm:mb-12 p-4 sm:p-6 lg:p-8 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 print:border-gray-300 print:bg-gray-50 print:mb-6">
            {/* SVG Circular Severity Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center print:w-32 print:h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-200 dark:stroke-zinc-800 print:stroke-gray-200"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Animated Progress Circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * percentage) / 100 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    strokeLinecap="round"
                    fill="transparent"
                    className={levelColor.text}
                  />
                </svg>

                {/* Gauge Inner Center Badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 font-mono print:text-2xl print:text-black">
                    {percentage}%
                  </span>
                  <span className="text-xs text-slate-600 dark:text-zinc-400 font-mono mt-0.5 font-semibold print:text-black">
                    স্কোর: {totalScore} / {maxScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Interpretation & Level Badge */}
            <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
              <div className={`inline-flex items-center gap-2 self-center md:self-start px-3.5 py-1.5 rounded-full border text-xs font-bold mb-3 shadow-sm ${levelColor.badgeBg}`}>
                {resultData.level === "high" ? (
                  <ShieldAlert className="w-4 h-4" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                {levelTitle}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 mb-3 print:text-base print:text-black">
                {prescription.title}
              </h3>
              <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed mb-4 font-normal print:text-xs print:text-gray-700">
                {prescription.summary}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-600 dark:text-zinc-400 font-medium print:text-gray-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> সুন্নাহসম্মত প্রেসক্রিপশন
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" /> প্রাথমিক চিকিৎসা পরিকল্পনা
                </span>
              </div>
            </div>
          </div>

          {/* Section: Prescription Details */}
          <div className="space-y-10 print:space-y-6">
            {/* Step-by-Step Action Guidelines */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100 mb-5 flex items-center gap-2.5 print:text-base print:text-black">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                করণীয় সুন্নাহসম্মত পদক্ষেপসমূহ (আমল গাইড)
              </h3>

              <div className="grid grid-cols-1 gap-4 print:gap-2">
                {prescription.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-start gap-4 hover:border-emerald-500/40 transition-colors shadow-sm print:p-3 print:bg-white print:border-gray-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 print:border-gray-300">
                      0{idx + 1}
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 dark:text-zinc-200 leading-relaxed pt-0.5 font-normal print:text-xs print:text-black">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recommended Surahs & Verses */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100 mb-5 flex items-center gap-2.5 print:text-base print:text-black">
                <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                বিশেষ দ্রষ্টব্য সূরা ও আয়াতসমূহ
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 print:grid-cols-3 print:gap-2">
                {prescription.recommendedSurahs.map((surah, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-center flex flex-col items-center justify-center gap-1.5 sm:gap-2 shadow-sm print:p-2 print:border-gray-200"
                  >
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400/80 mb-0.5 print:w-4 print:h-4" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 print:text-xs print:text-black">
                      {surah}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-600 dark:text-zinc-400 font-medium print:text-[10px] print:text-gray-500">প্রতিদিন তেলাওয়াত ও দম করুন</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Recommendations */}
            {prescription.audioLinks && prescription.audioLinks.length > 0 && (
              <div className="print:hidden">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100 mb-5 flex items-center gap-2.5">
                  <Headphones className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  প্রস্তাবিত রুকইয়াহ অডিও
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {prescription.audioLinks.map((audio, idx) => {
                    const isTrackActive = currentTrack?.title === audio.title && isPlaying;
                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          playTrack({
                            id: `rx_${idx}_${audio.title}`,
                            title: audio.title,
                            url: audio.href.includes("http")
                              ? audio.href
                              : "https://files.ruqyahbd.org/audio/Ruqyah-3Kul-ruqyahbd.org.mp3",
                            category: category.title,
                          })
                        }
                        className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50/70 dark:bg-zinc-900/80 border border-emerald-200/80 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 hover:bg-emerald-100/60 dark:hover:bg-zinc-900 transition-all flex items-center justify-between group shadow-sm text-left w-full cursor-pointer gap-2"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-zinc-950 flex items-center justify-center font-bold shadow-sm shrink-0">
                            {isTrackActive ? <Headphones className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                            {audio.title}
                          </span>
                        </div>
                        <span className="shrink-0 inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-100/80 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/30">
                          {isTrackActive ? "চলছে" : "প্লে করুন"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action & Consultation Footer Bar (Screen Only) */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 print:hidden">
            <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium text-center sm:text-left">
              জরুরি প্রয়োজনে সরাসরি আমাদের সার্টিফাইড রাকির সাথে পরামর্শ করতে পারেন।
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-500/30 font-bold text-sm transition-all shadow-sm min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>হোয়াটসঅ্যাপে পরামর্শ নিন</span>
              </a>

              <Link
                href={appointmentUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>সরাসরি রাকির সাথে বুকিং নিন</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

  </div>
  );
}
