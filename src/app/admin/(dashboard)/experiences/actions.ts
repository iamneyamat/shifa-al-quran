'use server'

import { requireAdmin } from '@/lib/auth/requireAdmin'
import { revalidatePath } from 'next/cache'

const EXPERIENCE_CATEGORIES = ['রুকইয়াহ', 'পরামর্শ', 'অন্যান্য'] as const
const MEDIA_TYPES = ['text', 'image', 'video', 'audio'] as const

function revalidateAll() {
  revalidatePath('/admin/experiences')
  revalidatePath('/admin')
  revalidatePath('/testimonials')
}

export async function deleteExperience(id: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase.from('testimonials').delete().eq('id', id)

  if (error) {
    return { error: 'Failed to delete experience: ' + error.message }
  }

  revalidateAll()
  return { success: true }
}

export async function publishExperience(id: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('testimonials')
    .update({
      is_published: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: 'Failed to publish experience: ' + error.message }
  }

  revalidateAll()
  return { success: true }
}

export async function unpublishExperience(id: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('testimonials')
    .update({
      is_published: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    return { error: 'Failed to unpublish experience: ' + error.message }
  }

  revalidateAll()
  return { success: true }
}

export async function quickUpdateExperience(
  id: string,
  updates: {
    category?: string
    is_featured?: boolean
    sort_order?: number
    is_published?: boolean
  }
) {
  const { supabase } = await requireAdmin()

  // Whitelist only — extra fields from the caller can no longer reach the DB.
  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  if (updates.category !== undefined) {
    if (!(EXPERIENCE_CATEGORIES as readonly string[]).includes(updates.category)) {
      return { error: 'অবৈধ ক্যাটাগরি।' }
    }
    payload.category = updates.category
  }
  if (updates.is_featured !== undefined) payload.is_featured = updates.is_featured
  if (updates.sort_order !== undefined) payload.sort_order = updates.sort_order
  if (updates.is_published !== undefined) payload.is_published = updates.is_published

  const { error } = await supabase.from('testimonials').update(payload).eq('id', id)

  if (error) {
    return { error: 'Quick update failed: ' + error.message }
  }

  revalidateAll()
  return { success: true }
}

export async function saveExperience(data: Record<string, unknown>) {
  const { supabase } = await requireAdmin()

  // Whitelist only — no mass assignment.
  const customer_name = typeof data.customer_name === 'string' ? data.customer_name : ''
  if (!customer_name.trim()) return { error: 'গ্রাহকের নাম দিতে হবে।' }
  const content = typeof data.content === 'string' ? data.content : ''
  if (!content.trim()) return { error: 'অভিজ্ঞতার বিবরণ দিতে হবে।' }
  const category = typeof data.category === 'string' ? data.category : 'অন্যান্য'
  if (!(EXPERIENCE_CATEGORIES as readonly string[]).includes(category)) {
    return { error: 'অবৈধ ক্যাটাগরি।' }
  }
  const media_type = typeof data.media_type === 'string' ? data.media_type : 'text'
  if (!(MEDIA_TYPES as readonly string[]).includes(media_type)) {
    return { error: 'অবৈধ মিডিয়া ধরন।' }
  }
  const ratingRaw = typeof data.rating === 'number' ? data.rating : 5
  const rating = Math.min(5, Math.max(1, Math.round(ratingRaw)))

  const payload: Record<string, unknown> = {
    customer_name: customer_name.trim(),
    location: typeof data.location === 'string' ? data.location.trim() : '',
    content: content.trim(),
    category,
    rating,
    is_featured: typeof data.is_featured === 'boolean' ? data.is_featured : false,
    media_type,
    video_url: typeof data.video_url === 'string' ? data.video_url.trim() : '',
    image_url: typeof data.image_url === 'string' ? data.image_url.trim() : '',
    audio_url: typeof data.audio_url === 'string' ? data.audio_url.trim() : '',
    sort_order: typeof data.sort_order === 'number' ? data.sort_order : 0,
    is_published: typeof data.is_published === 'boolean' ? data.is_published : false,
  }

  // id is the row selector only — never a written column.
  const experienceId = typeof data.id === 'string' && data.id ? data.id : null
  if (experienceId) {
    // Never rewrite created_at on edit — it stays the original value.
    payload.updated_at = new Date().toISOString()
    const { error } = await supabase.from('testimonials').update(payload).eq('id', experienceId)
    if (error) {
      return { error: 'Failed to update experience: ' + error.message }
    }
  } else {
    payload.created_at = new Date().toISOString()
    payload.updated_at = new Date().toISOString()
    const { error } = await supabase.from('testimonials').insert(payload)
    if (error) {
      return { error: 'Failed to create experience: ' + error.message }
    }
  }

  revalidateAll()
  return { success: true }
}
