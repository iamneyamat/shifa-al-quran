import { requireAdmin } from '@/lib/auth/requireAdmin'
import ArticleEditor from '../ArticleEditor'

export const metadata = {
  title: 'Create Article | Admin CMS',
}

export default async function CreateArticlePage() {
  const { supabase } = await requireAdmin()
  
  const { data: categories } = await supabase.from('content_categories').select('id, name').eq('is_active', true).order('name')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Article</h1>
      <ArticleEditor categories={categories || []} />
    </div>
  )
}
