DROP INDEX "pages_slug_unique";--> statement-breakpoint
ALTER TABLE `pages` ALTER COLUMN "title" TO "title" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);--> statement-breakpoint
ALTER TABLE `pages` ALTER COLUMN "slug" TO "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE `pages` ALTER COLUMN "created_at" TO "created_at" text DEFAULT '1740400615199';