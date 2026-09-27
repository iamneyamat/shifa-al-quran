'use server'

import { requireAdmin } from '@/lib/auth/requireAdmin'
import { revalidatePath } from 'next/cache'

export async function deleteArticle(id: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase.from('articles').delete().eq('id', id)

  if (error) {
    return { error: 'Failed to delete article: ' + error.message }
  }

  revalidatePath('/admin/articles')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}

export async function archiveArticle(id: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('articles')
    .update({
      status: 'archived',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: 'Failed to archive article: ' + error.message }
  }

  revalidatePath('/admin/articles')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}

export async function restoreArticle(id: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('articles')
    .update({
      status: 'draft',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: 'Failed to restore article: ' + error.message }
  }

  revalidatePath('/admin/articles')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}

export async function publishArticle(id: string) {
  const { supabase } = await requireAdmin()

  // Check if it already had a published_at, if not set it
  const { data: existing } = await supabase.from('articles').select('published_at').eq('id', id).single()

  const { error } = await supabase
    .from('articles')
    .update({
      status: 'published',
      published_at: existing?.published_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: 'Failed to publish article: ' + error.message }
  }

  revalidatePath('/admin/articles')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}

export async function unpublishArticle(id: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('articles')
    .update({
      status: 'draft',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: 'Failed to unpublish article: ' + error.message }
  }

  revalidatePath('/admin/articles')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}

export async function quickUpdateArticle(
  id: string,
  updates: {
    status?: string
    category_id?: string
    featured?: boolean
    sort_order?: number
  }
) {
  const { supabase } = await requireAdmin()

  const payload: Record<string, unknown> = {
    ...updates,
    updated_at: new Date().toISOString(),
  }

  if (updates.status === 'published') {
    const { data: existing } = await supabase.from('articles').select('published_at').eq('id', id).single()
    if (!existing?.published_at) {
      payload.published_at = new Date().toISOString()
    }
  }

  const { error } = await supabase.from('articles').update(payload).eq('id', id)

  if (error) {
    return { error: 'Quick update failed: ' + error.message }
  }

  revalidatePath('/admin/articles')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}

export async function saveArticle(data: Record<string, unknown>) {
  const { supabase } = await requireAdmin()

  const payload = { ...data }

  if (!payload.slug) {
    payload.slug = String(payload.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  // If status is published and published_at is null, set it
  if (payload.status === 'published' && !payload.published_at) {
    payload.published_at = new Date().toISOString()
  }

  if (payload.id) {
    payload.updated_at = new Date().toISOString()
    const { error } = await supabase.from('articles').update(payload).eq('id', payload.id)
    if (error) {
      if (error.code === '23505') return { error: 'এই slug ইতিমধ্যে ব্যবহার করা হয়েছে। অনুগ্রহ করে আলাদা slug ব্যবহার করুন।' }
      return { error: 'Failed to update article: ' + error.message }
    }
  } else {
    delete payload.id
    payload.created_at = new Date().toISOString()
    payload.updated_at = new Date().toISOString()
    const { error } = await supabase.from('articles').insert(payload)
    if (error) {
      if (error.code === '23505') return { error: 'এই slug ইতিমধ্যে ব্যবহার করা হয়েছে। অনুগ্রহ করে আলাদা slug ব্যবহার করুন।' }
      return { error: 'Failed to create article: ' + error.message }
    }
  }

  revalidatePath('/admin/articles')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}
