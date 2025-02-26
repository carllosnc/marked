import type { Page } from '@/types/db-types'
import { Button } from '@/components/ui/button'
import { SinglePageSheet } from '@/components/single-page/single-page-sheet'
import { ChevronLeft, Globe } from 'lucide-react'
import { SinglePageNewLinkButton } from './single-page-new-link-button'
import { SinglePageDeleteButton } from './single-page-delete-button'
import { SinglePageEditButton } from './single-page-edit-button'
import { SinglePageTogglePublic } from './single-page-toggle-public'
import { useState } from 'react'
import { NavLink } from 'react-router'
import { upperFirst } from '@/lib/utils'

type Props = {
  pageId: string
  page: Page
}

export function SinglePageToolbar({ pageId, page }: Props) {
  const [title, setTitle] = useState<string>(page.title as string)
  const [description, setdescription] = useState<string | null>(
    page.description
  )

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="items-center flex gap-[20px]">
        <NavLink to="/dashboard">
          <Button className="cursor-pointer" variant="outline" size="icon">
            <ChevronLeft size={20} />
          </Button>
        </NavLink>

        <div>
          <h2 className="title-color text-[16px] max-w-[500px] font-semibold">
            {upperFirst(title)}
          </h2>
          {description && (
            <p className="text-sm text-color max-w-[500px] truncate">
              {upperFirst(description)}
            </p>
          )}
        </div>
      </div>

      <div className="card-block flex flex-col md:flex-row gap-[20px] items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <SinglePageSheet />
          <SinglePageNewLinkButton pageId={pageId} page={page} />
        </div>

        <hr className="w-full block border-neutral-200 dark:border-neutral-800" />

        <div className="flex gap-[20px]">
          <SinglePageTogglePublic pageId={pageId} page={page} />

          <NavLink target="_blank" to={`/links/${pageId}`}>
            <Button size="icon" variant="outline">
              <Globe className="w-4 h-4 text-color" />
            </Button>
          </NavLink>

          <SinglePageEditButton
            page={page}
            onChage={(title, description) => {
              setTitle(title as string)
              setdescription(description as string | null)
            }}
          />

          <SinglePageDeleteButton pageId={pageId} page={page} />
        </div>
      </div>
    </div>
  )
}
