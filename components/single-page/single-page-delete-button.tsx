import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Page } from '@/types/db-types'
import { useDeletePage } from '@/data/db-hooks/page-hooks'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/spinner'

type Props = {
  pageId: string
  page: Page
}

export function SinglePageDeleteButton({ pageId, page }: Props) {
  const { mutate, isPending, error } = useDeletePage(pageId)
  const navigate = useNavigate()

  async function deletePageHandle() {
    mutate()
  }

  useEffect(() => {
    if (isPending) {
      toast(`Page ${page.title} was deleted`, {
        description: 'All links on this page have also been removed',
      })

      navigate('/dashboard')
    }
  }, [isPending])

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="outline">
            {isPending ? (
              <Spinner size="sm" />
            ) : (
              <Trash className="text-color" size={15} />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="dialog-content">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              All links from this page will be deleted too.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-row justify-end gap-[10px]">
            <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={deletePageHandle}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
