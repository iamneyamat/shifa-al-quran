"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Download,
  Headphones,
  MessageCircle,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Play,
  AlertTriangle,
  Sun,
  Moon,
  Clock,
  FileText,
  Activity,
  HelpCircle,
} from "lucide-react";
import { diagnosisCategories } from "../data/diagnosisData";
import { calculateDiagnosisResult } from "../utils/diagnosisEngine";
import { useAudio } from "@/features/audio/context/AudioContext";
import { getQuranicVersesForPrescription } from "../data/quranicData";
import { toBnNumber, formatBengaliDate } from "../utils/formatters";
import { EvaluatedQuestion, QuranicVerseItem } from "../types/report";

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

  const reportId = `SAQ-${category.id.toUpperCase()}-8824`;
  const reportDate = useMemo(() => formatBengaliDate(new Date()), []);

  const evaluatedQuestions: EvaluatedQuestion[] = useMemo(() => {
    const answers = userAnswers ? { ...userAnswers } : {};
    if (Object.keys(answers).length === 0 && category.questions) {
      category.questions.forEach((q, idx) => {
        answers[q.id] = idx % 2 === 0 ? 1 : 2;
      });
    }
    return (category.questions || []).map((q) => {
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
  }, [category.questions, userAnswers]);

  const quranicVerses: QuranicVerseItem[] = useMemo(() => {
    return getQuranicVersesForPrescription(prescription.recommendedSurahs || []);
  }, [prescription.recommendedSurahs]);

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
        // Client-side fallback: Convert self-contained report HTML into PDF and download directly
        const data = await response.json();
        if (!data.html) {
          throw new Error("Report HTML not returned from server");
        }

        const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
          import("html2canvas"),
          import("jspdf"),
        ]);

        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.left = "-9999px";
        iframe.style.top = "0";
        iframe.style.width = "794px";
        iframe.style.height = "1123px";
        iframe.style.border = "none";
        iframe.style.opacity = "0";
        iframe.style.pointerEvents = "none";
        iframe.style.zIndex = "-9999";
        document.body.appendChild(iframe);

        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDoc) {
            throw new Error("Could not access iframe document");
          }

          iframeDoc.open();
          iframeDoc.write(data.html);
          iframeDoc.close();

          // Wait for embedded fonts (Hind Siliguri, Amiri) and images to finish loading
          if (iframeDoc.fonts && iframeDoc.fonts.ready) {
            await iframeDoc.fonts.ready;
          }
          await new Promise((resolve) => setTimeout(resolve, 300));

          // Inject styling to ensure exact A4 dimensions and margins in screen capture
          const styleEl = iframeDoc.createElement("style");
          styleEl.textContent = `
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
              width: 794px !important;
            }
            .report-section {
              width: 794px !important;
              min-height: 1123px !important;
              padding: 14mm 15mm 16mm 15mm !important;
              box-sizing: border-box !important;
              background: #ffffff !important;
              display: flex !important;
              flex-direction: column !important;
              position: relative !important;
              overflow: hidden !important;
            }
            .running-footer {
              margin-top: auto !important;
            }
          `;
          iframeDoc.head.appendChild(styleEl);

          const sections = iframeDoc.querySelectorAll<HTMLElement>(".report-section");
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true,
          });

          const downloadFilename =
            data.filename ||
            `Shifa-Al-Quran-Diagnosis-Report-${category.id.toUpperCase()}.pdf`;

          if (sections.length > 0) {
            for (let i = 0; i < sections.length; i++) {
              const section = sections[i];
              if (i > 0) {
                pdf.addPage("a4", "portrait");
              }

              const canvas = await html2canvas(section, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                windowWidth: 794,
              });

              const imgData = canvas.toDataURL("image/jpeg", 0.95);
              pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
            }
          } else {
            const canvas = await html2canvas(iframeDoc.body, {
              scale: 2,
              useCORS: true,
              logging: false,
              backgroundColor: "#ffffff",
              windowWidth: 794,
            });
            const imgData = canvas.toDataURL("image/jpeg", 0.95);
            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
          }

          // Directly save the PDF file (automatic download, no print dialog!)
          pdf.save(downloadFilename);
        } finally {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
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
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-4 sm:p-8 lg:p-10 mb-8 sm:mb-10 relative overflow-hidden print:border-none print:shadow-none print:bg-transparent print:p-0"
        >
          {/* Subtle Top Glow Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 print:hidden" />

          {/* Test Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-400 text-xs font-bold mb-3 shadow-sm print:hidden">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> রুকইয়াহ ডায়াগনোসিস পূর্ণাঙ্গ মূল্যায়ন রিপোর্ট
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 mb-2 print:text-xl print:text-black">
              {category.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 print:text-xs print:text-gray-600">
              আপনার শারীরিক ও মানসিক লক্ষণসমূহের কুরআন ও সুন্নাহভিত্তিক গাণিতিক মূল্যায়ন
            </p>
          </div>

          {/* Report Metadata Strip (from PDF Page 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl sm:rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 mb-8 text-center sm:text-left">
            <div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                রিপোর্ট রেফারেন্স
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 font-mono mt-0.5">
                #{reportId}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                অ্যাসেসমেন্ট তারিখ
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 mt-0.5">
                {reportDate}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                মূল্যায়ন ক্যাটাগরি
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 truncate">
                {category.title}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                ভেরিফিকেশন স্ট্যাটাস
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                যাচাইকৃত (Verified)
              </div>
            </div>
          </div>

          {/* Liquid Glass Score Gauge Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center mb-8 sm:mb-10 p-4 sm:p-6 lg:p-8 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 print:border-gray-300 print:bg-gray-50 print:mb-6">
            {/* SVG Circular Severity Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-44 h-44 flex items-center justify-center print:w-32 print:h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-200 dark:stroke-zinc-800 print:stroke-gray-200"
                    strokeWidth="8"
                    fill="transparent"
                  />
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

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 font-mono print:text-2xl print:text-black">
                    {percentage}%
                  </span>
                  <span className="text-xs text-slate-600 dark:text-zinc-400 font-mono mt-0.5 font-semibold print:text-black">
                    স্কোর: {toBnNumber(totalScore)} / {toBnNumber(maxScore)}
                  </span>
                </div>
              </div>
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-2">
                সামগ্রিক প্রভাব সূচক
              </div>
            </div>

            {/* Score Interpretation & Level Badge */}
            <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-sm ${levelColor.badgeBg}`}>
                  {resultData.level === "high" ? (
                    <ShieldAlert className="w-4 h-4" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                  {levelTitle}
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold bg-slate-100 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-800 dark:text-zinc-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  অগ্রাধিকার: {percentage >= 65 ? "জরুরি প্রত্যক্ষ পর্যবেক্ষণ কাম্য" : percentage >= 30 ? "নিয়মিত সুন্নাহ রুকইয়াহ প্রয়োজনীয়" : "সাধারণ মাসনুন আমল যথেষ্ট"}
                </div>
              </div>

              {/* 3-Segment Severity Spectrum Meter */}
              <div className="w-full my-2.5">
                <div className="flex justify-between text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 font-semibold mb-1.5">
                  <span>স্বাভাবিক (০-৩০%)</span>
                  <span>মাঝারি (৩১-৬৫%)</span>
                  <span>উচ্চ ঝুঁকি (৬৬-১০০%)</span>
                </div>
                <div className="flex h-2 sm:h-2.5 rounded-full overflow-hidden gap-1 bg-slate-200/80 dark:bg-zinc-800">
                  <div className={`flex-[30] rounded-full transition-all ${percentage <= 30 ? "bg-emerald-500 shadow-sm" : "bg-emerald-500/25"}`} />
                  <div className={`flex-[35] rounded-full transition-all ${percentage > 30 && percentage <= 65 ? "bg-amber-500 shadow-sm" : "bg-amber-500/25"}`} />
                  <div className={`flex-[35] rounded-full transition-all ${percentage > 65 ? "bg-rose-500 shadow-sm" : "bg-rose-500/25"}`} />
                </div>
              </div>

              {/* Clinical Evaluation & Observation Box */}
              <div className="mt-2.5 p-3 sm:p-4 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-left">
                <div className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ক্লিনিক্যাল মূল্যায়ন ও সার্বিক পর্যবেক্ষণ:
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {prescription.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Key Evaluation Metrics (3 Stats Cards from PDF Page 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
            <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">মূল্যায়িত প্রশ্নসংখ্যা</div>
                <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-zinc-100 font-mono">
                  {toBnNumber((category.questions || []).length)} টি প্রশ্ন
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">চিহ্নিত উপসর্গের তীব্রতা</div>
                <div className={`text-base sm:text-lg font-extrabold ${levelColor.text}`}>
                  {(levelTitle || "স্বাভাবিক").split(" ")[0]}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">নির্ধারিত সুন্নাহ আমল</div>
                <div className="text-base sm:text-lg font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                  {toBnNumber((prescription?.steps || []).length)} টি ধাপ
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 02 — OVERVIEW & EVALUATION (from PDF Page 2) */}
          <div className="mb-10 sm:mb-12 pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-white/10">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                SECTION 02 — OVERVIEW & EVALUATION
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-100">
                অ্যাসেসমেন্ট বিশ্লেষণ ও প্রশ্নোত্তর পর্যালোচনা
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1">
                আপনার প্রদত্ত উত্তরের ভিত্তিতে লক্ষণের বিশদ মূল্যায়ন ও শরঈ আরোগ্যের মূলনীতি
              </p>
            </div>

            {/* Category Context Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 mb-6">
              <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100">
                  {category.title} {category.subtitle ? `(${category.subtitle})` : ""}
                </h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-500/30">
                  {category.badge || "যাচাইকৃত"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Questionnaire Results Table / Cards */}
            <div className="mb-6">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 mb-3.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                যাচাইকৃত প্রশ্নাবলি ও ব্যবহারকারীর উত্তর:
              </h4>

              <div className="space-y-2.5">
                {evaluatedQuestions.map((item, idx) => {
                  const isAffirmative = item.answerWeight === 2;
                  const isSometimes = item.answerWeight === 1;

                  const badgeClasses = isAffirmative
                    ? "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30"
                    : isSometimes
                    ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30"
                    : "bg-slate-100 text-slate-700 border-slate-300 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";

                  const numBg = isAffirmative
                    ? "bg-rose-600 text-white"
                    : isSometimes
                    ? "bg-amber-600 text-white"
                    : "bg-slate-500 dark:bg-zinc-700 text-white";

                  return (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-xl bg-slate-100/50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex items-start justify-between gap-3 text-xs sm:text-sm hover:border-emerald-500/30 transition-colors"
                    >
                      <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                        <span className={`w-5 h-5 rounded-full ${numBg} text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5`}>
                          {toBnNumber(idx + 1)}
                        </span>
                        <span className="text-slate-800 dark:text-zinc-200 leading-relaxed font-medium">
                          {item.question?.text || ""}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border shrink-0 ${badgeClasses}`}>
                        {item.answerLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Islamic Clinical Guidelines Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/15 border border-amber-200/80 dark:border-amber-800/30">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400" />
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100">
                  শরঈ দৃষ্টিকোণ ও সুন্নাহসম্মত আরোগ্যের মূলনীতি
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 pl-4 list-disc leading-relaxed">
                <li>
                  <strong className="text-slate-900 dark:text-zinc-100">আরোগ্য কেবল আল্লাহর হাতে:</strong> রুকইয়াহ কোনো জাদুকরি চিকিৎসা নয়, বরং আল্লাহর কালামের মাধ্যমে আরোগ্যের সুন্নাহসম্মত উপায়।
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-zinc-100">শিরক ও বিদআতের বর্জন:</strong> তাবিজে কোনো অজ্ঞাত সংখ্যা, প্রতীক বা অস্পষ্ট বাক্য থাকলে তা বর্জনীয়। সুন্নাহসম্মত রুকইয়াহ সম্পূর্ণ স্বচ্ছ।
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-zinc-100">আত্মিক পরিচ্ছন্নতা:</strong> পাঁচ ওয়াক্ত সালাত, হালাল উপার্জন ও নিয়মিত জিকির সুস্থতার ভিত্তি স্থাপন করে।
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION 03 — RECOMMENDED ACTIONS & DAILY PROTOCOL (from PDF Page 3) */}
          <div className="mb-10 sm:mb-12 pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-white/10">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                SECTION 03 — RECOMMENDED ACTIONS
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-100">
                সুন্নাহসম্মত নির্দেশিকা ও চিকিৎসাক্রম
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1">
                আপনার মূল্যায়নের তীব্রতার ভিত্তিতে সুন্নাহসম্মত ধারাবাহিক আমল নিম্নে সুনির্দিষ্টভাবে সাজানো হলো:
              </p>
            </div>

            {/* Numbered Steps */}
            <div className="space-y-3.5 mb-6">
              {prescription.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-start gap-3.5 sm:gap-4 hover:border-emerald-500/40 transition-colors shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                      করণীয় আমল ধাপ {toBnNumber(idx + 1)}
                    </div>
                    <p className="text-xs sm:text-base text-slate-800 dark:text-zinc-200 leading-relaxed font-normal">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Daily Sunnah Protocol Box */}
            <div className="p-4 sm:p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/30">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <h4 className="text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-300">
                  দৈনিক সুন্নাহ আমল রুটিন (Daily Protocol)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-200/80 dark:border-emerald-800/30 shadow-sm">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-1.5">
                    <Sun className="w-4 h-4 text-amber-500" />
                    সকালের আমল (ফজর পর)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    সকালের মাসনুন জিকির, ৩ কুল পড়ে বুকে ফুঁ ও রুকইয়াহ পানি পান।
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-200/80 dark:border-emerald-800/30 shadow-sm">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    সন্ধ্যার আমল (মাগরিব পর)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    সন্ধ্যার হেফাজতের দোয়াসমূহ এবং প্রয়োজনবোধে রুকইয়াহর গোসল সম্পন্ন।
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-emerald-200/80 dark:border-emerald-800/30 shadow-sm">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-1.5">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    শয়নের আমল (রাতের পূর্বে)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    ওজু অবস্থায় ঘুমানো, আয়াতুল কুরসি ও বাকারার শেষ দুই আয়াত তিলাওয়াত।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 04 — QURANIC PRESCRIPTION (from PDF Page 4) */}
          <div className="mb-10 sm:mb-12 pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-white/10">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                SECTION 04 — QURANIC PRESCRIPTION
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-zinc-100">
                নির্ধারিত কুরআনি প্রেসক্রিপশন ও দোয়া
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1">
                নিম্নোক্ত নির্ধারিত সূরা ও আয়াতসমূহ উল্লেখিত সুন্নাহসম্মত পদ্ধতিতে তিলাওয়াত ও আমল করুন:
              </p>
            </div>

            {/* Rich Quranic Verse Cards */}
            <div className="space-y-4 mb-6">
              {quranicVerses.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-white/10">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-zinc-100">
                        {item.surahName}
                      </h3>
                      {item.reference && (
                        <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                          {item.reference}
                        </span>
                      )}
                    </div>
                    <span className="font-arabic text-base sm:text-lg text-emerald-700 dark:text-emerald-400 self-start sm:self-auto" dir="rtl">
                      {item.arabicName}
                    </span>
                  </div>

                  {/* Arabic Quranic Script */}
                  <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30 my-3.5">
                    <p className="font-arabic text-right text-xl sm:text-2xl text-emerald-950 dark:text-emerald-300 leading-loose select-text" dir="rtl">
                      {item.arabicText}
                    </p>
                  </div>

                  {/* Bengali Translation */}
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed mb-3">
                    <strong className="text-slate-900 dark:text-zinc-100 font-bold">অনুবাদ ও মর্মার্থ: </strong>
                    {item.translationBn}
                  </div>

                  {/* Practical Instruction */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/30 text-xs sm:text-sm text-amber-950 dark:text-amber-300 leading-relaxed flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">তিলাওয়াত ও আমলের নির্দেশিকা: </strong>
                      {item.instruction}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prescribed Audio Sessions */}
            {prescription.audioLinks && prescription.audioLinks.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/15 border border-emerald-200/80 dark:border-emerald-800/30 print:hidden">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  প্রস্তাবিত রুকইয়াহ অডিও (মনোযোগ সহকারে শুনুন):
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200/80 dark:border-white/10 hover:border-emerald-500/50 transition-all flex items-center justify-between group shadow-sm text-left w-full cursor-pointer gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-zinc-950 flex items-center justify-center font-bold shadow-sm shrink-0">
                            {isTrackActive ? <Headphones className="w-3.5 h-3.5 animate-pulse" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                            {audio.title}
                          </span>
                        </div>
                        <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100/80 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/30">
                          {isTrackActive ? "চলছে" : "শুনুন"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Official Verification Seal & Sign-off Card (from PDF Page 4) */}
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-emerald-600 dark:border-emerald-400 flex items-center justify-center text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold text-center leading-tight bg-emerald-50 dark:bg-emerald-950/30 shrink-0">
                SAQ<br />VERIFIED
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-zinc-100">
                  শিফা আল কুরআন রুকইয়াহ রিসার্চ বোর্ড
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400">
                  কুরআন ও সুন্নাহ ভিত্তিক নির্ভরযোগ্য চিকিৎসা পদ্ধতি
                </div>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">অনুমোদিত তত্ত্বাবধায়ক</div>
              <div className="text-xs text-slate-500 dark:text-zinc-400">সার্টিফাইড শরঈ রাকি টিম</div>
            </div>
          </div>

          {/* Medical & Shar'iah Disclaimer Box (from PDF Page 4) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-8 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-zinc-100 font-bold">জরুরি শরঈ ও চিকিৎসা সতর্কতা: </strong>
              এটি শিফা আল কুরআন প্ল্যাটফর্মের স্বয়ংক্রিয় রুকইয়াহ মূল্যায়ন রিপোর্ট। কুরআন ও সহিহ হাদিসের নির্দেশনার আলোকে প্রস্তুতকৃত। রুকইয়াহ শারইয়াহ হলো আত্মিক রোগমুক্তি ও হিফাযতের সুন্নাহসম্মত মাধ্যম। কোনো গুরুতর বা দীর্ঘস্থায়ী শারীরিক ও মানসিক রোগের ক্ষেত্রে রেজিস্টার্ড চিকিৎসকের চিকিৎসা এবং সুন্নাহ আমল উভয়টি একসাথে চালিয়ে যাওয়া ইসলামের বিধান।
            </div>
          </div>

          {/* Action & Consultation Footer Bar (Screen Only) */}
          <div className="pt-6 sm:pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 print:hidden">
            <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium text-center lg:text-left flex items-center gap-2 flex-wrap justify-center">
              <span>হটলাইন: <strong className="font-mono text-slate-900 dark:text-zinc-100">09639-000999</strong></span>
              <span>•</span>
              <span>ওয়েবসাইট: <strong className="text-emerald-700 dark:text-emerald-400">https://saq.pro.bd</strong></span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
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
