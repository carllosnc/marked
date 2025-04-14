import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getPages,
  createPage,
  getPage,
  deletePage,
  updatePage,
  getPageBySlug,
} from '@/data/repository/page-repository'
import type { NewPage } from '@/types/db-types'
import { useAtom } from 'jotai'
import { pagesAtom } from '@/app/atoms/pages-atom'
import { linksAtom } from '@/app/atoms/links-atom'
import { getLinks } from '@/data/repository/links-repository'

function useGetPages(userId: string) {
  const [_, setGlobalPages] = useAtom(pagesAtom)

  return useQuery({
    // gcTime: 0,
    queryKey: ['getPages', userId],
    queryFn: async () => {
      const pages = await getPages(userId)

      setGlobalPages(pages)
      return pages
    },
  })
}

function useGetPage(pageId: string) {
  const [_, setGlobalLinks] = useAtom(linksAtom)
  const [__, setGlobalPages] = useAtom(pagesAtom)

  return useQuery({
    // gcTime: 0,
    queryKey: ['getPage', pageId],
    queryFn: async () => {
      const page = await getPage(pageId)
      const links = await getLinks(pageId)
      const pages = await getPages(page[0].user_id!)

      setGlobalLinks(links)
      setGlobalPages(pages)

      return page[0]
    },
  })
}

function useGetPageBySlug(slug: string) {
  const [_, setGlobalLinks] = useAtom(linksAtom)

  return useQuery({
    queryKey: ['getPageBySlug', slug],
    queryFn: async () => {
      const page = await getPageBySlug(slug)
      const links = await getLinks(page[0].id)

      setGlobalLinks(links)

      return page[0]
    },
  })
}

function useCreatePage() {
  const [globalPages, setGlobalPages] = useAtom(pagesAtom)

  return useMutation({
    onSuccess: (data) => {
      setGlobalPages([data[0], ...globalPages])
    },
    mutationFn: async (data: NewPage) => {
      const page = await createPage(data)

      return page
    },
  })
}

function useDeletePage(id: string) {
  const [globalPages, setGlobalPages] = useAtom(pagesAtom)

  return useMutation({
    onSuccess: (data) => {
      const deletedPage = data[0]
      const filteredPages = globalPages.filter(
        (page) => page.id !== deletedPage.id
      )
      setGlobalPages(filteredPages)
    },
    mutationFn: async () => {
      console.log(id)

      return await deletePage(id)
    },
  })
}

function useUpdatePage(id: string) {
  const [globalPages, setGlobalPages] = useAtom(pagesAtom)

  return useMutation({
    onSuccess: (data) => {
      const updatedPage = data[0]
      const updatedGlobalPages = globalPages.map((page) => {
        if (page.id === updatedPage.id) {
          return updatedPage
        }
        return page
      })

      setGlobalPages(updatedGlobalPages)
    },
    mutationFn: async (data: any) => {
      return await updatePage(id, data)
    },
  })
}

export {
  useGetPages,
  useCreatePage,
  useGetPage,
  useDeletePage,
  useUpdatePage,
  useGetPageBySlug,
}
