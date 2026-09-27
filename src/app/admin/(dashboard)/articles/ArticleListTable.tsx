'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  deleteArticle,
  archiveArticle,
  restoreArticle,
  publishArticle,
  unpublishArticle,
  quickUpdateArticle,
} from './actions'
import {
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  FileEdit,
  Archive,
  RotateCcw,
  Trash2,
  Edit3,
  ExternalLink,
  Star,
  X,
  Globe,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  SlidersHorizontal,
  Check,
} from 'lucide-react'

type Article = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  status: string
  featured: boolean
  sort_order?: number
  created_at: string
  updated_at?: string | null
  published_at?: string | null
  category_id?: string | null
  category?: { id?: string; name: string } | { id?: string; name: string }[] | null
}

export default function ArticleListTable({
  articles,
  categories,
  totalCount,
  currentPage,
  pageSize,
  countsByStatus,
}: {
  articles: Article[]
  categories: { id: string; name: string }[]
  totalCount: number
  currentPage: number
  pageSize: number
  countsByStatus: {
    all: number
    published: number
    draft: number
    archived: number
  }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // State for quick edit modal
  const [quickEditArticle, setQuickEditArticle] = useState<Article | null>(null)
  const [quickStatus, setQuickStatus] = useState<string>('draft')
  const [quickCategory, setQuickCategory] = useState<string>('')
  const [quickFeatured, setQuickFeatured] = useState<boolean>(false)
  const [quickSortOrder, setQuickSortOrder] = useState<number>(0)
  const [isQuickSaving, setIsQuickSaving] = useState(false)

  // State for delete modal
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Feedback notifications
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loadingRowId, setLoadingRowId] = useState<string | null>(null)

  const currentStatus = searchParams.get('status') || 'all'
  const currentCategory = searchParams.get('category') || 'all'
  const currentSearch = searchParams.get('search') || ''
  const currentSort = searchParams.get('sort') || 'newest'

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 4500)
  }

  function updateFilters(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === 'all' || value === '' || (key === 'sort' && value === 'newest')) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    if (!updates.page) {
      params.set('page', '1')
    }

    startTransition(() => {
      router.push(`/admin/articles?${params.toString()}`)
    })
  }

  function resetFilters() {
    startTransition(() => {
      router.push('/admin/articles')
    })
  }

  // Row Action Handlers
  async function handlePublishToggle(article: Article) {
    setLoadingRowId(article.id)
    if (article.status === 'published') {
      const res = await unpublishArticle(article.id)
      if (res.error) showNotification('error', res.error)
      else showNotification('success', `"${article.title}" ড্রাফট হিসেবে সংরক্ষিত হয়েছে।`)
    } else {
      const res = await publishArticle(article.id)
      if (res.error) showNotification('error', res.error)
      else showNotification('success', `"${article.title}" প্রকাশিত হয়েছে এবং অ্যাপ ও ওয়েবসাইটে লাইভ হয়েছে!`)
    }
    setLoadingRowId(null)
  }

  async function handleArchiveToggle(article: Article) {
    setLoadingRowId(article.id)
    if (article.status === 'archived') {
      const res = await restoreArticle(article.id)
      if (res.error) showNotification('error', res.error)
      else showNotification('success', `"${article.title}" আর্কাইভ থেকে রিস্টোর করা হয়েছে।`)
    } else {
      const res = await archiveArticle(article.id)
      if (res.error) showNotification('error', res.error)
      else showNotification('success', `"${article.title}" আর্কাইভে স্থানান্তর করা হয়েছে।`)
    }
    setLoadingRowId(null)
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    const res = await deleteArticle(deleteTarget.id)
    setIsDeleting(false)
    if (res.error) {
      showNotification('error', res.error)
    } else {
      showNotification('success', `"${deleteTarget.title}" স্থায়ীভাবে ডিলিট করা হয়েছে।`)
      setDeleteTarget(null)
    }
  }

  function openQuickEdit(article: Article) {
    setQuickEditArticle(article)
    setQuickStatus(article.status)
    const catId =
      Array.isArray(article.category) && article.category.length > 0
        ? article.category[0]?.id || ''
        : (article.category as { id?: string } | null)?.id || article.category_id || ''
    setQuickCategory(catId)
    setQuickFeatured(article.featured || false)
    setQuickSortOrder(article.sort_order || 0)
  }

  async function handleQuickSave(e: React.FormEvent) {
    e.preventDefault()
    if (!quickEditArticle) return
    setIsQuickSaving(true)

    const res = await quickUpdateArticle(quickEditArticle.id, {
      status: quickStatus,
      category_id: quickCategory,
      featured: quickFeatured,
      sort_order: quickSortOrder,
    })

    setIsQuickSaving(false)
    if (res.error) {
      showNotification('error', res.error)
    } else {
      showNotification('success', `"${quickEditArticle.title}" দ্রুত আপডেট সম্পন্ন হয়েছে!`)
      setQuickEditArticle(null)
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize) || 1
  const startItem = totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0
  const endItem = Math.min(currentPage * pageSize, totalCount)
  const isFiltered = currentStatus !== 'all' || currentCategory !== 'all' || currentSearch !== '' || currentSort !== 'newest'

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-sm transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-red-600 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:opacity-75">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Status Segmented Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1.5 flex flex-wrap gap-1">
        {[
          { key: 'all', label: 'All Articles', count: countsByStatus.all },
          { key: 'published', label: 'Published (Live)', count: countsByStatus.published },
          { key: 'draft', label: 'Drafts', count: countsByStatus.draft },
          { key: 'archived', label: 'Archived', count: countsByStatus.archived },
        ].map((tab) => {
          const active = currentStatus === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => updateFilters({ status: tab.key })}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                active
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  active ? 'bg-emerald-900/60 text-emerald-100' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Filter & Search Control Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Field */}
          <div className="md:col-span-5 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by article title or keyword..."
              defaultValue={currentSearch}
              onKeyDown={(e) => {
                if (e.key === 'Enter') updateFilters({ search: e.currentTarget.value })
              }}
              onBlur={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
            />
            {currentSearch && (
              <button
                onClick={() => updateFilters({ search: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <div className="relative">
              <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={currentCategory}
                onChange={(e) => updateFilters({ category: e.target.value })}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Filter */}
          <div className="md:col-span-3">
            <div className="relative">
              <ArrowUpDown size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={currentSort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
              >
                <option value="newest">Newest First (Created)</option>
                <option value="oldest">Oldest First</option>
                <option value="updated">Recently Updated</option>
                <option value="published">Recently Published</option>
              </select>
            </div>
          </div>

          {/* Reset Filters */}
          <div className="md:col-span-1 flex items-center justify-end">
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="w-full py-2 px-3 text-xs font-semibold text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                title="Reset all filters"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
        {isPending && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
            <div className="text-xs font-medium text-emerald-700 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
              Loading...
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-5 py-3.5">Article Details</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Status & Sync</th>
                <th className="px-4 py-3.5">Timeline</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {articles.map((article) => {
                const catName =
                  Array.isArray(article.category) && article.category.length > 0
                    ? article.category[0]?.name
                    : (article.category as { name: string } | null)?.name || 'Uncategorized'

                const isPublished = article.status === 'published'
                const isDraft = article.status === 'draft'
                const isArchived = article.status === 'archived'

                return (
                  <tr
                    key={article.id}
                    className={`hover:bg-gray-50/80 transition-colors ${
                      loadingRowId === article.id ? 'opacity-50 pointer-events-none' : ''
                    }`}
                  >
                    {/* Article Title & Meta */}
                    <td className="px-5 py-4 max-w-sm">
                      <div className="flex items-start gap-2">
                        {article.featured && (
                          <span
                            className="mt-0.5 text-amber-500 flex-shrink-0"
                            title="Featured on homepage and app header"
                          >
                            <Star size={15} className="fill-amber-400 text-amber-500" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <Link
                            href={`/admin/articles/${article.id}`}
                            className="font-semibold text-gray-900 hover:text-emerald-700 transition-colors line-clamp-1"
                          >
                            {article.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <span className="font-mono text-[11px] text-gray-500">/{article.slug}</span>
                            {isPublished && (
                              <a
                                href={`/blog/${article.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-800 flex items-center gap-0.5"
                                title="Open live public article"
                              >
                                <span>Preview</span>
                                <ExternalLink size={11} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200/80">
                        {catName}
                      </span>
                    </td>

                    {/* Status & Sync */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div>
                          {isPublished && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 size={12} />
                              Published
                            </span>
                          )}
                          {isDraft && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                              <FileEdit size={12} />
                              Draft
                            </span>
                          )}
                          {isArchived && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                              <Archive size={12} />
                              Archived
                            </span>
                          )}
                        </div>

                        {/* Multi-Platform Sync Indicator */}
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          {isPublished ? (
                            <span className="text-emerald-700 font-medium flex items-center gap-1">
                              <Globe size={11} />
                              <Smartphone size={11} />
                              Live on Web & App
                            </span>
                          ) : (
                            <span className="text-gray-400">Not live on platforms</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Timeline / Dates */}
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-600">
                      <div>
                        {article.published_at ? (
                          <div title="Published date">
                            <span className="text-gray-400 text-[10px] uppercase font-semibold">Pub: </span>
                            <span className="font-medium text-gray-800">
                              {new Date(article.published_at).toLocaleDateString('bn-BD', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        ) : null}
                        <div title="Last updated date" className="text-gray-500 mt-0.5">
                          <span className="text-gray-400 text-[10px] uppercase font-semibold">Upd: </span>
                          <span>
                            {new Date(article.updated_at || article.created_at).toLocaleDateString('bn-BD', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick Edit */}
                        <button
                          onClick={() => openQuickEdit(article)}
                          className="p-1.5 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Quick edit (status, category, featured)"
                        >
                          <SlidersHorizontal size={15} />
                        </button>

                        {/* Edit Full */}
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="p-1.5 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit full article"
                        >
                          <Edit3 size={15} />
                        </Link>

                        {/* Publish / Unpublish Toggle */}
                        {isPublished ? (
                          <button
                            onClick={() => handlePublishToggle(article)}
                            className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors text-xs font-semibold"
                            title="Unpublish article to Draft"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePublishToggle(article)}
                            className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors text-xs font-semibold"
                            title="Publish article live to Web & App"
                          >
                            Publish
                          </button>
                        )}

                        {/* Archive / Restore Toggle */}
                        {isArchived ? (
                          <button
                            onClick={() => handleArchiveToggle(article)}
                            className="p-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Restore article to Draft"
                          >
                            <RotateCcw size={15} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleArchiveToggle(article)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Archive article"
                          >
                            <Archive size={15} />
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(article)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete article permanently"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {articles.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="max-w-xs mx-auto space-y-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                        <Search size={20} />
                      </div>
                      <p className="font-semibold text-gray-800">No articles found</p>
                      <p className="text-xs text-gray-500">
                        No articles match the selected filters or search keyword.
                      </p>
                      {isFiltered ? (
                        <button
                          onClick={resetFilters}
                          className="text-xs font-semibold text-emerald-600 hover:underline"
                        >
                          Clear all filters
                        </button>
                      ) : (
                        <Link
                          href="/admin/articles/create"
                          className="inline-block text-xs font-semibold bg-emerald-600 text-white px-3 py-1.5 rounded-lg"
                        >
                          + Create First Article
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div>
            Showing <strong className="text-gray-900">{startItem}</strong> to{' '}
            <strong className="text-gray-900">{endItem}</strong> of{' '}
            <strong className="text-gray-900">{totalCount}</strong> articles
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage <= 1 || isPending}
              onClick={() => updateFilters({ page: (currentPage - 1).toString() })}
              className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white flex items-center gap-1 font-medium"
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg font-semibold text-gray-800">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage >= totalPages || isPending}
              onClick={() => updateFilters({ page: (currentPage + 1).toString() })}
              className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-white flex items-center gap-1 font-medium"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* QUICK EDIT MODAL */}
      {quickEditArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Quick Edit Article</h3>
                <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{quickEditArticle.title}</p>
              </div>
              <button
                onClick={() => setQuickEditArticle(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleQuickSave} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Publish Status</label>
                <select
                  value={quickStatus}
                  onChange={(e) => setQuickStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="published">Published (Live on Web & App)</option>
                  <option value="draft">Draft (Unpublished)</option>
                  <option value="archived">Archived (Hidden)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                <select
                  value={quickCategory}
                  onChange={(e) => setQuickCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <label htmlFor="quick-featured" className="text-xs font-semibold text-gray-700 block">
                    Featured Article
                  </label>
                  <span className="text-[11px] text-gray-500">Showcases prominently on Web & App</span>
                </div>
                <input
                  type="checkbox"
                  id="quick-featured"
                  checked={quickFeatured}
                  onChange={(e) => setQuickFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={quickSortOrder}
                  onChange={(e) => setQuickSortOrder(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuickEditArticle(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isQuickSaving}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isQuickSaving ? (
                    'Saving...'
                  ) : (
                    <>
                      <Check size={14} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-gray-900 text-base">Delete Article?</h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to permanently delete:
              </p>
              <p className="text-sm font-semibold text-gray-800 line-clamp-2 mt-1">
                &ldquo;{deleteTarget.title}&rdquo;
              </p>
              <p className="text-xs text-red-600 mt-2">
                This action cannot be undone and will immediately remove the article from both the website and mobile app.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50 flex-1 flex items-center justify-center gap-1.5"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
