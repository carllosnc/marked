import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pages = sqliteTable("pages", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  description: text("description"),
  slug: text("slug").unique(),
  user_id: text("user_id"),
  is_public: int("is_public").default(1),
  createdAt: text("created_at").default(Date.now().toString()),
});
