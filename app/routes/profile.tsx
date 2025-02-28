import type { Route } from '../+types/root'
import { LogoHorizontal } from '@/components/logo'
import { File, Lock } from 'lucide-react'
import { LinksLoading } from '@/components/links/links-loading'
import { upperFirst } from '@/lib/utils'
import { useGetPages } from '@/data/db-hooks/page-hooks'
import { NavLink, useParams } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Marked' }]
}

export default function ProfilePage() {
  const { id } = useParams()
  const { data, isLoading } = useGetPages(id!)

  if (isLoading) {
    return LinksLoading()
  }

  const authorName = data ? data[0]?.author_name : 'Unknown'

  return (
    <main className="w-full page-bg min-h-screen flex flex-col gap-[30px] items-center justify-center">
      <div className="min-h-screen px-[20px] py-[50px] bg-center w-full max-w-[450px] flex flex-col gap-[20px] items-center justify-center">
        <header className="flex w-full max-w-[360px] flex-col gap-[10px] items-center justify-center">
          <h1 className="title-color font-bold">
            {upperFirst(authorName!)}'s pages
          </h1>
        </header>

        <div className="w-full card-block flex flex-col gap-[10px] max-w-[360px]">
          {data?.map((page, index) => {
            if (page.is_public) {
              return (
                <NavLink
                  className="text-color text-sm items-center hover:underline flex gap-[10px]"
                  to={`/page/${page.slug}`}
                  key={index}
                >
                  <File size={15} />
                  <span> {upperFirst(page.title!)} </span>
                </NavLink>
              )
            } else {
              return (
                <NavLink
                  className="danger-color text-sm items-center hover:underline flex gap-[10px]"
                  to={`/page/${page.id}`}
                  key={index}
                >
                  <Lock size={15} />
                  <span> {upperFirst(page.title!)} </span>
                </NavLink>
              )
            }
          })}
        </div>

        <NavLink to="/" className="link-color text-sm">
          Go to home →
        </NavLink>

        <div className="px-[20px] pt-[20px] w-full">
          <LogoHorizontal className="fill-neutral-300 m-auto w-full max-w-[150px] h-auto dark:fill-neutral-700" />
        </div>
      </div>
    </main>
  )
}
