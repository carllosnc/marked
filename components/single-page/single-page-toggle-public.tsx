import { Switch } from '@/components/ui/switch'
import type { Page } from '@/types/db-types'
import { useState } from 'react'

type Props = {
  page: Page
  pageId: string
}

export function SinglePageTogglePublic({ pageId, page }: Props) {
  const [is_public, setis_public] = useState<boolean>(Boolean(page.is_public))
  const [loading, setLoading] = useState(false)

  async function togglePublic() {
    setLoading(true)

    setLoading(false)
    setis_public(!is_public)
  }

  return (
    <div className="flex items-center gap-[10px]">
      <span className="text-color">{loading ? 'Loading...' : 'Public'}</span>
      <Switch
        disabled={loading}
        checked={is_public}
        onCheckedChange={togglePublic}
      />
    </div>
  )
}
