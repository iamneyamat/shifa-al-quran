"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const routes = [
  { href: "/", label: "হোম" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/services", label: "সেবাসমূহ" },
  { href: "/process", label: "চিকিৎসা পদ্ধতি" },
  { href: "/contact", label: "যোগাযোগ" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              {/* Optional: Add Logo Image here later */}
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-500">
                শিফা আল কুরআন
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-emerald-600",
                  pathname === route.href
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 border-l pl-4 dark:border-slate-800">
              <ThemeToggle />
              <Link
                href="/appointment"
                className="inline-flex h-9 items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700"
              >
                অ্যাপয়েন্টমেন্ট
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-emerald-100 hover:text-emerald-900 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-50"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === route.href
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : "text-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                )}
              >
                {route.label}
              </Link>
            ))}
            <Link
              href="/appointment"
              className="block mt-4 w-full text-center rounded-md bg-emerald-600 px-3 py-2 text-base font-medium text-white hover:bg-emerald-700"
            >
              অ্যাপয়েন্টমেন্ট নিন
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
