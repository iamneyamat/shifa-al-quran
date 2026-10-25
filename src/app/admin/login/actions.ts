'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Generic message only: never leak whether the email exists or why it failed.
    return { error: 'ইমেইল বা পাসওয়ার্ড সঠিক নয়।' }
  }

  // Auth successful, we redirect to /admin. 
  // requireAdmin() will verify if they are an active admin on the next route.
  redirect('/admin')
}
