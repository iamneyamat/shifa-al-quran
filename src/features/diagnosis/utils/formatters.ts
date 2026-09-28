// Bengali number helper
export function toBnNumber(num: number | string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)] ?? d);
}

// Bengali date formatter
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
