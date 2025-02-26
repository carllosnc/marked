import type { Route } from '../+types/root'
import { getAuth } from '@clerk/react-router/ssr.server'
import { useUser } from '@clerk/react-router'
import { redirect } from 'react-router'
import DashboardContent from '@/components/dashboard/dashboard-content'
import { DashboardLoading } from '@/components/dashboard/dashboard-loading'
import { useGetPages } from '@/data/db-hooks/page-hooks'

export async function loader(args: any) {
  const auth = await getAuth(args)

  if (!auth.sessionId) {
    return redirect('/sign-in')
  }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Dashboard' }]
}

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const { isLoading } = useGetPages(user?.id!)

  if (!isLoaded || isLoading) {
    return <DashboardLoading />
  }

  return <DashboardContent userId={user?.id!} />
}
