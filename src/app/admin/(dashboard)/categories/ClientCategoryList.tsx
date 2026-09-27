'use client'

import { useState } from 'react'
import {
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from './actions'
import {
  FolderOpen,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  Edit3,
  Trash2,
  Globe,
  Smartphone,
  Check,
  FileText,
} from 'lucide-react'

type Category = {
  id: string
  name: string
  slug: string
  description?: string | null
  sort_order: number
  is_active: boolean
  created_at?: string
}

export default function ClientCategoryList({
  initialCategories,
  articleCounts = {},
}: {
  initialCategories: Category[]
  articleCounts?: Record<string, number>
}) {
  const [categories, setCategories] = useState(initialCategories)
  const [search, setSearch] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const [prevInitial, setPrevInitial] = useState(initialCategories)
  if (initialCategories !== prevInitial) {
    setPrevInitial(initialCategories)
    setCategories(initialCategories)
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  async function handleToggle(id: string, currentStatus: boolean, catName: string) {
    setLoading(true)
    const res = await toggleCategoryStatus(id, currentStatus)
    setLoading(false)

    if (res?.error) {
      showNotification('error', res.error)
    } else {
      showNotification(
        'success',
        `"${catName}" ক্যাটাগরির স্ট্যাটাস ${!currentStatus ? 'Active' : 'Inactive'} করা হয়েছে।`
      )
    }
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const res = await createCategory(formData)
    setLoading(false)

    if (res?.error) {
      showNotification('error', res.error)
    } else {
      showNotification('success', 'নতুন ক্যাটাগরি সফলভাবে তৈরি হয়েছে এবং লাইভ সিঙ্ক সম্পন্ন হয়েছে!')
      setIsCreating(false)
    }
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const res = await updateCategory(formData)
    setLoading(false)

    if (res?.error) {
      showNotification('error', res.error)
    } else {
      showNotification('success', 'ক্যাটাগরি সফলভাবে আপডেট করা হয়েছে!')
      setEditingCategory(null)
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setLoading(true)
    const res = await deleteCategory(deleteTarget.id)
    setLoading(false)

    if (res?.error) {
      showNotification('error', res.error)
    } else {
      showNotification('success', `"${deleteTarget.name}" ক্যাটাগরি সফলভাবে ডিলিট করা হয়েছে।`)
      setDeleteTarget(null)
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>, targetSlugInputId: string) {
    const name = e.target.value
    const slugInput = document.getElementById(targetSlugInputId) as HTMLInputElement | null
    if (slugInput && !slugInput.dataset.manuallyEdited) {
      slugInput.value = name
        .toLowerCase()
        .replace(/[^\w\s\u0980-\u09FF-]+/g, '')
        .replace(/\s+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }
  }

  const filteredCategories = categories.filter((c) => {
    if (!search) return true
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
  })

  const activeCount = categories.filter((c) => c.is_active).length

  return (
    <div className="space-y-6">
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

      {/* Header and Sync Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FolderOpen size={22} className="text-emerald-700" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Category Management</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Organize Ruqyah topics. Active categories are served to both Website navigation and Mobile App drawers.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>New Category</span>
        </button>
      </div>

      {/* Multi-Platform Notice Strip */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>
            <strong>{activeCount} of {categories.length}</strong> categories are Active and publicly visible.
          </span>
        </div>
        <div className="flex items-center gap-4 text-emerald-700 font-medium">
          <span className="flex items-center gap-1">
            <Globe size={13} /> Web Synced
          </span>
          <span className="flex items-center gap-1">
            <Smartphone size={13} /> Mobile App Synced
          </span>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing {filteredCategories.length} categories
        </div>
      </div>

      {/* Category Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-5 py-3.5">Category Details</th>
                <th className="px-4 py-3.5">URL Slug</th>
                <th className="px-4 py-3.5 text-center">Articles Attached</th>
                <th className="px-4 py-3.5 text-center">Sort Priority</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredCategories.map((cat) => {
                const count = articleCounts[cat.id] || 0
                return (
                  <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Category Details */}
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900">{cat.name}</p>
                      {cat.description && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{cat.description}</p>
                      )}
                    </td>

                    {/* Slug */}
                    <td className="px-4 py-4 text-xs font-mono text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">
                        {cat.slug}
                      </span>
                    </td>

                    {/* Attached Articles */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          count > 0
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <FileText size={11} />
                        <span>{count} articles</span>
                      </span>
                    </td>

                    {/* Sort Order */}
                    <td className="px-4 py-4 text-center text-xs font-medium text-gray-700">
                      {cat.sort_order}
                    </td>

                    {/* Status Toggle */}
                    <td className="px-4 py-4 text-center">
                      <button
                        disabled={loading}
                        onClick={() => handleToggle(cat.id, cat.is_active, cat.name)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          cat.is_active
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                        }`}
                        title="Click to toggle status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            cat.is_active ? 'bg-emerald-600' : 'bg-gray-400'
                          }`}
                        ></span>
                        <span>{cat.is_active ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingCategory(cat)}
                          className="p-1.5 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit category"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(cat)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete category"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <p className="font-semibold text-gray-800">No categories found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Try adjusting your search query or create a new category.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE CATEGORY MODAL */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 text-base">Create New Category</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="e.g., রুকইয়াহ শারইয়াহ"
                    onChange={(e) => handleNameChange(e, 'create-cat-slug')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Slug *</label>
                  <input
                    required
                    type="text"
                    id="create-cat-slug"
                    name="slug"
                    placeholder="ruqyah-shariah"
                    onChange={(e) => {
                      e.target.dataset.manuallyEdited = 'true'
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-mono text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Short description for website and mobile meta..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                />
              </div>

              <div className="w-36">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Sort Order</label>
                <input
                  type="number"
                  name="sort_order"
                  defaultValue="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 text-base">Edit Category</h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-sm">
              <input type="hidden" name="id" value={editingCategory.id} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    defaultValue={editingCategory.name}
                    onChange={(e) => handleNameChange(e, 'edit-cat-slug')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Slug *</label>
                  <input
                    required
                    type="text"
                    id="edit-cat-slug"
                    name="slug"
                    defaultValue={editingCategory.slug}
                    onChange={(e) => {
                      e.target.dataset.manuallyEdited = 'true'
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-mono text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  defaultValue={editingCategory.description || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                />
              </div>

              <div className="w-36">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Sort Order</label>
                <input
                  type="number"
                  name="sort_order"
                  defaultValue={editingCategory.sort_order}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Update Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION & WARNING MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                (articleCounts[deleteTarget.id] || 0) > 0
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              <AlertTriangle size={24} />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-bold text-gray-900 text-base">Delete Category?</h3>
              <p className="text-sm font-semibold text-gray-800">
                &ldquo;{deleteTarget.name}&rdquo;
              </p>

              {(articleCounts[deleteTarget.id] || 0) > 0 ? (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 text-left space-y-1">
                  <p className="font-bold">⚠️ Warning: Articles Attached</p>
                  <p>
                    There are <strong>{articleCounts[deleteTarget.id]} articles</strong> currently assigned to this category.
                  </p>
                  <p className="text-[11px] text-amber-900">
                    To maintain data integrity and prevent broken links on the website & mobile app, please reassign or delete those articles before deleting this category.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  This category has 0 attached articles and can be safely removed.
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 flex-1"
              >
                Cancel
              </button>
              {(articleCounts[deleteTarget.id] || 0) === 0 && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50 flex-1 flex items-center justify-center gap-1.5"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
