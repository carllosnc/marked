import type { NewPage } from '@/types/db-types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { File, User } from 'lucide-react'
import { newPageSchema } from '@/data/zod-schemas/new-page-schema'
import { useCreatePage } from '@/data/db-hooks/page-hooks'
import { extractErrorDetails } from '@/lib/error'

type Props = {
  userId: string
}

export function DashboardNewPage({ userId }: Props) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending, isError, error, isSuccess } = useCreatePage()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newPageSchema),
  })

  const onSubmit = (data: any) => {
    const page: NewPage = {
      title: data.title,
      description: data.description,
      user_id: userId,
      slug: data.slug,
    }

    mutate(page)
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false)
      reset()
    }
  }, [isSuccess])

  return (
    <div className="card-block flex items-center justify-between">
      <span className="text-color"> {[].length} Pages </span>

      <div className="flex gap-[10px] flex-col sm:flex-row">
        <Button variant="outline">
          <User className="w-4 h-4 mr-2" />
          Public profile
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <File className="w-4 h-4 mr-2" />
              New Page
            </Button>
          </DialogTrigger>

          <DialogContent className="dialog-content">
            <DialogHeader className="flex flex-col">
              <DialogTitle>Create new page</DialogTitle>
              <DialogDescription>
                A page is a collection of links.
              </DialogDescription>
            </DialogHeader>

            <form
              className="flex flex-col gap-[20px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-[12px]">
                <Label className="inline-flex gap-[6px] items-center">
                  <span>Title</span>
                  {errors.title && (
                    <span className="text-red-500 dark:text-red-400">
                      {errors.title.message as string}
                    </span>
                  )}
                </Label>
                <Input placeholder="Enter page title" {...register('title')} />
              </div>

              <div className="flex flex-col gap-[12px]">
                <Label className="inline-flex gap-[6px] items-center">
                  <span>Description</span>
                  {errors.description && (
                    <span className="text-red-500 dark:text-red-400">
                      {errors.description.message as string}
                    </span>
                  )}
                </Label>
                <Input
                  placeholder="Enter page description"
                  {...register('description')}
                />
              </div>

              <div className="flex flex-col gap-[12px]">
                <Label className="inline-flex gap-[6px] items-center">
                  <span>Slug</span>
                  {errors.slug && (
                    <span className="text-red-500 dark:text-red-400">
                      {errors.slug.message as string}
                    </span>
                  )}
                </Label>
                <Input placeholder="Enter page slug" {...register('slug')} />
              </div>

              {isError && (
                <div className="text-[13px] text-red-600">
                  <span>{extractErrorDetails(error.message)?.column}</span>
                  <span> </span>
                  <span>
                    {extractErrorDetails(
                      error.message
                    )?.errorName.toLowerCase()}
                  </span>
                </div>
              )}

              <div>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
