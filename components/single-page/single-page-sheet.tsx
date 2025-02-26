import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { File } from 'lucide-react'
import { upperFirst } from '@/lib/utils'
import { useAtom } from 'jotai'
import { pagesAtom } from '@/app/atoms/pages-atom'
import { NavLink } from 'react-router'
import { useGetPages } from '@/data/db-hooks/page-hooks'

export function SinglePageSheet() {
  const [globalPages] = useAtom(pagesAtom)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-color" variant="outline">
          Pages
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full max-w-[300px] md:!max-w-[300px] no-scrollbar overflow-y-auto sheet-content"
      >
        <SheetHeader className="text-left flex flex-col gap-[10px]">
          <SheetTitle className="text-md">Your pages</SheetTitle>

          <hr />

          <div className="flex flex-col gap-[14px]">
            {globalPages.map((page, index) => {
              return (
                <NavLink
                  className="text-sm title-color items-center hover:underline flex gap-[10px] truncate"
                  to={`/dashboard/${page.id}`}
                  key={index}
                >
                  <File className="w-[16px] h-[16px] text-color min-h-[16px] min-w-[16px]" />
                  <p className="truncate">{upperFirst(page.title!)}</p>
                </NavLink>
              )
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
