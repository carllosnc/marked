import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { File, Lock } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Spinner } from '@/components/ui/spinner'
import { upperFirst } from '@/lib/utils'
import { useGetPages } from '@/data/db-hooks/page-hooks'
import { useUser } from '@clerk/react-router'
import { NavLink } from 'react-router'

type Props = {
  userId: string
}

export function LinksSheet({ userId }: Props) {
  const { isLoading, data } = useGetPages(userId)
  const { user, isLoaded } = useUser()

  function firstName(name: string) {
    let firstName = name.split(' ')[0]
    firstName = firstName.substring(0, 6)

    return firstName
  }

  if (isLoading || !isLoaded) {
    return <Spinner size="sm" />
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-color flex gap-[10px]" variant="outline">
          <span>{user?.firstName}'s Pages</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex flex-col w-full max-w-[300px] no-scrollbar md:!max-w-[260px] overflow-y-auto sheet-content"
      >
        <SheetHeader className="text-left m-0 p-0 pt-[30px]">
          <div className="flex flex-col justify-center items-center gap-[10px]">
            <Avatar>
              <AvatarImage
                className="w-10 h-10 rounded-full object-cover"
                src={user?.imageUrl}
              />
              <AvatarFallback>{user?.firstName?.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <SheetTitle className="text-sm text-center title-color">
              {user?.firstName}'s pages
            </SheetTitle>
          </div>
        </SheetHeader>

        <hr />

        <div className="flex px-[20px] flex-col gap-[14px]">
          {data?.map((page, index) => {
            if (page.is_public) {
              return (
                <NavLink
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
