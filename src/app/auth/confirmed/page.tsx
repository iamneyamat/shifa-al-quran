import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ConfirmedClientContent } from './confirmed-client'
import { RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ইমেইল ভেরিফিকেশন | Shifa Al Quran',
  description: 'Shifa Al Quran ইমেইল ভেরিফিকেশন স্ট্যাটাস পেজ',
  robots: {
    index: false,
    follow: false,
  },
}

function FallbackLoading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="rounded-2xl border border-hairline bg-surface-raised/95 p-8 shadow-card text-center max-w-md w-full">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 mb-6">
          <RefreshCw className="h-8 w-8 text-interactive animate-spin" />
        </div>
        <h1 className="type-title text-ink-strong mb-2 font-bold">
          যাচাই করা হচ্ছে...
        </h1>
        <p className="type-body-sm text-ink-body">
          অনুগ্রহ করে অপেক্ষা করুন...
        </p>
      </div>
    </div>
  )
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <ConfirmedClientContent />
    </Suspense>
  )
}
