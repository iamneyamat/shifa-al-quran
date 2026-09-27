'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, FolderOpen, Globe, Smartphone } from 'lucide-react'

export default function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      name: 'Articles',
      href: '/admin/articles',
      icon: FileText,
      active: pathname.startsWith('/admin/articles'),
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: FolderOpen,
      active: pathname.startsWith('/admin/categories'),
    },
  ]

  return (
    <div className="flex flex-col flex-1 justify-between">
      <nav className="mt-6 px-3 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                item.active
                  ? 'bg-emerald-700 text-white shadow-sm font-semibold'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={18} className={item.active ? 'text-white' : 'text-gray-400'} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Sync Status Badge */}
      <div className="p-3 mx-3 my-4 bg-gray-800/80 rounded-xl border border-gray-700/60 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Sync Active</span>
        </div>
        <div className="space-y-1.5 text-gray-300">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Globe size={13} className="text-emerald-400" /> Website
            </span>
            <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/50">
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Smartphone size={13} className="text-emerald-400" /> Mobile App
            </span>
            <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/50">
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
