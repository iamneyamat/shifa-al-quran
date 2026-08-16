import { requireAdmin } from '@/lib/auth/requireAdmin'
import ArticleEditor from '../ArticleEditor'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Edit Article | Admin CMS',
}

export default async function EditArticlePage(props: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireAdmin()
  
  const params = await props.params
  const id = params.id

  const [articleRes, categoriesRes] = await Promise.all([
    supabase.from('articles').select('*').eq('id', id).single(),
    supabase.from('content_categories').select('id, name').eq('is_active', true).order('name')
  ])

  if (articleRes.error || !articleRes.data) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Article</h1>
      <ArticleEditor initialData={articleRes.data} categories={categoriesRes.data || []} />
    </div>
  )
}
