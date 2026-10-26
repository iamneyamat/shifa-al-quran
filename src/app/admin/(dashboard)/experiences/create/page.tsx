import { requireAdmin } from '@/lib/auth/requireAdmin'
import ExperienceEditor from '../ExperienceEditor'

export const metadata = {
  title: 'Create Experience | Admin CMS',
}

export default async function CreateExperiencePage() {
  await requireAdmin()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Experience</h1>
      <ExperienceEditor />
    </div>
  )
}
