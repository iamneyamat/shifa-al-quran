"use client";

import React from "react";
import { DiagnosisCategory } from "../types";
import { DiagnosisResult } from "../utils/diagnosisEngine";

export interface DiagnosisPdfReportProps {
  category: DiagnosisCategory;
  resultData: DiagnosisResult;
  userAnswers: Record<string, number> | null;
  reportId?: string;
  reportDate?: string;
}

export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[Number(d)] ?? d);
}

export function formatBengaliDate(date: Date = new Date()): string {
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  const day = toBengaliNumber(date.getDate());
  const month = months[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());
  return `${day} ${month}, ${year}`;
}

export const DiagnosisPdfReport: React.FC<DiagnosisPdfReportProps> = ({
  category,
  resultData,
  userAnswers,
  reportId = `SAQ-${category.id.toUpperCase()}-8824`,
  reportDate,
}) => {
  const { totalScore, maxScore, percentage, level, levelTitle, prescription } = resultData;

  const displayDate = reportDate || formatBengaliDate();

  // Color mappings based on risk level
  const isHigh = level === "high";
  const isMedium = level === "medium";

  const themeColor = isHigh
    ? {
        primary: "#dc2626", // Red-600
        primaryDark: "#991b1b",
        bgLight: "#fef2f2",
        borderLight: "#fecaca",
        badgeBg: "#fee2e2",
        badgeText: "#991b1b",
      }
    : isMedium
    ? {
        primary: "#d97706", // Amber-600
        primaryDark: "#92400e",
        bgLight: "#fffbeb",
        borderLight: "#fde68a",
        badgeBg: "#fef3c7",
        badgeText: "#92400e",
      }
    : {
        primary: "#047857", // Emerald-700
        primaryDark: "#065f46",
        bgLight: "#ecfdf5",
        borderLight: "#a7f3d0",
        badgeBg: "#d1fae5",
        badgeText: "#065f46",
      };

  // SVG circular gauge calculation (Radius 58, Circumference = 2 * PI * 58 ≈ 364.4)
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Filter affirmative user answers
  const affirmativeQuestions = (category.questions || []).filter((q) => {
    const val = userAnswers ? userAnswers[q.id] : undefined;
    return val !== undefined && val > 0;
  });

  return (
    <div
      id="pdf-report-root"
      style={{
        width: "794px",
        backgroundColor: "#ffffff",
        color: "#0f172a",
        fontFamily:
          "var(--font-hind), 'Hind Siliguri', 'Noto Serif Bengali', -apple-system, BlinkMacSystemFont, sans-serif",
        margin: "0 auto",
        boxSizing: "border-box",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* ========================================================================= */}
      {/* PAGE 1: COVER & EXECUTIVE SUMMARY                                         */}
      {/* ========================================================================= */}
      <div
        className="pdf-page-container"
        style={{
          width: "794px",
          height: "1122px",
          maxHeight: "1122px",
          minHeight: "1122px",
          boxSizing: "border-box",
          padding: "36px 44px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Watermark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.02,
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Top Header & Official Letterhead */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "16px",
              borderBottom: "2px solid #047857",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Shifa Al Quran"
                style={{
                  width: "56px",
                  height: "56px",
                  objectFit: "contain",
                  borderRadius: "12px",
                  border: "1.5px solid #d1fae5",
                  padding: "3px",
                  backgroundColor: "#ffffff",
                }}
              />
              <div>
                <h1
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: "#022c22",
                    lineHeight: "1.1",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  শিফা আল কুরআন
                </h1>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#b45309",
                    marginTop: "3px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Islamic Ruqyah Shar&apos;iah Center
                </div>
                <div style={{ fontSize: "10.5px", color: "#64748b", marginTop: "2px", fontWeight: "500" }}>
                  কুরআন ও সুন্নাহ ভিত্তিক নির্ভরযোগ্য আত্মিক ও শারীরিক রোগমুক্তি সেবা
                </div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "5px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                  color: "#065f46",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.02em",
                }}
              >
                অফিসিয়াল অ্যাসেসমেন্ট রিপোর্ট
              </div>
              <div
                style={{
                  fontSize: "9.5px",
                  color: "#64748b",
                  fontFamily: "monospace",
                  marginTop: "5px",
                  fontWeight: "600",
                }}
              >
                DOC ID: #{reportId}
              </div>
            </div>
          </div>

          {/* Gold Accent Hairline */}
          <div style={{ height: "2px", backgroundColor: "#d4af37", width: "100%", marginTop: "2px" }} />

          {/* Assessment Metadata Strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              padding: "12px 16px",
              marginTop: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                রিপোর্ট রেফারেন্স
              </div>
              <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#0f172a", marginTop: "2px" }}>
                #{reportId}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                অ্যাসেসমেন্ট তারিখ
              </div>
              <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#0f172a", marginTop: "2px" }}>
                {displayDate}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                যাচাইকৃত ক্যাটাগরি
              </div>
              <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#047857", marginTop: "2px" }}>
                {category.title}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                মূল্যায়ন স্ট্যাটাস
              </div>
              <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#0f172a", marginTop: "2px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "7px",
                    height: "7px",
                    borderRadius: "9999px",
                    backgroundColor: "#10b981",
                    marginRight: "5px",
                  }}
                />
                সম্পন্ন (Verified)
              </div>
            </div>
          </div>

          {/* Hero Assessment Score Component (The Centerpiece of Page 1) */}
          <div
            style={{
              marginTop: "20px",
              padding: "24px 28px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "28px",
            }}
          >
            {/* Left: Circular SVG Score Gauge */}
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ position: "relative", width: "140px", height: "140px", margin: "0 auto" }}>
                <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
                  {/* Background Track Circle */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="11"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke={themeColor.primary}
                    strokeWidth="11"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                  />
                </svg>

                {/* Score Number in Center */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "900",
                      color: "#0f172a",
                      lineHeight: "1",
                      fontFamily: "monospace",
                    }}
                  >
                    {percentage}%
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#64748b",
                      marginTop: "4px",
                    }}
                  >
                    স্কোর: {toBengaliNumber(totalScore)} / {toBengaliNumber(maxScore)}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#047857", marginTop: "8px" }}>
                সামগ্রিক প্রভাব সূচক
              </div>
            </div>

            {/* Right: Outcome Details & Severity Spectrum */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                নির্ণীত ফলাফল ও ঝুঁকির স্তর
              </div>
              <h2
                style={{
                  fontSize: "19px",
                  fontWeight: "800",
                  color: "#0f172a",
                  lineHeight: "1.2",
                  margin: "4px 0 10px 0",
                }}
              >
                {levelTitle}
              </h2>

              <div
                style={{
                  display: "inline-block",
                  padding: "5px 16px",
                  borderRadius: "9999px",
                  backgroundColor: themeColor.badgeBg,
                  color: themeColor.badgeText,
                  border: `1px solid ${themeColor.borderLight}`,
                  fontSize: "12px",
                  fontWeight: "700",
                  marginBottom: "14px",
                }}
              >
                অগ্রাধিকার: {percentage >= 65 ? "জরুরি ও প্রত্যক্ষ পর্যবেক্ষণ কাম্য" : percentage >= 30 ? "নিয়মিত সুন্নাহ রুকইয়াহ প্রয়োজনীয়" : "স্বাভাবিক মাসনুন আমল যথেষ্ট"}
              </div>

              {/* 3-Segment Severity Spectrum Meter */}
              <div style={{ marginTop: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#64748b", marginBottom: "4px", fontWeight: "600" }}>
                  <span>স্বাভাবিক (০-৩০%)</span>
                  <span>মাঝারি (৩১-৬৫%)</span>
                  <span>উচ্চ ঝুঁকি (৬৬-১০০%)</span>
                </div>
                <div style={{ display: "flex", height: "8px", borderRadius: "9999px", overflow: "hidden", gap: "2px", backgroundColor: "#f1f5f9" }}>
                  <div style={{ flex: 30, backgroundColor: "#10b981", opacity: percentage <= 30 ? 1 : 0.35 }} />
                  <div style={{ flex: 35, backgroundColor: "#f59e0b", opacity: percentage > 30 && percentage <= 65 ? 1 : 0.35 }} />
                  <div style={{ flex: 35, backgroundColor: "#ef4444", opacity: percentage > 65 ? 1 : 0.35 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary Box */}
          <div
            style={{
              marginTop: "20px",
              padding: "16px 20px",
              backgroundColor: "#fcfbf9",
              border: "1px solid #e4ded3",
              borderLeft: "4px solid #b45309",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "9999px",
                  backgroundColor: "#b45309",
                }}
              />
              <h3
                style={{
                  fontSize: "12.5px",
                  fontWeight: "700",
                  color: "#0f172a",
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                সারসংক্ষেপ ও মূল মূল্যায়ন
              </h3>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#334155",
                lineHeight: "1.6",
                margin: 0,
                fontWeight: "400",
              }}
            >
              {prescription.summary}
            </p>
          </div>

          {/* Key Evaluation Metrics Grid */}
          <div
            style={{
              marginTop: "18px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
            }}
          >
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "10px 14px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "600" }}>মূল্যায়িত প্রশ্নসংখ্যা</div>
              <div style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>
                {toBengaliNumber((category.questions || []).length)} টি প্রশ্ন
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "10px 14px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "600" }}>চিহ্নিত প্রধান লক্ষণ</div>
              <div style={{ fontSize: "14px", fontWeight: "800", color: themeColor.primary, marginTop: "2px" }}>
                {toBengaliNumber(affirmativeQuestions.length)} টি উপসর্গ
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "10px 14px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "600" }}>নির্ধারিত সুন্নাহ আমল</div>
              <div style={{ fontSize: "14px", fontWeight: "800", color: "#047857", marginTop: "2px" }}>
                {toBengaliNumber(prescription.steps.length)} টি পদক্ষেপ
              </div>
            </div>
          </div>
        </div>

        {/* Page 1 Footer */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "10px",
            color: "#64748b",
          }}
        >
          <div>শিফা আল কুরআন • saq.pro.bd • হটলাইন: 09639-000999</div>
          <div style={{ fontWeight: "600", color: "#047857" }}>কুরআন ও সুন্নাহ ভিত্তিক আত্মিক চিকিৎসা</div>
          <div style={{ fontWeight: "700" }}>পৃষ্ঠা ১ / ৪</div>
        </div>
      </div>

      {/* Explicit Page Break for html2pdf.js */}
      <div className="html2pdf__page-break" style={{ pageBreakAfter: "always", breakAfter: "page" }} />

      {/* ========================================================================= */}
      {/* PAGE 2: ASSESSMENT OVERVIEW & DETAILED FINDINGS                           */}
      {/* ========================================================================= */}
      <div
        className="pdf-page-container"
        style={{
          width: "794px",
          height: "1122px",
          maxHeight: "1122px",
          minHeight: "1122px",
          boxSizing: "border-box",
          padding: "36px 44px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div>
          {/* Running Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "10px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="SAQ" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#022c22" }}>
                শিফা আল কুরআন — অফিসিয়াল অ্যাসেসমেন্ট রিপোর্ট
              </span>
            </div>
            <div style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>
              #{reportId} • পৃষ্ঠা ২ / ৪
            </div>
          </div>

          {/* Section Heading */}
          <div style={{ marginTop: "16px", marginBottom: "16px" }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "10px",
                fontWeight: "700",
                color: "#047857",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              SECTION 02 — OVERVIEW & EVALUATION
            </div>
            <h2
              style={{
                fontSize: "17px",
                fontWeight: "800",
                color: "#0f172a",
                lineHeight: "1.2",
                margin: "4px 0 0 0",
              }}
            >
              অ্যাসেসমেন্ট বিশ্লেষণ ও বিশদ লক্ষণ পর্যালোচনা
            </h2>
          </div>

          {/* Category Background Card */}
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <div style={{ fontSize: "13px", fontWeight: "800", color: "#0f172a" }}>
                {category.title} ({category.subtitle})
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  backgroundColor: "#ecfdf5",
                  color: "#065f46",
                  border: "1px solid #a7f3d0",
                }}
              >
                {category.badge}
              </span>
            </div>
            <p style={{ fontSize: "11px", color: "#475569", lineHeight: "1.5", margin: 0 }}>
              {category.description}
            </p>
          </div>

          {/* Evaluated Symptoms Breakdown List */}
          <div style={{ marginBottom: "16px" }}>
            <h3
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  backgroundColor: "#047857",
                  display: "inline-block",
                }}
              />
              অ্যাসেসমেন্টে যাচাইকৃত প্রধান লক্ষণ ও উপসর্গসমূহ:
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(category.questions || []).slice(0, 6).map((q, idx) => {
                const answerWeight = userAnswers ? userAnswers[q.id] : (idx % 2 === 0 ? 1 : 2);
                const isAffirmative = answerWeight === 2;
                const isSometimes = answerWeight === 1;

                return (
                  <div
                    key={q.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      padding: "8px 12px",
                      backgroundColor: isAffirmative ? "#fff1f2" : isSometimes ? "#fffbeb" : "#f8fafc",
                      border: `1px solid ${isAffirmative ? "#fecdd3" : isSometimes ? "#fef3c7" : "#e2e8f0"}`,
                      borderRadius: "8px",
                      fontSize: "11px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", flex: 1 }}>
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "9999px",
                          backgroundColor: isAffirmative ? "#e11d48" : isSometimes ? "#d97706" : "#64748b",
                          color: "#ffffff",
                          fontSize: "9px",
                          fontWeight: "700",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      >
                        {toBengaliNumber(idx + 1)}
                      </span>
                      <span style={{ color: "#1e293b", lineHeight: "1.4", fontWeight: "500" }}>{q.text}</span>
                    </div>

                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        fontSize: "9.5px",
                        fontWeight: "700",
                        flexShrink: 0,
                        backgroundColor: isAffirmative ? "#fee2e2" : isSometimes ? "#fef3c7" : "#f1f5f9",
                        color: isAffirmative ? "#991b1b" : isSometimes ? "#92400e" : "#475569",
                        border: `1px solid ${isAffirmative ? "#fca5a5" : isSometimes ? "#fde68a" : "#cbd5e1"}`,
                      }}
                    >
                      {isAffirmative ? "চিহ্নিত (হ্যাঁ)" : isSometimes ? "মাঝে মধ্যে" : "অনুপস্থিত (না)"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spiritual Diagnosis Principles */}
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "#fcfbf9",
              border: "1px solid #e4ded3",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: "#b45309" }} />
              <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#022c22" }}>
                শরঈ দৃষ্টিকোণ ও সুন্নাহসম্মত আরোগ্যের মূলনীতি
              </span>
            </div>
            <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "10.5px", color: "#334155", lineHeight: "1.6" }}>
              <li>
                <strong>আরোগ্য কেবল আল্লাহর হাতে:</strong> রুকইয়াহ কোনো অলৌকিক জাদু নয়, বরং এটি খাঁটি দোয়া ও আল্লাহর কালামের মাধ্যমে আরোগ্যের সুন্নাহসম্মত ওসিলা।
              </li>
              <li>
                <strong>শিরক ও বিদআতের বর্জন:</strong> তাবিজে কোনো অজ্ঞাত সংখ্যা, প্রতীক বা অস্পষ্ট বাক্য লেখা থাকলে তা শিরকের অন্তর্ভুক্ত। সুন্নাহসম্মত রুকইয়াহ সম্পূর্ণ স্বচ্ছ।
              </li>
              <li>
                <strong>আত্মিক পরিচ্ছন্নতা:</strong> নিয়মিত পাঁচ ওয়াক্ত সালাত, হালাল উপার্জন ও তাওবা রুকইয়াহর কার্যকারিতা বহুগুণ বৃদ্ধি করে।
              </li>
            </ul>
          </div>
        </div>

        {/* Page 2 Footer */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "10px",
            color: "#64748b",
          }}
        >
          <div>শিফা আল কুরআন • saq.pro.bd</div>
          <div style={{ fontStyle: "italic" }}>গোপনীয় ও সংরক্ষিত রুকইয়াহ অ্যাসেসমেন্ট</div>
          <div style={{ fontWeight: "700" }}>পৃষ্ঠা ২ / ৪</div>
        </div>
      </div>

      {/* Explicit Page Break for html2pdf.js */}
      <div className="html2pdf__page-break" style={{ pageBreakAfter: "always", breakAfter: "page" }} />

      {/* ========================================================================= */}
      {/* PAGE 3: RECOMMENDED ACTIONS PROTOCOL                                      */}
      {/* ========================================================================= */}
      <div
        className="pdf-page-container"
        style={{
          width: "794px",
          height: "1122px",
          maxHeight: "1122px",
          minHeight: "1122px",
          boxSizing: "border-box",
          padding: "36px 44px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div>
          {/* Running Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "10px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="SAQ" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#022c22" }}>
                শিফা আল কুরআন — আমল ও করণীয় গাইড
              </span>
            </div>
            <div style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>
              #{reportId} • পৃষ্ঠা ৩ / ৪
            </div>
          </div>

          {/* Section Heading */}
          <div style={{ marginTop: "16px", marginBottom: "18px" }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "10px",
                fontWeight: "700",
                color: "#047857",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              SECTION 03 — RECOMMENDED ACTIONS
            </div>
            <h2
              style={{
                fontSize: "17px",
                fontWeight: "800",
                color: "#0f172a",
                lineHeight: "1.2",
                margin: "4px 0 0 0",
              }}
            >
              সুন্নাহসম্মত নির্দেশিকা ও করণীয় চিকিৎসাক্রম
            </h2>
            <p style={{ fontSize: "11px", color: "#64748b", margin: "4px 0 0 0" }}>
              আপনার মূল্যায়নের তীব্রতার ভিত্তিতে সুন্নাহসম্মত ধারাবাহিক আমল নিম্নে সুনির্দিষ্টভাবে সাজানো হলো:
            </p>
          </div>

          {/* Numbered Recommendation Cards (01, 02, 03...) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            {prescription.steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "16px 18px",
                  backgroundColor: "#fcfdfd",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "12px",
                  boxShadow: "0 2px 6px rgba(15, 23, 42, 0.02)",
                }}
              >
                {/* Numbered Circle Badge */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9999px",
                    backgroundColor: "#047857",
                    color: "#ffffff",
                    fontWeight: "800",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "2px solid #d1fae5",
                    boxShadow: "0 2px 6px rgba(4, 120, 87, 0.2)",
                  }}
                >
                  {toBengaliNumber(idx < 9 ? `0${idx + 1}` : idx + 1)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "#b45309", marginBottom: "3px" }}>
                    করণীয় ধাপ {toBengaliNumber(idx + 1)}
                  </div>
                  <div style={{ fontSize: "12.5px", fontWeight: "500", color: "#1e293b", lineHeight: "1.55" }}>
                    {step}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Schedule Protocol Box */}
          <div
            style={{
              padding: "16px 20px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#047857" }} />
              <h3 style={{ fontSize: "12.5px", fontWeight: "800", color: "#065f46", margin: 0 }}>
                দৈনিক রুকইয়াহ আমল রুটিন (Daily Protocol)
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #d1fae5",
                }}
              >
                <div style={{ fontSize: "10.5px", fontWeight: "700", color: "#065f46" }}>সকালের আমল (ফজর পর)</div>
                <div style={{ fontSize: "9.5px", color: "#475569", marginTop: "3px", lineHeight: "1.4" }}>
                  সকালের মাসনুন জিকির, ৩ কুল পড়ে বুকে ফুঁ ও রুকইয়াহ পানি পান।
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #d1fae5",
                }}
              >
                <div style={{ fontSize: "10.5px", fontWeight: "700", color: "#065f46" }}>সন্ধ্যার আমল (মাগরিব পর)</div>
                <div style={{ fontSize: "9.5px", color: "#475569", marginTop: "3px", lineHeight: "1.4" }}>
                  সন্ধ্যার হেফাজতের দোয়াসমূহ এবং প্রয়োজনবোধে রুকইয়াহর গোসল সম্পন্ন।
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #d1fae5",
                }}
              >
                <div style={{ fontSize: "10.5px", fontWeight: "700", color: "#065f46" }}>শয়নের আমল (রাতের পূর্বে)</div>
                <div style={{ fontSize: "9.5px", color: "#475569", marginTop: "3px", lineHeight: "1.4" }}>
                  ওজু অবস্থায় ঘুমানো, আয়াতুল কুরসি ও বাকারার শেষ দুই আয়াত তিলাওয়াত।
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 3 Footer */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "10px",
            color: "#64748b",
          }}
        >
          <div>শিফা আল কুরআন • saq.pro.bd</div>
          <div style={{ fontWeight: "600", color: "#b45309" }}>ধারাবাহিকতা ও তাওয়াক্কুল আবশ্যক</div>
          <div style={{ fontWeight: "700" }}>পৃষ্ঠা ৩ / ৪</div>
        </div>
      </div>

      {/* Explicit Page Break for html2pdf.js */}
      <div className="html2pdf__page-break" style={{ pageBreakAfter: "always", breakAfter: "page" }} />

      {/* ========================================================================= */}
      {/* PAGE 4: QURANIC GUIDANCE, OFFICIAL SEAL & CENTER CONTACT                 */}
      {/* ========================================================================= */}
      <div
        className="pdf-page-container"
        style={{
          width: "794px",
          height: "1122px",
          maxHeight: "1122px",
          minHeight: "1122px",
          boxSizing: "border-box",
          padding: "36px 44px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div>
          {/* Running Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "10px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="SAQ" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#022c22" }}>
                শিফা আল কুরআন — কুরআন ও সুন্নাহ ভিত্তিক প্রেসক্রিপশন
              </span>
            </div>
            <div style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>
              #{reportId} • পৃষ্ঠা ৪ / ৪
            </div>
          </div>

          {/* Section Heading */}
          <div style={{ marginTop: "16px", marginBottom: "16px" }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "10px",
                fontWeight: "700",
                color: "#047857",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              SECTION 04 — QURANIC PRESCRIPTION & VERIFICATION
            </div>
            <h2
              style={{
                fontSize: "17px",
                fontWeight: "800",
                color: "#0f172a",
                lineHeight: "1.2",
                margin: "4px 0 0 0",
              }}
            >
              প্রস্তাবিত সূরা ও আয়াতসমূহ (রুকইয়াহ তিলাওয়াত)
            </h2>
            <p style={{ fontSize: "11px", color: "#64748b", margin: "4px 0 0 0" }}>
              রোগমুক্তি ও সুরক্ষার উদ্দেশ্যে বিশেষ গুরুত্বসহকারে নিয়মিত তিলাওয়াত ও শ্রবণ করুন:
            </p>
          </div>

          {/* Recommended Surahs Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "18px",
            }}
          >
            {prescription.recommendedSurahs.map((surah, idx) => (
              <div
                key={idx}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "12.5px",
                      fontWeight: "700",
                      color: "#0f172a",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "8px",
                        borderRadius: "2px",
                        backgroundColor: "#b45309",
                      }}
                    />
                    {surah}
                  </div>
                  <div style={{ fontSize: "10px", color: "#047857", fontWeight: "600", marginTop: "2px" }}>
                    নিয়মিত সকাল ও সন্ধ্যায় তিলাওয়াত ও দম
                  </div>
                </div>

                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    backgroundColor: "#ecfdf5",
                    color: "#065f46",
                    fontSize: "9.5px",
                    fontWeight: "700",
                    border: "1px solid #a7f3d0",
                  }}
                >
                  সুন্নাহ আমল
                </span>
              </div>
            ))}
          </div>

          {/* Recommended Audio Sessions (if available) */}
          {prescription.audioLinks && prescription.audioLinks.length > 0 && (
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#ecfdf5",
                border: "1px solid #a7f3d0",
                borderRadius: "10px",
                marginBottom: "18px",
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#065f46", marginBottom: "6px" }}>
                প্রস্তাবিত রুকইয়াহ অডিও (মনোযোগ সহকারে শুনুন):
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {prescription.audioLinks.map((audio, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #6ee7b7",
                      color: "#065f46",
                      fontSize: "10px",
                      fontWeight: "600",
                    }}
                  >
                    🎧 {audio.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Official Verification Seal & Sign-off Card */}
          <div
            style={{
              padding: "16px 20px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            {/* Center Seal */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "9999px",
                  border: "2px dashed #047857",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#047857",
                  fontSize: "9px",
                  fontWeight: "800",
                  textAlign: "center",
                  lineHeight: "1.2",
                  padding: "4px",
                  backgroundColor: "#f0fdf4",
                }}
              >
                SAQ
                <br />
                VERIFIED
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: "800", color: "#022c22" }}>
                  শিফা আল কুরআন রুকইয়াহ রিসার্চ বোর্ড
                </div>
                <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>
                  কুরআন ও সুন্নাহ ভিত্তিক নির্ভরযোগ্য চিকিৎসা পদ্ধতি
                </div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "10.5px", fontWeight: "700", color: "#0f172a" }}>অনুমোদিত তত্ত্বাবধায়ক</div>
              <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>
                সার্টিফাইড শরঈ রাকি টিম
              </div>
            </div>
          </div>

          {/* Shar'iah & Medical Disclaimer Box */}
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "9.5px",
              color: "#64748b",
              lineHeight: "1.5",
              marginBottom: "16px",
            }}
          >
            <strong style={{ color: "#0f172a" }}>জরুরি শরঈ ও চিকিৎসা সতর্কতা:</strong> এটি শিফা আল কুরআন প্ল্যাটফর্মের স্বয়ংক্রিয় রুকইয়াহ মূল্যায়ন রিপোর্ট। কুরআন ও সহিহ হাদিসের নির্দেশনার আলোকে প্রস্তুতকৃত। রুকইয়াহ শারইয়াহ হলো আত্মিক রোগমুক্তি ও হিফাযতের সুন্নাহসম্মত মাধ্যম। কোনো গুরুতর বা দীর্ঘস্থায়ী শারীরিক ও মানসিক রোগের ক্ষেত্রে চিকিৎসকের পরামর্শ ও সুন্নাহ আমল উভয়টি একসাথে চালিয়ে যাওয়া ইসলামের বিধান।
          </div>

          {/* Official Center Contacts Strip */}
          <div
            style={{
              padding: "12px 18px",
              backgroundColor: "#022c22",
              color: "#ffffff",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "11px",
            }}
          >
            <div>
              <div style={{ fontWeight: "700", color: "#d1fae5" }}>শিফা আল কুরআন সেন্টার</div>
              <div style={{ fontSize: "9.5px", color: "#94a3b8" }}>ওয়েবসাইট: https://saq.pro.bd</div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: "700", color: "#fde68a" }}>হটলাইন সাপোর্ট</div>
              <div style={{ fontSize: "10.5px", fontFamily: "monospace" }}>09639-000999</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "700", color: "#86efac" }}>হোয়াটসঅ্যাপ কনসাল্টেশন</div>
              <div style={{ fontSize: "10.5px", fontFamily: "monospace" }}>+880 1353-301772</div>
            </div>
          </div>
        </div>

        {/* Page 4 Footer */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "10px",
            color: "#64748b",
          }}
        >
          <div>ইস্যু তারিখ: {displayDate}</div>
          <div style={{ fontWeight: "700", color: "#047857" }}>শিফা আল কুরআন • সর্বস্বত্ব সংরক্ষিত</div>
          <div style={{ fontWeight: "700" }}>পৃষ্ঠা ৪ / ৪ (সমাপ্ত)</div>
        </div>
      </div>
    </div>
  );
};
