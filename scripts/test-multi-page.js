const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function check() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  const hindRegular = fs.readFileSync(path.join(__dirname, '..', 'public', 'fonts', 'HindSiliguri-400-bengali.woff2')).toString('base64');
  const hindBold = fs.readFileSync(path.join(__dirname, '..', 'public', 'fonts', 'HindSiliguri-700-bengali.woff2')).toString('base64');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          @font-face {
            font-family: 'Hind Siliguri';
            src: url(data:font/woff2;base64,${hindRegular}) format('woff2');
            font-weight: 400;
          }
          @font-face {
            font-family: 'Hind Siliguri';
            src: url(data:font/woff2;base64,${hindBold}) format('woff2');
            font-weight: 700;
          }
          @page {
            size: A4 portrait;
            margin: 15mm 15mm 18mm 15mm;
          }
          body {
            font-family: 'Hind Siliguri', sans-serif;
            margin: 0;
            padding: 0;
            color: #0f172a;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .page-section {
            break-after: page;
            page-break-after: always;
          }
          .page-section:last-child {
            break-after: auto;
            page-break-after: auto;
          }
          .card {
            break-inside: avoid;
            page-break-inside: avoid;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 16px;
            margin-bottom: 12px;
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        <div class="page-section">
          <h1>পৃষ্ঠা ১: সারসংক্ষেপ ও কভার</h1>
          <div class="card">শিফা আল কুরআন অফিসিয়াল অ্যাসেসমেন্ট রিপোর্ট</div>
        </div>
        <div class="page-section">
          <h1>পৃষ্ঠা ২: মূল্যায়ন বিশ্লেষণ</h1>
          <div class="card">লক্ষণ ও প্রশ্নের উত্তরসমূহ</div>
        </div>
        <div class="page-section">
          <h1>পৃষ্ঠা ৩: করণীয় নির্দেশিকা</h1>
          <div class="card">আমল ১ ও পরামর্শ</div>
          <div class="card">আমল ২ ও পরামর্শ</div>
        </div>
        <div class="page-section">
          <h1>পৃষ্ঠা ৪: কুরআন ও সুন্নাহ প্রেসক্রিপশন</h1>
          <div class="card">সূরা ও আয়াতসমূহ</div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true
  });

  const outPath = path.join(__dirname, '..', 'test-multi-page.pdf');
  fs.writeFileSync(outPath, pdf);
  console.log('Generated test-multi-page.pdf, size:', pdf.length);

  // Let's inspect page count in PDF
  const pdfStr = pdf.toString('latin1');
  const pageMatches = pdfStr.match(/\/Type\s*\/Page\b/g);
  console.log('PDF Page count:', pageMatches ? pageMatches.length : 'unknown');

  await browser.close();
}

check().catch(console.error);
