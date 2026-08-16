'use server'

import { requireAdmin } from '@/lib/auth/requireAdmin'
import { revalidatePath } from 'next/cache'

export async function deleteArticle(id: string) {
  const { supabase } = await requireAdmin()
  
  const { error } = await supabase.from('articles').delete().eq('id', id)
  
  if (error) {
    return { error: 'Failed to delete article' }
  }

  revalidatePath('/admin/articles')
  return { success: true }
}

export async function archiveArticle(id: string) {
  const { supabase } = await requireAdmin()
  
  const { error } = await supabase.from('articles').update({ 
    status: 'archived',
    updated_at: new Date().toISOString()
  }).eq('id', id)
  
  if (error) {
    return { error: 'Failed to archive article' }
  }

  revalidatePath('/admin/articles')
  return { success: true }
}

export async function saveArticle(data: Record<string, unknown>) {
  const { supabase } = await requireAdmin()
  
  const payload = { ...data }
  
  if (!payload.slug) {
     payload.slug = String(payload.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  // If status is published and published_at is null, set it
  if (payload.status === 'published' && !payload.published_at) {
    payload.published_at = new Date().toISOString()
  }

  if (payload.id) {
    payload.updated_at = new Date().toISOString()
    const { error } = await supabase.from('articles').update(payload).eq('id', payload.id)
    if (error) {
      if (error.code === '23505') return { error: 'এই slug ইতিমধ্যে ব্যবহার করা হয়েছে।' }
      return { error: 'Failed to update article: ' + error.message }
    }
  } else {
    delete payload.id
    const { error } = await supabase.from('articles').insert(payload)
    if (error) {
      if (error.code === '23505') return { error: 'এই slug ইতিমধ্যে ব্যবহার করা হয়েছে।' }
      return { error: 'Failed to create article: ' + error.message }
    }
  }

  revalidatePath('/admin/articles')
  return { success: true }
}
