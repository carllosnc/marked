import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { pages } from './page-schema'

export const links = sqliteTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  page_id: text('page_id')
    .notNull()
    .references(() => pages.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  user_id: text('user_id').notNull(),
  created_at: text('created_at').default(Date().toString()),
  title: text('title'),
  url: text('url').notNull(),
  description: text('description'),
  image: text('image'),
})
