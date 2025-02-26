import { LinksLinkCard } from '@/components/links/links-card'
import { AlertCircle } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { LinksSheet } from '@/components/links/links-sheet'
import { useAtom } from 'jotai'
import { linksAtom } from '@/app/atoms/links-atom'

type props = {
  userId: string
  pageId: string
}

export function LinksList({ pageId, userId }: props) {
  const [tiny, setTiny] = useState<boolean>(false)
  const [globalLinks] = useAtom(linksAtom)

  if (globalLinks?.length === 0) {
    return (
      <div className="w-full px-[20px]">
        <div className="w-full max-w-[590px] m-auto flex flex-col gap-[20px] justify-center items-center">
          <LinksSheet userId={userId as string} />

          <div className="bg-red text-center h-[300px] w-full bg-white dark:bg-neutral-900 border border-color rounded-lg shadow-2xl shadow-neutral-200 dark:shadow-none flex flex-col items-center justify-center gap-[10px] p-[20px]">
            <AlertCircle className="text-color" />
            <span className="text-color">Page without links</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[20px] justify-center items-center px-[20px]">
      <div className="flex h-[40px] gap-[10px] justify-between items-center w-full max-w-[590px]">
        <LinksSheet userId={userId as string} />

        <div className="flex items-center gap-[10px]">
          <span className="text-color"> Tiny card </span>
          <Switch checked={tiny} onCheckedChange={setTiny} />
        </div>
      </div>

      <div className="w-full max-w-[590px] flex flex-col gap-[20px]">
        {globalLinks?.map((link, index) => {
          return <LinksLinkCard tiny={tiny} key={index} link={link} />
        })}
      </div>
    </div>
  )
}
