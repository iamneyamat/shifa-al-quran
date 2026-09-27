"use client";

import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf, CalendarHeart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const routes = [
  { href: "/", label: "হোম" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/services", label: "সেবাসমূহ" },
  { href: "/diagnosis", label: "ডায়াগনোসিস" },
  { href: "/process", label: "চিকিৎসা পদ্ধতি" },
  { href: "/audio", label: "অডিও" },
  { href: "/blog", label: "ব্লগ" },
  { href: "/contact", label: "যোগাযোগ" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const closeMenu = React.useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <header className="sticky top-3 sm:top-4 z-[var(--z-sticky-nav)] w-full px-3 sm:px-6 transition-all duration-300 pointer-events-none">
      <div
        className={cn(
          "max-w-6xl mx-auto rounded-full transition-all duration-300 backdrop-blur-2xl border shadow-xl flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 pointer-events-auto",
          scrolled
            ? "bg-white/95 dark:bg-zinc-950/90 border-slate-300/90 dark:border-white/15 shadow-2xl shadow-slate-900/10 dark:shadow-black/60"
            : "bg-white/85 dark:bg-zinc-900/80 border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/40"
        )}
      >
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-transparent p-0.5 border border-emerald-500/30 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="শিফা আল কুরআন লোগো"
              width={36}
              height={36}
              className="h-full w-full rounded-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="type-subtitle text-slate-900 dark:text-zinc-100 font-bold tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
              শিফা আল কুরআন
            </span>
            <span className="type-citation text-[9px] text-amber-800 dark:text-gold-ink hidden sm:block -mt-1 font-semibold">
              রুকইয়াহ শারইয়াহ সেন্টার
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Capsule */}
        <nav aria-label="প্রধান মেনু" className="hidden items-center gap-1 xl:flex">
          <div className="flex items-center rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-white/5 p-1 backdrop-blur-md">
            {routes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-8 items-center justify-center rounded-full px-3.5 text-[0.8125rem] font-medium transition-colors duration-200",
                    isActive
                      ? "text-white dark:text-zinc-950 font-bold"
                      : "text-slate-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 z-[-1] rounded-full bg-emerald-700 dark:bg-emerald-400 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {route.label}
                </Link>
              );
            })}
          </div>

          <span className="mx-2 h-5 w-px bg-slate-200 dark:bg-white/10" aria-hidden="true" />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link 
              href="/appointment" 
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <CalendarHeart className="h-4 w-4 text-emerald-200 transition-transform group-hover:rotate-12" />
              <span>অ্যাপয়েন্টমেন্ট</span>
            </Link>
          </div>
        </nav>

        {/* Compact Mobile Controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/10 text-slate-900 dark:text-zinc-100 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-400 active:scale-95"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="sr-only">মেনু</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backscreen (Scrim) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            aria-hidden="true"
            className="fixed inset-0 z-[var(--z-drawer)] bg-black/60 backdrop-blur-sm xl:hidden pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <nav
        id="mobile-nav"
        aria-label="প্রধান মেনু"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-[var(--z-modal)] flex w-[min(20rem,86vw)] flex-col shadow-2xl pointer-events-auto",
          "border-l border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl xl:hidden",
          isOpen
            ? "visible translate-x-0 [transition:translate_var(--duration-normal)_var(--ease-decelerate),visibility_0s]"
            : "invisible translate-x-full [transition:translate_var(--duration-exit-normal)_var(--ease-accelerate),visibility_0s_var(--duration-exit-normal)]"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 px-5">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <span className="type-subtitle text-slate-900 dark:text-zinc-100 font-bold">মেনু</span>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 dark:text-zinc-300 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-emerald-700"
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">মেনু বন্ধ করুন</span>
          </button>
        </div>

        <ul className="flex-1 space-y-1 p-3 overflow-y-auto">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-xl px-4 text-[0.9375rem] font-medium transition-all duration-200",
                    isActive
                      ? "bg-emerald-700 text-white font-bold shadow-sm"
                      : "text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-emerald-700"
                  )}
                >
                  {route.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="shrink-0 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/60 p-4 backdrop-blur-md">
          <Link
            href="/appointment"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 text-center font-bold shadow-md transition-all active:scale-98"
          >
            <CalendarHeart className="h-4 w-4" />
            <span>অ্যাপয়েন্টমেন্ট নিন</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
