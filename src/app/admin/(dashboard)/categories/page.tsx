import { requireAdmin } from '@/lib/auth/requireAdmin'
import ClientCategoryList from './ClientCategoryList'

export const metadata = {
  title: 'Category Management | Admin CMS',
}

export default async function CategoriesPage() {
  const { supabase } = await requireAdmin()
  
  const { data: categories } = await supabase
    .from('content_categories')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <ClientCategoryList initialCategories={categories || []} />
  )
}
