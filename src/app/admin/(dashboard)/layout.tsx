import { requireAdmin } from '@/lib/auth/requireAdmin'
import Link from 'next/link'
import { logout } from './actions'
import { ReactNode } from 'react'
import { LayoutDashboard, FileText, FolderOpen, LogOut } from 'lucide-react'

export const metadata = {
  title: 'Admin Dashboard - Shifa Al Quran',
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Enforce server-side authorization:
  // If the user isn't an active admin, this redirects them to login.
  // Because this is the root layout for /admin, it protects all child routes.
  await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 md:sticky md:top-0 md:h-screen">
        <div className="p-6">
          <h2 className="text-xl font-bold">Shifa Al Quran</h2>
          <p className="text-sm text-gray-400 mt-1">CMS Dashboard</p>
        </div>
        
        <nav className="mt-6 px-4 space-y-2 flex-grow">
          <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <FolderOpen size={20} />
            <span>Categories</span>
          </Link>
          <Link href="/admin/articles" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <FileText size={20} />
            <span>Articles</span>
          </Link>
        </nav>

        <div className="p-4 md:absolute md:bottom-0 md:w-64 w-full">
          <form action={logout}>
            <button className="flex w-full items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-red-400 rounded-lg transition-colors">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
