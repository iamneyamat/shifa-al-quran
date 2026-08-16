import { createClient } from '../supabase/server'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/admin/login')
  }

  // Check admin_users table for authorization
  // Note: RLS ensures only admins can read their own active admin_users row, 
  // but we explicitly check here to ensure the user is an active admin.
  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('role, is_active')
    .eq('user_id', user.id)
    .single()

  if (adminError || !adminUser || !adminUser.is_active || adminUser.role !== 'admin') {
    // If authenticated but NOT an active admin, redirect to login with error
    await supabase.auth.signOut()
    redirect('/admin/login?error=unauthorized')
  }

  return { supabase, user }
}
