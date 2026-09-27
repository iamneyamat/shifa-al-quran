import { requireAdmin } from '@/lib/auth/requireAdmin'
import Link from 'next/link'
import { logout } from './actions'
import { ReactNode } from 'react'
import { LogOut, ExternalLink, Plus } from 'lucide-react'
import AdminNav from './AdminNav'

export const metadata = {
  title: 'Admin Dashboard — Shifa Al Quran CMS',
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 md:sticky md:top-0 md:h-screen flex flex-col border-r border-gray-800">
        <div className="p-5 border-b border-gray-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h2 className="text-lg font-bold text-white tracking-wide">Shifa Al Quran</h2>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Unified Web & App CMS</p>
          </div>
        </div>

        <AdminNav />

        <div className="p-3 border-t border-gray-800">
          <form action={logout}>
            <button className="flex w-full items-center space-x-3 px-3.5 py-2.5 text-gray-400 hover:bg-gray-800 hover:text-red-400 rounded-lg text-sm transition-colors">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Multi-Platform Synced
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles/create"
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <Plus size={14} />
              <span>New Article</span>
            </Link>
            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
              title="Open public website blog in a new tab"
            >
              <ExternalLink size={13} />
              <span>View Website</span>
            </a>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
