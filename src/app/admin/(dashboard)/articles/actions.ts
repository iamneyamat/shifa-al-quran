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

const ARTICLE_STATUSES = ['draft', 'published', 'archived'] as const;

// Editor-এর মতোই স্লাগ নিয়ম: বাংলা অক্ষর রাখা হয়, বাকি চিহ্ন বাদ,
// স্পেস → হাইফেন। আগে সার্ভার a-z0-9 ছাড়া সব কাটত, তাই শুধু বাংলা
// শিরোনামে স্লাগ '' হয়ে /blog/ লিংক ভাঙত।
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s\u0980-\u09FF-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/(^-|-$)+/g, '')
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

  // Whitelist only — extra fields from the caller can no longer reach the DB.
  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  if (updates.status !== undefined) {
    if (!ARTICLE_STATUSES.includes(updates.status as (typeof ARTICLE_STATUSES)[number])) {
      return { error: 'অবৈধ স্ট্যাটাস।' }
    }
    payload.status = updates.status
  }
  if (updates.category_id !== undefined) payload.category_id = updates.category_id
  if (updates.featured !== undefined) payload.featured = updates.featured
  if (updates.sort_order !== undefined) payload.sort_order = updates.sort_order

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

  // Whitelist only — no mass assignment. Column names/types unchanged;
  // this only stops unexpected fields from being written.
  const title = typeof data.title === 'string' ? data.title : ''
  if (!title.trim()) return { error: 'শিরোনাম দিতে হবে।' }
  const status = typeof data.status === 'string' ? data.status : 'draft'
  if (!ARTICLE_STATUSES.includes(status as (typeof ARTICLE_STATUSES)[number])) {
    return { error: 'অবৈধ স্ট্যাটাস।' }
  }
  const payload: Record<string, unknown> = {
    title,
    status,
    slug: typeof data.slug === 'string' && data.slug.trim() ? slugify(data.slug) : '',
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
    content: typeof data.content === 'string' ? data.content : '',
    category_id: typeof data.category_id === 'string' ? data.category_id : null,
    featured: typeof data.featured === 'boolean' ? data.featured : false,
    sort_order: typeof data.sort_order === 'number' ? data.sort_order : 0,
    cover_image_url: typeof data.cover_image_url === 'string' ? data.cover_image_url : '',
  }
  // Empty timestamp strings ('') would fail timestamptz columns — send null.
  const toTimestamp = (v: unknown): string | null =>
    typeof v === 'string' && v.trim() ? v : null
  payload.published_at = toTimestamp(data.published_at)
  payload.created_at = toTimestamp(data.created_at)
  payload.updated_at = toTimestamp(data.updated_at)

  if (!payload.slug) {
    payload.slug = slugify(title)
  }
  if (!payload.slug) {
    return { error: 'এই শিরোনাম থেকে স্লাগ বানানো যায়নি। আলাদা স্লাগ দিন।' }
  }

  // If status is published and published_at is null, set it
  if (payload.status === 'published' && !payload.published_at) {
    payload.published_at = new Date().toISOString()
  }

  // id is the row selector only — never a written column.
  const articleId = typeof data.id === 'string' && data.id ? data.id : null
  if (articleId) {
    // Never rewrite created_at on edit — it stays the original value.
    delete payload.created_at
    payload.updated_at = new Date().toISOString()
    const { error } = await supabase.from('articles').update(payload).eq('id', articleId)
    if (error) {
      if (error.code === '23505') return { error: 'এই slug ইতিমধ্যে ব্যবহার করা হয়েছে। অনুগ্রহ করে আলাদা slug ব্যবহার করুন।' }
      return { error: 'Failed to update article: ' + error.message }
    }
  } else {
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
