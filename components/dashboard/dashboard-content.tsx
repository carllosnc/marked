import { DashboardNewPage } from '@/components/dashboard/dashboard-new-page'
import { DashboardListPages } from '@/components/dashboard/dashboard-list-pages'
import { pagesAtom } from '@/app/atoms/pages-atom'
import { Fragment } from 'react'
import { useAtom } from 'jotai'

type Props = {
  userId: string
}

export default function DashboardContent({ userId }: Props) {
  const [globalPages] = useAtom(pagesAtom)

  return (
    <Fragment>
      <DashboardNewPage userId={userId} />
      <DashboardListPages pages={globalPages} />
    </Fragment>
  )
}
