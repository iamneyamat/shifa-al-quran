'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { deleteArticle, archiveArticle } from './actions'

type Article = {
  id: string
  title: string
  slug: string
  status: string
  featured: boolean
  created_at: string
  category?: { name: string } | null
}

export default function ArticleListTable({ 
  articles, 
  categories,
  totalCount,
  currentPage,
  pageSize
}: { 
  articles: Article[]
  categories: {id: string, name: string}[]
  totalCount: number
  currentPage: number
  pageSize: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  
  const currentStatus = searchParams.get('status') || 'all'
  const currentCategory = searchParams.get('category') || 'all'
  const currentSearch = searchParams.get('search') || ''

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all' || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.set('page', '1')
    router.push(`/admin/articles?${params.toString()}`)
  }

  async function handleArchive(id: string) {
    if (!confirm('Are you sure you want to archive this article?')) return
    setLoadingId(id)
    await archiveArticle(id)
    setLoadingId(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to permanently delete this article?')) return
    setLoadingId(id)
    await deleteArticle(id)
    setLoadingId(null)
  }

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Filters */}
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-4">
        <input 
          type="text"
          placeholder="Search title..."
          defaultValue={currentSearch}
          onBlur={(e) => updateFilters('search', e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter') updateFilters('search', e.currentTarget.value) }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
        />
        <select 
          value={currentStatus} 
          onChange={(e) => updateFilters('status', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <select 
          value={currentCategory} 
          onChange={(e) => updateFilters('category', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
             <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Title</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Category</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 text-center">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map(article => (
              <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{article.title}</p>
                  <p className="text-xs text-gray-500">{article.slug}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {article.category?.name || 'Uncategorized'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(article.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    article.status === 'published' ? 'bg-green-100 text-green-800' :
                    article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link href={`/admin/articles/${article.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</Link>
                  {article.status !== 'archived' && (
                    <button disabled={loadingId === article.id} onClick={() => handleArchive(article.id)} className="text-orange-600 hover:text-orange-800 text-sm font-medium disabled:opacity-50">Archive</button>
                  )}
                  <button disabled={loadingId === article.id} onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50">Delete</button>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">
                  No articles found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
         <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
           <button 
             disabled={currentPage <= 1}
             onClick={() => updateFilters('page', (currentPage - 1).toString())}
             className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 text-black"
           >
             Previous
           </button>
           <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
           <button 
             disabled={currentPage >= totalPages}
             onClick={() => updateFilters('page', (currentPage + 1).toString())}
             className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 text-black"
           >
             Next
           </button>
         </div>
      )}
    </div>
  )
}
