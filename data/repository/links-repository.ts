import { db } from '@/app/database'
import type { NewLink } from '@/types/db-types'
import { links } from '@/data/db-schemas/link-schema'
import { eq, asc } from 'drizzle-orm'

export async function createLink(link: NewLink) {
  return await db.insert(links).values(link).returning()
}

export async function getLinks(pageId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.page_id, pageId))
    .orderBy(asc(links.created_at))
}

export async function deleteLink(id: string) {
  return await db.delete(links).where(eq(links.id, id)).returning()
}
