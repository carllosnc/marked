import { Spinner } from "@/components/ui/spinner";

export function LinksLoading() {
  return (
    <main className="w-full px-[20px] py-[20px] page-bg min-h-screen flex flex-col justify-center items-center gap-[30px]">
      <Spinner />
    </main>
  )
}