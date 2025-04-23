import { pages } from '@/data/db-schemas/page-schema'
import { links } from '@/data/db-schemas/link-schema'

export type Page = typeof pages.$inferSelect
export type NewPage = typeof pages.$inferInsert
export type Link = typeof links.$inferSelect
export type NewLink = typeof links.$inferInsert
export type UpdatePage = {
  id: string
  title: string
  description: string | null
  slug: string
}

export type Metadata = {
  url: string
  title: string | null
  description: string | null
  keywords: string | null
  image: string | null
  favicon: string | null
}
