import { useMutation, useQuery } from "@tanstack/react-query";
import { getPages, createPage } from "@/data/repository/page-repository";
import type { NewPage } from "@/types/db-types";

function useGetPages(userId: string) {
    return useQuery({
      queryKey: ["getPages", userId],
      queryFn: async () => {
        const pages = await getPages(userId)
        return pages
      }
  })
}

function useCreatePage(){
  return useMutation({
    mutationFn: async (data: NewPage) => {
      const page = await createPage(data)

      return page
    }
  })
}

export {
  useGetPages,
  useCreatePage
}