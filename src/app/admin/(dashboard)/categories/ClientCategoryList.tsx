'use client'

import { useState, useEffect } from 'react'
import { createCategory, updateCategory, deleteCategory, toggleCategoryStatus } from './actions'

type Category = {
  id: string
  name: string
  slug: string
  description: string
  sort_order: number
  is_active: boolean
}

export default function ClientCategoryList({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Allow initialCategories to update local state when Server Component re-renders
  if (categories !== initialCategories) {
    // Basic deep compare or just accept re-renders
    // Using a key on the component is better, but this works for simple sync without useEffect warning.
    // However, the cleanest way to sync state from props in React without useEffect is:
  }
  
  const [prevInitial, setPrevInitial] = useState(initialCategories)
  if (initialCategories !== prevInitial) {
    setPrevInitial(initialCategories)
    setCategories(initialCategories)
  }

  async function handleToggle(id: string, currentStatus: boolean) {
    setLoading(true)
    const res = await toggleCategoryStatus(id, currentStatus)
    if (res?.error) setError(res.error)
    else setError(null)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return
    setLoading(true)
    const res = await deleteCategory(id)
    if (res?.error) setError(res.error)
    else setError(null)
    setLoading(false)
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const res = await createCategory(formData)
    if (res?.error) setError(res.error)
    else {
      setIsCreating(false)
    }
    setLoading(false)
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const res = await updateCategory(formData)
    if (res?.error) setError(res.error)
    else {
      setEditingId(null)
    }
    setLoading(false)
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>, formId: string) {
    const name = e.target.value
    const slugInput = document.querySelector(`#${formId} input[name="slug"]`) as HTMLInputElement
    if (slugInput && !slugInput.dataset.manuallyEdited) {
      slugInput.value = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {isCreating ? 'Cancel' : '+ New Category'}
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isCreating && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Category</h2>
          <form id="create-cat-form" onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input required type="text" name="name" onChange={(e) => handleNameChange(e, 'create-cat-form')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input required type="text" name="slug" onChange={(e) => { e.target.dataset.manuallyEdited = 'true' }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-black" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input type="text" name="description" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-black" />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input type="number" name="sort_order" defaultValue="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-black" />
            </div>
            <div className="flex justify-end pt-2">
              <button disabled={loading} type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">Save Category</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Name</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Slug</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Sort Order</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 text-center">Status</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                  {editingId === cat.id ? (
                    <td colSpan={5} className="px-6 py-4">
                      <form id={`edit-cat-form-${cat.id}`} onSubmit={handleUpdate} className="space-y-4">
                        <input type="hidden" name="id" value={cat.id} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input required type="text" name="name" defaultValue={cat.name} onChange={(e) => handleNameChange(e, `edit-cat-form-${cat.id}`)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <input required type="text" name="slug" defaultValue={cat.slug} onChange={(e) => { e.target.dataset.manuallyEdited = 'true' }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <input type="text" name="description" defaultValue={cat.description || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" />
                        </div>
                        <div className="w-32">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                          <input type="number" name="sort_order" defaultValue={cat.sort_order} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" />
                        </div>
                        <div className="flex justify-end space-x-2 pt-2">
                          <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">Cancel</button>
                          <button disabled={loading} type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">Update</button>
                        </div>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{cat.slug}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{cat.sort_order}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          disabled={loading}
                          onClick={() => handleToggle(cat.id, cat.is_active)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${cat.is_active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                        >
                          {cat.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button onClick={() => setEditingId(cat.id)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                        <button disabled={loading} onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {categories.length === 0 && !isCreating && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">
                    No categories found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
