import { Switch } from '@/components/ui/switch'
import { useUpdatePage } from '@/data/db-hooks/page-hooks'
import type { Page } from '@/types/db-types'
import { useState } from 'react'

type Props = {
  page: Page
  pageId: string
}

export function SinglePageTogglePublic({ pageId, page }: Props) {
  const [isPublic, setIsPublic] = useState<boolean>(Boolean(page.is_public))
  const { mutate, isPending } = useUpdatePage(page.id)

  async function togglePublic() {
    mutate({ is_public: !isPublic })
    setIsPublic(!isPublic)
  }

  return (
    <div className="flex items-center gap-[10px]">
      <span className="text-color">{isPending ? 'Loading...' : 'Public'}</span>
      <Switch
        disabled={isPending}
        checked={isPublic}
        onCheckedChange={togglePublic}
      />
    </div>
  )
}
