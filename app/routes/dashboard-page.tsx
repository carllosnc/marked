import { getAuth } from '@clerk/react-router/ssr.server'
import { NavLink, redirect } from 'react-router'
import type { Route } from '../+types/root'
import { useParams } from 'react-router'
import { useGetPage } from '@/data/db-hooks/page-hooks'
import { DashboardLoading } from '@/components/dashboard/dashboard-loading'
import { SinglePageContent } from '@/components/single-page/single-page-content'
import { CircleAlert } from 'lucide-react'

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
  const { isLoading, data, isError } = useGetPage(String(id))

  if (isError) {
    return (
      <div className="flex gap-[10px] py-[40px] flex-col items-center justify-center w-full">
        <CircleAlert className="text-neutral-400" />
        <h1 className="text-color text-[20px]"> Invalid Page </h1>
        <NavLink to="/dashboard" className="link-color">
          ← Back to dashboard
        </NavLink>
      </div>
    )
  }

  if (isLoading) {
    return <DashboardLoading />
  }

  return <SinglePageContent id={id!} page={data!} />
}
