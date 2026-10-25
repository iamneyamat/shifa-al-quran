import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export default async function proxy(request: NextRequest) {
  // Only protect /admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Skip protection for login route
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // no user, redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Defence in depth: check the admin role here too, not only in
  // requireAdmin(). A future admin page that forgets requireAdmin()
  // must not become an open door. Role failures go back to login
  // without revealing whether the account exists.
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role, is_active')
    .eq('user_id', user.id)
    .single()

  if (!adminUser || !adminUser.is_active || adminUser.role !== 'admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
