'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { createClient } from '@/lib/supabase/client'
import { saveArticle } from './actions'

export default function ArticleEditor({ 
  initialData, 
  categories 
}: { 
  initialData?: Record<string, unknown> | null, 
  categories: {id: string, name: string}[] 
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
  })
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

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
    
    const { data, error: uploadError } = await supabase.storage
      .from('cms-images')
      .upload(fileName, file)
      
    if (uploadError) {
      setError('Image upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: publicUrlData } = supabase.storage.from('cms-images').getPublicUrl(fileName)
    setFormData(prev => ({ ...prev, cover_image_url: publicUrlData.publicUrl }))
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const res = await saveArticle(formData)
    if (res?.error) {
      setError(res.error)
      setSaving(false)
    } else {
      router.push('/admin/articles')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
           {error}
         </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  required 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-emerald-500 focus:border-emerald-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown Format)</label>
                
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="flex border-b border-gray-300 bg-gray-50">
                    <button type="button" onClick={() => setActiveTab('edit')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'edit' ? 'bg-white text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                      Edit
                    </button>
                    <button type="button" onClick={() => setActiveTab('preview')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'preview' ? 'bg-white text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                      Preview
                    </button>
                  </div>
                  
                  {activeTab === 'edit' ? (
                    <textarea 
                      required
                      rows={15}
                      value={formData.content}
                      onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full p-4 border-0 text-black focus:ring-0 font-mono text-sm resize-y"
                      placeholder="# Write your article here... Supports Bengali and Arabic."
                    />
                  ) : (
                    <div className="p-4 prose max-w-none min-h-[350px] bg-white text-black">
                      <ReactMarkdown>{formData.content || '*No content yet*'}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short summary)</label>
                <textarea 
                  rows={3}
                  value={formData.excerpt}
                  onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-emerald-500 focus:border-emerald-500" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
             <h3 className="font-semibold text-gray-900 border-b pb-2">Publishing</h3>
             
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  required
                  value={formData.category_id}
                  onChange={e => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(c => (
                     <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="Auto-generated if empty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-emerald-500 focus:border-emerald-500 text-sm" 
                />
             </div>

             <div className="flex items-center space-x-2 pt-2">
               <input 
                 type="checkbox" 
                 id="featured"
                 checked={formData.featured}
                 onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                 className="rounded text-emerald-600 focus:ring-emerald-500"
               />
               <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Article</label>
             </div>
             
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                <input 
                  type="number" 
                  value={formData.sort_order}
                  onChange={e => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-emerald-500 focus:border-emerald-500" 
                />
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
             <h3 className="font-semibold text-gray-900 border-b pb-2">Cover Image</h3>
             
             {formData.cover_image_url && (
               <div className="mb-4">
                 <img src={formData.cover_image_url} alt="Cover Preview" className="w-full h-auto rounded-lg object-cover max-h-48" />
               </div>
             )}
             
             <div>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                {uploading && <p className="text-sm text-emerald-600 mt-2">Uploading...</p>}
             </div>
          </div>

          <button 
             type="submit" 
             disabled={saving || uploading}
             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
             {saving ? 'Saving...' : 'Save Article'}
          </button>
        </div>
      </div>
    </form>
  )
}
