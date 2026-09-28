const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

// Read font base64
const hindRegular = fs.readFileSync(path.join(__dirname, '..', 'public', 'fonts', 'HindSiliguri-400-bengali.woff2')).toString('base64');
const hindBold = fs.readFileSync(path.join(__dirname, '..', 'public', 'fonts', 'HindSiliguri-700-bengali.woff2')).toString('base64');
const amiriArabic = fs.readFileSync(path.join(__dirname, '..', 'public', 'fonts', 'Amiri-400-arabic.woff2')).toString('base64');
const logoBase64 = fs.readFileSync(path.join(__dirname, '..', 'public', 'logo.png')).toString('base64');

function toBnNumber(num) {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)] ?? d);
}

// WASWAS assessment sample data (realistic user answers)
const waswasCategory = {
  id: "waswas",
  title: "ওয়াসওয়াসার সমস্যা যাচাই",
  subtitle: "কুচিন্তা, সংশয় ও মানসিক অস্থিরতা পরীক্ষা",
  description: "ঈমান, অযু, গোসল, নাপাকি ও নামাজ নিয়ে শয়তানের মনে কুচিন্তা ও সন্দেহ দূরীকরণের গাইডলাইন।",
  badge: "ওয়াসওয়াসা গাইড",
  questions: [
    { id: "ww_1", text: "অকারণ সর্বদা চিন্তিত থাকা এবং মাথায় বিক্ষিপ্ত চিন্তা ঘোরার কারণে কোনো কিছুতে মন দিতে না পারা?" },
    { id: "ww_2", text: "অযু, গোসল অথবা নামাজের বিশুদ্ধতা নিয়ে অতিরিক্ত দ্বিধাদ্বন্দ্বে ভোগেন কি?" },
    { id: "ww_3", text: "পরিষ্কার-পরিচ্ছন্নতা নিয়ে অতিরিক্ত চিন্তা করা ও টয়লেট বা গোসলখানায় দীর্ঘ সময় ব্যয় হওয়া?" },
    { id: "ww_4", text: "শরীরের এক অঙ্গ বারবার ধোয়া এবং ধোয়ার পরও মনে আত্ম তৃপ্তি বা নিশ্চয়তা না পাওয়া?" },
    { id: "ww_5", text: "বারবার মনে হওয়া অযু ভেঙে যাচ্ছে, প্রস্রাবের ফোঁটা পড়ছে বা বাতাস বের হচ্ছে (বিশেষত নামাজে)?" },
    { id: "ww_6", text: "আল্লাহ তাআলা, রাসূলুল্লাহ (সা.) অথবা ইসলাম নিয়ে অনিচ্ছাকৃত অবমাননাকর বা বাজে চিন্তা মাথায় আসা?" },
    { id: "ww_7", text: "বারবার নামাজের রাকাআত সংখ্যা ভুলে যাওয়া কিংবা কিরাআত, রুকু-সেজদার ব্যাপারে সন্দেহে ভোগা?" },
  ]
};

const userAnswers = {
  ww_1: 2, // হ্যাঁ
  ww_2: 2, // হ্যাঁ
  ww_3: 1, // মাঝে মধ্যে
  ww_4: 2, // হ্যাঁ
  ww_5: 2, // হ্যাঁ
  ww_6: 1, // মাঝে মধ্যে
  ww_7: 2, // হ্যাঁ
};

// Calculate scores
let totalScore = 0;
waswasCategory.questions.forEach(q => totalScore += (userAnswers[q.id] || 0));
const maxScore = waswasCategory.questions.length * 2; // 14
const percentage = Math.round((totalScore / maxScore) * 100); // 86% -> High risk!

const level = percentage > 65 ? "high" : percentage > 30 ? "medium" : "low";
const levelTitle = "তীব্র ওয়াসওয়াসা ও মানসিক চাপ (কাউন্সিলিং ও সংশ্রব প্রয়োজন)";

const prescription = {
  title: levelTitle,
  summary: "ধারাবাহিক আত্মিক কাউন্সিলিং, জামাআতে সালাত ও নিয়মিত সুন্নাহ আমল প্রয়োজন। শয়তানের কুমন্ত্রণাকে সম্পূর্ণ উপেক্ষা করে আল্লাহর ওপর ভরসা রাখুন।",
  steps: [
    "একাকী না থেকে সর্বদা দ্বীনদার ও পরহেজগার মানুষের সাহচর্যে সময় কাটান এবং পাঁচ ওয়াক্ত সালাত জামায়াতে আদায় করুন।",
    "নামাজে বা মনে ওয়াসওয়াসা আসলে 'আমান্তু বিল্লাহি ওয়া রুসুলিহি' বলুন এবং বাম দিকে ৩ বার মৃদু থুতু ফেলুন; রাকাআত ভুলে গেলে কম সংখ্যাটি ধরে সাহু সেজদা দিন।",
    "টয়লেটে প্রবেশের সুন্নাহ দোয়া, আয়াতুল কুরসি ও শোয়ার পূর্বে তিন কুলের মাসনুন আমল অবিচলভাবে চালিয়ে যান।",
    "আমাদের সেন্টারে অভিজ্ঞ বিজ্ঞ আলেমের নিকট সরাসরি আত্মিক কাউন্সিলিংয়ের জন্য পরামর্শ ও সহায়তা গ্রহণ করুন।"
  ],
  recommendedSurahs: [
    {
      name: "সূরা আন-নাস (ওয়াসওয়াসা দূরীকরণ)",
      arabicTitle: "سُورَةُ النَّاسِ",
      ref: "সূরা নং ১১৪, আয়াত ১-৬",
      arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
      bn: "বলুন, আমি আশ্রয় প্রার্থনা করছি মানুষের প্রতিপালকের, মানুষের অধিপতির, মানুষের উপাস্যের নিকট—আত্মগোপনকারী কুমন্ত্রণাদাতার অনিষ্ট থেকে...",
      instruction: "ওয়াসওয়াসা অনুভূত হলেই ৩ বার তিলাওয়াত করে বামে থুথু ফেলুন।"
    },
    {
      name: "আয়াতুল কুরসি (সর্বোচ্চ নিরাপত্তা)",
      arabicTitle: "آيَةُ الْكُرْسِيِّ",
      ref: "সূরা আল-বাকারা, আয়াত ২৫৫",
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ...",
      bn: "আল্লাহ ছাড়া কোনো সত্য ইলাহ নেই, তিনি চিরঞ্জীব, সর্বসত্তার ধারক। আসমান ও জমিনে যা কিছু রয়েছে সবই তাঁর...",
      instruction: "প্রতি ফরজ সালাতের পর ও শোয়ার পূর্বে ১ বার পাঠ করুন।"
    }
  ],
  audios: ["মানসিক প্রশান্তি ও ওয়াসওয়াসার রুকইয়াহ", "মনোবল বৃদ্ধি ও সুরক্ষা রুকইয়াহ"]
};

// SVG circular gauge calculation
const radius = 54;
const circumference = 2 * Math.PI * radius;
const offset = circumference - (percentage / 100) * circumference;

const reportId = "SAQ-WASWAS-8824";
const reportDate = "২৭ সেপ্টেম্বর, ২০২৬";

const html = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8" />
  <title>Shifa Al Quran Assessment Report - WASWAS</title>
  <style>
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
      src: url('data:font/woff2;base64,${amiriArabic}') format('woff2');
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
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- PAGE 1: COVER & EXECUTIVE SUMMARY          -->
  <!-- ========================================== -->
  <div class="report-section">
    <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 14px; border-bottom: 2.5px solid #047857;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="data:image/png;base64,${logoBase64}" alt="Logo" style="width: 52px; height: 52px; object-fit: contain; border-radius: 10px; border: 1.5px solid #d1fae5; padding: 2px;" />
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

    <div style="height: 2px; background: #d4af37; width: 100%; margin-top: 2px; margin-bottom: 16px;"></div>

    <!-- Metadata Grid -->
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
        <div style="font-size: 9.5pt; font-weight: 700; color: #047857; margin-top: 2px;">${waswasCategory.title}</div>
      </div>
      <div>
        <div style="font-size: 8pt; font-weight: 700; color: #64748b; text-transform: uppercase;">ভেরিফিকেশন স্ট্যাটাস</div>
        <div style="font-size: 9.5pt; font-weight: 700; color: #0f172a; margin-top: 2px;">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background: #10b981; margin-right: 4px;"></span>
          যাচাইকৃত (Verified)
        </div>
      </div>
    </div>

    <!-- Hero Score Component -->
    <div class="report-card" style="display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 20px 24px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03); margin-bottom: 18px;">
      <div style="text-align: center; flex-shrink: 0;">
        <div style="position: relative; width: 130px; height: 130px; margin: 0 auto;">
          <svg width="130" height="130" viewBox="0 0 130 130" style="transform: rotate(-90deg);">
            <circle cx="65" cy="65" r="${radius}" fill="none" stroke="#f1f5f9" stroke-width="10" />
            <circle cx="65" cy="65" r="${radius}" fill="none" stroke="#dc2626" stroke-width="10" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" />
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

      <div style="flex: 1;">
        <div style="font-size: 8.5pt; font-weight: 700; color: #64748b; text-transform: uppercase;">
          নির্ণীত ফলাফল ও ঝুঁকির স্তর
        </div>
        <h2 style="font-size: 15pt; font-weight: 800; color: #0f172a; margin: 3px 0 8px 0; line-height: 1.2;">
          ${levelTitle}
        </h2>

        <div style="display: inline-block; padding: 4px 14px; border-radius: 9999px; background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; font-size: 9.5pt; font-weight: 700; margin-bottom: 10px;">
          অগ্রাধিকার: জরুরি প্রত্যক্ষ পর্যবেক্ষণ কাম্য
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 8pt; color: #64748b; margin-bottom: 3px; font-weight: 600;">
            <span>স্বাভাবিক (০-৩০%)</span>
            <span>মাঝারি (৩১-৬৫%)</span>
            <span>উচ্চ ঝুঁকি (৬৬-১০০%)</span>
          </div>
          <div style="display: flex; height: 7px; border-radius: 9999px; overflow: hidden; gap: 2px; background: #f1f5f9;">
            <div style="flex: 30; background: #10b981; opacity: 0.3;"></div>
            <div style="flex: 35; background: #f59e0b; opacity: 0.3;"></div>
            <div style="flex: 35; background: #ef4444; opacity: 1;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Box -->
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

    <!-- 3 Metric Cards -->
    <div class="report-card" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
        <div style="font-size: 8pt; color: #64748b; font-weight: 600;">মূল্যায়িত প্রশ্নসংখ্যা</div>
        <div style="font-size: 12pt; font-weight: 800; color: #0f172a; margin-top: 2px;">
          ${toBnNumber(waswasCategory.questions.length)} টি প্রশ্ন
        </div>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
        <div style="font-size: 8pt; color: #64748b; font-weight: 600;">চিহ্নিত উপসর্গের তীব্রতা</div>
        <div style="font-size: 12pt; font-weight: 800; color: #dc2626; margin-top: 2px;">
          উচ্চ ঝুঁকি
        </div>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
        <div style="font-size: 8pt; color: #64748b; font-weight: 600;">নির্ধারিত সুন্নাহ আমল</div>
        <div style="font-size: 12pt; font-weight: 800; color: #047857; margin-top: 2px;">
          ${toBnNumber(prescription.steps.length)} টি ধাপ
        </div>
      </div>
    </div>

    <div class="running-footer">
      <div>শিফা আল কুরআন • <strong style="color: #047857;">saq.pro.bd</strong> • হটলাইন: 09639-000999</div>
      <div style="font-weight: 600; color: #047857;">কুরআন ও সুন্নাহ ভিত্তিক আত্মিক সুস্থতা</div>
      <div style="font-weight: 700; color: #0f172a;">পৃষ্ঠা ১ / ৪</div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 2: ASSESSMENT OVERVIEW & QUESTIONS   -->
  <!-- ========================================== -->
  <div class="report-section">
    <div class="running-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        <img src="data:image/png;base64,${logoBase64}" alt="Logo" style="width: 24px; height: 24px; object-fit: contain;" />
        <div>
          <span style="font-weight: 700; font-size: 10pt; color: #022c22;">শিফা আল কুরআন</span>
          <span style="color: #cbd5e1; margin: 0 6px;">|</span>
          <span style="font-size: 9pt; color: #047857; font-weight: 600;">অ্যাসেসমেন্ট বিশ্লেষণ ও প্রশ্নোত্তর পর্যালোচনা</span>
        </div>
      </div>
      <div style="font-size: 8.5pt; color: #64748b; font-family: monospace; font-weight: 600;">DOC ID: #${reportId}</div>
    </div>

    <div style="margin-bottom: 14px;">
      <div style="font-size: 8.5pt; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.05em;">
        SECTION 02 — OVERVIEW & EVALUATION
      </div>
      <h2 style="font-size: 14pt; font-weight: 800; color: #0f172a; margin: 2px 0 0 0;">
        অ্যাসেসমেন্ট বিশ্লেষণ ও প্রশ্নোত্তর পর্যালোচনা
      </h2>
    </div>

    <div class="report-card" style="padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 14px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
        <div style="font-size: 10.5pt; font-weight: 800; color: #0f172a;">
          ${waswasCategory.title} (${waswasCategory.subtitle})
        </div>
        <span style="font-size: 8.5pt; font-weight: 700; padding: 2px 8px; border-radius: 9999px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">
          ${waswasCategory.badge}
        </span>
      </div>
      <p style="font-size: 9pt; color: #475569; margin: 0; line-height: 1.5;">
        ${waswasCategory.description}
      </p>
    </div>

    <div class="report-card" style="margin-bottom: 16px;">
      <h3 style="font-size: 10pt; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; display: flex; align-items: center; gap: 6px;">
        <span style="width: 6px; height: 6px; border-radius: 9999px; background: #047857;"></span>
        যাচাইকৃত প্রশ্নাবলি ও ব্যবহারকারীর উত্তর:
      </h3>

      <div style="display: flex; flex-direction: column; gap: 6px;">
        ${waswasCategory.questions.map((q, idx) => {
          const w = userAnswers[q.id];
          const isAffirmative = w === 2;
          const isSometimes = w === 1;
          const label = isAffirmative ? "চিহ্নিত (হ্যাঁ)" : isSometimes ? "মাঝে মধ্যে" : "অনুপস্থিত (না)";
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
                  ${q.text}
                </span>
              </div>
              <span style="padding: 2px 8px; border-radius: 9999px; font-size: 8pt; font-weight: 700; flex-shrink: 0; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder};">
                ${label}
              </span>
            </div>
          `;
        }).join("")}
      </div>
    </div>

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

    <div class="running-footer">
      <div>শিফা আল কুরআন • <strong style="color: #047857;">saq.pro.bd</strong> • হটলাইন: 09639-000999</div>
      <div style="font-weight: 600; color: #047857;">গোপনীয় ও সংরক্ষিত রুকইয়াহ অ্যাসেসমেন্ট</div>
      <div style="font-weight: 700; color: #0f172a;">পৃষ্ঠা ২ / ৪</div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 3: RECOMMENDED ACTIONS PROTOCOL       -->
  <!-- ========================================== -->
  <div class="report-section">
    <div class="running-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        <img src="data:image/png;base64,${logoBase64}" alt="Logo" style="width: 24px; height: 24px; object-fit: contain;" />
        <div>
          <span style="font-weight: 700; font-size: 10pt; color: #022c22;">শিফা আল কুরআন</span>
          <span style="color: #cbd5e1; margin: 0 6px;">|</span>
          <span style="font-size: 9pt; color: #047857; font-weight: 600;">সুন্নাহসম্মত নির্দেশিকা ও করণীয় আমলসমূহ</span>
        </div>
      </div>
      <div style="font-size: 8.5pt; color: #64748b; font-family: monospace; font-weight: 600;">DOC ID: #${reportId}</div>
    </div>

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

    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px;">
      ${prescription.steps.map((step, idx) => `
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
            সন্ধ্যার হেফাজতের দোয়াসমূহ এবং প্রয়োজনবোধে রুকইয়াহর গোসল সম্পন্ন।
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

    <div class="running-footer">
      <div>শিফা আল কুরআন • <strong style="color: #047857;">saq.pro.bd</strong> • হটলাইন: 09639-000999</div>
      <div style="font-weight: 600; color: #b45309;">ধারাবাহিকতা ও তাওয়াক্কুল আবশ্যক</div>
      <div style="font-weight: 700; color: #0f172a;">পৃষ্ঠা ৩ / ৪</div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGE 4: QURANIC PRESCRIPTION & SEAL        -->
  <!-- ========================================== -->
  <div class="report-section">
    <div class="running-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        <img src="data:image/png;base64,${logoBase64}" alt="Logo" style="width: 24px; height: 24px; object-fit: contain;" />
        <div>
          <span style="font-weight: 700; font-size: 10pt; color: #022c22;">শিফা আল কুরআন</span>
          <span style="color: #cbd5e1; margin: 0 6px;">|</span>
          <span style="font-size: 9pt; color: #047857; font-weight: 600;">প্রস্তাবিত কুরআন তিলাওয়াত ও রুকইয়াহ আমল</span>
        </div>
      </div>
      <div style="font-size: 8.5pt; color: #64748b; font-family: monospace; font-weight: 600;">DOC ID: #${reportId}</div>
    </div>

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

    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
      ${prescription.recommendedSurahs.map((item) => `
        <div class="report-card" style="padding: 12px 16px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div>
              <span style="font-size: 10pt; font-weight: 800; color: #0f172a;">${item.name}</span>
              <span style="font-size: 8pt; color: #64748b; margin-left: 6px;">(${item.ref})</span>
            </div>
            <span style="font-size: 8pt; font-weight: 700; padding: 2px 8px; border-radius: 9999px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">
              ${item.arabicTitle}
            </span>
          </div>

          <div dir="rtl" class="arabic-text" style="background: #fbfdfc; padding: 8px 12px; border-radius: 6px; border: 1px solid #ecfdf5; margin-bottom: 6px;">
            ${item.arabic}
          </div>

          <div style="font-size: 8.5pt; color: #475569; margin-bottom: 4px; line-height: 1.45;">
            <strong style="color: #0f172a;">অর্থ:</strong> ${item.bn}
          </div>
          <div style="font-size: 8pt; color: #b45309; font-weight: 600;">
            ✦ আমল নির্দেশ: ${item.instruction}
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Ruqyah Audio Strip -->
    <div class="report-card" style="padding: 10px 14px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; margin-bottom: 12px;">
      <div style="font-size: 9pt; font-weight: 700; color: #065f46; margin-bottom: 4px;">
        প্রস্তাবিত রুকইয়াহ অডিও (মনোযোগ সহকারে শুনুন):
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${prescription.audios.map((a) => `
          <span style="padding: 3px 8px; border-radius: 4px; background: #ffffff; border: 1px solid #6ee7b7; color: #065f46; font-size: 8pt; font-weight: 600;">
            🎧 ${a}
          </span>
        `).join("")}
      </div>
    </div>

    <!-- Official Seal & Authorized Sign-off Card -->
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

    <!-- Disclaimer Box -->
    <div class="report-card" style="padding: 10px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 8pt; color: #64748b; line-height: 1.45; margin-bottom: 12px;">
      <strong style="color: #0f172a;">জরুরি শরঈ ও চিকিৎসা সতর্কতা:</strong> এটি শিফা আল কুরআন প্ল্যাটফর্মের স্বয়ংক্রিয় রুকইয়াহ মূল্যায়ন রিপোর্ট। কুরআন ও সহিহ হাদিসের নির্দেশনার আলোকে প্রস্তুতকৃত। রুকইয়াহ শারইয়াহ হলো আত্মিক রোগমুক্তি ও হিফাযতের সুন্নাহসম্মত মাধ্যম। কোনো গুরুতর বা দীর্ঘস্থায়ী শারীরিক ও মানসিক রোগের ক্ষেত্রে রেজিস্টার্ড চিকিৎসকের চিকিৎসা এবং সুন্নাহ আমল উভয়টি একসাথে চালিয়ে যাওয়া ইসলামের বিধান।
    </div>

    <!-- Contact Strip -->
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

    <div class="running-footer">
      <div>ইস্যু তারিখ: ${reportDate}</div>
      <div style="font-weight: 700; color: #047857;">শিফা আল কুরআন • সর্বস্বত্ব সংরক্ষিত</div>
      <div style="font-weight: 700; color: #0f172a;">পৃষ্ঠা ৪ / ৪ (সমাপ্ত)</div>
    </div>
  </div>

</body>
</html>
`;

async function run() {
  console.log("Launching Chromium via Playwright...");
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  console.log("Setting HTML content and awaiting fonts...");
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);

  console.log("Generating A4 PDF...");
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' }
  });

  const outPath = path.join(__dirname, '..', 'Shifa-Al-Quran-Assessment-Report-WASWAS.pdf');
  const htmlPath = path.join(__dirname, '..', 'Shifa-Al-Quran-Assessment-Report-WASWAS.html');
  fs.writeFileSync(outPath, pdfBuffer);
  fs.writeFileSync(htmlPath, html);

  console.log("SUCCESS! Generated PDF:", outPath);
  console.log("SUCCESS! Generated HTML:", htmlPath);
  console.log("PDF File Size:", pdfBuffer.length, "bytes");

  // Inspect page count
  const pdfStr = pdfBuffer.toString('latin1');
  const pageMatches = pdfStr.match(/\/Type\s*\/Page\b/g);
  console.log("Page Count:", pageMatches ? pageMatches.length : 'unknown');

  await browser.close();
}

run().catch(console.error);
