DROP INDEX "pages_slug_unique";--> statement-breakpoint
ALTER TABLE `links` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Thu Feb 27 2025 21:24:44 GMT-0300 (Horário Padrão de Brasília)';--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);--> statement-breakpoint
ALTER TABLE `pages` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Thu Feb 27 2025 21:24:44 GMT-0300 (Horário Padrão de Brasília)';--> statement-breakpoint
ALTER TABLE `pages` ADD `author_name` text;