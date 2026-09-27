import { requireAdmin } from '@/lib/auth/requireAdmin'
import Link from 'next/link'
import ArticleListTable from './ArticleListTable'
import { Suspense } from 'react'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Articles Management — Shifa Al Quran CMS',
}

export default async function ArticlesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { supabase } = await requireAdmin()

  const searchParams = await props.searchParams

  const page = parseInt((searchParams.page as string) || '1')
  const pageSize = 12
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const statusFilter = (searchParams.status as string) || 'all'
  const catFilter = (searchParams.category as string) || 'all'
  const searchFilter = (searchParams.search as string) || ''
  const sortFilter = (searchParams.sort as string) || 'newest'

  let query = supabase.from('articles').select(
    `
      id,
      title,
      slug,
      excerpt,
      status,
      featured,
      sort_order,
      created_at,
      updated_at,
      published_at,
      category_id,
      category:content_categories(
        id,
        name
      )
    `,
    { count: 'exact' }
  )

  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }
  if (catFilter !== 'all') {
    query = query.eq('category_id', catFilter)
  }
  if (searchFilter) {
    query = query.ilike('title', `%${searchFilter}%`)
  }

  // Dynamic sorting
  if (sortFilter === 'oldest') {
    query = query.order('created_at', { ascending: true })
  } else if (sortFilter === 'updated') {
    query = query.order('updated_at', { ascending: false, nullsFirst: false })
  } else if (sortFilter === 'published') {
    query = query.order('published_at', { ascending: false, nullsFirst: false })
  } else {
    // Default newest
    query = query.order('created_at', { ascending: false })
  }

  const [{ data: articles, count }, { data: categories }, publishedCountRes, draftCountRes, archivedCountRes] =
    await Promise.all([
      query.range(from, to),
      supabase.from('content_categories').select('id, name').order('name'),
      supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
      supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'archived'),
    ])

  const countsByStatus = {
    all: (publishedCountRes.count || 0) + (draftCountRes.count || 0) + (archivedCountRes.count || 0),
    published: publishedCountRes.count || 0,
    draft: draftCountRes.count || 0,
    archived: archivedCountRes.count || 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Articles Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Create, edit, organize, and publish Ruqyah articles across Web and Mobile App.
          </p>
        </div>
        <Link
          href="/admin/articles/create"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={16} />
          <span>New Article</span>
        </Link>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-gray-500 bg-white rounded-xl">Loading articles...</div>}>
        <ArticleListTable
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          articles={(articles as any[]) || []}
          categories={categories || []}
          totalCount={count || 0}
          currentPage={page}
          pageSize={pageSize}
          countsByStatus={countsByStatus}
        />
      </Suspense>
    </div>
  )
}
