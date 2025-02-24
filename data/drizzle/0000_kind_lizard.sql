CREATE TABLE `pages` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`description` text,
	`slug` text,
	`user_id` text,
	`is_public` integer DEFAULT 1,
	`created_at` text DEFAULT '1740348070127'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);