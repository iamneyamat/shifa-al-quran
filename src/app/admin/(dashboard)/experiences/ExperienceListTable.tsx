'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  deleteExperience,
  publishExperience,
  unpublishExperience,
  quickUpdateExperience,
} from './actions'
import {
  Search,
  CheckCircle2,
  Trash2,
  Edit3,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react'

type Experience = {
  id: string
  customer_name: string
  location?: string | null
  content: string
  category?: string | null
  rating?: number | null
  is_featured: boolean
  media_type?: string | null
  video_url?: string | null
  image_url?: string | null
  audio_url?: string | null
  sort_order?: number | null
  is_published: boolean
  created_at: string
  updated_at?: string | null
}

const CATEGORIES = ['রুকইয়াহ', 'পরামর্শ', 'অন্যান্য']

export default function ExperienceListTable({
  experiences,
  totalCount,
  currentPage,
  pageSize,
  countsByStatus,
}: {
  experiences: Experience[]
  totalCount: number
  currentPage: number
  pageSize: number
  countsByStatus: {
    all: number
    published: number
    draft: number
    featured: number
  }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [deleteTarget, setDeleteTarget] = useState<Experience | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loadingRowId, setLoadingRowId] = useState<string | null>(null)

  const currentStatus = searchParams.get('status') || 'all'
  const currentCategory = searchParams.get('category') || 'all'
  const currentSearch = searchParams.get('search') || ''
  const currentSort = searchParams.get('sort') || 'order'

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 4500)
  }

  function updateFilters(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === 'all' || value === '' || (key === 'sort' && value === 'order')) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    if (!updates.page) {
      params.set('page', '1')
    }

    startTransition(() => {
      router.push(`/admin/experiences?${params.toString()}`)
    })
  }

  function resetFilters() {
    startTransition(() => {
      router.push('/admin/experiences')
    })
  }

  async function handlePublishToggle(exp: Experience) {
    setLoadingRowId(exp.id)
    if (exp.is_published) {
      const res = await unpublishExperience(exp.id)
      if (res.error) showNotification('error', res.error)
      else showNotification('success', `"${exp.customer_name}" ড্রাফট হিসেবে সংরক্ষিত হয়েছে।`)
    } else {
      const res = await publishExperience(exp.id)
      if (res.error) showNotification('error', res.error)
      else showNotification('success', `"${exp.customer_name}" প্রকাশিত হয়েছে এবং অ্যাপ ও ওয়েবসাইটে লাইভ হয়েছে!`)
    }
    setLoadingRowId(null)
  }

  async function handleFeaturedToggle(exp: Experience) {
    setLoadingRowId(exp.id)
    const res = await quickUpdateExperience(exp.id, { is_featured: !exp.is_featured })
    if (res.error) showNotification('error', res.error)
    else showNotification('success', exp.is_featured ? 'বিশেষ নির্বাচন তুলে দেওয়া হয়েছে।' : 'বিশেষভাবে নির্বাচিত করা হয়েছে।')
    setLoadingRowId(null)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    const res = await deleteExperience(deleteTarget.id)
    setIsDeleting(false)
    if (res.error) {
      showNotification('error', res.error)
    } else {
      showNotification('success', 'অভিজ্ঞতাটি মুছে ফেলা হয়েছে।')
    }
    setDeleteTarget(null)
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  function mediaLabel(exp: Experience) {
    if (exp.media_type === 'video' && exp.video_url) return 'ভিডিও'
    if (exp.media_type === 'image' && exp.image_url) return 'ছবি'
    if (exp.media_type === 'audio' && exp.audio_url) return 'অডিও'
    return 'লেখা'
  }

  return (
    <div className="space-y-4">
      {notification && (
        <div
          className={`p-4 rounded-xl border text-sm font-medium ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Status counts */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            ['all', 'সব', countsByStatus.all],
            ['published', 'প্রকাশিত', countsByStatus.published],
            ['draft', 'ড্রাফট', countsByStatus.draft],
            ['featured', 'বিশেষ', countsByStatus.featured],
          ] as const
        ).map(([key, label, count]) => {
          const active =
            key === 'featured'
              ? searchParams.get('featured') === '1'
              : currentStatus === key
          return (
            <button
              key={key}
              onClick={() => {
                if (key === 'featured') {
                  updateFilters({ featured: searchParams.get('featured') === '1' ? '' : '1', status: 'all' })
                } else {
                  updateFilters({ status: key, featured: '' })
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                active
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {label} ({count})
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            defaultValue={currentSearch}
            key={currentSearch}
            placeholder="গ্রাহকের নাম দিয়ে খুঁজুন..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateFilters({ search: (e.target as HTMLInputElement).value })
              }
            }}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select
          value={currentCategory}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
        >
          <option value="all">সব ক্যাটাগরি</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={currentSort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
        >
          <option value="order">ক্রম অনুযায়ী</option>
          <option value="newest">নতুন প্রথমে</option>
          <option value="oldest">পুরনো প্রথমে</option>
          <option value="updated">আপডেট অনুযায়ী</option>
        </select>
        {(currentSearch || currentCategory !== 'all' || currentStatus !== 'all') && (
          <button
            onClick={resetFilters}
            className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1"
          >
            <X size={14} /> রিসেট
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {experiences.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500 text-sm">এখনও কোনো অভিজ্ঞতা যোগ করা হয়নি।</p>
            <Link
              href="/admin/experiences/create"
              className="inline-block mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              প্রথম অভিজ্ঞতা যোগ করুন
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs text-gray-500">
                  <th className="px-4 py-3 font-semibold">গ্রাহক</th>
                  <th className="px-4 py-3 font-semibold">ক্যাটাগরি</th>
                  <th className="px-4 py-3 font-semibold">রেটিং</th>
                  <th className="px-4 py-3 font-semibold">মিডিয়া</th>
                  <th className="px-4 py-3 font-semibold">স্ট্যাটাস</th>
                  <th className="px-4 py-3 font-semibold">ক্রম</th>
                  <th className="px-4 py-3 font-semibold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr key={exp.id} className="border-b border-gray-100 hover:bg-gray-50/60">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">{exp.customer_name}</p>
                      {exp.location && <p className="text-xs text-gray-500">{exp.location}</p>}
                      <p className="text-xs text-gray-400 line-clamp-2 max-w-xs mt-0.5">{exp.content}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                        {exp.category || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-amber-500 font-semibold">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        {exp.rating ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{mediaLabel(exp)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          exp.is_published
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {exp.is_published ? 'প্রকাশিত' : 'ড্রাফট'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{exp.sort_order ?? 0}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleFeaturedToggle(exp)}
                          disabled={loadingRowId === exp.id || isPending}
                          title={exp.is_featured ? 'বিশেষ তুলে দিন' : 'বিশেষভাবে নির্বাচন করুন'}
                          className={`p-2 rounded-lg transition-colors ${
                            exp.is_featured
                              ? 'text-amber-500 hover:bg-amber-50'
                              : 'text-gray-400 hover:text-amber-500 hover:bg-gray-100'
                          }`}
                        >
                          <Star size={16} className={exp.is_featured ? 'fill-amber-400' : ''} />
                        </button>
                        <button
                          onClick={() => handlePublishToggle(exp)}
                          disabled={loadingRowId === exp.id || isPending}
                          title={exp.is_published ? 'ড্রাফট করুন' : 'প্রকাশ করুন'}
                          className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <Link
                          href={`/admin/experiences/${exp.id}`}
                          title="এডিট করুন"
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit3 size={16} />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(exp)}
                          title="মুছুন"
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              পৃষ্ঠা {currentPage} / {totalPages} — মোট {totalCount}টি
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage <= 1 || isPending}
                onClick={() => updateFilters({ page: String(currentPage - 1) })}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={currentPage >= totalPages || isPending}
                onClick={() => updateFilters({ page: String(currentPage + 1) })}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle size={22} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900">অভিজ্ঞতাটি মুছে ফেলবেন?</h3>
                <p className="text-sm text-gray-500 mt-1">
                  “{deleteTarget.customer_name}”-এর অভিজ্ঞতাটি স্থায়ীভাবে মুছে যাবে। এই কাজটি
                  ফিরিয়ে নেওয়া যাবে না।
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                বাতিল
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center gap-1.5"
              >
                <Trash2 size={15} />
                {isDeleting ? 'মুছা হচ্ছে...' : 'মুছে ফেলুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
