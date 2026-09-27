'use server'

import { requireAdmin } from '@/lib/auth/requireAdmin'
import { revalidatePath } from 'next/cache'

export async function createCategory(formData: FormData) {
  const { supabase } = await requireAdmin()

  const name = (formData.get('name') as string)?.trim()
  let slug = (formData.get('slug') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || ''
  const sort_order = parseInt(formData.get('sort_order') as string) || 0

  if (!name) return { error: 'Category name is required' }

  if (!slug) {
    slug = name
      .toLowerCase()
      .replace(/[^\w\s\u0980-\u09FF-]+/g, '')
      .replace(/\s+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const { error } = await supabase.from('content_categories').insert({
    name,
    slug,
    description,
    sort_order,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  if (error) {
    if (error.code === '23505') return { error: 'এই slug ইতিমধ্যে ব্যবহার করা হয়েছে। অনুগ্রহ করে আলাদা slug দিন।' }
    return { error: 'Failed to create category: ' + error.message }
  }

  revalidatePath('/admin/categories')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}

export async function updateCategory(formData: FormData) {
  const { supabase } = await requireAdmin()

  const id = formData.get('id') as string
  const name = (formData.get('name') as string)?.trim()
  let slug = (formData.get('slug') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || ''
  const sort_order = parseInt(formData.get('sort_order') as string) || 0

  if (!id || !name) return { error: 'Required fields missing' }

  if (!slug) {
    slug = name
      .toLowerCase()
      .replace(/[^\w\s\u0980-\u09FF-]+/g, '')
      .replace(/\s+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const { error } = await supabase
    .from('content_categories')
    .update({
      name,
      slug,
      description,
      sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    if (error.code === '23505') return { error: 'এই slug ইতিমধ্যে ব্যবহার করা হয়েছে।' }
    return { error: 'Failed to update category: ' + error.message }
  }

  revalidatePath('/admin/categories')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const { supabase } = await requireAdmin()

  // 1. Safety check: Verify if any articles are using this category
  const { count, error: countErr } = await supabase
    .from('articles')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', id)

  if (countErr) {
    return { error: 'ক্যাটাগরি যাচাই করতে সমস্যা হয়েছে: ' + countErr.message }
  }

  if (count && count > 0) {
    return {
      error: `এই ক্যাটাগরির অধীনে ${count}টি আর্টিকেল যুক্ত রয়েছে। ক্যাটাগরি ডিলিট করার পূর্বে সংশ্লিষ্ট আর্টিকেলগুলো অন্য ক্যাটাগরিতে সরিয়ে নিন অথবা ডিলিট করুন।`,
      hasArticles: true,
      articleCount: count,
    }
  }

  // 2. Safe to delete
  const { error } = await supabase.from('content_categories').delete().eq('id', id)

  if (error) {
    if (error.code === '23503') {
      return { error: 'এই ক্যাটাগরিতে নির্ভরশীল ডেটা আছে, তাই ডিলিট করা যাচ্ছে না।' }
    }
    return { error: 'Failed to delete category: ' + error.message }
  }

  revalidatePath('/admin/categories')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}

export async function toggleCategoryStatus(id: string, currentStatus: boolean) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('content_categories')
    .update({
      is_active: !currentStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) return { error: 'Failed to update category status' }

  revalidatePath('/admin/categories')
  revalidatePath('/admin')
  revalidatePath('/blog')
  return { success: true }
}
