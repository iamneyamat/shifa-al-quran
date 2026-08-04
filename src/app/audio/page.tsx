import * as React from "react";
import { Headphones, Download } from "lucide-react";

export const metadata = {
  title: "রুকইয়াহ অডিও ডাউনলোড | শিফা আল কুরআন",
  description: "কুরআন ও সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়াহ অডিও ডাউনলোড করুন।",
};

const audios = [
  {
    "title": "বদনজর (Evil Eye) | বদনজরের রুকইয়াহ",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-EvilEye-ruqyahbd.org.mp3",
    "size": "১০এমবি (৫৫মিনিট)"
  },
  {
    "title": "বদনজর (Eye Hasad)",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-EyeHasad-ruqyahbd.org.mp3",
    "size": "১৬এমবি (১ঘণ্টা ৩৪মিনিট)"
  },
  {
    "title": "জাদু ও জিন (Sihr-Mass) | সিহরের রুকইয়াহ",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Sihr-Mass-ruqyahbd.org.mp3",
    "size": "১৪এমবি (১ঘন্টা ১৬মিনিট)"
  },
  {
    "title": "কালো যাদু, বান এবং জিন (Sihr-Hibshi)",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Sihr-Hibshi-ruqyahbd.org.mp3",
    "size": "১৬এমবি (১ঘন্টা ৩৪মিনিট)"
  },
  {
    "title": "আয়াতুল হারক",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Harq-ruqyahbd.org.mp3",
    "description": "আযাব এবং জাহান্নাম সংক্রান্ত আয়াত",
    "size": "১৪এমবি (৪৬মিনিট)"
  },
  {
    "title": "জিনের আছর এর রুকইয়াহ",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Jinn-ruqyahbd.org.mp3",
    "description": "জিন সংক্রান্ত সব সমস্যায় উপকারী আয়াতগুলো",
    "size": "১৯এমবি (১ঘন্টা ৪৮মিনিট)"
  },
  {
    "title": "তিনকুল এর রুকইয়াহ",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-3Kul-ruqyahbd.org.mp3",
    "description": "সুরা ইখলাস, ফালাক, নাস এর পুনরাবৃত্তি",
    "size": "৭এমবি (৩০ মিনিট)"
  },
  {
    "title": "আট সুরার রুকইয়াহ",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-8surah-ruqyahbd.org.mp3",
    "description": "সুরা ইয়াসিন, সফফাত, দুখান, জিন, যিলযাল, ৩কুল",
    "size": "১২এমবি (৫১ মিনিট)"
  },
  {
    "title": "আয়াতুল কুরসির রুকইয়াহ",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-AyatulKursi-ruqyahbd.org.mp3",
    "size": "৭এমবি (৩০ মিনিট)"
  },
  {
    "title": "যادুকরদের প্রতি অভিশাপ",
    "url": "https://files.ruqyahbd.org/audio/curse-against-magician-ruqyahbd.org.mp3",
    "size": "৪এমবি (১৩মিনিট)"
  },
  {
    "title": "শাইখ আস-সুদাইস",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Sudais-ruqyahbd.org.mp3",
    "size": "৮এমবি (৪৩ মিনিট)"
  },
  {
    "title": "শাইখ হুজাইফি",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Hujaifi-ruqyahbd.org.mp3",
    "size": "৯এমবি (১ঘন্টা ২০মিনিট)"
  },
  {
    "title": "শাইখ আশ-শুরাইম",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Shuraim-ruqyahbd.org.mp3",
    "size": "১৪ এমবি (৫৮মিনিট)"
  },
  {
    "title": "সা'দ আল-গামিদী",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Ghamidi-ruqyahbd.org.mp3",
    "size": "১৩এমবি (৩২মিনিট)"
  },
  {
    "title": "মিশারী রাশেদ আল-আফাসী",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Mishary-ruqyahbd.org.mp3",
    "size": "৯এমবি (১ঘন্টা ১৪মিনিট)"
  },
  {
    "title": "শাইখ আহমাদ আজমি",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-AhmadAjmy-ruqyahbd.org.mp3",
    "size": "১৪এমবি (১ঘন্টা ১৮মিনিট)"
  },
  {
    "title": "নাসের আল কাতামি",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-NasserQatami-ruqyahbd.org.mp3",
    "size": "১৮এমবি (৫২মিনিট)"
  },
  {
    "title": "শাইখ ইদরীস আবকার",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-IdreesAbkar-ruqyahbd.org.mp3",
    "size": "১৮এমবি (১ঘন্টা ১৬মিনিট)"
  },
  {
    "title": "খালিদ আল হিবশী",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-KhalidHibshi-ruqyahbd.org.mp3",
    "size": "১৯এমবি (১ঘন্টা ৮মিনিট)"
  },
  {
    "title": "শাইখ লুহাইদান",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Luhaidan-ruqyahbd.org.mp3",
    "size": "৮এমবি (৪৪মিনিট)"
  },
  {
    "title": "মুফতি জুনাইদের সিডি থেকে",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-JunaidCD1-ruqyahbd.org.mp3",
    "size": "১১এমবি (২৩মিনিট)"
  },
  {
    "title": "মাজিদ আয-যামিল",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-MajidZamil-ruqyahbd.org.mp3",
    "size": "৫ এমবি (১৭মিনিট)"
  },
  {
    "title": "রুকইয়া - দু'আ",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-dua-ruqyahbd.org.mp3",
    "size": "৪এমবি (১০ মিনিট)"
  },
  {
    "title": "আযান রুকইয়াহ (পুনরাবৃত্তি)",
    "url": "http://bitly.com/2YoCfEq",
    "size": "১৫ মেগাবাইট (১৬ মিনিট)"
  },
  {
    "title": "সুরা বাকারা - শাইখ সুদাইস",
    "url": "https://files.ruqyahbd.org/audio/Surah-Baqara-by-Sudais-ruqyahbd.org.mp3",
    "size": "১ঘণ্টা ৩৬মিনিট (২৩এমবি)"
  },
  {
    "title": "সুরা ফাতিহার রুকইয়াহ",
    "isNew": true,
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-SuraFatiha-ruqyahbd.org.mp3",
    "size": "২৯এমবি (১ঘন্টা)"
  },
  {
    "title": "যিনা ফাহিশা বিষয়ক (ruqyah zina)",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Zina-ruqyahbd.org.mp3",
    "size": "১৮এমবি (১ঘন্টা ৫মিনিট)"
  },
  {
    "title": "শিফা - সাকিনাহ",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Shifa-Sakina-ruqyahbd.org.mp3",
    "size": "১৪এমবি (৪৭ মিনিট)"
  },
  {
    "title": "রুকইয়াহ খুরুজ",
    "url": "https://files.ruqyahbd.org/audio/Ruqyah-Khuruj-ruqyahbd.org.mp3",
    "size": "১২ মেগাবাইট (৪৫ মিনিট)"
  }
];

export default function AudioPage() {
  return (
    <div className="min-h-screen bg-light-bg-main dark:bg-slate-950 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Headphones className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-light-heading dark:text-white sm:text-5xl mb-6">
            রুকইয়াহ অডিও কালেকশন
          </h1>
          <p className="text-lg text-light-text dark:text-slate-300 leading-relaxed">
            এখানে বিভিন্ন সমস্যার সমাধানের জন্য কুরআন ও সুন্নাহ ভিত্তিক রুকইয়াহ অডিও দেওয়া আছে। আপনি চাইলে সরাসরি শুনতে অথবা ডাউনলোড করে রাখতে পারেন।
          </p>
        </div>

        {/* Audio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audios.map((audio, index) => (
            <div 
              key={index} 
              className="flex flex-col bg-light-bg-alt2 dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-light-border dark:border-slate-800 transition-all hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800"
            >
              <h3 className="flex items-center flex-wrap gap-2 text-lg font-bold text-light-heading dark:text-slate-100 mb-2 leading-snug">
                {audio.title}
                {audio.isNew && (
                  <span className="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 uppercase tracking-widest">
                    New
                  </span>
                )}
              </h3>
              
              {audio.description && (
                <p className="text-[15px] text-light-text dark:text-slate-300 mb-2">
                  {audio.description}
                </p>
              )}
              
              {audio.size && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  সাইজ: {audio.size}
                </p>
              )}
              
              <div className="mt-auto pt-4 flex flex-col gap-4">
                <audio 
                  controls 
                  controlsList="nodownload noplaybackrate"
                  className="w-full h-10 outline-none"
                  preload="none"
                >
                  <source src={audio.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                
                <a 
                  href={audio.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                >
                  <Download className="h-4 w-4" />
                  ডাউনলোড করুন
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
