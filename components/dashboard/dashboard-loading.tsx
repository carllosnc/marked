import { Spinner } from '@/components/ui/spinner'

export function DashboardLoading() {
  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      <Spinner />
    </div>
  )
}
