import { chromium, Browser } from "playwright-core";
import fs from "fs";
import { AssessmentReportData } from "../types/report";
import { renderFullReportHtml } from "./reportTemplate";

const CANDIDATE_PATHS = [
  process.env.CHROME_BIN,
  process.env.CHROMIUM_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}\\Microsoft\\Edge\\Application\\msedge.exe` : "",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe` : "",
  "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/snap/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
].filter(Boolean) as string[];

let cachedBrowser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (cachedBrowser && cachedBrowser.isConnected()) {
    return cachedBrowser;
  }

  // 1. Direct executable detection (fastest, skips registry scanning)
  for (const p of CANDIDATE_PATHS) {
    try {
      if (fs.existsSync(p)) {
        cachedBrowser = await chromium.launch({
          executablePath: p,
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--font-render-hinting=none",
          ],
        });
        return cachedBrowser;
      }
    } catch (e) {
      console.warn(`Failed to launch browser from ${p}:`, e);
    }
  }

  // 2. Channel detection (if path wasn't in static list)
  for (const channel of ["msedge", "chrome", "chromium"]) {
    try {
      cachedBrowser = await chromium.launch({
        channel,
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
      });
      return cachedBrowser;
    } catch {
      // Continue to next channel
    }
  }

  // 3. Fallback to default chromium launch
  cachedBrowser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
  return cachedBrowser;
}

export async function generateAssessmentPdf(data: AssessmentReportData): Promise<Buffer> {
  const html = renderFullReportHtml(data);
  const browser = await getBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Set viewport to standard A4 at 96 DPI (794 x 1123)
    await page.setViewportSize({ width: 794, height: 1123 });

    // Set HTML content and wait for network/fonts to settle
    await page.setContent(html, { waitUntil: "load", timeout: 15000 });

    // Ensure all web fonts are loaded
    await page.evaluate(() => document.fonts.ready).catch(() => {});

    // Short layout settling buffer
    await page.waitForTimeout(50);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px",
      },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
  }
}
