// Bengali number helper
export function toBnNumber(num: number | string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)] ?? d);
}

// Bengali date formatter — always Asia/Dhaka, never the runtime's local
// timezone. The old version used date.getDate()/getMonth()/getFullYear(),
// which on the Vercel server (UTC) gave the previous day in the Dhaka
// evening, while the result page (browser, Dhaka) showed the correct day
// — so the same report showed two different dates.
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
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const dayNum = Number(get("day"));
  const monthNum = Number(get("month"));
  const yearNum = Number(get("year"));
  if (!dayNum || !monthNum || !yearNum) {
    // Fallback to the old local-time behaviour if Intl parts are unavailable.
    const day = toBnNumber(date.getDate());
    const month = months[date.getMonth()];
    const year = toBnNumber(date.getFullYear());
    return `${day} ${month}, ${year}`;
  }
  return `${toBnNumber(dayNum)} ${months[monthNum - 1]}, ${toBnNumber(yearNum)}`;
}
