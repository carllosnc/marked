CREATE TABLE `links` (
	`id` text PRIMARY KEY NOT NULL,
	`page_id` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT 'Tue Feb 25 2025 00:03:29 GMT-0300 (Horário Padrão de Brasília)',
	`title` text NOT NULL,
	`url` text NOT NULL,
	`description` text,
	`image` text,
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP INDEX "pages_slug_unique";--> statement-breakpoint
ALTER TABLE `pages` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Tue Feb 25 2025 00:03:29 GMT-0300 (Horário Padrão de Brasília)';--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);