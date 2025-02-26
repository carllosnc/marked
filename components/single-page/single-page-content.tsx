import { Fragment } from 'react'
import { SinglePageToolbar } from '@/components/single-page/single-page-toolbar'
import { SiglePageListLinks } from '@/components/single-page/single-page-list-links'
import type { Page } from '@/types/db-types'

type Props = {
  id: string
  page: Page
}

export function SinglePageContent({ id, page }: Props) {
  return (
    <Fragment>
      <SinglePageToolbar page={page} pageId={id} />
      <SiglePageListLinks />
    </Fragment>
  )
}
