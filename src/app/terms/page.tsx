import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "শর্তাবলী",
};

export default function TermsPage() {
  return (
    <div className="bg-light-bg-main dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-light-heading dark:text-white mb-8">শর্তাবলী</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            শিফা আল কুরআন - এর ওয়েবসাইট এবং সেবা ব্যবহারের আগে অনুগ্রহ করে নিচের শর্তাবলী পড়ে নিন।
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">সাধারণ শর্তাবলী</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>আমরা শুধুমাত্র কোরআন ও সুন্নাহ ভিত্তিক শরীয়াহ সম্মত রুকইয়াহ করে থাকি।</li>
            <li>চিকিৎসার ফলাফল সম্পূর্ণ আল্লাহর ওপর নির্ভরশীল। আমরা কোনো গ্যারান্টি প্রদান করি না।</li>
            <li>রোগীকে অবশ্যই ইসলামী শরীয়তের বিধান (নামাজ, পর্দা ইত্যাদি) মেনে চলতে হবে।</li>
            <li>মহিলা রোগীদের রুকইয়াহ করার সময় অবশ্যই মাহরাম সাথে থাকতে হবে।</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">অ্যাপয়েন্টমেন্ট</h2>
          <p>
            অ্যাপয়েন্টমেন্ট বাতিল বা পরিবর্তন করতে চাইলে অনুগ্রহ করে কমপক্ষে ২৪ ঘণ্টা আগে আমাদের অবহিত করুন। সিরিয়াল অনুযায়ী চিকিৎসা প্রদান করা হয়।
          </p>
        </div>
      </div>
    </div>
  );
}
