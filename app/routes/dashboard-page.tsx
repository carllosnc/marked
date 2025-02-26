import { getAuth } from '@clerk/react-router/ssr.server'
import { redirect } from 'react-router'
import type { Route } from '../+types/root'
import { useParams } from 'react-router'
import { useGetPage } from '@/data/db-hooks/page-hooks'
import { DashboardLoading } from '@/components/dashboard/dashboard-loading'
import { SinglePageContent } from '@/components/single-page/single-page-content'

export async function loader(args: any) {
  const auth = await getAuth(args)

  if (!auth.sessionId) {
    return redirect('/sign-in')
  }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Page' }]
}

export default function DashboardPage() {
  const { id } = useParams()
  const { isLoading, data } = useGetPage(String(id))

  if (isLoading) {
    return <DashboardLoading />
  }

  return <SinglePageContent id={id!} page={data![0]} />
}
