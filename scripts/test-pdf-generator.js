const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function test() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  const hindRegular = fs.readFileSync(path.join(__dirname, '..', 'public', 'fonts', 'HindSiliguri-400-bengali.woff2')).toString('base64');
  const hindBold = fs.readFileSync(path.join(__dirname, '..', 'public', 'fonts', 'HindSiliguri-700-bengali.woff2')).toString('base64');
  const amiriArabic = fs.readFileSync(path.join(__dirname, '..', 'public', 'fonts', 'Amiri-400-arabic.woff2')).toString('base64');

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
          @font-face {
            font-family: 'Amiri';
            src: url(data:font/woff2;base64,${amiriArabic}) format('woff2');
            font-weight: 400;
          }
          @page {
            size: A4;
            margin: 0;
          }
          body {
            font-family: 'Hind Siliguri', sans-serif;
            padding: 40px;
            color: #0f172a;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .bengali {
            font-size: 24px;
            font-weight: 700;
            color: #022c22;
          }
          .arabic {
            font-family: 'Amiri', serif;
            font-size: 28px;
            direction: rtl;
            color: #047857;
            margin-top: 16px;
          }
        </style>
      </head>
      <body>
        <div class="bengali">শিফা আল কুরআন — অফিসিয়াল ডায়াগনোসিস ও অ্যাসেসমেন্ট রিপোর্ট</div>
        <p>আপনার ওয়াসওয়াসা ও মানসিক কষ্টের সুন্নাহসম্মত রুকইয়াহ প্রেসক্রিপশন।</p>
        <div class="arabic" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ</div>
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true
  });

  const outPath = path.join(__dirname, '..', 'test-font-output.pdf');
  fs.writeFileSync(outPath, pdfBuffer);
  console.log('Successfully generated test-font-output.pdf! Size:', pdfBuffer.length, 'bytes');
  await browser.close();
}

test().catch(console.error);
