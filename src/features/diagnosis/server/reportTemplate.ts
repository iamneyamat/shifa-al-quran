import fs from "fs";
import path from "path";
import { AssessmentReportData } from "../types/report";
import { toBnNumber, formatBengaliDate } from "../utils/formatters";
export { toBnNumber, formatBengaliDate };

// Asset cache
let cachedAssets: {
  hind400Bengali: string;
  hind400Latin: string;
  hind600Bengali: string;
  hind600Latin: string;
  hind700Bengali: string;
  hind700Latin: string;
  amiriArabic: string;
  amiriLatin: string;
  logo: string;
  qrSvg: string;
} | null = null;

// Ayah-end ornament (U+06DD, ۝) renders as a large circle that can overlap
// the neighbouring Arabic words in Amiri / Noto Naskh at PDF sizes. Replace
// it with a plain dot separator only — the ayah words themselves are
// untouched, and no new religious text is introduced.
export function formatArabicText(text: string | undefined | null): string {
  return (text || "").replace(/۝/g, " • ");
}

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
  if (!cachedAssets) {
    cachedAssets = {
      hind400Bengali: getAssetBase64("public/fonts/HindSiliguri-400-bengali.woff2"),
      hind400Latin: getAssetBase64("public/fonts/HindSiliguri-400-latin.woff2"),
      hind600Bengali: getAssetBase64("public/fonts/HindSiliguri-600-bengali.woff2"),
      hind600Latin: getAssetBase64("public/fonts/HindSiliguri-600-latin.woff2"),
      hind700Bengali: getAssetBase64("public/fonts/HindSiliguri-700-bengali.woff2"),
      hind700Latin: getAssetBase64("public/fonts/HindSiliguri-700-latin.woff2"),
      amiriArabic: getAssetBase64("public/fonts/Amiri-400-arabic.woff2"),
      amiriLatin: getAssetBase64("public/fonts/Amiri-400-latin.woff2"),
      logo: getAssetBase64("public/logo.png"),
      qrSvg: getAssetBase64("public/app-qr.svg"),
    };
  }
  return cachedAssets;
}

export function renderReportStyles(): string {
  const assets = getFontsAndLogo();

  return `
    /* ==========================================================================
       FONTS (True dual-subset: Bengali + Latin punctuation/numerals)
       ========================================================================== */
    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${assets.hind400Latin}') format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${assets.hind400Bengali}') format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0951-0952, U+0964-0965, U+0980-09FF, U+1CDA, U+200C-200D, U+20B9, U+25CC;
    }

    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${assets.hind600Latin}') format('woff2');
      font-weight: 600;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${assets.hind600Bengali}') format('woff2');
      font-weight: 600;
      font-style: normal;
      unicode-range: U+0951-0952, U+0964-0965, U+0980-09FF, U+1CDA, U+200C-200D, U+20B9, U+25CC;
    }

    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${assets.hind700Latin}') format('woff2');
      font-weight: 700;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${assets.hind700Bengali}') format('woff2');
      font-weight: 700;
      font-style: normal;
      unicode-range: U+0951-0952, U+0964-0965, U+0980-09FF, U+1CDA, U+200C-200D, U+20B9, U+25CC;
    }

    /* Fallback aliases to protect against browser synthetic bold distortion */
    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${assets.hind700Bengali}') format('woff2');
      font-weight: 800;
      font-style: normal;
    }
    @font-face {
      font-family: 'Hind Siliguri';
      src: url('data:font/woff2;base64,${assets.hind700Bengali}') format('woff2');
      font-weight: 900;
      font-style: normal;
    }

    /* Amiri Quranic Arabic Font */
    @font-face {
      font-family: 'Amiri';
      src: url('data:font/woff2;base64,${assets.amiriLatin}') format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: 'Amiri';
      src: url('data:font/woff2;base64,${assets.amiriArabic}') format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
    }

    /* ==========================================================================
       PAGE SETUP & EXACT A4 SIZING
       ========================================================================== */
    @page {
      size: A4 portrait;
      margin: 12mm 14mm 12mm 14mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      font-synthesis: none !important;
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: antialiased;
    }

    body {
      font-family: 'Hind Siliguri', system-ui, -apple-system, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 9.5pt;
      line-height: 1.5;
    }

    /* v2: one section per printed page, but height follows content.
       Never force a fixed height and never hide overflow — both clipped
       real content (audio pills, verse cards) and left blank half-pages. */
    .report-section {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      page-break-after: always;
      break-after: page;
      position: relative;
      background: #ffffff;
    }

    .report-section:last-child {
      page-break-after: auto;
      break-after: auto;
    }

    .report-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .report-card {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .running-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 7px;
      margin-bottom: 12px;
      border-bottom: 1.5px solid #047857;
      flex-shrink: 0;
    }

    .running-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 8px;
      margin-top: 12px;
      border-top: 1px solid #e2e8f0;
      font-size: 8pt;
      color: #64748b;
      flex-shrink: 0;
    }

    .arabic-text {
      font-family: 'Amiri', serif;
      direction: rtl;
      text-align: right;
      line-height: 2.0;
      font-size: 12pt;
      color: #064e3b;
    }

    /* v2 section heading: light emerald tint + green side bar (print-safe) */
    .v2-h2 {
      font-size: 12.5pt;
      font-weight: 700;
      color: #022c22;
      margin: 8px 0 4px 0;
      background: #f0fdf4;
      border-right: 4px solid #047857;
      padding: 4px 10px;
      border-radius: 4px;
    }
    .v2-h2 .no { color: #047857; }

    /* v2 pills/badges: padding-based, never a fixed height + translateY
       (that combination clipped Bengali descenders in screenshots). */
    .v2-pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 8.5pt;
      font-weight: 700;
      line-height: 1.4;
    }

    /* ==========================================================================
       SYSTEMATIC PDF VERTICAL CENTERING & TYPOGRAPHY SYSTEM
       Compensates for Bengali / Arabic font ascent-descent metric imbalance
       ========================================================================== */
    .pdf-pill-header {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #ecfdf5;
      border: 1.5px solid #a7f3d0;
      color: #065f46;
      font-size: 8.5pt;
      font-weight: 700;
      height: 25px;
      padding: 0 13px;
      border-radius: 9999px;
      line-height: 1;
      box-sizing: border-box;
      vertical-align: middle;
    }
    .pdf-pill-header > span {
      display: block;
      line-height: 1;
      transform: translateY(-0.75px);
    }

    .pdf-pill-priority {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;
      height: 24px;
      border-radius: 9999px;
      font-size: 8.5pt;
      font-weight: 700;
      line-height: 1;
      box-sizing: border-box;
      margin-bottom: 8px;
    }
    .pdf-pill-priority > span {
      display: block;
      line-height: 1;
      transform: translateY(-0.75px);
    }

    .pdf-tag-auto {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 7.5pt;
      color: #047857;
      font-weight: 600;
      background: #ecfdf5;
      height: 20px;
      padding: 0 8px;
      border-radius: 4px;
      border: 1px solid #a7f3d0;
      line-height: 1;
      box-sizing: border-box;
    }
    .pdf-tag-auto > span {
      display: block;
      line-height: 1;
      transform: translateY(-0.5px);
    }

    .pdf-badge-category {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 8pt;
      font-weight: 700;
      height: 22px;
      padding: 0 10px;
      border-radius: 9999px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      line-height: 1;
      box-sizing: border-box;
    }
    .pdf-badge-category > span {
      display: block;
      line-height: 1;
      transform: translateY(-0.75px);
    }

    .pdf-badge-answer {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 22px;
      padding: 0 10px;
      border-radius: 9999px;
      font-size: 7.5pt;
      font-weight: 700;
      line-height: 1;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .pdf-badge-answer > span {
      display: block;
      line-height: 1;
      transform: translateY(-0.75px);
    }

    .pdf-circle-question {
      width: 22px;
      height: 22px;
      min-width: 22px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      flex-shrink: 0;
      color: #ffffff;
      font-size: 8pt;
      font-weight: 700;
      box-sizing: border-box;
    }
    .pdf-circle-question > span {
      display: block;
      line-height: 1;
      transform: translateY(-1.2px);
    }

    .pdf-circle-step {
      width: 28px;
      height: 28px;
      min-width: 28px;
      border-radius: 9999px;
      background: #047857;
      color: #ffffff;
      font-weight: 700;
      font-size: 10pt;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 2px solid #d1fae5;
      line-height: 1;
      box-sizing: border-box;
      margin-top: 1px;
    }
    .pdf-circle-step > span {
      display: block;
      line-height: 1;
      transform: translateY(-1.2px);
    }

    .pdf-badge-arabic {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: 'Amiri', serif;
      font-size: 8.5pt;
      font-weight: 700;
      height: 22px;
      padding: 0 10px;
      border-radius: 9999px;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      line-height: 1;
      box-sizing: border-box;
      direction: rtl;
    }
    .pdf-badge-arabic > span {
      display: block;
      line-height: 1;
      transform: translateY(-1px);
    }

    .pdf-audio-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      height: 22px;
      padding: 0 8px;
      border-radius: 4px;
      background: #ffffff;
      border: 1px solid #6ee7b7;
      color: #065f46;
      font-size: 7.5pt;
      font-weight: 600;
      line-height: 1;
      box-sizing: border-box;
    }
    .pdf-audio-pill > span {
      display: inline-block;
      line-height: 1;
      transform: translateY(-0.5px);
    }

    .pdf-seal {
      width: 42px;
      height: 42px;
      min-width: 42px;
      border-radius: 9999px;
      border: 2px dashed #047857;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #047857;
      font-size: 7pt;
      font-weight: 700;
      text-align: center;
      line-height: 1.15;
      padding: 0;
      background: #f0fdf4;
      box-sizing: border-box;
      flex-shrink: 0;
    }
    .pdf-seal > span {
      display: block;
      line-height: 1.15;
      transform: translateY(-0.75px);
    }
  `;
}

export function renderRunningHeader(data: AssessmentReportData, pageTitle: string): string {
  const { logo } = getFontsAndLogo();
  return `
    <div class="running-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        ${logo ? `<img src="data:image/png;base64,${logo}" alt="Logo" style="width: 22px; height: 22px; object-fit: contain;" />` : ""}
        <div style="display: flex; align-items: center;">
          <span style="font-weight: 700; font-size: 9.5pt; color: #022c22; line-height: 1;">শিফা আল কুরআন</span>
          <span style="color: #cbd5e1; margin: 0 6px; line-height: 1;">|</span>
          <span style="font-size: 8.5pt; color: #047857; font-weight: 600; line-height: 1;">${pageTitle}</span>
        </div>
      </div>
      <div style="font-size: 8pt; color: #64748b; font-family: monospace; font-weight: 600; line-height: 1;">
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
  const category = data.category || { title: "রুকইয়া মূল্যায়ন", questions: [] };
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
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return `
    <div class="report-section">
      <div class="report-content">
        <!-- Master Brand Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 2px solid #047857;">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${logo ? `
              <img src="data:image/png;base64,${logo}" alt="Logo" style="width: 48px; height: 48px; object-fit: contain; border-radius: 8px; border: 1.5px solid #d1fae5; padding: 2px;" />
            ` : ""}
            <div>
              <h1 style="font-size: 18pt; font-weight: 700; color: #022c22; margin: 0; line-height: 1.15;">
                শিফা আল কুরআন
              </h1>
              <div style="font-size: 9pt; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">
                Islamic Ruqyah Shar'iah Center
              </div>
              <div style="font-size: 8pt; color: #64748b; margin-top: 2px;">
                কুরআন ও সুন্নাহ ভিত্তিক আত্মিক ও মানসিক রোগমুক্তি সেবা
              </div>
            </div>
          </div>

          <div style="text-align: right;">
            <div class="pdf-pill-header">
              <span>অফিসিয়াল অ্যাসেসমেন্ট রিপোর্ট</span>
            </div>
            <div style="font-size: 8pt; color: #64748b; font-family: monospace; font-weight: 600; margin-top: 4px; line-height: 1;">
              REF: #${reportId}
            </div>
          </div>
        </div>

        <!-- Gold Accent Bar -->
        <div style="height: 2px; background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37); width: 100%; margin-top: 2px; margin-bottom: 14px;"></div>

        <!-- Assessment Metadata Grid -->
        <div class="report-card" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 9px 14px; margin-bottom: 14px;">
          <div>
            <div style="font-size: 7.5pt; font-weight: 700; color: #64748b; text-transform: uppercase;">রিপোর্ট রেফারেন্স</div>
            <div style="font-size: 9pt; font-weight: 700; color: #0f172a; margin-top: 2px;">#${reportId}</div>
          </div>
          <div>
            <div style="font-size: 7.5pt; font-weight: 700; color: #64748b; text-transform: uppercase;">অ্যাসেসমেন্ট তারিখ</div>
            <div style="font-size: 9pt; font-weight: 700; color: #0f172a; margin-top: 2px;">${reportDate}</div>
          </div>
          <div>
            <div style="font-size: 7.5pt; font-weight: 700; color: #64748b; text-transform: uppercase;">মূল্যায়ন ক্যাটাগরি</div>
            <div style="font-size: 9pt; font-weight: 700; color: #047857; margin-top: 2px;">${category.title}</div>
          </div>
          <div>
            <div style="font-size: 7.5pt; font-weight: 700; color: #64748b; text-transform: uppercase;">ভেরিফিকেশন স্ট্যাটাস</div>
            <div style="font-size: 9pt; font-weight: 700; color: #0f172a; margin-top: 2px; display: flex; align-items: center; gap: 5px; line-height: 1.2;">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background: #10b981; flex-shrink: 0;"></span>
              <span>যাচাইকৃত (Verified)</span>
            </div>
          </div>
        </div>

        <!-- Hero Score Component (The Centerpiece of Page 1) -->
        <div class="report-card" style="display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 18px 22px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03); margin-bottom: 14px;">
          <!-- Circular Progress Meter -->
          <div style="text-align: center; flex-shrink: 0;">
            <div style="position: relative; width: 124px; height: 124px; margin: 0 auto;">
              <svg width="124" height="124" viewBox="0 0 124 124" style="transform: rotate(-90deg);">
                <circle cx="62" cy="62" r="${radius}" fill="none" stroke="#f1f5f9" stroke-width="9" />
                <circle cx="62" cy="62" r="${radius}" fill="none" stroke="${themeColor.primary}" stroke-width="9" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" />
              </svg>
              <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size: 22pt; font-weight: 700; color: #0f172a; line-height: 1; font-family: monospace;">
                  ${percentage}%
                </span>
                <span style="font-size: 8pt; font-weight: 700; color: #64748b; margin-top: 3px;">
                  স্কোর: ${toBnNumber(totalScore)} / ${toBnNumber(maxScore)}
                </span>
              </div>
            </div>
            <div style="font-size: 8.5pt; font-weight: 700; color: #047857; margin-top: 5px;">
              সামগ্রিক প্রভাব সূচক
            </div>
          </div>

          <!-- Outcome Details & Severity Meter -->
          <div style="flex: 1;">
            <div style="font-size: 8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">
              নির্ণীত ফলাফল ও ঝুঁকির স্তর
            </div>
            <h2 style="font-size: 14.5pt; font-weight: 700; color: #0f172a; margin: 2px 0 6px 0; line-height: 1.25;">
              ${levelTitle}
            </h2>

            <div class="pdf-pill-priority" style="background: ${themeColor.bg}; color: ${themeColor.text}; border: 1px solid ${themeColor.border};">
              <span>অগ্রাধিকার: ${percentage >= 65 ? "জরুরি প্রত্যক্ষ পর্যবেক্ষণ কাম্য" : percentage >= 30 ? "নিয়মিত সুন্নাহ রুকইয়া প্রয়োজনীয়" : "সাধারণ মাসনুন আমল যথেষ্ট"}</span>
            </div>

            <!-- 3-Segment Severity Spectrum Meter -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 7.5pt; color: #64748b; margin-bottom: 3px; font-weight: 600;">
                <span>স্বাভাবিক (০-৩০%)</span>
                <span>মাঝারি (৩১-৬৫%)</span>
                <span>উচ্চ ঝুঁকি (৬৬-১০০%)</span>
              </div>
              <div style="display: flex; height: 6px; border-radius: 9999px; overflow: hidden; gap: 2px; background: #f1f5f9;">
                <div style="flex: 30; background: #10b981; opacity: ${percentage <= 30 ? 1 : 0.25};"></div>
                <div style="flex: 35; background: #f59e0b; opacity: ${percentage > 30 && percentage <= 65 ? 1 : 0.25};"></div>
                <div style="flex: 35; background: #ef4444; opacity: ${percentage > 65 ? 1 : 0.25};"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Executive Diagnostic Summary Card -->
        <div class="report-card" style="padding: 12px 16px; background: #fcfbf9; border: 1px solid #e4ded3; border-left: 4px solid #b45309; border-radius: 8px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="width: 6px; height: 6px; border-radius: 9999px; background: #b45309;"></span>
            <h3 style="font-size: 9.5pt; font-weight: 700; color: #0f172a; margin: 0; text-transform: uppercase;">
              নির্বাহী সারসংক্ষেপ ও ডায়াগনোসিস বিশ্লেষণ
            </h3>
          </div>
          <p style="font-size: 9pt; color: #334155; line-height: 1.55; margin: 0;">
            ${prescription.summary}
          </p>
        </div>

        <!-- Key Evaluation Metrics (3 Stats Cards) -->
        <div class="report-card" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 9px; margin-bottom: 14px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
            <div style="font-size: 7.5pt; color: #64748b; font-weight: 600;">মূল্যায়িত প্রশ্নসংখ্যা</div>
            <div style="font-size: 11.5pt; font-weight: 700; color: #0f172a; margin-top: 2px;">
              ${toBnNumber((category.questions || []).length)} টি প্রশ্ন
            </div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
            <div style="font-size: 7.5pt; color: #64748b; font-weight: 600;">চিহ্নিত উপসর্গের তীব্রতা</div>
            <div style="font-size: 11.5pt; font-weight: 700; color: ${themeColor.primary}; margin-top: 2px;">
              ${(levelTitle || "স্বাভাবিক").split(" ")[0] || "স্বাভাবিক"}
            </div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
            <div style="font-size: 7.5pt; color: #64748b; font-weight: 600;">নির্ধারিত সুন্নাহ আমল</div>
            <div style="font-size: 11.5pt; font-weight: 700; color: #047857; margin-top: 2px;">
              ${toBnNumber((prescription?.steps || []).length)} টি ধাপ
            </div>
          </div>
        </div>

        <!-- Patient Guidance & Assessment Scope Card (Balances Page 1 vertically) -->
        <div class="report-card" style="padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 6px; height: 6px; border-radius: 9999px; background: #047857;"></span>
              <span style="font-size: 9pt; font-weight: 700; color: #0f172a;">মূল্যায়ন পদ্ধতি ও প্রতিবেদন নির্দেশিকা</span>
            </div>
            <span class="pdf-tag-auto">
              <span>স্বয়ংক্রিয় সিস্টেম জেনারেটেড</span>
            </span>
          </div>
          <p style="font-size: 8.5pt; color: #475569; line-height: 1.5; margin: 0;">
            এই প্রতিবেদনটি ব্যবহারকারীর প্রদত্ত লক্ষণসমূহের ভিত্তিতে কুরআন ও সুন্নাহসম্মত রুকইয়া শারইয়ার মূলনীতি অনুসারে প্রস্তুত করা হয়েছে। পরবর্তী পৃষ্ঠাগুলোতে প্রতিটি লক্ষণের বিশদ পর্যালোচনা, সুনির্দিষ্ট আমল ও কুরআনিক আয়াতের প্রেসক্রিপশন প্রদান করা হয়েছে।
          </p>
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
  const category = data.category || { title: "রুকইয়া মূল্যায়ন", subtitle: "", badge: "যাচাইকৃত", description: "" };
  const evaluatedQuestions = data.evaluatedQuestions || [];

  return `
    <div class="report-section">
      <div class="report-content">
        ${renderRunningHeader(data, "অ্যাসেসমেন্ট বিশ্লেষণ ও বিশদ লক্ষণ পর্যালোচনা")}

        <!-- Section Title Banner -->
        <div style="margin-bottom: 12px;">
          <div style="font-size: 8pt; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.05em;">
            SECTION 02 — OVERVIEW & EVALUATION
          </div>
          <h2 style="font-size: 13.5pt; font-weight: 700; color: #0f172a; margin: 2px 0 0 0;">
            অ্যাসেসমেন্ট বিশ্লেষণ ও প্রশ্নোত্তর পর্যালোচনা
          </h2>
        </div>

        <!-- Category Context Card -->
        <div class="report-card" style="padding: 10px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
            <div style="font-size: 10pt; font-weight: 700; color: #0f172a;">
              ${category.title || "রুকইয়া মূল্যায়ন"}${category.subtitle ? ` (${category.subtitle})` : ""}
            </div>
            <span class="pdf-badge-category">
              <span>${category.badge || "যাচাইকৃত"}</span>
            </span>
          </div>
          <p style="font-size: 8.5pt; color: #475569; margin: 0; line-height: 1.45;">
            ${category.description || ""}
          </p>
        </div>

        <!-- Questionnaire Results Table / Cards -->
        <div class="report-card" style="margin-bottom: 12px;">
          <h3 style="font-size: 9.5pt; font-weight: 700; color: #0f172a; margin: 0 0 7px 0; display: flex; align-items: center; gap: 6px;">
            <span style="width: 6px; height: 6px; border-radius: 9999px; background: #047857;"></span>
            যাচাইকৃত প্রশ্নাবলি ও ব্যবহারকারীর উত্তর:
          </h3>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            ${evaluatedQuestions.map((item, idx) => {
              const isAffirmative = item?.answerWeight === 2;
              const isSometimes = item?.answerWeight === 1;

              const badgeBg = isAffirmative ? "#fee2e2" : isSometimes ? "#fef3c7" : "#f1f5f9";
              const badgeColor = isAffirmative ? "#991b1b" : isSometimes ? "#92400e" : "#475569";
              const badgeBorder = isAffirmative ? "#fca5a5" : isSometimes ? "#fde68a" : "#cbd5e1";
              const cardBg = isAffirmative ? "#fff1f2" : isSometimes ? "#fffbeb" : "#ffffff";
              const cardBorder = isAffirmative ? "#fecdd3" : isSometimes ? "#fef3c7" : "#e2e8f0";

              return `
                <div class="report-card" style="display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 6px 10px; background: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 6px; font-size: 8.5pt;">
                  <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <span class="pdf-circle-question" style="background: ${isAffirmative ? "#e11d48" : isSometimes ? "#d97706" : "#64748b"};">
                      <span>${toBnNumber(idx + 1)}</span>
                    </span>
                    <span style="color: #1e293b; line-height: 1.4; font-weight: 500;">
                      ${item?.question?.text || (typeof item?.question === "string" ? item.question : "")}
                    </span>
                  </div>
                  <span class="pdf-badge-answer" style="background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder};">
                    <span>${item?.answerLabel || "উত্তর দেওয়া হয়েছে"}</span>
                  </span>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Islamic Clinical Guidelines Card -->
        <div class="report-card" style="padding: 10px 14px; background: #fcfbf9; border: 1px solid #e4ded3; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="width: 6px; height: 6px; border-radius: 9999px; background: #b45309;"></span>
            <span style="font-size: 9pt; font-weight: 700; color: #022c22;">
              শরঈ দৃষ্টিকোণ ও সুন্নাহসম্মত আরোগ্যের মূলনীতি
            </span>
          </div>
          <ul style="margin: 0; padding-left: 16px; font-size: 8pt; color: #334155; line-height: 1.5;">
            <li><strong>আরোগ্য কেবল আল্লাহর হাতে:</strong> রুকইয়া কোনো জাদুকরি চিকিৎসা নয়, বরং আল্লাহর কালামের মাধ্যমে আরোগ্যের সুন্নাহসম্মত উপায়।</li>
            <li><strong>শিরক ও বিদআতের বর্জন:</strong> তাবিজে কোনো অজ্ঞাত সংখ্যা, প্রতীক বা অস্পষ্ট বাক্য থাকলে তা বর্জনীয়। সুন্নাহসম্মত রুকইয়া সম্পূর্ণ স্বচ্ছ।</li>
            <li><strong>আত্মিক পরিচ্ছন্নতা:</strong> পাঁচ ওয়াক্ত সালাত, হালাল উপার্জন ও নিয়মিত জিকির সুস্থতার ভিত্তি স্থাপন করে।</li>
          </ul>
        </div>
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
      <div class="report-content">
        ${renderRunningHeader(data, "সুন্নাহসম্মত চিকিৎসাক্রম ও করণীয় আমলসমূহ")}

        <!-- Section Title Banner -->
        <div style="margin-bottom: 12px;">
          <div style="font-size: 8pt; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.05em;">
            SECTION 03 — RECOMMENDED ACTIONS
          </div>
          <h2 style="font-size: 13.5pt; font-weight: 700; color: #0f172a; margin: 2px 0 0 0;">
            সুন্নাহসম্মত নির্দেশিকা ও চিকিৎসাক্রম
          </h2>
          <p style="font-size: 8.5pt; color: #64748b; margin: 3px 0 0 0;">
            আপনার মূল্যায়নের তীব্রতার ভিত্তিতে সুন্নাহসম্মত ধারাবাহিক আমল নিম্নে সুনির্দিষ্টভাবে সাজানো হলো:
          </p>
        </div>

        <!-- Numbered Recommendation Cards -->
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
          ${steps.map((step, idx) => `
            <div class="report-card" style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 14px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02);">
              <div class="pdf-circle-step">
                <span>${toBnNumber(idx < 9 ? `0${idx + 1}` : idx + 1)}</span>
              </div>
              <div style="flex: 1;">
                <div style="font-size: 8.5pt; font-weight: 700; color: #b45309; margin-bottom: 2px;">
                  করণীয় আমল ধাপ ${toBnNumber(idx + 1)}
                </div>
                <div style="font-size: 9pt; font-weight: 500; color: #1e293b; line-height: 1.5;">
                  ${step}
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Daily Protocol Box (Morning, Evening, Bedtime) -->
        <div class="report-card" style="padding: 12px 14px; background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 8px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
            <span style="width: 6px; height: 6px; border-radius: 9999px; background: #047857;"></span>
            <h3 style="font-size: 9.5pt; font-weight: 700; color: #065f46; margin: 0;">
              দৈনিক সুন্নাহ আমল রুটিন (Daily Protocol)
            </h3>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
            <div style="background: #ffffff; padding: 9px 11px; border-radius: 6px; border: 1px solid #d1fae5;">
              <div style="font-size: 8.5pt; font-weight: 700; color: #065f46;">সকালের আমল (ফজর পর)</div>
              <div style="font-size: 7.5pt; color: #475569; margin-top: 3px; line-height: 1.45;">
                সকালের মাসনুন জিকির, ৩ কুল পড়ে বুকে ফুঁ ও রুকইয়ার পানি পান।
              </div>
            </div>

            <div style="background: #ffffff; padding: 9px 11px; border-radius: 6px; border: 1px solid #d1fae5;">
              <div style="font-size: 8.5pt; font-weight: 700; color: #065f46;">সন্ধ্যার আমল (মাগরিব পর)</div>
              <div style="font-size: 7.5pt; color: #475569; margin-top: 3px; line-height: 1.45;">
                সন্ধ্যার হেফাজতের দোয়াসমূহ এবং প্রয়োজনবোধে রুকইয়ার গোসল সম্পন্ন।
              </div>
            </div>

            <div style="background: #ffffff; padding: 9px 11px; border-radius: 6px; border: 1px solid #d1fae5;">
              <div style="font-size: 8.5pt; font-weight: 700; color: #065f46;">শয়নের আমল (রাতের পূর্বে)</div>
              <div style="font-size: 7.5pt; color: #475569; margin-top: 3px; line-height: 1.45;">
                ওজু অবস্থায় ঘুমানো, আয়াতুল কুরসি ও বাকারার শেষ দুই আয়াত তিলাওয়াত।
              </div>
            </div>
          </div>
        </div>

        <!-- Essential Sunnah Adab & Precautions Card (Fills Page 3 gracefully) -->
        <div class="report-card" style="padding: 12px 14px; background: #fcfbf9; border: 1px solid #e4ded3; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <span style="width: 6px; height: 6px; border-radius: 9999px; background: #b45309;"></span>
            <span style="font-size: 9pt; font-weight: 700; color: #022c22;">সুন্নাহ আমল পালনের আবশ্যকীয় শর্ত ও শিষ্টাচার</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 8pt; color: #334155; line-height: 1.45;">
            <div style="background: #ffffff; padding: 7px 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
              <strong style="color: #047857;">১. ইখলাস ও দৃঢ় একিন:</strong> আরোগ্য একমাত্র আল্লাহর হাতে—এই বিশ্বাস রেখে নিয়মিত আমল চালিয়ে যাওয়া।
            </div>
            <div style="background: #ffffff; padding: 7px 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
              <strong style="color: #047857;">২. ধারাবাহিকতা বজায় রাখা:</strong> চিকিৎসাক্রমের মেয়াদ অনুযায়ী প্রতিদিন নিরবচ্ছিন্ন আমল সম্পন্ন করা।
            </div>
            <div style="background: #ffffff; padding: 7px 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
              <strong style="color: #047857;">৩. গুনাহ ও অপসংস্কৃতি বর্জন:</strong> ঘরে গান-বাজনা, প্রাণীর ছবি এবং যাবতীয় অনৈসলামিক কার্যকলাপ বন্ধ রাখা।
            </div>
            <div style="background: #ffffff; padding: 7px 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
              <strong style="color: #047857;">৪. হালাল রুজি ও পবিত্রতা:</strong> সর্বদা হালাল আহার গ্রহণ করা এবং যথাসম্ভব ওজু ও পবিত্র অবস্থায় থাকা।
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
      <div class="report-content">
        ${renderRunningHeader(data, "প্রস্তাবিত কুরআন তিলাওয়াত ও রুকইয়া আমল")}

        <!-- Section Title Banner -->
        <div style="margin-bottom: 10px;">
          <div style="font-size: 8pt; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.05em;">
            SECTION 04 — QURANIC PRESCRIPTION & VERIFICATION
          </div>
          <h2 style="font-size: 13.5pt; font-weight: 700; color: #0f172a; margin: 2px 0 0 0;">
            প্রস্তাবিত সূরা ও আয়াতসমূহ (রুকইয়া তিলাওয়াত)
          </h2>
          <p style="font-size: 8.5pt; color: #64748b; margin: 2px 0 0 0;">
            রোগমুক্তি ও সুরক্ষার উদ্দেশ্যে বিশেষ গুরুত্বসহকারে নিয়মিত তিলাওয়াত ও শ্রবণ করুন:
          </p>
        </div>

        <!-- Prescribed Quranic Verses List with Arabic Typography -->
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px;">
          ${quranicVerses.slice(0, 2).map((item) => `
            <div class="report-card" style="padding: 10px 14px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                <div>
                  <span style="font-size: 9.5pt; font-weight: 700; color: #0f172a;">${item?.surahName || ""}</span>
                  ${item?.reference ? `<span style="font-size: 7.5pt; color: #64748b; margin-left: 6px;">(${item.reference})</span>` : ""}
                </div>
                <span class="pdf-badge-arabic">
                  <span>${item?.arabicName || ""}</span>
                </span>
              </div>

              <!-- Authentic Arabic Text -->
              <div dir="rtl" class="arabic-text" style="background: #fbfdfc; padding: 6px 10px; border-radius: 6px; border: 1px solid #ecfdf5; margin-bottom: 4px;">
                ${item?.arabicText || ""}
              </div>

              <!-- Bengali Translation & Instruction -->
              <div style="font-size: 8pt; color: #475569; margin-bottom: 3px; line-height: 1.4;">
                <strong style="color: #0f172a;">অর্থ:</strong> ${item?.translationBn || ""}
              </div>
              <div style="font-size: 7.5pt; color: #b45309; font-weight: 600;">
                ✦ আমল নির্দেশ: ${item?.instruction || ""}
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Prescribed Audio Sessions Strip (if any) -->
        ${audioLinks && audioLinks.length > 0 ? `
          <div class="report-card" style="padding: 8px 12px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; margin-bottom: 8px;">
            <div style="font-size: 8.5pt; font-weight: 700; color: #065f46; margin-bottom: 3px;">
              প্রস্তাবিত রুকইয়া অডিও (মনোযোগ সহকারে শুনুন):
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 5px;">
              ${audioLinks.map((a) => `
                <span class="pdf-audio-pill">
                  <span>🎧</span>
                  <span>${a?.title || ""}</span>
                </span>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Official Verification Seal & Sign-off Card -->
        <div class="report-card" style="padding: 9px 14px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="pdf-seal">
              <span>SAQ<br />VERIFIED</span>
            </div>
            <div>
              <div style="font-size: 9pt; font-weight: 700; color: #022c22;">
                শিফা আল কুরআন রুকইয়া রিসার্চ বোর্ড
              </div>
              <div style="font-size: 7.5pt; color: #64748b;">
                কুরআন ও সুন্নাহ ভিত্তিক নির্ভরযোগ্য চিকিৎসা পদ্ধতি
              </div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 8.5pt; font-weight: 700; color: #0f172a;">অনুমোদিত তত্ত্বাবধায়ক</div>
            <div style="font-size: 7.5pt; color: #64748b;">সার্টিফাইড শরঈ রাকি টিম</div>
          </div>
        </div>

        <!-- Medical & Shar'iah Disclaimer Box -->
        <div class="report-card" style="padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 7.5pt; color: #64748b; line-height: 1.4; margin-bottom: 8px;">
          <strong style="color: #0f172a;">জরুরি শরঈ ও চিকিৎসা সতর্কতা:</strong> এটি শিফা আল কুরআন প্ল্যাটফর্মের স্বয়ংক্রিয় রুকইয়া মূল্যায়ন রিপোর্ট। কুরআন ও সহিহ হাদিসের নির্দেশনার আলোকে প্রস্তুতকৃত। রুকইয়া শারইয়া হলো আত্মিক রোগমুক্তি ও হিফাযতের সুন্নাহসম্মত মাধ্যম। কোনো গুরুতর বা দীর্ঘস্থায়ী শারীরিক ও মানসিক রোগের ক্ষেত্রে রেজিস্টার্ড চিকিৎসকের চিকিৎসা এবং সুন্নাহ আমল উভয়টি একসাথে চালিয়ে যাওয়া ইসলামের বিধান।
        </div>

        <!-- Official Center Contacts Strip -->
        <div class="report-card" style="padding: 9px 14px; background: #022c22; color: #ffffff; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 8.5pt;">
          <div>
            <div style="font-weight: 700; color: #d1fae5;">শিফা আল কুরআন সেন্টার</div>
            <div style="font-size: 7pt; color: #94a3b8;">ওয়েবসাইট: https://saq.pro.bd</div>
          </div>
          <div style="text-align: center;">
            <div style="font-weight: 700; color: #fde68a;">হটলাইন সাপোর্ট</div>
            <div style="font-size: 8pt; font-family: monospace;">09639-000999</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 700; color: #86efac;">হোয়াটসঅ্যাপ কনসাল্টেশন</div>
            <div style="font-size: 8pt; font-family: monospace;">+880 1353-301772</div>
          </div>
        </div>
      </div>

      ${renderRunningFooter(data, 4, 4)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// v2 REPORT (approved 2026-10-26): 3 printed pages, tinted headings,
// coloured step cards, no fixed-height sections, no clipped pills,
// no "Verified / certified" claims, all prescribed surahs shown.
// Page 1: result + steps + routine + conditions + app box.
// Page 2: only the symptoms the user actually reported + Shar'i principles.
// Page 3: full-text surahs + abbreviated-surah checklist + disclaimer.
// The older 4-page functions above are kept for reference only and are
// no longer used by renderFullReportHtml.
// ---------------------------------------------------------------------------
function renderAppBox(): string {
  const { qrSvg } = getFontsAndLogo();
  const qrImg = qrSvg
    ? `<img src="data:image/svg+xml;base64,${qrSvg}" alt="Shifa Al Quran app QR code" style="width: 64px; height: 64px; min-width: 64px; background: #ffffff; padding: 3px; border-radius: 6px; border: 1px solid #e2e8f0;" />`
    : "";
  return `
    <div style="display: flex; gap: 12px; align-items: center; background: #fffbeb; border: 1.5px solid #f59e0b; border-radius: 10px; padding: 8px 12px; margin-top: 10px;">
      ${qrImg}
      <div>
        <div style="font-size: 11pt; font-weight: 700; color: #022c22;">শিফা আল কুরআন অ্যাপ — আমল হাতের মুঠোয়</div>
        <div style="font-size: 9pt; color: #475569; margin: 2px 0; line-height: 1.45;">
          দৈনিক আমল, রুকইয়া নির্দেশিকা, অডিও শোনা, তাসবিহ ও অ্যাপয়েন্টমেন্ট — সব এক অ্যাপে, ফ্রি। ক্যামেরা দিয়ে QR স্ক্যান করুন।
        </div>
        <div style="font-family: monospace; font-size: 7pt; color: #64748b; word-break: break-all;">
          play.google.com/store/apps/details?id=com.iamneyamat.shifaalquranapp
        </div>
      </div>
    </div>
  `;
}

export function renderV2Page1(data: AssessmentReportData): string {
  const { logo } = getFontsAndLogo();
  const category = data.category || { title: "রুকইয়া মূল্যায়ন", questions: [] };
  const result = data.result || {
    totalScore: 0,
    maxScore: 20,
    percentage: 0,
    level: "low",
    levelTitle: "স্বাভাবিক স্তর",
    prescription: { summary: "", steps: [], recommendedSurahs: [] },
  };
  const reportId = data.reportId || "SAQ-GEN";
  const reportDate = data.reportDate || formatBengaliDate();
  const totalScore = result.totalScore ?? 0;
  const maxScore = result.maxScore ?? 20;
  const percentage = result.percentage ?? 0;
  const level = result.level || "low";
  const levelTitle = result.levelTitle || "স্বাভাবিক স্তর";
  const prescription = result.prescription || { summary: "", steps: [], recommendedSurahs: [] };
  const steps = prescription.steps || [];
  const isHigh = level === "high";
  const isMedium = level === "medium";
  const themeColor = isHigh
    ? { primary: "#dc2626", bg: "#fef2f2", border: "#fecaca", text: "#991b1b" }
    : isMedium
    ? { primary: "#d97706", bg: "#fffbeb", border: "#fde68a", text: "#92400e" }
    : { primary: "#047857", bg: "#ecfdf5", border: "#a7f3d0", text: "#065f46" };
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const stepBgs = ["#f0fdf4", "#fffbeb", "#eff6ff"];
  const priorityText =
    percentage >= 65
      ? "জরুরি প্রত্যক্ষ পর্যবেক্ষণ কাম্য"
      : percentage >= 30
      ? "নিয়মিত সুন্নাহ রুকইয়া প্রয়োজনীয়"
      : "সাধারণ মাসনুন আমল যথেষ্ট";

  return `
    <div class="report-section">
      <div class="report-content">
        <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 2px solid #047857;">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${logo ? `<img src="data:image/png;base64,${logo}" alt="Logo" style="width: 48px; height: 48px; object-fit: contain; border-radius: 8px; border: 1.5px solid #d1fae5; padding: 2px;" />` : ""}
            <div>
              <h1 style="font-size: 18pt; font-weight: 700; color: #022c22; margin: 0; line-height: 1.15;">শিফা আল কুরআন</h1>
              <div style="font-size: 9pt; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px;">Islamic Ruqyah Shar'iah Center</div>
              <div style="font-size: 8pt; color: #64748b; margin-top: 2px;">কুরআন ও সুন্নাহ ভিত্তিক আত্মিক ও মানসিক রোগমুক্তি সেবা</div>
            </div>
          </div>
          <div style="text-align: right;">
            <span class="v2-pill" style="background: #ecfdf5; border: 1.5px solid #a7f3d0; color: #065f46;">সেলফ অ্যাসেসমেন্ট রিপোর্ট</span>
            <div style="font-size: 8pt; color: #64748b; font-family: monospace; font-weight: 600; margin-top: 4px; word-break: break-all;">REF: #${reportId}</div>
          </div>
        </div>
        <div style="height: 2px; background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37); width: 100%; margin-top: 2px; margin-bottom: 12px;"></div>

        <div class="report-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 12px; margin-bottom: 10px; font-size: 8.5pt; color: #475569;">
          <strong style="color: #0f172a;">তারিখ:</strong> ${reportDate} &nbsp;•&nbsp; <strong style="color: #0f172a;">ক্যাটাগরি:</strong> <span style="color: #047857; font-weight: 700;">${category.title}</span> &nbsp;•&nbsp; <strong style="color: #0f172a;">ধরন:</strong> সেলফ অ্যাসেসমেন্ট
        </div>

        <div class="report-card" style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; margin-bottom: 10px;">
          <div style="text-align: center; flex-shrink: 0;">
            <div style="position: relative; width: 100px; height: 100px; margin: 0 auto;">
              <svg width="100" height="100" viewBox="0 0 124 124" style="transform: rotate(-90deg);">
                <circle cx="62" cy="62" r="${radius}" fill="none" stroke="#f1f5f9" stroke-width="9" />
                <circle cx="62" cy="62" r="${radius}" fill="none" stroke="${themeColor.primary}" stroke-width="9" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" />
              </svg>
              <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size: 22pt; font-weight: 700; color: #0f172a; line-height: 1; font-family: monospace;">${percentage}%</span>
                <span style="font-size: 8pt; font-weight: 700; color: #64748b; margin-top: 3px;">স্কোর: ${toBnNumber(totalScore)} / ${toBnNumber(maxScore)}</span>
              </div>
            </div>
            <div style="font-size: 8pt; font-weight: 700; color: #047857; margin-top: 3px;">সামগ্রিক প্রভাব সূচক</div>
          </div>
          <div style="flex: 1;">
            <div style="font-size: 8pt; font-weight: 700; color: #64748b;">নির্ণীত ফলাফল ও ঝুঁকির স্তর</div>
            <h2 style="font-size: 14.5pt; font-weight: 700; color: #0f172a; margin: 2px 0 6px 0; line-height: 1.25;">${levelTitle}</h2>
            <span class="v2-pill" style="background: ${themeColor.bg}; color: ${themeColor.text}; border: 1px solid ${themeColor.border};">অগ্রাধিকার: ${priorityText}</span>
            <div style="margin-top: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 7.5pt; color: #64748b; margin-bottom: 3px; font-weight: 600;">
                <span>স্বাভাবিক (০-৩০%)</span><span>মাঝারি (৩১-৬৫%)</span><span>উচ্চ ঝুঁকি (৬৬-১০০%)</span>
              </div>
              <div style="display: flex; height: 6px; border-radius: 9999px; overflow: hidden; gap: 2px; background: #f1f5f9;">
                <div style="flex: 30; background: #10b981; opacity: ${percentage <= 30 ? 1 : 0.25};"></div>
                <div style="flex: 35; background: #f59e0b; opacity: ${percentage > 30 && percentage <= 65 ? 1 : 0.25};"></div>
                <div style="flex: 35; background: #ef4444; opacity: ${percentage > 65 ? 1 : 0.25};"></div>
              </div>
            </div>
            <p style="font-size: 8.5pt; color: #334155; line-height: 1.5; margin: 8px 0 0 0;">${prescription.summary}</p>
            <p style="font-size: 8pt; color: #64748b; margin: 4px 0 0 0;">এটি কোনো চিকিৎসা নির্ণয় নয়, একটি সেলফ অ্যাসেসমেন্ট।</p>
          </div>
        </div>

        <h2 class="v2-h2"><span class="no">১.</span> আজ থেকে যা করবেন — ${toBnNumber(steps.length)}টি ধাপ</h2>
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
          ${steps.map((step, idx) => `
            <div class="report-card" style="display: flex; align-items: flex-start; gap: 10px; padding: 7px 12px; background: ${stepBgs[idx % stepBgs.length]}; border: 1px solid #e2e8f0; border-radius: 8px;">
              <span style="width: 26px; height: 26px; min-width: 26px; border-radius: 9999px; background: #047857; color: #ffffff; font-weight: 700; font-size: 10pt; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">${toBnNumber(idx + 1)}</span>
              <div style="flex: 1;">
                <div style="font-size: 8pt; font-weight: 700; color: #b45309;">করণীয় আমল ধাপ ${toBnNumber(idx + 1)}</div>
                <div style="font-size: 8.5pt; font-weight: 500; color: #1e293b; line-height: 1.45;">${step}</div>
              </div>
            </div>
          `).join("")}
        </div>

        <h2 class="v2-h2"><span class="no">২.</span> দৈনিক রুটিন — কখন কী করবেন</h2>
        <div class="report-card" style="padding: 8px 10px; background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 8px; margin-bottom: 10px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
            <div style="background: #ffffff; padding: 8px 10px; border-radius: 6px; border: 1px solid #d1fae5;">
              <div style="font-size: 8.5pt; font-weight: 700; color: #065f46;">সকালের আমল (ফজর পর)</div>
              <div style="font-size: 8pt; color: #475569; margin-top: 3px; line-height: 1.45;">সকালের মাসনুন জিকির, ৩ কুল পড়ে বুকে ফুঁ ও রুকইয়ার পানি পান।</div>
            </div>
            <div style="background: #ffffff; padding: 8px 10px; border-radius: 6px; border: 1px solid #d1fae5;">
              <div style="font-size: 8.5pt; font-weight: 700; color: #065f46;">সন্ধ্যার আমল (মাগরিব পর)</div>
              <div style="font-size: 8pt; color: #475569; margin-top: 3px; line-height: 1.45;">সন্ধ্যার হেফাজতের দোয়াসমূহ এবং প্রয়োজনবোধে রুকইয়ার গোসল সম্পন্ন।</div>
            </div>
            <div style="background: #ffffff; padding: 8px 10px; border-radius: 6px; border: 1px solid #d1fae5;">
              <div style="font-size: 8.5pt; font-weight: 700; color: #065f46;">শয়নের আমল (রাতের পূর্বে)</div>
              <div style="font-size: 8pt; color: #475569; margin-top: 3px; line-height: 1.45;">ওজু অবস্থায় ঘুমানো, আয়াতুল কুরসি ও বাকারার শেষ দুই আয়াত তিলাওয়াত।</div>
            </div>
          </div>
        </div>

        <h2 class="v2-h2"><span class="no">৩.</span> আমল কবুলের ৪টি শর্ত</h2>
        <ul style="margin: 2px 0 0 0; padding-right: 16px; font-size: 8.5pt; color: #334155; line-height: 1.5;">
          <li><strong>ইখলাস ও দৃঢ় একিন:</strong> আরোগ্য একমাত্র আল্লাহর হাতে — এই বিশ্বাস রেখে নিয়মিত আমল চালিয়ে যাওয়া।</li>
          <li><strong>ধারাবাহিকতা বজায় রাখা:</strong> চিকিৎসাক্রমের মেয়াদ অনুযায়ী প্রতিদিন নিরবচ্ছিন্ন আমল সম্পন্ন করা।</li>
          <li><strong>গুনাহ ও অপসংস্কৃতি বর্জন:</strong> ঘরে গান-বাজনা, প্রাণীর ছবি এবং যাবতীয় অনৈসলামিক কার্যকলাপ বন্ধ রাখা।</li>
          <li><strong>হালাল রুজি ও পবিত্রতা:</strong> সর্বদা হালাল আহার গ্রহণ করা এবং যথাসম্ভব ওজু ও পবিত্র অবস্থায় থাকা।</li>
        </ul>

        ${renderAppBox()}
      </div>
      ${renderRunningFooter(data, 1, 3)}
    </div>
  `;
}

export function renderV2Page2(data: AssessmentReportData): string {
  const evaluatedQuestions = data.evaluatedQuestions || [];
  const yesItems = evaluatedQuestions.filter((q) => q?.answerWeight === 2);
  const sometimesItems = evaluatedQuestions.filter((q) => q?.answerWeight === 1);
  const noItems = evaluatedQuestions.filter((q) => q?.answerWeight === 0);
  const qText = (item: { question?: { text?: string } | string }) => {
    const q = item?.question;
    return typeof q === "string" ? q : q?.text || "";
  };
  const renderGroup = (title: string, items: typeof evaluatedQuestions, bg: string, color: string, border: string) => `
    <h3 style="font-size: 10pt; font-weight: 700; color: #022c22; margin: 10px 0 4px 0;">${title}</h3>
    <div style="display: flex; flex-direction: column; gap: 4px;">
      ${items.map((item) => `
        <div class="report-card" style="display: flex; align-items: flex-start; gap: 8px; padding: 5px 9px; background: ${bg}; border: 1px solid ${border}; border-radius: 6px; font-size: 8.5pt; line-height: 1.45;">
          <span style="background: ${color}; color: #ffffff; font-weight: 700; font-size: 7.5pt; padding: 2px 8px; border-radius: 9999px; flex-shrink: 0; line-height: 1.4;">${item?.answerLabel || ""}</span>
          <span style="color: #1e293b;">${qText(item)}</span>
        </div>
      `).join("")}
    </div>
  `;

  return `
    <div class="report-section">
      <div class="report-content">
        ${renderRunningHeader(data, "আপনি যে লক্ষণগুলো জানিয়েছেন")}
        <h2 class="v2-h2"><span class="no">৪.</span> আপনি যে লক্ষণগুলো জানিয়েছেন</h2>
        <p style="font-size: 9pt; color: #475569; margin: 0 0 6px 0;">পুরো প্রশ্নগুলো না ছাপিয়ে শুধু যে লক্ষণগুলো আপনি জানিয়েছেন, সেগুলো নিচে দেওয়া হলো।</p>
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
          <span class="v2-pill" style="background: #fef2f2; border: 1px solid #fecaca; color: #991b1b;">হ্যাঁ — ${toBnNumber(yesItems.length)}টি</span>
          <span class="v2-pill" style="background: #fffbeb; border: 1px solid #fde68a; color: #92400e;">মাঝে মাঝে — ${toBnNumber(sometimesItems.length)}টি</span>
          <span class="v2-pill" style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569;">না — ${toBnNumber(noItems.length)}টি</span>
        </div>
        ${yesItems.length > 0 ? renderGroup("হ্যাঁ বলেছেন", yesItems, "#fff1f2", "#e11d48", "#fecdd3") : ""}
        ${sometimesItems.length > 0 ? renderGroup("মাঝে মাঝে বলেছেন", sometimesItems, "#fffbeb", "#d97706", "#fef3c7") : ""}
        ${noItems.length > 0 ? `<p style="font-size: 8.5pt; color: #64748b; margin: 8px 0 0 0; line-height: 1.5;">‘না’ বলেছেন: ${noItems.map((item) => qText(item)).join(" • ")}</p>` : ""}
        <div class="report-card" style="padding: 10px 14px; background: #fcfbf9; border: 1px solid #e4ded3; border-radius: 8px; margin-top: 12px;">
          <div style="font-size: 9pt; font-weight: 700; color: #022c22; margin-bottom: 4px;">শরঈ দৃষ্টিকোণ ও সুন্নাহসম্মত আরোগ্যের মূলনীতি</div>
          <ul style="margin: 0; padding-left: 16px; font-size: 8.5pt; color: #334155; line-height: 1.5;">
            <li><strong>আরোগ্য কেবল আল্লাহর হাতে:</strong> রুকইয়া কোনো জাদুকরি চিকিৎসা নয়, বরং আল্লাহর কালামের মাধ্যমে আরোগ্যের সুন্নাহসম্মত উপায়।</li>
            <li><strong>শিরক ও বিদআতের বর্জন:</strong> তাবিজে কোনো অজ্ঞাত সংখ্যা, প্রতীক বা অস্পষ্ট বাক্য থাকলে তা বর্জনীয়। সুন্নাহসম্মত রুকইয়া সম্পূর্ণ স্বচ্ছ।</li>
            <li><strong>আত্মিক পরিচ্ছন্নতা:</strong> পাঁচ ওয়াক্ত সালাত, হালাল উপার্জন ও নিয়মিত জিকির সুস্থতার ভিত্তি স্থাপন করে।</li>
          </ul>
        </div>
      </div>
      ${renderRunningFooter(data, 2, 3)}
    </div>
  `;
}

export function renderV2Page3(data: AssessmentReportData): string {
  const quranicVerses = data.quranicVerses || [];
  const audioLinks = data.result?.prescription?.audioLinks || [];
  const isAbbreviated = (item: { arabicText?: string; translationBn?: string }) =>
    (item?.arabicText || "").includes("...") || (item?.translationBn || "").includes("...");

  return `
    <div class="report-section">
      <div class="report-content">
        ${renderRunningHeader(data, "প্রস্তাবিত কুরআন তিলাওয়াত ও রুকইয়া আমল")}
        <h2 class="v2-h2"><span class="no">৫.</span> প্রস্তাবিত তিলাওয়াত</h2>
        <p style="font-size: 9pt; color: #475569; margin: 0 0 8px 0;">নিচে পূর্ণ পাঠ আছে এমন সূরাগুলোর পূর্ণ পাঠ দেওয়া হলো। সংক্ষিপ্ত পাঠের সূরাগুলো চেকলিস্টে আছে — সেগুলোর পূর্ণ পাঠ কুরআন থেকে পড়ুন।</p>
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px;">
          ${quranicVerses.map((item) => {
            if (isAbbreviated(item)) {
              return `
                <div class="report-card" style="padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                  <div style="font-size: 9.5pt; font-weight: 700; color: #0f172a;">${item?.surahName || ""}${item?.reference ? ` <span style="font-size: 7.5pt; color: #64748b; font-weight: 400;">(${item.reference})</span>` : ""}</div>
                  <div style="font-size: 8.5pt; color: #b45309; font-weight: 600; margin-top: 2px;">আমল নির্দেশ: ${item?.instruction || ""}</div>
                  <div style="font-size: 8pt; color: #64748b; margin-top: 2px;">পূর্ণ পাঠ কুরআন থেকে পড়ুন — সংক্ষিপ্ত বা কাটা-ছেঁড়া আরবি পাঠ এখানে ছাপা হয়নি।</div>
                </div>
              `;
            }
            return `
              <div class="report-card" style="padding: 10px 14px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
                  <div><span style="font-size: 9.5pt; font-weight: 700; color: #0f172a;">${item?.surahName || ""}</span>${item?.reference ? `<span style="font-size: 7.5pt; color: #64748b; margin-left: 6px;">(${item.reference})</span>` : ""}</div>
                  <span class="v2-pill" style="font-family: 'Amiri', serif; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46;">${item?.arabicName || ""}</span>
                </div>
                <div dir="rtl" class="arabic-text" style="background: #fbfdfc; padding: 6px 10px; border-radius: 6px; border: 1px solid #ecfdf5; margin-bottom: 4px;">${formatArabicText(item?.arabicText)}</div>
                <div style="font-size: 8.5pt; color: #475569; margin-bottom: 3px; line-height: 1.45;"><strong style="color: #0f172a;">অর্থ:</strong> ${item?.translationBn || ""}</div>
                <div style="font-size: 8pt; color: #b45309; font-weight: 600;">আমল নির্দেশ: ${item?.instruction || ""}</div>
              </div>
            `;
          }).join("")}
        </div>
        ${audioLinks.length > 0 ? `
          <div class="report-card" style="padding: 8px 12px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; margin-bottom: 10px;">
            <div style="font-size: 8.5pt; font-weight: 700; color: #065f46; margin-bottom: 3px;">প্রস্তাবিত রুকইয়া অডিও (মনোযোগ সহকারে শুনুন):</div>
            <div style="font-size: 8.5pt; color: #065f46; line-height: 1.5;">${audioLinks.map((a) => `🎧 ${a?.title || ""}`).join(" • ")}</div>
          </div>
        ` : ""}
        <div class="report-card" style="padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 8pt; color: #64748b; line-height: 1.45; margin-bottom: 10px;">
          <strong style="color: #0f172a;">জরুরি শরঈ ও চিকিৎসা সতর্কতা:</strong> এটি শিফা আল কুরআন প্ল্যাটফর্মের স্বয়ংক্রিয় সেলফ অ্যাসেসমেন্ট রিপোর্ট। কুরআন ও সহিহ হাদিসের নির্দেশনার আলোকে প্রস্তুতকৃত। রুকইয়া শারইয়া হলো আত্মিক রোগমুক্তি ও হিফাযতের সুন্নাহসম্মত মাধ্যম। কোনো গুরুতর বা দীর্ঘস্থায়ী শারীরিক ও মানসিক রোগের ক্ষেত্রে রেজিস্টার্ড চিকিৎসকের চিকিৎসা এবং সুন্নাহ আমল উভয়টি একসাথে চালিয়ে যাওয়া ইসলামের বিধান।
        </div>
        <div class="report-card" style="padding: 9px 14px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 8.5pt;">
          <div><div style="font-weight: 700; color: #022c22;">শিফা আল কুরআন সেন্টার</div><div style="font-size: 7.5pt; color: #64748b;">ওয়েবসাইট: https://saq.pro.bd</div></div>
          <div style="text-align: center;"><div style="font-weight: 700; color: #b45309;">হটলাইন সাপোর্ট</div><div style="font-size: 8.5pt; font-family: monospace;">09639-000999</div></div>
          <div style="text-align: right;"><div style="font-weight: 700; color: #047857;">হোয়াটসঅ্যাপ কনসাল্টেশন</div><div style="font-size: 8.5pt; font-family: monospace;">+880 1353-301772</div></div>
        </div>
      </div>
      ${renderRunningFooter(data, 3, 3)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// EXACT v2 REPORT (2026-10-26, user correction): the approved
// sample-report-v2.html, copied structure-for-structure, with only the
// data substituted per test. No SVG score ring, no absolute positioning,
// no translateY pills, no fixed-height sections, no flex badge cards —
// every one of those broke under html2canvas (text below its box,
// overlays, clipped badges, missing SVG QR). Layout here is the sample's:
// simple block/table/list layout, table routine, simple ul symptom lists,
// .card surah cards, .appbox with a PNG QR (html2canvas renders PNG
// data-URIs; it dropped the SVG data-URI QR from the live PDF).
// Page 1: result + steps + routine + conditions + app box.
// Page 2: reported symptoms + surahs + disclaimer.
// Symptom lists use the full question text (not paraphrased short labels),
// so a category with very long answers may naturally flow, but the
// design, colours, fonts and boxes stay exactly v2.
// ---------------------------------------------------------------------------
import { APP_QR_PNG_BASE64 } from "./appQrPng";

function renderExactV2Styles(): string {
  const assets = getFontsAndLogo();
  const fontFaces = `
    @font-face { font-family: 'Hind Siliguri'; src: url('data:font/woff2;base64,${assets.hind400Latin}') format('woff2'); font-weight: 400; font-style: normal; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
    @font-face { font-family: 'Hind Siliguri'; src: url('data:font/woff2;base64,${assets.hind400Bengali}') format('woff2'); font-weight: 400; font-style: normal; unicode-range: U+0951-0952, U+0964-0965, U+0980-09FF, U+1CDA, U+200C-200D, U+20B9, U+25CC; }
    @font-face { font-family: 'Hind Siliguri'; src: url('data:font/woff2;base64,${assets.hind600Latin}') format('woff2'); font-weight: 600; font-style: normal; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
    @font-face { font-family: 'Hind Siliguri'; src: url('data:font/woff2;base64,${assets.hind600Bengali}') format('woff2'); font-weight: 600; font-style: normal; unicode-range: U+0951-0952, U+0964-0965, U+0980-09FF, U+1CDA, U+200C-200D, U+20B9, U+25CC; }
    @font-face { font-family: 'Hind Siliguri'; src: url('data:font/woff2;base64,${assets.hind700Latin}') format('woff2'); font-weight: 700; font-style: normal; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
    @font-face { font-family: 'Hind Siliguri'; src: url('data:font/woff2;base64,${assets.hind700Bengali}') format('woff2'); font-weight: 700; font-style: normal; unicode-range: U+0951-0952, U+0964-0965, U+0980-09FF, U+1CDA, U+200C-200D, U+20B9, U+25CC; }
    @font-face { font-family: 'Amiri'; src: url('data:font/woff2;base64,${assets.amiriLatin}') format('woff2'); font-weight: 400; font-style: normal; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
    @font-face { font-family: 'Amiri'; src: url('data:font/woff2;base64,${assets.amiriArabic}') format('woff2'); font-weight: 400; font-style: normal; unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF; }
  `;
  // Sample CSS verbatim, except Arabic font = Amiri (site font, not Noto).
  return `
    ${fontFaces}
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    @page { size: A4; margin: 10mm 14mm; }
    html, body { margin: 0; padding: 0; font-family: 'Hind Siliguri', sans-serif; color: #0f172a; font-size: 10.5pt; line-height: 1.55; }
    .page { page-break-after: always; }
    .page:last-child { page-break-after: auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2.5px solid #047857; padding-bottom: 6px; margin-bottom: 6px; }
    .appbox { display: flex; gap: 12px; align-items: center; background: #fffbeb; border: 1.5px solid #f59e0b; border-radius: 10px; padding: 10px 12px; margin-top: 12px; break-inside: avoid; }
    .appbox img { width: 78px; height: 78px; min-width: 78px; }
    .appbox .apptitle { font-size: 11.5pt; font-weight: 700; color: #022c22; }
    .appbox .appfeat { font-size: 9pt; color: #475569; margin: 2px 0; }
    .appbox .applink { font-family: monospace; font-size: 7pt; color: #64748b; word-break: break-all; }
    .brand { font-size: 20pt; font-weight: 700; color: #022c22; line-height: 1.15; }
    .brand small { display: block; font-size: 8pt; font-weight: 600; letter-spacing: 1px; color: #b45309; }
    .brand p { margin: 2px 0 0; font-size: 9pt; color: #475569; font-weight: 400; }
    .meta { text-align: right; font-size: 8.5pt; color: #475569; line-height: 1.5; }
    .meta b { color: #022c22; }
    .badge { display: inline-block; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 2px 10px; border-radius: 999px; font-weight: 700; font-size: 9pt; }
    .ref { font-family: monospace; font-size: 7.5pt; color: #64748b; word-break: break-all; }
    h2 { font-size: 13pt; color: #022c22; margin: 6px 0 3px; background: #f0fdf4; border-right: 4px solid #047857; padding: 3px 10px; border-radius: 4px; }
    h2 .no { color: #047857; }
    h3 { font-size: 10.5pt; color: #022c22; margin: 0 0 3px; }
    .lead { color: #475569; margin: 0 0 6px; }
    .result { display: flex; gap: 14px; border: 1.5px solid #a7f3d0; background: #f0fdf4; border-radius: 10px; padding: 12px 14px; margin-bottom: 12px; }
    .score { text-align: center; min-width: 92px; }
    .score .big { font-size: 30pt; font-weight: 700; color: #b45309; line-height: 1; }
    .score .sub { font-size: 8.5pt; color: #475569; }
    .bar { display: flex; height: 10px; border-radius: 999px; overflow: hidden; margin: 8px 0 3px; border: 1px solid #e2e8f0; }
    .bar span { display: block; }
    .bar-labels { display: flex; justify-content: space-between; font-size: 7.5pt; color: #64748b; }
    .steps { margin: 0; padding: 0; list-style: none; }
    .steps li { display: flex; gap: 10px; border: 1px solid #e2e8f0; background: #f0fdf4; border-radius: 8px; padding: 9px 11px; margin-bottom: 7px; break-inside: avoid; }
    .steps li:nth-child(2) { background: #fffbeb; }
    .steps li:nth-child(3) { background: #eff6ff; }
    .steps .n { width: 28px; height: 28px; min-width: 28px; border-radius: 50%; background: #047857; color: #fff; text-align: center; line-height: 28px; font-weight: 700; }
    table.routine { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    table.routine th { background: #022c22; color: #fff; text-align: right; padding: 6px 9px; font-size: 9.5pt; }
    table.routine td { border: 1px solid #e2e8f0; padding: 7px 9px; vertical-align: top; font-size: 9.5pt; }
    table.routine td b { color: #022c22; }
    ul.tight { margin: 3px 0 8px; padding-right: 16px; }
    ul.tight li { margin-bottom: 2px; }
    .two { display: flex; gap: 10px; }
    .two > div { flex: 1; }
    .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 12px; margin-bottom: 6px; break-inside: avoid; }
    .card .tag { font-size: 8pt; font-weight: 700; color: #b45309; }
    .arabic { direction: rtl; text-align: right; font-family: 'Amiri', serif; font-size: 11pt; line-height: 1.5; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px 12px; margin: 4px 0; }
    .symp ul.tight { font-size: 9pt; line-height: 1.35; }
    .symp p { font-size: 9pt; }
    ul.tight.check { font-size: 9pt; line-height: 1.45; }
    .trans { font-size: 8.5pt; color: #475569; }
    .instr { font-size: 8.5pt; color: #92400e; font-weight: 600; }
    .sign { display: flex; gap: 8px; flex-wrap: wrap; margin: 4px 0 6px; }
    .sign span { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 999px; padding: 3px 10px; font-size: 9pt; }
    .sign span.yes { background: #fef2f2; border-color: #fecaca; }
    .disclaimer { border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 8px; padding: 5px 12px; font-size: 8.5pt; color: #475569; margin-top: 6px; }
    .footer { display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 5px; margin-top: 6px; font-size: 8.5pt; color: #64748b; }
    .footer b { color: #022c22; }
  `;
}

export function renderExactV2Page1(data: AssessmentReportData): string {
  const category = data.category || { title: "রুকইয়া মূল্যায়ন", questions: [] };
  const result = data.result || {
    totalScore: 0,
    maxScore: 20,
    percentage: 0,
    level: "low",
    levelTitle: "স্বাভাবিক স্তর",
    prescription: { summary: "", steps: [], recommendedSurahs: [] },
  };
  const reportId = data.reportId || "SAQ-GEN";
  const reportDate = data.reportDate || formatBengaliDate();
  const totalScore = result.totalScore ?? 0;
  const maxScore = result.maxScore ?? 20;
  const percentage = result.percentage ?? 0;
  const levelTitle = result.levelTitle || "স্বাভাবিক স্তর";
  const prescription = result.prescription || { summary: "", steps: [], recommendedSurahs: [] };
  const steps = prescription.steps || [];
  const summary = prescription.summary || "";
  const questionCount = (category.questions || []).length;

  return `
    <div class="page">
      <div class="header">
        <div class="brand">শিফা আল কুরআন<small>ISLAMIC RUQYAH SHAR'IAH CENTER</small><p>কুরআন ও সুন্নাহ ভিত্তিক আত্মিক ও মানসিক রোগমুক্তি সেবা</p></div>
        <div class="meta"><span class="badge">সেলফ অ্যাসেসমেন্ট রিপোর্ট</span><br>তারিখ: <b>${reportDate}</b><br><span class="ref">রেফ: ${reportId}</span></div>
      </div>

      <div class="result">
        <div class="score"><div class="big">${toBnNumber(percentage)}%</div><div class="sub">স্কোর: ${toBnNumber(totalScore)} / ${toBnNumber(maxScore)}<br>${toBnNumber(questionCount)}টি প্রশ্নের উত্তর</div></div>
        <div style="flex:1">
          <h3 style="font-size:13pt;margin-bottom:2px;">${levelTitle}</h3>
          <p style="margin:0 0 4px;">${summary} এটি কোনো চিকিৎসা নির্ণয় নয়, একটি সেলফ অ্যাসেসমেন্ট।</p>
          <div class="bar"><span style="width:31%;background:#34d399"></span><span style="width:35%;background:#d97706"></span><span style="width:34%;background:#fca5a5"></span></div>
          <div class="bar-labels"><span>স্বাভাবিক (০–৩০%)</span><span>মাঝারি (৩১–৬৫%)</span><span>উচ্চ ঝুঁকি (৬৬–১০০%)</span></div>
        </div>
      </div>

      <h2><span class="no">১.</span> আজ থেকে যা করবেন — ${toBnNumber(steps.length)}টি ধাপ</h2>
      <p class="lead">সবচেয়ে আগে এই ${toBnNumber(steps.length)}টি কাজ শুরু করুন।</p>
      <ol class="steps">
        ${steps.map((step, idx) => `<li><div class="n">${toBnNumber(idx + 1)}</div><div>${step}</div></li>`).join("")}
      </ol>

      <h2><span class="no">২.</span> দৈনিক রুটিন — কখন কী করবেন</h2>
      <table class="routine">
        <tr><th>সকাল (ফজর পর)</th><th>সন্ধ্যা (মাগরিব পর)</th><th>রাত (ঘুমের পূর্বে)</th></tr>
        <tr>
          <td><b>সকালের আমল</b><br>সকালের মাসনুন জিকির, তিন কুল পড়ে বুকে ফুঁ ও রুকইয়ার পানি পান।</td>
          <td><b>সন্ধ্যার আমল</b><br>সন্ধ্যার হেফাজতের দোয়াসমূহ এবং প্রয়োজনবোধে রুকইয়ার গোসল সম্পন্ন।</td>
          <td><b>রাতের আমল</b><br>ওজু অবস্থায় ঘুমানো, আয়াতুল কুরসি ও বাকারার শেষ দুই আয়াত তিলাওয়াত।</td>
        </tr>
      </table>

      <h2><span class="no">৩.</span> আমল কবুলের ৪টি শর্ত</h2>
      <ul class="tight">
        <li><b>ইখলাস ও দৃঢ় একিন:</b> আরোগ্য একমাত্র আল্লাহর হাতে — এই বিশ্বাস রেখে নিয়মিত আমল চালিয়ে যাওয়া।</li>
        <li><b>ধারাবাহিকতা বজায় রাখা:</b> চিকিৎসাক্রমের মেয়াদ অনুযায়ী প্রতিদিন নিরবচ্ছিন্ন আমল সম্পন্ন করা।</li>
        <li><b>গুনাহ ও অপসংস্কৃতি বর্জন:</b> ঘরে গান-বাজনা, প্রাণীর ছবি এবং যাবতীয় অনৈসলামিক কার্যকলাপ বন্ধ রাখা।</li>
        <li><b>হালাল রুজি ও পবিত্রতা:</b> সর্বদা হালাল আহার গ্রহণ করা এবং যথাসম্ভব ওজু ও পবিত্র অবস্থায় থাকা।</li>
      </ul>

      <div class="appbox">
        <img src="data:image/png;base64,${APP_QR_PNG_BASE64}" alt="Shifa Al Quran app QR code">
        <div>
          <div class="apptitle">📱 শিফা আল কুরআন অ্যাপ — আমল হাতের মুঠোয়</div>
          <div class="appfeat">দৈনিক আমল, রুকইয়া নির্দেশিকা, অডিও শোনা, তাসবিহ ও অ্যাপয়েন্টমেন্ট — সব এক অ্যাপে, ফ্রি। ক্যামেরা দিয়ে QR স্ক্যান করুন।</div>
          <div class="applink">play.google.com/store/apps/details?id=com.iamneyamat.shifaalquranapp</div>
        </div>
      </div>

      <div class="footer"><span><b>শিফা আল কুরআন</b> • saq.pro.bd</span><span>পৃষ্ঠা ১ / ২</span></div>
    </div>
  `;
}

export function renderExactV2Page2(data: AssessmentReportData): string {
  const evaluatedQuestions = data.evaluatedQuestions || [];
  const quranicVerses = data.quranicVerses || [];
  const audioLinks = data.result?.prescription?.audioLinks || [];
  const reportId = data.reportId || "SAQ-GEN";
  const yesItems = evaluatedQuestions.filter((q) => q?.answerWeight === 2);
  const sometimesItems = evaluatedQuestions.filter((q) => q?.answerWeight === 1);
  const noItems = evaluatedQuestions.filter((q) => q?.answerWeight === 0);
  const qText = (item: { question?: { text?: string } | string }) => {
    const q = item?.question;
    return typeof q === "string" ? q : q?.text || "";
  };
  const isAbbreviated = (item: { arabicText?: string; translationBn?: string }) =>
    (item?.arabicText || "").includes("...") || (item?.translationBn || "").includes("...");
  const fullVerses = quranicVerses.filter((v) => !isAbbreviated(v));
  const checklistVerses = quranicVerses.filter((v) => isAbbreviated(v));

  return `
    <div class="page">
      <div class="header">
        <div class="brand" style="font-size:15pt;">শিফা আল কুরআন<small>SELF ASSESSMENT REPORT</small></div>
        <div class="meta"><span class="ref">রেফ: ${reportId}</span></div>
      </div>

      <h2><span class="no">৪.</span> আপনি যে লক্ষণগুলো জানিয়েছেন</h2>
      <p class="lead">শুধু যে লক্ষণগুলো আপনি জানিয়েছেন, সেগুলো নিচে দেওয়া হলো।</p>
      <div class="sign">
        <span class="yes">হ্যাঁ — ${toBnNumber(yesItems.length)}টি</span><span>মাঝে মাঝে — ${toBnNumber(sometimesItems.length)}টি</span><span>না — ${toBnNumber(noItems.length)}টি</span>
      </div>
      <div class="two symp">
        <div>
          <h3>হ্যাঁ বলেছেন</h3>
          <ul class="tight">
            ${yesItems.map((item) => `<li>${qText(item)}</li>`).join("")}
          </ul>
        </div>
        <div>
          <h3>মাঝে মাঝে বলেছেন</h3>
          <ul class="tight">
            ${sometimesItems.map((item) => `<li>${qText(item)}</li>`).join("")}
          </ul>
          ${noItems.length > 0 ? `<p style="font-size:9pt;color:#475569;">‘না’ বলেছেন ${toBnNumber(noItems.length)}টিতে: ${noItems.map((item) => qText(item)).join(" • ")}</p>` : ""}
        </div>
      </div>

      <h2><span class="no">৫.</span> প্রস্তাবিত তিলাওয়াত</h2>
      <p class="lead">নিচে পূর্ণ পাঠ আছে এমন সূরাগুলোর পূর্ণ পাঠ দেওয়া হলো। সংক্ষিপ্ত পাঠের সূরাগুলো চেকলিস্টে আছে — সেগুলোর পূর্ণ পাঠ কুরআন থেকে পড়ুন।</p>

      ${fullVerses.map((item) => `
        <div class="card">
          <div><b>${item?.surahName || ""}</b> ${item?.reference ? `<span class="tag">${item.reference}</span>` : ""}</div>
          <div class="arabic">${formatArabicText(item?.arabicText)}</div>
          <div class="trans"><b>অর্থ:</b> ${item?.translationBn || ""}</div>
          <div class="instr">আমল নির্দেশ: ${item?.instruction || ""}</div>
        </div>
      `).join("")}

      ${checklistVerses.length > 0 ? `
        <h3>এছাড়াও পড়বেন</h3>
        <ul class="tight check">
          ${checklistVerses.map((item) => `<li><b>${item?.surahName || ""}</b>${item?.reference ? ` (${item.reference})` : ""} — ${item?.instruction || ""} পূর্ণ পাঠ কুরআন থেকে পড়ুন।</li>`).join("")}
        </ul>
      ` : ""}

      ${audioLinks.length > 0 ? `<p style="font-size:9pt;color:#475569;">প্রস্তাবিত অডিও: ${audioLinks.map((a) => `🎧 ${a?.title || ""}`).join(" • ")}</p>` : ""}

      <div class="disclaimer"><b>জরুরি সতর্কতা:</b> এটি শিফা আল কুরআন প্ল্যাটফর্মের স্বয়ংক্রিয় সেলফ অ্যাসেসমেন্ট রিপোর্ট, কোনো চিকিৎসা নির্ণয় নয়। কোনো গুরুতর বা দীর্ঘস্থায়ী শারীরিক ও মানসিক রোগের ক্ষেত্রে রেজিস্টার্ড চিকিৎসকের চিকিৎসা এবং সুন্নাহ আমল উভয়টি একসাথে চালিয়ে যাওয়া ইসলামের বিধান।</div>

      <div class="footer"><span><b>শিফা আল কুরআন সেন্টার</b> • saq.pro.bd • হটলাইন: 09639-000999 • হোয়াটসঅ্যাপ: 01353-301772</span><span>পৃষ্ঠা ২ / ২</span></div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// MASTER COMPILER
// ---------------------------------------------------------------------------
export function renderFullReportHtml(data: AssessmentReportData): string {
  // Exact v2 layout (approved sample, user correction 2026-10-26).
  // Legacy functions above are unused by this compiler.
  const styles = renderExactV2Styles();
  const page1 = renderExactV2Page1(data);
  const page2 = renderExactV2Page2(data);

  return `
    <!DOCTYPE html>
    <html lang="bn">
      <head>
        <meta charset="utf-8" />
        <title>Shifa Al Quran Assessment Report - ${data.reportId}</title>
        <style>
          ${styles}
        </style>
      </head>
      <body>
        ${page1}
        ${page2}
      </body>
    </html>
  `;
}
