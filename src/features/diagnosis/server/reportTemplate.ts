import fs from "fs";
import path from "path";
import { AssessmentReportData } from "../types/report";

// Bengali number helper
export function toBnNumber(num: number | string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)] ?? d);
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
  const day = toBnNumber(date.getDate());
  const month = months[date.getMonth()];
  const year = toBnNumber(date.getFullYear());
  return `${day} ${month}, ${year}`;
}

// Read and cache base64 assets
let cachedFontHindRegular: string | null = null;
let cachedFontHindBold: string | null = null;
let cachedFontAmiri: string | null = null;
let cachedLogoBase64: string | null = null;

function getAssetBase64(relativeFilePath: string): string {
  try {
    const fullPath = path.join(process.cwd(), relativeFilePath);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath).toString("base64");
    }
  } catch (err) {
    console.error(`Error reading asset ${relativeFilePath}:`, err);
  }
  return "";
}

function getFontsAndLogo() {
  if (!cachedFontHindRegular) {
    cachedFontHindRegular = getAssetBase64("public/fonts/HindSiliguri-400-bengali.woff2");
  }
  if (!cachedFontHindBold) {
    cachedFontHindBold = getAssetBase64("public/fonts/HindSiliguri-700-bengali.woff2");
  }
  if (!cachedFontAmiri) {
    cachedFontAmiri = getAssetBase64("public/fonts/Amiri-400-arabic.woff2");
  }
  if (!cachedLogoBase64) {
    cachedLogoBase64 = getAssetBase64("public/logo.png");
  }
  return {
    hindRegular: cachedFontHindRegular,
    hindBold: cachedFontHindBold,
    amiri: cachedFontAmiri,
    logo: cachedLogoBase64,
  };
}

export function renderReportStyles(): string {
  const { hindRegular, hindBold, amiri } = getFontsAndLogo();

  return `
    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${hindRegular}') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${hindBold}') format('woff2');
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: 'Amiri';
      src: url('data:font/woff2;base64,${amiri}') format('woff2');
      font-weight: 400;
      font-style: normal;
    }

    @page {
      size: A4 portrait;
      margin: 14mm 15mm 16mm 15mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Hind Siliguri', system-ui, -apple-system, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 10pt;
      line-height: 1.5;
    }

    .report-section {
      break-after: page;
      page-break-after: always;
      position: relative;
    }

    .report-section:last-child {
      break-after: auto;
      page-break-after: auto;
    }

    .report-card {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .running-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 8px;
      margin-bottom: 16px;
      border-bottom: 1.5px solid #047857;
    }

    .running-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      margin-top: 24px;
      border-top: 1px solid #e2e8f0;
      font-size: 8.5pt;
      color: #64748b;
    }

    .arabic-text {
      font-family: 'Amiri', serif;
      direction: rtl;
      text-align: right;
      line-height: 1.9;
      font-size: 13pt;
      color: #064e3b;
    }
  `;
}

export function renderRunningHeader(data: AssessmentReportData, pageTitle: string): string {
  const { logo } = getFontsAndLogo();
  return `
    <div class="running-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        ${logo ? `<img src="data:image/png;base64,${logo}" alt="Logo" style="width: 24px; height: 24px; object-fit: contain;" />` : ""}
        <div>
          <span style="font-weight: 700; font-size: 10pt; color: #022c22;">শিফা আল কুরআন</span>
          <span style="color: #cbd5e1; margin: 0 6px;">|</span>
          <span style="font-size: 9pt; color: #047857; font-weight: 600;">${pageTitle}</span>
        </div>
      </div>
      <div style="font-size: 8.5pt; color: #64748b; font-family: monospace; font-weight: 600;">
        DOC ID: #${data.reportId || "SAQ-GEN"}
      </div>
    </div>
  `;
}

export function renderRunningFooter(data: AssessmentReportData, pageNumber: number, totalPages: number): string {
  return `
    <div class="running-footer">
      <div>শিফা আল কুরআন • <strong style="color: #047857;">saq.pro.bd</strong> • হটলাইন: 09639-000999</div>
      <div style="font-weight: 600; color: #047857;">কুরআন ও সুন্নাহ ভিত্তিক আত্মিক সুস্থতা</div>
      <div style="font-weight: 700; color: #0f172a;">পৃষ্ঠা ${toBnNumber(pageNumber)} / ${toBnNumber(totalPages)}</div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// PAGE 1: COVER & EXECUTIVE SUMMARY
// ---------------------------------------------------------------------------
export function renderReportCover(data: AssessmentReportData): string {
  const { logo } = getFontsAndLogo();
  const category = data.category || { title: "রুকইয়াহ মূল্যায়ন", questions: [] };
  const result = data.result || {
    totalScore: 0,
    maxScore: 20,
    percentage: 0,
    level: "low",
    levelTitle: "স্বাভাবিক স্তর",
    prescription: { summary: "", steps: [], recommendedSurahs: [] },
  };
  const reportId = data.reportId || "SAQ-GEN-8824";
  const reportDate = data.reportDate || formatBengaliDate();

  const totalScore = result.totalScore ?? 0;
  const maxScore = result.maxScore ?? 20;
  const percentage = result.percentage ?? 0;
  const level = result.level || "low";
  const levelTitle = result.levelTitle || "স্বাভাবিক স্তর";
  const prescription = result.prescription || { summary: "", steps: [], recommendedSurahs: [] };

  const isHigh = level === "high";
  const isMedium = level === "medium";
  const themeColor = isHigh
    ? { primary: "#dc2626", bg: "#fef2f2", border: "#fecaca", text: "#991b1b" }
    : isMedium
    ? { primary: "#d97706", bg: "#fffbeb", border: "#fde68a", text: "#92400e" }
    : { primary: "#047857", bg: "#ecfdf5", border: "#a7f3d0", text: "#065f46" };

  // SVG circular score meter
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return `
    <div class="report-section">
      <!-- Master Brand Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 14px; border-bottom: 2.5px solid #047857;">
        <div style="display: flex; align-items: center; gap: 14px;">
          ${logo ? `
            <img src="data:image/png;base64,${logo}" alt="Logo" style="width: 52px; height: 52px; object-fit: contain; border-radius: 10px; border: 1.5px solid #d1fae5; padding: 2px;" />
          ` : ""}
          <div>
            <h1 style="font-size: 19pt; font-weight: 800; color: #022c22; margin: 0; line-height: 1.1;">
              শিফা আল কুরআন
            </h1>
            <div style="font-size: 9.5pt; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">
              Islamic Ruqyah Shar'iah Center
            </div>
            <div style="font-size: 8.5pt; color: #64748b; margin-top: 2px;">
              কুরআন ও সুন্নাহ ভিত্তিক আত্মিক ও মানসিক রোগমুক্তি সেবা
            </div>
          </div>
        </div>

        <div style="text-align: right;">
          <div style="display: inline-block; background: #ecfdf5; border: 1.5px solid #a7f3d0; color: #065f46; font-size: 9.5pt; font-weight: 700; padding: 4px 14px; border-radius: 9999px;">
            অফিসিয়াল অ্যাসেসমেন্ট রিপোর্ট
          </div>
          <div style="font-size: 8.5pt; color: #64748b; font-family: monospace; font-weight: 600; margin-top: 5px;">
            REF: #${reportId}
          </div>
        </div>
      </div>

      <!-- Gold Accent Bar -->
      <div style="height: 2px; background: #d4af37; width: 100%; margin-top: 2px; margin-bottom: 16px;"></div>

      <!-- Assessment Metadata Grid -->
      <div class="report-card" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; margin-bottom: 18px;">
        <div>
          <div style="font-size: 8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">রিপোর্ট রেফারেন্স</div>
          <div style="font-size: 9.5pt; font-weight: 700; color: #0f172a; margin-top: 2px;">#${reportId}</div>
        </div>
        <div>
          <div style="font-size: 8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">অ্যাসেসমেন্ট তারিখ</div>
          <div style="font-size: 9.5pt; font-weight: 700; color: #0f172a; margin-top: 2px;">${reportDate}</div>
        </div>
        <div>
          <div style="font-size: 8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">মূল্যায়ন ক্যাটাগরি</div>
          <div style="font-size: 9.5pt; font-weight: 700; color: #047857; margin-top: 2px;">${category.title}</div>
        </div>
        <div>
          <div style="font-size: 8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">ভেরিফিকেশন স্ট্যাটাস</div>
          <div style="font-size: 9.5pt; font-weight: 700; color: #0f172a; margin-top: 2px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background: #10b981; margin-right: 4px;"></span>
            যাচাইকৃত (Verified)
          </div>
        </div>
      </div>

      <!-- Hero Score Component (The Centerpiece of Page 1) -->
      <div class="report-card" style="display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 20px 24px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03); margin-bottom: 18px;">
        <!-- Circular Progress Meter -->
        <div style="text-align: center; flex-shrink: 0;">
          <div style="position: relative; width: 130px; height: 130px; margin: 0 auto;">
            <svg width="130" height="130" viewBox="0 0 130 130" style="transform: rotate(-90deg);">
              <circle cx="65" cy="65" r="${radius}" fill="none" stroke="#f1f5f9" stroke-width="10" />
              <circle cx="65" cy="65" r="${radius}" fill="none" stroke="${themeColor.primary}" stroke-width="10" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" />
            </svg>
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <span style="font-size: 24pt; font-weight: 800; color: #0f172a; line-height: 1; font-family: monospace;">
                ${percentage}%
              </span>
              <span style="font-size: 8.5pt; font-weight: 700; color: #64748b; margin-top: 3px;">
                স্কোর: ${toBnNumber(totalScore)} / ${toBnNumber(maxScore)}
              </span>
            </div>
          </div>
          <div style="font-size: 9pt; font-weight: 700; color: #047857; margin-top: 6px;">
            সামগ্রিক প্রভাব সূচক
          </div>
        </div>

        <!-- Outcome Details & Severity Meter -->
        <div style="flex: 1;">
          <div style="font-size: 8.5pt; font-weight: 700; color: #64748b; text-transform: uppercase;">
            নির্ণীত ফলাফল ও ঝুঁকির স্তর
          </div>
          <h2 style="font-size: 15pt; font-weight: 800; color: #0f172a; margin: 3px 0 8px 0; line-height: 1.2;">
            ${levelTitle}
          </h2>

          <div style="display: inline-block; padding: 4px 14px; border-radius: 9999px; background: ${themeColor.bg}; color: ${themeColor.text}; border: 1px solid ${themeColor.border}; font-size: 9.5pt; font-weight: 700; margin-bottom: 10px;">
            অগ্রাধিকার: ${percentage >= 65 ? "জরুরি প্রত্যক্ষ পর্যবেক্ষণ কাম্য" : percentage >= 30 ? "নিয়মিত সুন্নাহ রুকইয়াহ প্রয়োজনীয়" : "সাধারণ মাসনুন আমল যথেষ্ট"}
          </div>

          <!-- 3-Segment Severity Spectrum Meter -->
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 8pt; color: #64748b; margin-bottom: 3px; font-weight: 600;">
              <span>স্বাভাবিক (০-৩০%)</span>
              <span>মাঝারি (৩১-৬৫%)</span>
              <span>উচ্চ ঝুঁকি (৬৬-১০০%)</span>
            </div>
            <div style="display: flex; height: 7px; border-radius: 9999px; overflow: hidden; gap: 2px; background: #f1f5f9;">
              <div style="flex: 30; background: #10b981; opacity: ${percentage <= 30 ? 1 : 0.3};"></div>
              <div style="flex: 35; background: #f59e0b; opacity: ${percentage > 30 && percentage <= 65 ? 1 : 0.3};"></div>
              <div style="flex: 35; background: #ef4444; opacity: ${percentage > 65 ? 1 : 0.3};"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Executive Diagnostic Summary Card -->
      <div class="report-card" style="padding: 14px 18px; background: #fcfbf9; border: 1px solid #e4ded3; border-left: 4px solid #b45309; border-radius: 8px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="width: 6px; height: 6px; border-radius: 9999px; background: #b45309;"></span>
          <h3 style="font-size: 10pt; font-weight: 700; color: #0f172a; margin: 0; text-transform: uppercase;">
            নির্বাহী সারসংক্ষেপ ও ডায়াগনোসিস বিশ্লেষণ
          </h3>
        </div>
        <p style="font-size: 9.5pt; color: #334155; line-height: 1.6; margin: 0;">
          ${prescription.summary}
        </p>
      </div>

      <!-- Key Evaluation Metrics (3 Stats Cards) -->
      <div class="report-card" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
          <div style="font-size: 8pt; color: #64748b; font-weight: 600;">মূল্যায়িত প্রশ্নসংখ্যা</div>
          <div style="font-size: 12pt; font-weight: 800; color: #0f172a; margin-top: 2px;">
            ${toBnNumber((category.questions || []).length)} টি প্রশ্ন
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
          <div style="font-size: 8pt; color: #64748b; font-weight: 600;">চিহ্নিত উপসর্গের তীব্রতা</div>
          <div style="font-size: 12pt; font-weight: 800; color: ${themeColor.primary}; margin-top: 2px;">
            ${(levelTitle || "স্বাভাবিক").split(" ")[0] || "স্বাভাবিক"}
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
          <div style="font-size: 8pt; color: #64748b; font-weight: 600;">নির্ধারিত সুন্নাহ আমল</div>
          <div style="font-size: 12pt; font-weight: 800; color: #047857; margin-top: 2px;">
            ${toBnNumber((prescription?.steps || []).length)} টি ধাপ
          </div>
        </div>
      </div>

      ${renderRunningFooter(data, 1, 4)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// PAGE 2: ASSESSMENT OVERVIEW & QUESTION-BY-QUESTION ANALYSIS
// ---------------------------------------------------------------------------
export function renderAssessmentOverview(data: AssessmentReportData): string {
  const category = data.category || { title: "রুকইয়াহ মূল্যায়ন", subtitle: "", badge: "যাচাইকৃত", description: "" };
  const evaluatedQuestions = data.evaluatedQuestions || [];

  return `
    <div class="report-section">
      ${renderRunningHeader(data, "অ্যাসেসমেন্ট বিশ্লেষণ ও বিশদ লক্ষণ পর্যালোচনা")}

      <!-- Section Title Banner -->
      <div style="margin-bottom: 14px;">
        <div style="font-size: 8.5pt; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.05em;">
          SECTION 02 — OVERVIEW & EVALUATION
        </div>
        <h2 style="font-size: 14pt; font-weight: 800; color: #0f172a; margin: 2px 0 0 0;">
          অ্যাসেসমেন্ট বিশ্লেষণ ও প্রশ্নোত্তর পর্যালোচনা
        </h2>
      </div>

      <!-- Category Context Card -->
      <div class="report-card" style="padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <div style="font-size: 10.5pt; font-weight: 800; color: #0f172a;">
            ${category.title || "রুকইয়াহ মূল্যায়ন"} ${category.subtitle ? `(${category.subtitle})` : ""}
          </div>
          <span style="font-size: 8.5pt; font-weight: 700; padding: 2px 8px; border-radius: 9999px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">
            ${category.badge || "যাচাইকৃত"}
          </span>
        </div>
        <p style="font-size: 9pt; color: #475569; margin: 0; line-height: 1.5;">
          ${category.description || ""}
        </p>
      </div>

      <!-- Questionnaire Results Table / Cards -->
      <div class="report-card" style="margin-bottom: 16px;">
        <h3 style="font-size: 10pt; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; display: flex; align-items: center; gap: 6px;">
          <span style="width: 6px; height: 6px; border-radius: 9999px; background: #047857;"></span>
          যাচাইকৃত প্রশ্নাবলী ও ব্যবহারকারীর উত্তর:
        </h3>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${evaluatedQuestions.map((item, idx) => {
            const isAffirmative = item?.answerWeight === 2;
            const isSometimes = item?.answerWeight === 1;

            const badgeBg = isAffirmative ? "#fee2e2" : isSometimes ? "#fef3c7" : "#f1f5f9";
            const badgeColor = isAffirmative ? "#991b1b" : isSometimes ? "#92400e" : "#475569";
            const badgeBorder = isAffirmative ? "#fca5a5" : isSometimes ? "#fde68a" : "#cbd5e1";
            const cardBg = isAffirmative ? "#fff1f2" : isSometimes ? "#fffbeb" : "#ffffff";
            const cardBorder = isAffirmative ? "#fecdd3" : isSometimes ? "#fef3c7" : "#e2e8f0";

            return `
              <div class="report-card" style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; padding: 8px 12px; background: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 6px; font-size: 9pt;">
                <div style="display: flex; align-items: flex-start; gap: 8px; flex: 1;">
                  <span style="width: 18px; height: 18px; border-radius: 9999px; background: ${isAffirmative ? "#e11d48" : isSometimes ? "#d97706" : "#64748b"}; color: #ffffff; font-size: 7.5pt; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;">
                    ${toBnNumber(idx + 1)}
                  </span>
                  <span style="color: #1e293b; line-height: 1.4; font-weight: 500;">
                    ${item?.question?.text || (typeof item?.question === "string" ? item.question : "")}
                  </span>
                </div>
                <span style="padding: 2px 8px; border-radius: 9999px; font-size: 8pt; font-weight: 700; flex-shrink: 0; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder};">
                  ${item?.answerLabel || "উত্তর দেওয়া হয়েছে"}
                </span>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Islamic Clinical Guidelines Card -->
      <div class="report-card" style="padding: 12px 16px; background: #fcfbf9; border: 1px solid #e4ded3; border-radius: 8px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="width: 6px; height: 6px; border-radius: 9999px; background: #b45309;"></span>
          <span style="font-size: 9.5pt; font-weight: 700; color: #022c22;">
            শরঈ দৃষ্টিকোণ ও সুন্নাহসম্মত আরোগ্যের মূলনীতি
          </span>
        </div>
        <ul style="margin: 0; padding-left: 16px; font-size: 8.5pt; color: #334155; line-height: 1.55;">
          <li><strong>আরোগ্য কেবল আল্লাহর হাতে:</strong> রুকইয়াহ কোনো জাদুকরি চিকিৎসা নয়, বরং আল্লাহর কালামের মাধ্যমে আরোগ্যের সুন্নাহসম্মত উপায়।</li>
          <li><strong>শিরক ও বিদআতের বর্জন:</strong> তাবিজে কোনো অজ্ঞাত সংখ্যা, প্রতীক বা অস্পষ্ট বাক্য থাকলে তা বর্জনীয়। সুন্নাহসম্মত রুকইয়াহ সম্পূর্ণ স্বচ্ছ।</li>
          <li><strong>আত্মিক পরিচ্ছন্নতা:</strong> পাঁচ ওয়াক্ত সালাত, হালাল উপার্জন ও নিয়মিত জিকির সুস্থতার ভিত্তি স্থাপন করে।</li>
        </ul>
      </div>

      ${renderRunningFooter(data, 2, 4)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// PAGE 3: RECOMMENDED ACTIONS PROTOCOL & DAILY ROUTINE
// ---------------------------------------------------------------------------
export function renderRecommendedActions(data: AssessmentReportData): string {
  const prescription = data.result?.prescription || { steps: [] };
  const steps = prescription.steps || [];

  return `
    <div class="report-section">
      ${renderRunningHeader(data, "সুন্নাহসম্মত চিকিৎসাক্রম ও করণীয় আমলসমূহ")}

      <!-- Section Title Banner -->
      <div style="margin-bottom: 16px;">
        <div style="font-size: 8.5pt; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.05em;">
          SECTION 03 — RECOMMENDED ACTIONS
        </div>
        <h2 style="font-size: 14pt; font-weight: 800; color: #0f172a; margin: 2px 0 0 0;">
          সুন্নাহসম্মত নির্দেশিকা ও চিকিৎসাক্রম
        </h2>
        <p style="font-size: 9pt; color: #64748b; margin: 3px 0 0 0;">
          আপনার মূল্যায়নের তীব্রতার ভিত্তিতে সুন্নাহসম্মত ধারাবাহিক আমল নিম্নে সুনির্দিষ্টভাবে সাজানো হলো:
        </p>
      </div>

      <!-- Numbered Recommendation Cards -->
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px;">
        ${steps.map((step, idx) => `
          <div class="report-card" style="display: flex; align-items: flex-start; gap: 14px; padding: 14px 16px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; box-shadow: 0 1px 4px rgba(15, 23, 42, 0.02);">
            <div style="width: 32px; height: 32px; border-radius: 9999px; background: #047857; color: #ffffff; font-weight: 800; font-size: 11pt; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 2px solid #d1fae5;">
              ${toBnNumber(idx < 9 ? `0${idx + 1}` : idx + 1)}
            </div>
            <div style="flex: 1;">
              <div style="font-size: 9pt; font-weight: 700; color: #b45309; margin-bottom: 2px;">
                করণীয় আমল ধাপ ${toBnNumber(idx + 1)}
              </div>
              <div style="font-size: 9.5pt; font-weight: 500; color: #1e293b; line-height: 1.55;">
                ${step}
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Daily Protocol Box (Morning, Evening, Bedtime) -->
      <div class="report-card" style="padding: 14px 18px; background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 10px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 10px;">
          <span style="width: 6px; height: 6px; border-radius: 9999px; background: #047857;"></span>
          <h3 style="font-size: 10pt; font-weight: 800; color: #065f46; margin: 0;">
            দৈনিক সুন্নাহ আমল রুটিন (Daily Protocol)
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
          <div style="background: #ffffff; padding: 10px 12px; border-radius: 6px; border: 1px solid #d1fae5;">
            <div style="font-size: 9pt; font-weight: 700; color: #065f46;">সকালের আমল (ফজর পর)</div>
            <div style="font-size: 8pt; color: #475569; margin-top: 3px; line-height: 1.45;">
              সকালের মাসনুন জিকির, ৩ কুল পড়ে বুকে ফুঁ ও রুকইয়াহ পানি পান।
            </div>
          </div>

          <div style="background: #ffffff; padding: 10px 12px; border-radius: 6px; border: 1px solid #d1fae5;">
            <div style="font-size: 9pt; font-weight: 700; color: #065f46;">সন্ধ্যার আমল (মাগরিব পর)</div>
            <div style="font-size: 8pt; color: #475569; margin-top: 3px; line-height: 1.45;">
              সন্ধ্যার হেফাজতের দোআসমূহ এবং প্রয়োজনবোধে রুকইয়ার গোসল সম্পন্ন।
            </div>
          </div>

          <div style="background: #ffffff; padding: 10px 12px; border-radius: 6px; border: 1px solid #d1fae5;">
            <div style="font-size: 9pt; font-weight: 700; color: #065f46;">শয়নের আমল (রাতের পূর্বে)</div>
            <div style="font-size: 8pt; color: #475569; margin-top: 3px; line-height: 1.45;">
              ওজু অবস্থায় ঘুমানো, আয়াতুল কুরসি ও বাকারার শেষ দুই আয়াত তিলাওয়াত।
            </div>
          </div>
        </div>
      </div>

      ${renderRunningFooter(data, 3, 4)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// PAGE 4: QURANIC GUIDANCE, OFFICIAL SEAL & DISCLAIMER
// ---------------------------------------------------------------------------
export function renderQuranicPrescriptions(data: AssessmentReportData): string {
  const quranicVerses = data.quranicVerses || [];
  const audioLinks = data.result?.prescription?.audioLinks || [];

  return `
    <div class="report-section">
      ${renderRunningHeader(data, "প্রস্তাবিত কুরআন তিলাওয়াত ও রুকইয়াহ আমল")}

      <!-- Section Title Banner -->
      <div style="margin-bottom: 14px;">
        <div style="font-size: 8.5pt; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.05em;">
          SECTION 04 — QURANIC PRESCRIPTION & VERIFICATION
        </div>
        <h2 style="font-size: 14pt; font-weight: 800; color: #0f172a; margin: 2px 0 0 0;">
          প্রস্তাবিত সূরা ও আয়াতসমূহ (রুকইয়াহ তিলাওয়াত)
        </h2>
        <p style="font-size: 9pt; color: #64748b; margin: 3px 0 0 0;">
          রোগমুক্তি ও সুরক্ষার উদ্দেশ্যে বিশেষ গুরুত্বসহকারে নিয়মিত তিলাওয়াত ও শ্রবণ করুন:
        </p>
      </div>

      <!-- Prescribed Quranic Verses List with Arabic Typography -->
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
        ${quranicVerses.slice(0, 2).map((item) => `
          <div class="report-card" style="padding: 12px 16px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <div>
                <span style="font-size: 10pt; font-weight: 800; color: #0f172a;">${item?.surahName || ""}</span>
                ${item?.reference ? `<span style="font-size: 8pt; color: #64748b; margin-left: 6px;">(${item.reference})</span>` : ""}
              </div>
              <span style="font-size: 8pt; font-weight: 700; padding: 2px 8px; border-radius: 9999px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">
                ${item?.arabicName || ""}
              </span>
            </div>

            <!-- Authentic Arabic Text -->
            <div dir="rtl" class="arabic-text" style="background: #fbfdfc; padding: 8px 12px; border-radius: 6px; border: 1px solid #ecfdf5; margin-bottom: 6px;">
              ${item?.arabicText || ""}
            </div>

            <!-- Bengali Translation & Instruction -->
            <div style="font-size: 8.5pt; color: #475569; margin-bottom: 4px; line-height: 1.45;">
              <strong style="color: #0f172a;">অর্থ:</strong> ${item?.translationBn || ""}
            </div>
            <div style="font-size: 8pt; color: #b45309; font-weight: 600;">
              ✦ আমল নির্দেশ: ${item?.instruction || ""}
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Prescribed Audio Sessions Strip (if any) -->
      ${audioLinks && audioLinks.length > 0 ? `
        <div class="report-card" style="padding: 10px 14px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; margin-bottom: 12px;">
          <div style="font-size: 9pt; font-weight: 700; color: #065f46; margin-bottom: 4px;">
            প্রস্তাবিত রুকইয়াহ অডিও (মনোযোগ সহকারে শুনুন):
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${audioLinks.map((a) => `
              <span style="padding: 3px 8px; border-radius: 4px; background: #ffffff; border: 1px solid #6ee7b7; color: #065f46; font-size: 8pt; font-weight: 600;">
                🎧 ${a?.title || ""}
              </span>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Official Verification Seal & Sign-off Card -->
      <div class="report-card" style="padding: 12px 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 44px; height: 44px; border-radius: 9999px; border: 2px dashed #047857; display: flex; align-items: center; justify-content: center; color: #047857; font-size: 7.5pt; font-weight: 800; text-align: center; line-height: 1.2; padding: 2px; background: #f0fdf4;">
            SAQ<br />VERIFIED
          </div>
          <div>
            <div style="font-size: 9.5pt; font-weight: 800; color: #022c22;">
              শিফা আল কুরআন রুকইয়াহ রিসার্চ বোর্ড
            </div>
            <div style="font-size: 8pt; color: #64748b;">
              কুরআন ও সুন্নাহ ভিত্তিক নির্ভরযোগ্য চিকিৎসা পদ্ধতি
            </div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 9pt; font-weight: 700; color: #0f172a;">অনুমোদিত তত্ত্বাবধায়ক</div>
          <div style="font-size: 8pt; color: #64748b;">সার্টিফাইড শরঈ রাকি টিম</div>
        </div>
      </div>

      <!-- Medical & Shar'iah Disclaimer Box -->
      <div class="report-card" style="padding: 10px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 8pt; color: #64748b; line-height: 1.45; margin-bottom: 12px;">
        <strong style="color: #0f172a;">জরুরি শরঈ ও চিকিৎসা সতর্কতা:</strong> এটি শিফা আল কুরআন প্ল্যাটফর্মের স্বয়ংক্রিয় রুকইয়াহ মূল্যায়ন রিপোর্ট। কুরআন ও সহিহ হাদিসের নির্দেশনার আলোকে প্রস্তুতকৃত। রুকইয়াহ শারইয়াহ হলো আত্মিক রোগমুক্তি ও হিফাযতের সুন্নাহসম্মত মাধ্যম। কোনো গুরুতর বা দীর্ঘস্থায়ী শারীরিক ও মানসিক রোগের ক্ষেত্রে রেজিস্টার্ড চিকিৎসকের চিকিৎসা এবং সুন্নাহ আমল উভয়টি একসাথে চালিয়ে যাওয়া ইসলামের বিধান।
      </div>

      <!-- Official Center Contacts Strip -->
      <div class="report-card" style="padding: 10px 16px; background: #022c22; color: #ffffff; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 9pt;">
        <div>
          <div style="font-weight: 700; color: #d1fae5;">শিফা আল কুরআন সেন্টার</div>
          <div style="font-size: 7.5pt; color: #94a3b8;">ওয়েবসাইট: https://saq.pro.bd</div>
        </div>
        <div style="text-align: center;">
          <div style="font-weight: 700; color: #fde68a;">হটলাইন সাপোর্ট</div>
          <div style="font-size: 8.5pt; font-family: monospace;">09639-000999</div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 700; color: #86efac;">হোয়াটসঅ্যাপ কনসাল্টেশন</div>
          <div style="font-size: 8.5pt; font-family: monospace;">+880 1353-301772</div>
        </div>
      </div>

      ${renderRunningFooter(data, 4, 4)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// MASTER COMPILER
// ---------------------------------------------------------------------------
export function renderFullReportHtml(data: AssessmentReportData): string {
  const styles = renderReportStyles();
  const page1 = renderReportCover(data);
  const page2 = renderAssessmentOverview(data);
  const page3 = renderRecommendedActions(data);
  const page4 = renderQuranicPrescriptions(data);

  return `
    <!DOCTYPE html>
    <html lang="bn">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Shifa Al Quran Assessment Report - ${data.reportId}</title>
        <style>
          ${styles}
        </style>
      </head>
      <body>
        ${page1}
        ${page2}
        ${page3}
        ${page4}
      </body>
    </html>
  `;
}
