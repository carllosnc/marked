PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_links` (
	`id` text PRIMARY KEY NOT NULL,
	`page_id` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT 'Tue Feb 25 2025 16:22:38 GMT-0300 (Horário Padrão de Brasília)',
	`title` text,
	`url` text NOT NULL,
	`description` text,
	`image` text,
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_links`("id", "page_id", "user_id", "created_at", "title", "url", "description", "image") SELECT "id", "page_id", "user_id", "created_at", "title", "url", "description", "image" FROM `links`;--> statement-breakpoint
DROP TABLE `links`;--> statement-breakpoint
ALTER TABLE `__new_links` RENAME TO `links`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX "pages_slug_unique";--> statement-breakpoint
ALTER TABLE `pages` ALTER COLUMN "created_at" TO "created_at" text DEFAULT 'Tue Feb 25 2025 16:22:38 GMT-0300 (Horário Padrão de Brasília)';--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);