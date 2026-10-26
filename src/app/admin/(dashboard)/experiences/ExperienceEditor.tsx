'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { saveExperience } from './actions'
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

const CATEGORIES = ['রুকইয়াহ', 'পরামর্শ', 'অন্যান্য'] as const
const MEDIA_TYPES = [
  { value: 'text', label: 'লেখা' },
  { value: 'image', label: 'ছবি' },
  { value: 'video', label: 'ভিডিও' },
  { value: 'audio', label: 'অডিও' },
] as const

const inputClass =
  'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
const labelClass = 'block text-xs font-semibold text-gray-700 mb-1.5'

export default function ExperienceEditor({
  initialData,
}: {
  initialData?: Record<string, unknown> | null
}) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: (initialData?.id as string) || '',
    customer_name: (initialData?.customer_name as string) || '',
    location: (initialData?.location as string) || '',
    content: (initialData?.content as string) || '',
    category: (initialData?.category as string) || 'রুকইয়াহ',
    rating: (initialData?.rating as number) || 5,
    is_featured: (initialData?.is_featured as boolean) || false,
    media_type: (initialData?.media_type as string) || 'text',
    video_url: (initialData?.video_url as string) || '',
    image_url: (initialData?.image_url as string) || '',
    audio_url: (initialData?.audio_url as string) || '',
    sort_order: (initialData?.sort_order as number) || 0,
    is_published: (initialData?.is_published as boolean) || false,
  })

  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function set<K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccessMsg(null)

    const res = await saveExperience(formData)
    if (res?.error) {
      setError(res.error)
      setSaving(false)
    } else {
      setSuccessMsg('অভিজ্ঞতা সফলভাবে সংরক্ষিত হয়েছে!')
      setTimeout(() => {
        router.push('/admin/experiences')
      }, 1200)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/experiences"
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Back to Experiences"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              {formData.id ? 'Edit Experience' : 'Create New Experience'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {formData.id
                ? 'Updates sync live to Website and Mobile App upon saving.'
                : 'Add a real customer experience — it appears on the Website and Mobile App once published.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/experiences"
            className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-5 rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
          >
            {saving ? (
              <span>Saving...</span>
            ) : (
              <>
                <CheckCircle2 size={15} />
                <span>{formData.id ? 'Save Changes' : 'Create Experience'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm font-medium px-4 py-3 rounded-xl flex items-start gap-2">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium px-4 py-3 rounded-xl flex items-start gap-2">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          {successMsg}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>গ্রাহকের নাম *</label>
            <input
              required
              value={formData.customer_name}
              onChange={(e) => set('customer_name', e.target.value)}
              placeholder="যেমন: আব্দুর রহমান"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>অবস্থান (জেলা/এলাকা)</label>
            <input
              value={formData.location}
              onChange={(e) => set('location', e.target.value)}
              placeholder="যেমন: ঢাকা"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>অভিজ্ঞতার বিবরণ *</label>
          <textarea
            required
            rows={6}
            value={formData.content}
            onChange={(e) => set('content', e.target.value)}
            placeholder="গ্রাহকের নিজের ভাষায় অভিজ্ঞতাটি লিখুন..."
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>ক্যাটাগরি</label>
            <select
              value={formData.category}
              onChange={(e) => set('category', e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>রেটিং (১–৫)</label>
            <select
              value={formData.rating}
              onChange={(e) => set('rating', parseInt(e.target.value, 10))}
              className={inputClass}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} স্টার
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>ক্রম (sort order)</label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => set('sort_order', parseInt(e.target.value, 10) || 0)}
              className={inputClass}
            />
            <p className="text-xs text-gray-400 mt-1">কম সংখ্যা আগে দেখাবে।</p>
          </div>
        </div>

        <div>
          <label className={labelClass}>মিডিয়া ধরন</label>
          <select
            value={formData.media_type}
            onChange={(e) => set('media_type', e.target.value)}
            className={inputClass}
          >
            {MEDIA_TYPES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {formData.media_type === 'video' && (
          <div>
            <label className={labelClass}>ভিডিও লিংক (YouTube / Facebook / Google Drive)</label>
            <input
              value={formData.video_url}
              onChange={(e) => set('video_url', e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        )}
        {formData.media_type === 'image' && (
          <div>
            <label className={labelClass}>ছবির লিংক</label>
            <input
              value={formData.image_url}
              onChange={(e) => set('image_url', e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        )}
        {formData.media_type === 'audio' && (
          <div>
            <label className={labelClass}>অডিও লিংক</label>
            <input
              value={formData.audio_url}
              onChange={(e) => set('audio_url', e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-6 pt-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => set('is_featured', e.target.checked)}
              className="w-4 h-4 accent-emerald-600"
            />
            বিশেষভাবে নির্বাচিত (Featured)
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => set('is_published', e.target.checked)}
              className="w-4 h-4 accent-emerald-600"
            />
            প্রকাশিত (ওয়েবসাইট ও অ্যাপে দেখাবে)
          </label>
        </div>
      </div>
    </form>
  )
}
