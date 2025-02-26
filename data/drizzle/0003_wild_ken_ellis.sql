DROP INDEX "pages_slug_unique";--> statement-breakpoint
ALTER TABLE `links` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Tue Feb 25 2025 03:46:06 GMT-0300 (Horário Padrão de Brasília)';--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);--> statement-breakpoint
ALTER TABLE `links` ALTER COLUMN "title" TO "title" text;--> statement-breakpoint
ALTER TABLE `pages` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Tue Feb 25 2025 03:46:06 GMT-0300 (Horário Padrão de Brasília)';