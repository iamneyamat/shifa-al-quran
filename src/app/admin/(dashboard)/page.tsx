import { requireAdmin } from '@/lib/auth/requireAdmin'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin()
  
  // Fetch stats using count for efficiency
  const [articlesRes, publishedRes, draftsRes, categoriesRes, recentRes] = await Promise.all([
    supabase.from('articles').select('id', { count: 'exact', head: true }),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('content_categories').select('id', { count: 'exact', head: true }),
    supabase.from('articles').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(5)
  ])

  const stats = [
    { label: 'Total Articles', value: articlesRes.count || 0 },
    { label: 'Published', value: publishedRes.count || 0 },
    { label: 'Drafts', value: draftsRes.count || 0 },
    { label: 'Categories', value: categoriesRes.count || 0 },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Articles</h2>
          <Link href="/admin/articles" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            View All →
          </Link>
        </div>
        
        {recentRes.data && recentRes.data.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentRes.data.map(article => (
              <div key={article.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{article.title}</p>
                  <p className="text-sm text-gray-500">{new Date(article.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  article.status === 'published' ? 'bg-green-100 text-green-800' :
                  article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No articles found.</p>
        )}
      </div>
    </div>
  )
}
