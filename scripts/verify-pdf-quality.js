const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:\\Users\\iamneyamat\\.gemini\\antigravity-ide\\brain\\83a948fd-ed6f-4ba3-966e-b5939b4b9d28';

async function verify() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  const htmlPath = path.join(__dirname, '..', 'Shifa-Al-Quran-Assessment-Report-WASWAS.html');
  const html = fs.readFileSync(htmlPath, 'utf-8');

  await page.setViewportSize({ width: 794, height: 1123 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);

  const sections = await page.$$('.report-section');
  console.log(`Found ${sections.length} report sections!`);

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const outPath = path.join(ARTIFACTS_DIR, `waswas_page_${i + 1}.png`);
    await sec.screenshot({ path: outPath });
    console.log(`Saved screenshot of Page ${i + 1} to: ${outPath} (size: ${fs.statSync(outPath).size} bytes)`);
  }

  await browser.close();
}

verify().catch(console.error);
