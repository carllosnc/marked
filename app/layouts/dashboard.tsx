import { DashboardFooter } from '@/components/dashboard/dashboard-footer'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Outlet } from 'react-router'

export default function BaseLayout() {
  return (
    <main className="w-full page-bg min-h-screen flex flex-col justify-between">
      <DashboardHeader />
      <section className="p-4 min-h-[87vh] lg:border-x border-color m-auto w-full max-w-[900px] flex flex-col gap-[15px]">
        <Outlet />
      </section>
      <DashboardFooter />
    </main>
  )
}
