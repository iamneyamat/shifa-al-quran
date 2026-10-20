import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * Validates that redirect paths are strictly safe relative paths
 * to prevent open-redirect vulnerabilities.
 */
function getSafeRedirectUrl(target: string | null, baseUrl: string): URL {
  const fallback = new URL('/auth/confirmed', baseUrl)
  if (!target || typeof target !== 'string') return fallback

  // Strictly allow relative paths starting with a single '/'
  if (target.startsWith('/') && !target.startsWith('//') && !target.startsWith('/\\')) {
    try {
      return new URL(target, baseUrl)
    } catch {
      return fallback
    }
  }
  return fallback
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const searchParams = requestUrl.searchParams

  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next')

  const errorParam = searchParams.get('error')
  const errorCode = searchParams.get('error_code')
  const errorDescription = searchParams.get('error_description')

  const redirectUrl = getSafeRedirectUrl(next, request.url)

  // 1. If Supabase redirected directly with an error (e.g. link expired, already consumed)
  if (errorParam || errorDescription || errorCode) {
    redirectUrl.searchParams.set('error', errorParam || 'verification_failed')
    if (errorCode) {
      redirectUrl.searchParams.set('error_code', errorCode)
    }
    if (errorDescription) {
      redirectUrl.searchParams.set('error_description', errorDescription)
    }
    return NextResponse.redirect(redirectUrl)
  }

  const supabase = await createClient()

  // 2. PKCE Authorization Code Exchange Flow (?code=...)
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      redirectUrl.searchParams.set('error', 'invalid_or_expired')
      return NextResponse.redirect(redirectUrl)
    }

    if (data?.user) {
      // If this was a password recovery callback, route appropriately
      if (type === 'recovery') {
        const recoveryUrl = getSafeRedirectUrl('/auth/reset-password', request.url)
        return NextResponse.redirect(recoveryUrl)
      }

      redirectUrl.searchParams.set('verified', 'true')
      return NextResponse.redirect(redirectUrl)
    }
  }

  // 3. Token Hash OTP Verification Flow (?token_hash=...&type=...)
  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    })

    if (error) {
      redirectUrl.searchParams.set('error', 'invalid_or_expired')
      return NextResponse.redirect(redirectUrl)
    }

    if (data?.user) {
      if (type === 'recovery') {
        const recoveryUrl = getSafeRedirectUrl('/auth/reset-password', request.url)
        return NextResponse.redirect(recoveryUrl)
      }

      redirectUrl.searchParams.set('verified', 'true')
      return NextResponse.redirect(redirectUrl)
    }
  }

  // 4. Missing tokens or unhandled callback request
  redirectUrl.searchParams.set('error', 'missing_token')
  return NextResponse.redirect(redirectUrl)
}
