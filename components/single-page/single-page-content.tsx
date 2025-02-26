import { Fragment } from 'react'
import { SinglePageToolbar } from '@/components/single-page/single-page-toolbar'
import { SiglePageListLinks } from '@/components/single-page/single-page-list-links'
import type { Link, Page } from '@/types/db-types'
import { useGetPages } from '@/data/db-hooks/page-hooks'
import { useGetLinks } from '@/data/db-hooks/links-hooks'

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
