import { DashboardPageCard } from '@/components/dashboard/dashboard-page-card'
import { Input } from '@/components/ui/input'
import type { Page } from '@/types/db-types'
import { ListFilter, TriangleAlert } from 'lucide-react'
import { useState } from 'react'

type Props = {
  pages: Page[]
}

export function DashboardListPages({ pages }: Props) {
  const [filter, setFilter] = useState('')

  const filterPages = (page: Page) => {
    return page.title!.toLowerCase().includes(filter.toLowerCase())
  }

  const filteredPages = pages.filter(filterPages)

  return (
    <section className="flex flex-col gap-[15px]">
      <header className="flex items-center gap-[20px] card-block">
        <ListFilter className="w-[30px] h-[30px]" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter page by name"
        />
      </header>

      <div className="flex flex-col gap-[15px]">
        {filteredPages.length > 0 ? (
          filteredPages.map((page) => (
            <DashboardPageCard page={page} key={page.id} />
          ))
        ) : (
          <div className="flex h-[200px] p-4 gap-[10px] flex-col items-center justify-center">
            <TriangleAlert className="w-[30px] h-[30px] text-neutral-300 dark:text-neutral-800" />
            <p className="text-center text-color">No one page found</p>
          </div>
        )}
      </div>
    </section>
  )
}
