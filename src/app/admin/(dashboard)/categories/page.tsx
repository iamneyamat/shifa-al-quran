import { requireAdmin } from '@/lib/auth/requireAdmin'
import ClientCategoryList from './ClientCategoryList'

export const metadata = {
  title: 'Category Management — Shifa Al Quran CMS',
}

export default async function CategoriesPage() {
  const { supabase } = await requireAdmin()

  const [categoriesRes, articlesRes] = await Promise.all([
    supabase
      .from('content_categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase.from('articles').select('category_id'),
  ])

  // Count articles per category
  const articleCounts: Record<string, number> = {}
  articlesRes.data?.forEach((a) => {
    if (a.category_id) {
      articleCounts[a.category_id] = (articleCounts[a.category_id] || 0) + 1
    }
  })

  return (
    <ClientCategoryList
      initialCategories={categoriesRes.data || []}
      articleCounts={articleCounts}
    />
  )
}
