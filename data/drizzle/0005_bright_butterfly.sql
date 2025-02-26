DROP INDEX "pages_slug_unique";--> statement-breakpoint
ALTER TABLE `links` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Tue Feb 25 2025 16:22:46 GMT-0300 (Horário Padrão de Brasília)';--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);--> statement-breakpoint
ALTER TABLE `pages` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Tue Feb 25 2025 16:22:46 GMT-0300 (Horário Padrão de Brasília)';