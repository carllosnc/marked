import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Edit } from 'lucide-react'
import type { Page, UpdatePage } from '@/types/db-types'
import { newPageSchema } from '@/data/zod-schemas/new-page-schema'
import { useUpdatePage } from '@/data/db-hooks/page-hooks'
import { extractErrorDetails } from '@/lib/error'

type Props = {
  page: Page
  onChage: (title: String, description: String) => void
}

export function SinglePageEditButton({ page, onChage }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState<string>(page.title)
  const [description, setDescription] = useState<string | null>(
    page.description
  )
  const [slug, setSlug] = useState<string>(page.slug)
  const { mutate, isPending, error, isError, isSuccess, data } = useUpdatePage(
    page.id
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newPageSchema),
  })

  const onSubmit = async (data: any) => {
    const pageUpdated: UpdatePage = {
      id: page.id,
      title: data.title,
      description: data.description,
      slug: data.slug,
    }

    mutate(pageUpdated)
    onChage(data.title, data.description)
  }

  useEffect(() => {
    if (isSuccess) {
      console.log('here!')
      setOpen(false)
      reset()
      setTitle(data[0].title)
      setDescription(data[0].description)
      setSlug(data[0].slug)
    }
  }, [isSuccess])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="w-4 h-4 text-color" />
        </Button>
      </DialogTrigger>

      <DialogContent className="dialog-content">
        <DialogHeader className="flex flex-col">
          <DialogTitle className="font-medium">
            Edit page: {page.title}
          </DialogTitle>
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
            <Input
              defaultValue={title}
              placeholder="Enter page title"
              {...register('title')}
            />
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
              defaultValue={description!}
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

            <Input
              defaultValue={slug!}
              placeholder="Enter page slug"
              {...register('slug')}
            />
          </div>

          {isError && (
            <div className="text-[13px] text-red-600">
              <span>{extractErrorDetails(error.message)?.column}</span>
              <span> </span>
              <span>
                {extractErrorDetails(error.message)?.errorName.toLowerCase()}
              </span>
            </div>
          )}

          <div>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? 'Saving...' : 'Edit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
