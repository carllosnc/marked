import type { Route } from '../+types/root'
import { LogoSymbol, LogoHorizontal } from '@/components/logo'
import { LinksList } from '@/components/links/links-list'
import { LinksSheet } from '@/components/links/links-sheet'
import { LayoutPanelTop, Lock } from 'lucide-react'
import { NavLink, useParams } from 'react-router'
import { LinksLoading } from '@/components/links/links-loading'
import { upperFirst } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useGetPageBySlug } from '@/data/db-hooks/page-hooks'
import { useUser } from '@clerk/react-router'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Marked' }]
}

export default function PublicPage() {
  const { slug } = useParams()
  const { isLoading, data } = useGetPageBySlug(slug!)
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()
  const authorName = data ? data?.author_name : ''

  useEffect(() => {
    if (!isLoading && !data) {
      navigate(`/not-found`)
    } else {
      document.title = `${data?.title || 'Loading...'} • Marked`
    }
  }, [isLoading, data, navigate])

  if (isLoading) {
    return <LinksLoading />
  }

  function GoToDashboard() {
    if (isLoaded && user) {
      return (
        <NavLink
          className="fixed bottom-[20px] right-[20px] z-10"
          to="/dashboard"
        >
          <Button size="icon">
            <LayoutPanelTop className="w-5 h-5" />
          </Button>
        </NavLink>
      )
    }
  }

  if (!data?.is_public) {
    return (
      <main className="w-full page-bg min-h-screen flex flex-col gap-[30px] items-center justify-center">
        <Lock size={50} className="text-neutral-300 dark:text-neutral-800" />

        <h1 className="text-color text-center text-[22px]">
          This page is private
        </h1>

        <LinksSheet userId={data?.user_id as string} />

        <NavLink to="/" className="link-color">
          Go to home →
        </NavLink>

        <div className="px-[20px]">
          <LogoHorizontal className="fill-neutral-300 m-auto w-full max-w-[230px] h-auto dark:fill-neutral-800" />
        </div>
      </main>
    )
  }

  return (
    <main className="relative w-full page-bg py-[25px] min-h-screen flex flex-col gap-[20px] items-center">
      <header className="w-full px-[20px] flex justify-center">
        <section className="flex items-center gap-[15px] w-full max-w-[590px]">
          <NavLink to="/">
            <LogoSymbol className="fill-black max-w-[20px] h-auto dark:fill-white" />
          </NavLink>

          <GoToDashboard />

          <div className="flex flex-col">
            <h1 className="text-[18px] title-color font-bold">
              {upperFirst(data?.title!)}
            </h1>

            {data?.description && (
              <span className="text-color">
                {upperFirst(data?.description)}
              </span>
            )}
          </div>
        </section>
      </header>

      <hr className="w-full h-[1px] border-t border-neutral-300 border-dark:border-neutral-800" />

      <div className="w-full">
        <LinksList userId={data?.user_id!} pageId={data?.id} />
      </div>

      <NavLink to={`/profile/${data?.user_id}`} className="link-color text-sm">
        by {authorName}
      </NavLink>

      <div className="px-[20px] w-full">
        <LogoHorizontal className="fill-neutral-300 m-auto w-full max-w-[200px] h-auto dark:fill-neutral-800" />
      </div>
    </main>
  )
}
