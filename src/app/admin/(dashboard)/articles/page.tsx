import { requireAdmin } from '@/lib/auth/requireAdmin'
import Link from 'next/link'
import ArticleListTable from './ArticleListTable'
import { Suspense } from 'react'

export const metadata = {
  title: 'Articles | Admin CMS',
}

export default async function ArticlesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { supabase } = await requireAdmin()
  
  // Wait for searchParams (Next 15)
  const searchParams = await props.searchParams
  
  const page = parseInt(searchParams.page as string || '1')
  const pageSize = 15
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  
  const statusFilter = searchParams.status as string || 'all'
  const catFilter = searchParams.category as string || 'all'
  const searchFilter = searchParams.search as string || ''

  let query = supabase.from('articles').select('id, title, slug, status, featured, created_at, category:content_categories(name)', { count: 'exact' })
  
  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }
  if (catFilter !== 'all') {
    query = query.eq('category_id', catFilter)
  }
  if (searchFilter) {
    query = query.ilike('title', `%${searchFilter}%`)
  }

  const { data: articles, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to)

  const { data: categories } = await supabase.from('content_categories').select('id, name').order('name')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
        <Link href="/admin/articles/create" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + New Article
        </Link>
      </div>

      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
         <ArticleListTable 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            articles={(articles as any[]) || []} 
            categories={categories || []}
            totalCount={count || 0}
            currentPage={page}
            pageSize={pageSize}
         />
      </Suspense>
    </div>
  )
}
