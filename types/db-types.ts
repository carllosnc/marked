import { pages } from "@/data/db-schemas/page-schema"

export type Page = typeof pages.$inferSelect
export type NewPage = typeof pages.$inferInsert
