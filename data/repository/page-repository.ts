import { db } from '@/app/database'
import { pages } from '@/data/db-schemas/page-schema'
import type { NewPage } from '@/types/db-types'
import { eq, asc, desc } from 'drizzle-orm'

export async function createPage(page: NewPage) {
  return await db.insert(pages).values(page).returning()
}

export async function getPages(userId: string) {
  return (
    await db.select().from(pages).where(eq(pages.user_id, userId))
  ).reverse()
}

export async function getPage(id: string) {
  return await db.select().from(pages).where(eq(pages.id, id))
}

export async function getPageBySlug(slug: string) {
  return await db.select().from(pages).where(eq(pages.slug, slug))
}

export async function updatePage(id: string, page: NewPage) {
  return await db.update(pages).set(page).where(eq(pages.id, id)).returning()
}

export async function deletePage(id: string) {
  return await db.delete(pages).where(eq(pages.id, id)).returning()
}
