'use server'

import { requireAdmin } from '@/lib/auth/requireAdmin'
import { revalidatePath } from 'next/cache'

export async function createCategory(formData: FormData) {
  const { supabase } = await requireAdmin()
  
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const sort_order = parseInt(formData.get('sort_order') as string) || 0
  
  if (!name || !slug) return { error: 'Name and Slug are required' }

  const { error } = await supabase.from('content_categories').insert({
    name,
    slug,
    description,
    sort_order,
    is_active: true
  })

  if (error) {
    if (error.code === '23505') return { error: 'এই slug ইতিমধ্যে ব্যবহার করা হয়েছে।' }
    return { error: 'Failed to create category: ' + error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true }
}

export async function updateCategory(formData: FormData) {
  const { supabase } = await requireAdmin()
  
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const sort_order = parseInt(formData.get('sort_order') as string) || 0
  
  if (!id || !name || !slug) return { error: 'Required fields missing' }

  const { error } = await supabase.from('content_categories').update({
    name,
    slug,
    description,
    sort_order
  }).eq('id', id)

  if (error) {
    if (error.code === '23505') return { error: 'এই slug ইতিমধ্যে ব্যবহার করা হয়েছে।' }
    return { error: 'Failed to update category: ' + error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const { supabase } = await requireAdmin()
  
  const { error } = await supabase.from('content_categories').delete().eq('id', id)
  
  if (error) {
    if (error.code === '23503') return { error: 'এই ক্যাটাগরিতে আর্টিকেল আছে, তাই এটি ডিলিট করা যাচ্ছে না।' }
    return { error: 'Failed to delete category' }
  }

  revalidatePath('/admin/categories')
  return { success: true }
}

export async function toggleCategoryStatus(id: string, currentStatus: boolean) {
  const { supabase } = await requireAdmin()
  
  const { error } = await supabase.from('content_categories').update({ is_active: !currentStatus }).eq('id', id)
  
  if (error) return { error: 'Failed to update category status' }
  
  revalidatePath('/admin/categories')
  return { success: true }
}
