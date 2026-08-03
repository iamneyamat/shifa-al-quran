"use client";

import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

const routes = [
  { href: "/", label: "হোম" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/services", label: "সেবাসমূহ" },
  { href: "/process", label: "চিকিৎসা পদ্ধতি" },
  { href: "/audio", label: "অডিও" },
  { href: "/blog", label: "ব্লগ" },
  { href: "/contact", label: "যোগাযোগ" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredRoute, setHoveredRoute] = React.useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu when route changes
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 shadow-sm transition-all duration-300">
      {/* Subtle Islamic Geometric Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%23059669' stroke-width='1' fill='none' d='M20 0L40 20L20 40L0 20z'/%3E%3Cpath stroke='%23059669' stroke-width='1' fill='none' d='M0 0h40v40H0z' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Area */}
          <div className="relative flex items-center gap-2 z-10">
            {/* Soft blue and gold glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-emerald-400/10 to-amber-400/20 blur-xl rounded-full opacity-70 dark:opacity-40 animate-pulse pointer-events-none" />
            
            <Link href="/" className="relative flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="Shifa Al Quran" 
                  width={44} 
                  height={44} 
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
                শিফা আল কুরআন
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 z-10" onMouseLeave={() => setHoveredRoute(null)}>
            {routes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "relative px-4 py-2 text-[15px] font-medium transition-colors duration-300",
                    isActive ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
                  )}
                  onMouseEnter={() => setHoveredRoute(route.href)}
                >
                  <span className="relative z-10">{route.label}</span>
                  
                  {/* Hover Background */}
                  {hoveredRoute === route.href && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg -z-0"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Active Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 ml-2 pl-4">
              <ThemeToggle />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/appointment"
                  className="relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
                  অ্যাপয়েন্টমেন্ট
                </Link>
              </motion.div>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden z-20">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-slate-700 bg-white/50 border border-slate-200 dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-200 backdrop-blur-sm transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/30"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute top-20 left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl md:hidden border-t border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col px-4 py-8 h-full">
              <div className="flex flex-col gap-2">
                {routes.map((route, i) => {
                  const isActive = pathname === route.href;
                  return (
                    <motion.div
                      key={route.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={route.href}
                        className={cn(
                          "block rounded-xl px-4 py-4 text-lg font-semibold transition-all",
                          isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/30"
                            : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600 border border-transparent dark:text-slate-300 dark:hover:bg-slate-900/50 dark:hover:text-emerald-400"
                        )}
                      >
                        {route.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: routes.length * 0.05 + 0.1, duration: 0.3 }}
                className="mt-auto pb-24"
              >
                <Link
                  href="/appointment"
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-emerald-700 active:scale-[0.98]"
                >
                  অ্যাপয়েন্টমেন্ট নিন
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
