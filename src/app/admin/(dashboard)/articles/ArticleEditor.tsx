'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { createClient } from '@/lib/supabase/client'
import { saveArticle } from './actions'
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Smartphone,
  Eye,
  FileEdit,
  Upload,
  Link as LinkIcon,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  Bold,
  Italic,
  Heading2,
  Quote,
  List,
} from 'lucide-react'

export default function ArticleEditor({
  initialData,
  categories,
}: {
  initialData?: Record<string, unknown> | null
  categories: { id: string; name: string }[]
}) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: (initialData?.id as string) || '',
    title: (initialData?.title as string) || '',
    slug: (initialData?.slug as string) || '',
    excerpt: (initialData?.excerpt as string) || '',
    content: (initialData?.content as string) || '',
    category_id: (initialData?.category_id as string) || (categories.length > 0 ? categories[0].id : ''),
    status: (initialData?.status as string) || 'draft',
    featured: (initialData?.featured as boolean) || false,
    sort_order: (initialData?.sort_order as number) || 0,
    cover_image_url: (initialData?.cover_image_url as string) || '',
    published_at: (initialData?.published_at as string) || '',
    created_at: (initialData?.created_at as string) || '',
    updated_at: (initialData?.updated_at as string) || '',
  })

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialData?.slug))

  const supabase = createClient()

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value
    setFormData((prev) => {
      const updated = { ...prev, title: newTitle }
      if (!isSlugManual && !prev.id) {
        // Auto-generate clean slug for new articles
        updated.slug = newTitle
          .toLowerCase()
          .replace(/[^\w\s\u0980-\u09FF-]+/g, '')
          .replace(/\s+/g, '-')
          .replace(/(^-|-$)+/g, '')
      }
      return updated
    })
  }

  function insertFormatting(prefix: string, suffix = '') {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement | null
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end)
    const replacement = prefix + (selected || 'text') + suffix

    const newContent =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end)

    setFormData((prev) => ({ ...prev, content: newContent }))

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected ? selected.length : 4))
    }, 50)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB.')
      return
    }

    setUploading(true)
    setError(null)

    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`

    const { error: uploadError } = await supabase.storage.from('cms-images').upload(fileName, file)

    if (uploadError) {
      setError('Image upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: publicUrlData } = supabase.storage.from('cms-images').getPublicUrl(fileName)
    setFormData((prev) => ({ ...prev, cover_image_url: publicUrlData.publicUrl }))
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccessMsg(null)

    const res = await saveArticle(formData)
    if (res?.error) {
      setError(res.error)
      setSaving(false)
    } else {
      setSuccessMsg('আর্টিকেল সফলভাবে সংরক্ষিত হয়েছে!')
      setTimeout(() => {
        router.push('/admin/articles')
      }, 1200)
    }
  }

  const excerptLength = formData.excerpt.length
  const excerptOptimal = excerptLength >= 100 && excerptLength <= 160

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Back to Articles"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              {formData.id ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {formData.id
                ? 'Updates sync live to Website and Mobile App upon saving.'
                : 'Compose and format your article with live SEO & multi-platform preview.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-5 rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
          >
            {saving ? (
              <span>Saving...</span>
            ) : (
              <>
                <CheckCircle2 size={15} />
                <span>{formData.id ? 'Save Changes' : 'Publish / Create'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Content Editor & SEO Preview (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Article Title *
                </label>
                <span className="text-[11px] text-gray-400">{formData.title.length} characters</span>
              </div>
              <input
                required
                type="text"
                placeholder="e.g., সুন্নাহর আলোকে বদনজরের চিকিৎসা ও প্রতিকার"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-base bg-white"
              />
            </div>

            {/* Slug URL */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  URL Slug (Permanent Link)
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugManual(!isSlugManual)}
                  className="text-[11px] text-emerald-700 hover:underline font-medium"
                >
                  {isSlugManual ? 'Reset Auto-slug' : 'Manual Edit'}
                </button>
              </div>
              <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 overflow-hidden text-xs">
                <span className="px-3 text-gray-400 select-none bg-gray-100/70 border-r border-gray-300 py-2.5">
                  saq.pro.bd/blog/
                </span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    setIsSlugManual(true)
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }}
                  placeholder="auto-generated-slug"
                  className="flex-1 px-3 py-2 bg-transparent text-gray-800 font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Markdown Content Editor */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <FileEdit size={16} className="text-emerald-600" />
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Article Body (Markdown)
                </label>
              </div>

              {/* Edit / Preview Tabs */}
              <div className="flex items-center bg-gray-100 p-1 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'edit' ? 'bg-white text-gray-900 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                    activeTab === 'preview' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Eye size={12} />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {/* Markdown Toolbar (Only in Edit mode) */}
            {activeTab === 'edit' && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 text-xs">
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  title="Bold"
                >
                  <Bold size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  title="Italic"
                >
                  <Italic size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ')}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  title="Heading 3"
                >
                  <Heading2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> ')}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  title="Quote"
                >
                  <Quote size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('- ')}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  title="Bullet List"
                >
                  <List size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('[', '](https://)')}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  title="Insert Link"
                >
                  <LinkIcon size={14} />
                </button>
                <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n\n> **কুরআন রেফারেন্স:**\n> ', '\n\n')}
                  className="px-2 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded transition-colors"
                  title="Insert Quranic Hadith block"
                >
                  + Quran/Hadith
                </button>
              </div>
            )}

            {activeTab === 'edit' ? (
              <textarea
                id="markdown-textarea"
                required
                rows={16}
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 font-mono text-sm resize-y focus:ring-emerald-500 focus:border-emerald-500 leading-relaxed bg-white"
                placeholder="# শিরোনাম লিখুন...&#10;&#10;বাংলা ও আরবি টেক্সট সাপোর্ট করে। প্রয়োজনীয় রুকইয়াহ তথ্য ও তথ্যসূত্র বিস্তারিত লিখুন।"
              />
            ) : (
              <div className="p-6 prose max-w-none min-h-[350px] bg-gray-50/50 rounded-xl border border-gray-200 text-gray-900 font-sans leading-relaxed">
                <ReactMarkdown>{formData.content || '*কোন কনটেন্ট নেই...*'}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Excerpt / Summary (Acts as SEO Description) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Excerpt & SEO Meta Description
                </label>
                <p className="text-xs text-gray-500">
                  This summary appears on article cards, mobile previews, and Google search snippets.
                </p>
              </div>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                  excerptOptimal
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {excerptLength} chars {excerptOptimal && '✓ Optimal'}
              </span>
            </div>
            <textarea
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="সংক্ষিপ্ত ভূমিকা বা সামারি লিখুন (১২০-১৬০ অক্ষর সার্চ ইঞ্জিন ও মোবাইল ভিউয়ের জন্য সেরা)..."
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            />
          </div>

          {/* Interactive Google SERP & Social SEO Preview */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-600" />
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Google Search & Social Share Preview
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Live simulation of how this article will appear when indexed by search engines and shared on social networks.
            </p>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 font-sans space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 truncate">
                <span className="text-emerald-700 font-semibold">https://saq.pro.bd</span>
                <span>›</span>
                <span>blog</span>
                <span>›</span>
                <span className="text-gray-500">{formData.slug || 'article-slug'}</span>
              </div>
              <h4 className="text-base text-blue-700 hover:underline font-medium line-clamp-1 cursor-pointer">
                {formData.title ? `${formData.title} | শিফা আল কুরআন` : 'আর্টিকেল শিরোনাম | শিফা আল কুরআন'}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {formData.excerpt ||
                  'আর্টিকেলটির সংক্ষিপ্ত বর্ণনা বা সামারি এখানে প্রদর্শিত হবে। এটি ব্যবহারকারীদের ক্লিক করতে উৎসাহিত করে।'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Publishing Sidebar & Media (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Multi-Platform Sync Indicator */}
          <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-800/60 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider">Multi-Platform Synchronization</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              When set to <strong>Published</strong>, this article instantly updates across both:
            </p>
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-center justify-between text-gray-200 bg-gray-900/60 px-3 py-2 rounded-lg">
                <span className="flex items-center gap-2">
                  <Globe size={14} className="text-emerald-400" /> Web (saq.pro.bd)
                </span>
                <span className="text-emerald-400 font-semibold">Instant Sync</span>
              </div>
              <div className="flex items-center justify-between text-gray-200 bg-gray-900/60 px-3 py-2 rounded-lg">
                <span className="flex items-center gap-2">
                  <Smartphone size={14} className="text-emerald-400" /> Mobile App
                </span>
                <span className="text-emerald-400 font-semibold">Instant Sync</span>
              </div>
            </div>
          </div>

          {/* Publishing Settings Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b pb-2">Publishing Controls</h3>

            {/* Status Select */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Content Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm font-semibold ${
                  formData.status === 'published'
                    ? 'border-emerald-300 bg-emerald-50/50 text-emerald-800'
                    : formData.status === 'draft'
                    ? 'border-amber-300 bg-amber-50/50 text-amber-800'
                    : 'border-slate-300 bg-slate-50/50 text-slate-800'
                }`}
              >
                <option value="draft">Draft (Private / Work in progress)</option>
                <option value="published">Published (Live on Web & Mobile App)</option>
                <option value="archived">Archived (Hidden from users)</option>
              </select>
            </div>

            {/* Category Select */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700">Category *</label>
                <Link href="/admin/categories" className="text-[11px] text-emerald-700 hover:underline">
                  + Manage
                </Link>
              </div>
              <select
                required
                value={formData.category_id}
                onChange={(e) => setFormData((prev) => ({ ...prev, category_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Article Toggle */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <label htmlFor="featured-checkbox" className="text-xs font-semibold text-gray-800 block cursor-pointer">
                  Featured Article
                </label>
                <span className="text-[11px] text-gray-500">Pinned to homepage & mobile highlights</span>
              </div>
              <input
                type="checkbox"
                id="featured-checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 cursor-pointer"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Sort Order (Priority)</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
              />
              <span className="text-[10px] text-gray-400 mt-0.5 block">Higher numbers appear earlier in custom queries.</span>
            </div>

            {/* Dates info if existing */}
            {formData.id && (
              <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-gray-400" />
                  <span>
                    Created:{' '}
                    <strong className="text-gray-700">
                      {formData.created_at ? new Date(formData.created_at).toLocaleDateString() : '—'}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-gray-400" />
                  <span>
                    Updated:{' '}
                    <strong className="text-gray-700">
                      {formData.updated_at ? new Date(formData.updated_at).toLocaleDateString() : '—'}
                    </strong>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Featured / Cover Image Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b pb-2">Cover Image</h3>

            {formData.cover_image_url ? (
              <div className="space-y-3">
                <div className="relative group rounded-xl overflow-hidden border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.cover_image_url}
                    alt="Cover Preview"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, cover_image_url: '' }))}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-90 hover:opacity-100 transition-opacity shadow-sm"
                    title="Remove image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 truncate font-mono">{formData.cover_image_url}</p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center space-y-2 bg-gray-50/50">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <Upload size={18} />
                </div>
                <p className="text-xs font-semibold text-gray-700">Upload Featured Image</p>
                <p className="text-[11px] text-gray-400">PNG, JPG, WebP up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                />
                {uploading && <p className="text-xs text-emerald-600 font-semibold animate-pulse">Uploading...</p>}
              </div>
            )}

            {/* Direct URL input fallback */}
            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-xs text-gray-500 hover:text-emerald-700 flex items-center gap-1 font-medium"
              >
                <LinkIcon size={12} />
                <span>{showUrlInput ? 'Hide Image URL input' : 'Or paste direct image URL'}</span>
              </button>

              {showUrlInput && (
                <div className="mt-2">
                  <input
                    type="url"
                    placeholder="https://example.com/cover.jpg"
                    value={formData.cover_image_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cover_image_url: e.target.value }))}
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg text-gray-900 bg-white"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {saving ? (
              <span>Saving article...</span>
            ) : (
              <>
                <CheckCircle2 size={16} />
                <span>{formData.id ? 'Save Article' : 'Publish / Create Article'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
