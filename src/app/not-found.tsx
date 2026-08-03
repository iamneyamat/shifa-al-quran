export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-slate-50 dark:bg-slate-950">
      <div className="text-center px-4">
        <h1 className="text-9xl font-black text-emerald-100 dark:text-emerald-900/30">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-4 mb-2">পৃষ্ঠাটি পাওয়া যায়নি</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা লিংকটি ভুল। দয়া করে সঠিক লিংক ব্যবহার করুন অথবা হোম পেজে ফিরে যান।
        </p>
        <a href="/" className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-600 px-8 text-base font-medium text-white shadow transition-colors hover:bg-emerald-700">
          হোম পেজে ফিরে যান
        </a>
      </div>
    </div>
  );
}
