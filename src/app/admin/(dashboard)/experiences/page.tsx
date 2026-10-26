import { requireAdmin } from '@/lib/auth/requireAdmin'
import Link from 'next/link'
import ExperienceListTable from './ExperienceListTable'
import { Suspense } from 'react'
import { Plus } from 'lucide-react'

export const metadata = {
  title: 'Experiences Management — Shifa Al Quran CMS',
}

export default async function ExperiencesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { supabase } = await requireAdmin()

  const searchParams = await props.searchParams

  const parsedPage = parseInt((searchParams.page as string) || '1')
  const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage
  const pageSize = 12
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const statusFilter = (searchParams.status as string) || 'all'
  const catFilter = (searchParams.category as string) || 'all'
  const searchFilter = (searchParams.search as string) || ''
  const sortFilter = (searchParams.sort as string) || 'order'

  let query = supabase.from('testimonials').select(
    `
      id,
      customer_name,
      location,
      content,
      category,
      rating,
      is_featured,
      media_type,
      video_url,
      image_url,
      audio_url,
      sort_order,
      is_published,
      created_at,
      updated_at
    `,
    { count: 'exact' }
  )

  if (statusFilter === 'published') {
    query = query.eq('is_published', true)
  } else if (statusFilter === 'draft') {
    query = query.eq('is_published', false)
  }
  if (catFilter !== 'all') {
    query = query.eq('category', catFilter)
  }
  if ((searchParams.featured as string) === '1') {
    query = query.eq('is_featured', true)
  }
  if (searchFilter) {
    query = query.ilike('customer_name', `%${searchFilter}%`)
  }

  // Dynamic sorting
  if (sortFilter === 'oldest') {
    query = query.order('created_at', { ascending: true })
  } else if (sortFilter === 'updated') {
    query = query.order('updated_at', { ascending: false, nullsFirst: false })
  } else if (sortFilter === 'newest') {
    query = query.order('created_at', { ascending: false })
  } else {
    // Default: same order the app and website show — sort_order, then newest
    query = query.order('sort_order', { ascending: true }).order('created_at', { ascending: false })
  }

  const [{ data: experiences, count }, publishedCountRes, draftCountRes, featuredCountRes] =
    await Promise.all([
      query.range(from, to),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_published', true),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_published', false),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_featured', true),
    ])

  const countsByStatus = {
    all: (count || 0),
    published: publishedCountRes.count || 0,
    draft: draftCountRes.count || 0,
    featured: featuredCountRes.count || 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Experiences Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Create, edit, organize, and publish customer experiences across Web and Mobile App.
          </p>
        </div>
        <Link
          href="/admin/experiences/create"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={16} />
          <span>New Experience</span>
        </Link>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-gray-500 bg-white rounded-xl">Loading experiences...</div>}>
        <ExperienceListTable
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          experiences={(experiences as any[]) || []}
          totalCount={count || 0}
          currentPage={page}
          pageSize={pageSize}
          countsByStatus={countsByStatus}
        />
      </Suspense>
    </div>
  )
}
