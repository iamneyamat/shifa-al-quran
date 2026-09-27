import { requireAdmin } from '@/lib/auth/requireAdmin'
import Link from 'next/link'
import {
  FileText,
  CheckCircle2,
  FileEdit,
  Archive,
  FolderOpen,
  FolderCheck,
  Globe,
  Smartphone,
  ArrowRight,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react'

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin()

  // Run parallel queries for optimal performance
  const [
    totalArticlesRes,
    publishedRes,
    draftsRes,
    archivedRes,
    totalCategoriesRes,
    activeCategoriesRes,
    recentlyPublishedRes,
    recentlyUpdatedRes,
    recentCategoriesRes,
  ] = await Promise.all([
    supabase.from('articles').select('id', { count: 'exact', head: true }),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'archived'),
    supabase.from('content_categories').select('id', { count: 'exact', head: true }),
    supabase.from('content_categories').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase
      .from('articles')
      .select('id, title, slug, status, published_at, category:content_categories(name)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(5),
    supabase
      .from('articles')
      .select('id, title, slug, status, created_at, updated_at, category:content_categories(name)')
      .order('updated_at', { ascending: false, nullsFirst: false })
      .limit(5),
    supabase
      .from('content_categories')
      .select('id, name, slug, is_active, created_at')
      .order('created_at', { ascending: false })
      .limit(4),
  ])

  const totalArticles = totalArticlesRes.count || 0
  const publishedCount = publishedRes.count || 0
  const draftCount = draftsRes.count || 0
  const archivedCount = archivedRes.count || 0
  const totalCategories = totalCategoriesRes.count || 0
  const activeCategories = activeCategoriesRes.count || 0

  const publishedPercent = totalArticles > 0 ? Math.round((publishedCount / totalArticles) * 100) : 0
  const draftPercent = totalArticles > 0 ? Math.round((draftCount / totalArticles) * 100) : 0
  const archivedPercent = totalArticles > 0 ? Math.max(0, 100 - publishedPercent - draftPercent) : 0

  const primaryStats = [
    {
      label: 'Total Articles',
      value: totalArticles,
      icon: FileText,
      color: 'text-gray-900',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-200',
      href: '/admin/articles',
    },
    {
      label: 'Published Articles',
      value: publishedCount,
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      href: '/admin/articles?status=published',
      badge: 'Live on Web & App',
    },
    {
      label: 'Draft Articles',
      value: draftCount,
      icon: FileEdit,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      href: '/admin/articles?status=draft',
      badge: 'Unpublished',
    },
    {
      label: 'Archived Articles',
      value: archivedCount,
      icon: Archive,
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
      borderColor: 'border-slate-200',
      href: '/admin/articles?status=archived',
    },
    {
      label: 'Total Categories',
      value: totalCategories,
      icon: FolderOpen,
      color: 'text-teal-700',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      href: '/admin/categories',
    },
    {
      label: 'Active Categories',
      value: activeCategories,
      icon: FolderCheck,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      href: '/admin/categories',
      badge: 'Visible in App/Web',
    },
  ]

  // Construct unified recent activity list
  type ActivityItem = {
    id: string
    title: string
    type: 'published' | 'updated' | 'category' | 'draft'
    label: string
    timestamp: string
    href: string
  }

  const activities: ActivityItem[] = []

  // Add published articles
  recentlyPublishedRes.data?.forEach((a) => {
    activities.push({
      id: `pub-${a.id}`,
      title: a.title,
      type: 'published',
      label: 'Article Published',
      timestamp: a.published_at || new Date().toISOString(),
      href: `/admin/articles/${a.id}`,
    })
  })

  // Add recently updated
  recentlyUpdatedRes.data?.forEach((a) => {
    if (a.updated_at && a.status !== 'published') {
      activities.push({
        id: `upd-${a.id}`,
        title: a.title,
        type: a.status === 'draft' ? 'draft' : 'updated',
        label: a.status === 'draft' ? 'Draft Edited' : 'Article Updated',
        timestamp: a.updated_at,
        href: `/admin/articles/${a.id}`,
      })
    }
  })

  // Add categories
  recentCategoriesRes.data?.forEach((c) => {
    activities.push({
      id: `cat-${c.id}`,
      title: c.name,
      type: 'category',
      label: 'Category Added',
      timestamp: c.created_at,
      href: '/admin/categories',
    })
  })

  // Sort activity items by timestamp descending
  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  const recentActivity = activities.slice(0, 6)

  return (
    <div className="space-y-8">
      {/* Top Welcome & Platform Sync Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950 via-gray-900 to-gray-900 text-white p-6 rounded-2xl shadow-sm border border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles size={18} className="text-emerald-400" />
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              Content Control Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Shifa Al Quran CMS</h1>
          <p className="text-sm text-gray-300 mt-1 max-w-xl">
            Single administrative dashboard managing verified Ruqyah articles and categories for both
            the official website and mobile application.
          </p>
        </div>

        {/* Live Sync Confirmation Pill */}
        <div className="bg-gray-800/90 border border-emerald-600/40 rounded-xl p-4 flex flex-col gap-2 min-w-[240px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">Multi-Platform Sync</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-1.5">
                <Globe size={13} className="text-emerald-400" /> Website (saq.pro.bd)
              </span>
              <span className="text-emerald-400 font-medium">✓ Synced</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-1.5">
                <Smartphone size={13} className="text-emerald-400" /> Mobile App (iOS/Android)
              </span>
              <span className="text-emerald-400 font-medium">✓ Synced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {primaryStats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Link
              key={i}
              href={stat.href}
              className={`bg-white rounded-xl shadow-sm border ${stat.borderColor} p-4 hover:shadow-md transition-all group flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                  <Icon size={16} />
                </div>
                {stat.badge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {stat.badge}
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {stat.value}
                </p>
                <h3 className="text-xs font-medium text-gray-500 mt-0.5">{stat.label}</h3>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Visual Analytics & Status Distribution Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Article Publishing Health</h3>
            <p className="text-xs text-gray-500">Distribution of content states across the entire repository</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Published ({publishedPercent}%)
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              Drafts ({draftPercent}%)
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
              Archived ({archivedPercent}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden flex gap-0.5">
          <div
            style={{ width: `${publishedPercent}%` }}
            className="bg-emerald-500 transition-all duration-500 rounded-l-full"
            title={`Published: ${publishedCount} articles (${publishedPercent}%)`}
          ></div>
          <div
            style={{ width: `${draftPercent}%` }}
            className="bg-amber-400 transition-all duration-500"
            title={`Drafts: ${draftCount} articles (${draftPercent}%)`}
          ></div>
          <div
            style={{ width: `${archivedPercent}%` }}
            className="bg-slate-300 transition-all duration-500 rounded-r-full"
            title={`Archived: ${archivedCount} articles (${archivedPercent}%)`}
          ></div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
          <span>
            Active Categories: <strong className="text-gray-900">{activeCategories} of {totalCategories}</strong> available
          </span>
          <Link
            href="/admin/articles"
            className="text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1"
          >
            Manage all articles in table <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Recently Published Articles & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recently Published Articles */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <h2 className="text-base font-semibold text-gray-900">Recently Published</h2>
              </div>
              <Link
                href="/admin/articles?status=published"
                className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                View Published →
              </Link>
            </div>

            {recentlyPublishedRes.data && recentlyPublishedRes.data.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentlyPublishedRes.data.map((article) => {
                  const catRaw = article.category as unknown
                  const catName =
                    Array.isArray(catRaw) && catRaw.length > 0
                      ? (catRaw[0] as { name?: string })?.name || 'Uncategorized'
                      : (catRaw as { name?: string } | null)?.name || 'Uncategorized'
                  return (
                    <div key={article.id} className="py-3.5 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="font-medium text-sm text-gray-900 hover:text-emerald-700 transition-colors block truncate"
                        >
                          {article.title}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px]">
                            {catName}
                          </span>
                          <span>•</span>
                          <span>
                            {article.published_at
                              ? new Date(article.published_at).toLocaleDateString('bn-BD', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : 'Published'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View live article on website"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-gray-500">No published articles yet.</div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 text-right">
            <Link
              href="/admin/articles/create"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              + Create & Publish New Article
            </Link>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-700" />
                <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <span className="text-xs text-gray-400 font-medium">Automatic Timeline</span>
            </div>

            {recentActivity.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentActivity.map((item) => (
                  <div key={item.id} className="py-3 flex items-start gap-3">
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        item.type === 'published'
                          ? 'bg-emerald-500'
                          : item.type === 'category'
                          ? 'bg-teal-500'
                          : item.type === 'draft'
                          ? 'bg-amber-400'
                          : 'bg-blue-400'
                      }`}
                    ></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {new Date(item.timestamp).toLocaleDateString('bn-BD', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <Link
                        href={item.href}
                        className="text-xs font-medium text-gray-800 hover:text-emerald-700 block truncate mt-0.5"
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-gray-500">No activity recorded yet.</div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Updates are pushed to Mobile App & Website immediately</span>
            <Link href="/admin/categories" className="text-emerald-700 hover:text-emerald-800 font-medium">
              Categories →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
