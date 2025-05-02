import type { Link } from '@/types/db-types'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteLink } from '@/data/db-hooks/links-hooks'
import { formatDate } from '@/lib/utils'

type props = {
  link: Link
}

export function SinglePageLinkCard({ link }: props) {
  const { mutate, isPending } = useDeleteLink(link.id!)

  function getFavicon(url: string) {
    const host = new URL(url).hostname

    return `https://icons.duckduckgo.com/ip3/${host}.ico`
  }

  async function deleteLink() {
    mutate()
    toast(`Link: deleted`, {
      description: link.title,
    })
  }

  return (
    <article className="card-block card-linkable flex-col gap-[20px] items-start overflow-hidden flex md:items-center md:flex-row">
      <a className="w-full" href={link.url!} target="_blank" rel="noreferrer">
        <div className="flex flex-col gap-[10px]">
          <small className="text-color">{formatDate(link.created_at!)}</small>

          <span className="link-color text-[14px] truncate max-w-[600px]">
            {link.url!}
          </span>

          <div className="flex items-center gap-[20px]">
            <div className="p-[3px] dark:bg-neutral-700 rounded-[3px]">
              <img
                src={getFavicon(link.url!)}
                alt="favicon"
                className="w-[20px] h-[20px] min-w-[20px] min-h-[20px]"
              />
            </div>
            <span className="title-color break-all max-w-[600px]">
              {link.title!}
            </span>
          </div>
        </div>
      </a>

      <Button
        disabled={isPending}
        onClick={deleteLink}
        variant="outline"
        size="icon"
      >
        {isPending ? (
          <Spinner size="sm" color="danger" />
        ) : (
          <Trash className="text-color" size={15} />
        )}
      </Button>
    </article>
  )
}
