import { requireAdmin } from '@/lib/auth/requireAdmin'
import ExperienceEditor from '../ExperienceEditor'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Edit Experience | Admin CMS',
}

export default async function EditExperiencePage(props: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireAdmin()

  const params = await props.params
  const id = params.id

  const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single()

  if (error || !data) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Experience</h1>
      <ExperienceEditor initialData={data} />
    </div>
  )
}
