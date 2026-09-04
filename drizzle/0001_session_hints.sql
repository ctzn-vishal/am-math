ALTER TABLE `sessions` ADD `hints_used` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ADD `briefed_problem_id` text;