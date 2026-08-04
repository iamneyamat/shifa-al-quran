import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রাইভেসি পলিসি",
};

export default function PrivacyPage() {
  return (
    <div className="bg-light-bg-main dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-light-heading dark:text-white mb-8">প্রাইভেসি পলিসি</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            শিফা আল কুরআন - এ আপনাদের গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা কীভাবে আপনাদের তথ্য সংগ্রহ করি এবং ব্যবহার করি তা এই পলিসিতে উল্লেখ করা হলো।
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">তথ্য সংগ্রহ</h2>
          <p>
            অ্যাপয়েন্টমেন্ট বুকিং বা যোগাযোগের সময় আমরা আপনার নাম, ফোন নম্বর এবং সমস্যার সাধারণ বিবরণ সংগ্রহ করতে পারি। এই তথ্যগুলো শুধুমাত্র আপনার সাথে যোগাযোগ এবং চিকিৎসার সুবিধার্থে ব্যবহার করা হয়।
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">তথ্য সুরক্ষা</h2>
          <p>
            আমরা আপনাদের ব্যক্তিগত তথ্য সম্পূর্ণ গোপন রাখি। রোগীর কোনো ব্যক্তিগত তথ্য বা রোগের বিবরণ তৃতীয় কোনো পক্ষের সাথে শেয়ার করা হয় না।
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">যোগাযোগ</h2>
          <p>
            আমাদের প্রাইভেসি পলিসি সম্পর্কে কোনো প্রশ্ন থাকলে shifaalquran11@gmail.com ঠিকানায় যোগাযোগ করতে পারেন।
          </p>
        </div>
      </div>
    </div>
  );
}
