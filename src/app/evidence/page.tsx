import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ইসলামিক প্রমাণ",
  description: "কোরআন ও সুন্নাহর আলোকে রুকইয়াহ শারইয়াহ এর প্রমাণসমূহ।",
};

export default function EvidencePage() {
  return (
    <div className="bg-light-bg-main dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-light-heading dark:text-white mb-6">
            কোরআন ও সুন্নাহর প্রমাণ
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Quranic Evidence */}
          <div className="bg-light-bg-alt2 dark:bg-slate-900 rounded-2xl p-8 border border-light-border dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-3">
              <span className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg">১</span>
              পবিত্র কোরআন থেকে প্রমাণ
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-light-bg-main dark:bg-slate-800/50 rounded-xl border border-light-border dark:border-slate-700">
                <p className="text-2xl font-arabic text-right mb-4 text-light-heading dark:text-slate-200" dir="rtl">
                  وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ
                </p>
                <p className="text-light-text dark:text-slate-300 font-medium">
                  অর্থ: &quot;আমি কোরআনে এমন বিষয় নাযিল করি যা মুমিনদের জন্য আরোগ্য ও রহমত।&quot;
                </p>
                <p className="text-sm text-slate-500 mt-2">— (সূরা বনী ইসরাঈল: ৮২)</p>
              </div>

              <div className="p-6 bg-light-bg-main dark:bg-slate-800/50 rounded-xl border border-light-border dark:border-slate-700">
                <p className="text-2xl font-arabic text-right mb-4 text-light-heading dark:text-slate-200" dir="rtl">
                  قُلْ هُوَ لِلَّذِينَ آمَنُوا هُدًى وَشِفَاءٌ
                </p>
                <p className="text-light-text dark:text-slate-300 font-medium">
                  অর্থ: &quot;বলুন, এটি (কোরআন) মুমিনদের জন্য হেদায়েত ও আরোগ্য।&quot;
                </p>
                <p className="text-sm text-slate-500 mt-2">— (সূরা হা-মীম সিজদাহ: ৪৪)</p>
              </div>
            </div>
          </div>

          {/* Hadith Evidence */}
          <div className="bg-light-bg-alt2 dark:bg-slate-900 rounded-2xl p-8 border border-light-border dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-3">
              <span className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg">২</span>
              হাদিস থেকে প্রমাণ
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-light-bg-main dark:bg-slate-800/50 rounded-xl border border-light-border dark:border-slate-700">
                <p className="text-light-text dark:text-slate-300 mb-3">
                  আয়েশা (রা.) থেকে বর্ণিত, রাসূলুল্লাহ (সা.) যখন অসুস্থ হতেন, তখন তিনি সূরা ফালাক ও সূরা নাস পড়ে নিজের ওপর ফুঁ দিতেন।
                </p>
                <p className="text-sm text-slate-500">— (সহিহ বুখারি: ৫০১৬)</p>
              </div>

              <div className="p-6 bg-light-bg-main dark:bg-slate-800/50 rounded-xl border border-light-border dark:border-slate-700">
                <p className="text-light-text dark:text-slate-300 mb-3">
                  আবু সাঈদ খুদরি (রা.) থেকে বর্ণিত, একদল সাহাবী এক গোত্রপতির সাপে কাটার চিকিৎসা করেছিলেন সূরা ফাতিহা পড়ে ফুঁ দেওয়ার মাধ্যমে এবং সে ব্যক্তি সম্পূর্ণ সুস্থ হয়ে যায়। রাসূল (সা.) পরবর্তীতে এই কাজটিকে সমর্থন করেছিলেন।
                </p>
                <p className="text-sm text-slate-500">— (সহিহ বুখারি: ২২৭৬)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
