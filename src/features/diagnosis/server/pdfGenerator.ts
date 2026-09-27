import { chromium, Browser } from "playwright-core";
import fs from "fs";
import { AssessmentReportData } from "../types/report";
import { renderFullReportHtml } from "./reportTemplate";

const EDGE_PATHS = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

async function launchChromium(): Promise<Browser> {
  const envPath = process.env.CHROME_BIN || process.env.CHROMIUM_PATH;
  if (envPath && fs.existsSync(envPath)) {
    return await chromium.launch({
      executablePath: envPath,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  }

  // Attempt standard channel first (msedge on Windows)
  try {
    return await chromium.launch({
      channel: "msedge",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  } catch {
    // Channel msedge failed, check standard file paths
  }

  for (const p of EDGE_PATHS) {
    if (fs.existsSync(p)) {
      return await chromium.launch({
        executablePath: p,
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
      });
    }
  }

  // Fallback to default chromium launch
  return await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
}

export async function generateAssessmentPdf(data: AssessmentReportData): Promise<Buffer> {
  const html = renderFullReportHtml(data);
  let browser: Browser | null = null;

  try {
    browser = await launchChromium();
    const page = await browser.newPage();

    // Set viewport to standard A4 at 96 DPI (794 x 1123)
    await page.setViewportSize({ width: 794, height: 1123 });

    // Set HTML content and wait for network/fonts to settle
    await page.setContent(html, { waitUntil: "load" });

    // Ensure all web fonts are loaded
    await page.evaluate(() => document.fonts.ready);

    // Short layout settling buffer
    await page.waitForTimeout(100);

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
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}
