import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { File, Lock } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { upperFirst } from '@/lib/utils'
import { useGetPages } from '@/data/db-hooks/page-hooks'
import { NavLink } from 'react-router'
import { useState } from 'react'

type Props = {
  userId: string
}

export function LinksSheet({ userId }: Props) {
  const { isLoading, data } = useGetPages(userId)
  const [open, setOpen] = useState(false)

  if (isLoading) {
    return <Spinner size="sm" />
  }

  function handleOpen() {
    setOpen(!open)
  }

  const authorName = data ? data[0]?.author_name : 'Unknown'

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="text-color flex gap-[10px]" variant="outline">
          <span>{authorName}'s pages</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex flex-col w-full max-w-[300px] no-scrollbar md:!max-w-[260px] overflow-y-auto sheet-content"
      >
        <SheetHeader className="text-left m-0 p-0 px-[20px] pt-[30px]">
          <div className="flex flex-col gap-[10px]">
            <SheetTitle className="text-sm title-color">
              {authorName}'s pages
            </SheetTitle>
          </div>
        </SheetHeader>

        <hr />

        <div className="flex px-[20px] flex-col gap-[14px]">
          {data?.map((page, index) => {
            if (page.is_public) {
              return (
                <NavLink
                  onClick={handleOpen}
                  className="text-sm text-color items-center hover:underline flex gap-[10px] truncate"
                  to={`/page/${page.slug}`}
                  key={index}
                >
                  <File className="w-[16px] h-[16px] text-color min-h-[16px] min-w-[16px]" />
                  <p className="truncate">{upperFirst(page.title!)}</p>
                </NavLink>
              )
            }

            return (
              <NavLink
                className="text-sm danger-color items-center hover:underline flex gap-[10px] truncate"
                to={`/page/${page.slug}`}
                key={index}
              >
                <Lock className="w-[16px] h-[16px] text-color min-h-[16px] min-w-[16px] danger-color" />
                <p className="truncate">{upperFirst(page.title!)}</p>
              </NavLink>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
