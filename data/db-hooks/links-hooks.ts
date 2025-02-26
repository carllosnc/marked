import type { NewLink } from '@/types/db-types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import {
  createLink,
  deleteLink,
  getLinks,
} from '../repository/links-repository'
import { linksAtom } from '@/app/atoms/links-atom'

function useCreateLink() {
  const [globalLinks, setGlobalLinks] = useAtom(linksAtom)

  return useMutation({
    onSuccess: (data) => {
      setGlobalLinks([data[0], ...globalLinks])
    },
    mutationFn: async (data: NewLink) => {
      const page = await createLink(data)
      return page
    },
  })
}

function useGetLinks(pageId: string) {
  const [_, setGlobalLinks] = useAtom(linksAtom)

  return useQuery({
    queryKey: ['getLinks', pageId],
    queryFn: async () => {
      const links = await getLinks(pageId)
      setGlobalLinks(links)
      return links
    },
  })
}

function useDeleteLink(id: string) {
  const [globalLinks, setGlobalLinks] = useAtom(linksAtom)

  return useMutation({
    onSuccess: (data) => {
      setGlobalLinks(globalLinks.filter((link) => link.id !== data[0].id))
    },
    mutationFn: async () => {
      return await deleteLink(id)
    },
  })
}

export { useCreateLink, useGetLinks, useDeleteLink }
