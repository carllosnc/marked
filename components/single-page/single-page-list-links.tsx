import { useState } from 'react'
import { useAtom } from 'jotai'
import { ListFilter, TriangleAlert } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SinglePageLinkCard } from '@/components/single-page/single-page-link-card'
import type { Link } from '@/types/db-types'
import { linksAtom } from '@/app/atoms/links-atom'

export function SiglePageListLinks() {
  const [globalLinks] = useAtom(linksAtom)
  const [filter, setFilter] = useState('')

  const listOfLinks = globalLinks

  const filterLinks = (link: Link) => {
    return link.url!.toLowerCase().includes(filter.toLowerCase())
  }

  const filteredLinks = listOfLinks.filter(filterLinks)

  return (
    <section className="flex flex-col gap-[15px]">
      <header className="card-block flex gap-4 items-center">
        <ListFilter className="w-[25px] h-[25px] min-w-[25px] min-h-[25px]" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter link by name"
        />
      </header>

      <div className="flex flex-col gap-[15px]">
        {filteredLinks.length > 0 ? (
          filteredLinks.map((link) => (
            <SinglePageLinkCard link={link} key={link.id} />
          ))
        ) : (
          <div className="flex h-[200px] p-4 gap-[10px] flex-col items-center justify-center">
            <TriangleAlert className="w-[30px] h-[30px] text-neutral-300 dark:text-neutral-800" />
            <p className="text-center text-color">No one link found</p>
          </div>
        )}
      </div>
    </section>
  )
}
