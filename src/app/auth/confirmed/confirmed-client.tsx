'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Smartphone, Globe } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { type EmailOtpType } from '@supabase/supabase-js'

type VerificationState = 'loading' | 'success' | 'error' | 'direct_access'

interface VerificationDetails {
  email?: string
  errorMessage?: string
}

const NATIVE_APP_SCHEME_URL = 'shifaalquranapp://auth/login'

export function ConfirmedClientContent() {
  const searchParams = useSearchParams()
  const [state, setState] = useState<VerificationState>('loading')
  const [details, setDetails] = useState<VerificationDetails>({})
  const [appOpenFallback, setAppOpenFallback] = useState(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    const supabase = createClient()

    async function evaluateVerification() {
      try {
        const errorParam = searchParams.get('error')
        const errorCode = searchParams.get('error_code')
        const errorDesc = searchParams.get('error_description')
        const verifiedParam = searchParams.get('verified')
        const codeParam = searchParams.get('code')
        const tokenHashParam = searchParams.get('token_hash')
        const typeParam = searchParams.get('type')

        const formatErrorMessage = (code?: string | null, desc?: string | null, err?: string | null) => {
          if (code === 'otp_expired' || desc?.toLowerCase().includes('expired')) {
            return 'আপনার ভেরিফিকেশন লিঙ্কটির মেয়াদ শেষ হয়ে গেছে বা পূর্বে ব্যবহৃত হয়েছে। অনুগ্রহ করে Shifa Al Quran অ্যাপে গিয়ে পুনরায় সাইন-ইন বা নতুন ভেরিফিকেশন লিঙ্ক অনুরোধ করুন।'
          }
          if (err === 'access_denied') {
            return 'অননুমোদিত অ্যাক্সেস বা লিঙ্কটির মেয়াদ শেষ হয়েছে। অনুগ্রহ করে অ্যাপ থেকে নতুন ভেরিফিকেশন লিঙ্ক অনুরোধ করুন।'
          }
          if (desc) {
            return decodeURIComponent(desc.replace(/\+/g, ' '))
          }
          return 'লিঙ্কটির মেয়াদ উত্তীর্ণ হয়েছে অথবা লিঙ্কটি সঠিক নয়। অনুগ্রহ করে অ্যাপ থেকে নতুন লিঙ্ক অনুরোধ করুন।'
        }

        // 1. Check for error parameters in query string
        if (errorParam || errorDesc || errorCode) {
          if (!isMountedRef.current) return
          setState('error')
          setDetails({
            errorMessage: formatErrorMessage(errorCode, errorDesc, errorParam),
          })
          return
        }

        // 2. Check for hash parameters (#access_token=... or #error=...) from direct Supabase redirect
        if (typeof window !== 'undefined' && window.location.hash) {
          const hashString = window.location.hash.substring(1)
          const hashParams = new URLSearchParams(hashString)

          const hashType = hashParams.get('type')
          const hashError = hashParams.get('error')
          const hashErrorCode = hashParams.get('error_code')
          const hashErrorDesc = hashParams.get('error_description')
          const accessToken = hashParams.get('access_token')
          const refreshToken = hashParams.get('refresh_token')

          // Immediately remove raw credentials from URL bar for security
          window.history.replaceState(null, '', window.location.pathname)

          // Password recovery should never be treated as email confirmation
          if (hashType === 'recovery') {
            if (!isMountedRef.current) return
            setState('direct_access')
            return
          }

          if (hashError || hashErrorDesc || hashErrorCode) {
            if (!isMountedRef.current) return
            setState('error')
            setDetails({
              errorMessage: formatErrorMessage(hashErrorCode, hashErrorDesc, hashError),
            })
            return
          }

          if (accessToken && refreshToken) {
            const { data, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })

            if (!sessionError && data?.user) {
              if (!isMountedRef.current) return
              setState('success')
              setDetails({ email: data.user.email })
              return
            } else {
              if (!isMountedRef.current) return
              setState('error')
              setDetails({
                errorMessage: sessionError?.message || 'সেশন প্রতিষ্ঠা করতে ব্যর্থ হয়েছে।',
              })
              return
            }
          }
        }

        // 3. Check for PKCE code or token hash directly landed on this page
        if (codeParam) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(codeParam)
          if (!error && data?.user) {
            if (!isMountedRef.current) return
            setState('success')
            setDetails({ email: data.user.email })
            return
          } else {
            if (!isMountedRef.current) return
            setState('error')
            setDetails({ errorMessage: 'ভেরিফিকেশন কোডটি অকার্যকর বা মেয়াদোত্তীর্ণ।' })
            return
          }
        }

        if (tokenHashParam && typeParam) {
          // Password recovery tokens must not trigger email confirmation
          if (typeParam === 'recovery') {
            if (!isMountedRef.current) return
            setState('direct_access')
            return
          }

          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHashParam,
            type: typeParam as EmailOtpType,
          })
          if (!error && data?.user) {
            if (!isMountedRef.current) return
            setState('success')
            setDetails({ email: data.user.email })
            return
          } else {
            if (!isMountedRef.current) return
            setState('error')
            setDetails({ errorMessage: 'নিশ্চিতকরণ টোকেনটি অকার্যকর বা মেয়াদোত্তীর্ণ।' })
            return
          }
        }

        // 4. If redirected with verified=true from server callback
        // DO NOT trust the query parameter alone! Check active authenticated user session.
        if (verifiedParam === 'true') {
          const { data: { user }, error: userError } = await supabase.auth.getUser()

          if (!userError && user && (user.email_confirmed_at || user.confirmed_at)) {
            if (!isMountedRef.current) return
            setState('success')
            setDetails({ email: user.email })
            return
          } else {
            if (!isMountedRef.current) return
            setState('direct_access')
            return
          }
        }

        // 5. Direct visit without verified credentials or active confirmation flow
        if (!isMountedRef.current) return
        setState('direct_access')
      } catch {
        if (!isMountedRef.current) return
        setState('error')
        setDetails({ errorMessage: 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।' })
      }
    }

    evaluateVerification()

    return () => {
      isMountedRef.current = false
    }
  }, [searchParams])

  const handleOpenApp = () => {
    setAppOpenFallback(false)
    const startTime = Date.now()

    // Attempt to open native app
    window.location.href = NATIVE_APP_SCHEME_URL

    // If app is not installed or scheme fails, show helpful fallback after 1.5s
    setTimeout(() => {
      if (Date.now() - startTime < 2000) {
        setAppOpenFallback(true)
      }
    }, 1500)
  }

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        {/* ============================================================
            STATE 1: LOADING STATE
            ============================================================ */}
        {state === 'loading' && (
          <div className="rounded-2xl border border-hairline bg-surface-raised/95 p-8 shadow-card text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 dark:bg-emerald-400/10 mb-6">
              <RefreshCw className="h-8 w-8 text-interactive animate-spin" />
            </div>
            <h1 className="type-title text-ink-strong mb-2 font-bold">
              যাচাই করা হচ্ছে...
            </h1>
            <p className="type-body-sm text-ink-body">
              আপনার ইমেইল নিশ্চিতকরণ তথ্য যাচাই করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।
            </p>
          </div>
        )}

        {/* ============================================================
            STATE 2: SUCCESS STATE
            ============================================================ */}
        {state === 'success' && (
          <div className="rounded-2xl border border-emerald-500/30 dark:border-emerald-400/20 bg-surface-raised/95 p-8 shadow-card text-center backdrop-blur-xl">
            {/* Top Badge Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/15 dark:bg-emerald-400/15 border border-emerald-500/30 mb-6 shadow-sm">
              <CheckCircle2 className="h-10 w-10 text-interactive" />
            </div>

            {/* Approved Bengali Copy */}
            <h1 className="type-title text-ink-strong mb-3 font-bold">
              ইমেইল ভেরিফিকেশন সফল!
            </h1>

            <p className="type-body-sm text-ink-body mb-2 leading-relaxed">
              আপনার ইমেইল ঠিকানাটি সফলভাবে যাচাই করা হয়েছে। Shifa Al Quran-এ আপনাকে স্বাগতম।
            </p>

            {details.email && (
              <div className="inline-block px-3 py-1 rounded-full bg-surface-sunken border border-hairline text-xs font-mono text-ink-muted mb-6">
                {details.email}
              </div>
            )}

            <div className="my-6 border-t border-hairline/80" aria-hidden="true" />

            <div className="space-y-4">
              <p className="type-body-sm font-medium text-ink-strong">
                এখন আপনার অ্যাপ খুলে লগইন করুন।
              </p>

              {/* Primary Action: Open Mobile App */}
              <button
                type="button"
                onClick={handleOpenApp}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary text-primary-foreground font-semibold py-3.5 px-5 shadow-sm transition-all duration-200 hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-interactive"
              >
                <Smartphone className="h-5 w-5" />
                <span>অ্যাপে লগইন করুন</span>
              </button>

              {/* App open fallback feedback */}
              {appOpenFallback && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-left text-xs text-ink-body leading-relaxed">
                  <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">
                    অ্যাপটি সরাসরি ওপেন হয়নি?
                  </p>
                  <p>
                    যদি আপনার ফোনে Shifa Al Quran অ্যাপটি ইনস্টল করা থাকে, তবে অ্যাপটি ওপেন করে আপনার ভেরিফাইড ইমেইল দিয়ে লগইন সম্পন্ন করুন।
                  </p>
                </div>
              )}

              {/* Secondary Action: Back to Website */}
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface-base text-ink-body font-medium py-3 px-5 transition-all duration-200 hover:text-interactive hover:border-interactive/40"
              >
                <Globe className="h-4 w-4" />
                <span>ওয়েবসাইটে ফিরে যান</span>
              </Link>
            </div>
          </div>
        )}

        {/* ============================================================
            STATE 3: ERROR / EXPIRED LINK STATE
            ============================================================ */}
        {state === 'error' && (
          <div className="rounded-2xl border border-rose-500/30 dark:border-rose-400/20 bg-surface-raised/95 p-8 shadow-card text-center backdrop-blur-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-500/15 dark:bg-rose-400/15 border border-rose-500/30 mb-6 shadow-sm">
              <AlertTriangle className="h-10 w-10 text-rose-600 dark:text-rose-400" />
            </div>

            <h1 className="type-title text-ink-strong mb-3 font-bold">
              ভেরিফিকেশন লিঙ্কটি অকার্যকর
            </h1>

            <p className="type-body-sm text-ink-body mb-6 leading-relaxed">
              {details.errorMessage || 'আপনার নিশ্চিতকরণ লিঙ্কটির মেয়াদ শেষ হয়ে গেছে অথবা এটি ইতিমধ্যে ব্যবহার করা হয়েছে।'}
            </p>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleOpenApp}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-surface-raised border border-hairline text-ink-body font-medium py-3 px-5 transition-all duration-200 hover:text-interactive"
              >
                <Smartphone className="h-4 w-4" />
                <span>অ্যাপে ফিরে যান</span>
              </button>

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface-base text-ink-body font-medium py-3 px-5 transition-all duration-200 hover:text-interactive"
              >
                <Globe className="h-4 w-4" />
                <span>ওয়েবসাইটে ফিরে যান</span>
              </Link>
            </div>
          </div>
        )}

        {/* ============================================================
            STATE 4: DIRECT VISIT / UNVERIFIED STATE
            ============================================================ */}
        {state === 'direct_access' && (
          <div className="rounded-2xl border border-hairline bg-surface-raised/95 p-8 shadow-card text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-sunken border border-hairline mb-6">
              <ShieldCheck className="h-8 w-8 text-gold-ink" />
            </div>

            <h1 className="type-title text-ink-strong mb-3 font-bold">
              ভেরিফিকেশন প্রয়োজন
            </h1>

            <p className="type-body-sm text-ink-body mb-6 leading-relaxed">
              কোনো সক্রিয় ভেরিফিকেশন তথ্য পাওয়া যায়নি। অনুগ্রহ করে আপনার ইমেইল ইনবক্সে পাঠানো নিশ্চিতকরণ লিঙ্কে ক্লিক করে এই পেজে আসুন।
            </p>

            <div className="space-y-3">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold py-3 px-5 transition-all duration-200 hover:bg-primary-hover"
              >
                <Globe className="h-4 w-4" />
                <span>ওয়েবসাইটে ফিরে যান</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
