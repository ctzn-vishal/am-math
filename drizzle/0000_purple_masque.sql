CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`session_id` text,
	`skill_id` text NOT NULL,
	`problem_id` text,
	`correct` integer NOT NULL,
	`hints_used` integer DEFAULT 0 NOT NULL,
	`cpa_stage` text NOT NULL,
	`misconception_code` text,
	`elapsed_ms` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `attempts_skill_idx` ON `attempts` (`student_id`,`skill_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `attempts_misconception_idx` ON `attempts` (`student_id`,`misconception_code`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`skill_id` text,
	`problem_id` text,
	`last_interaction_id` text,
	`cpa_stage` text DEFAULT 'concrete' NOT NULL,
	`started_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`ended_at` integer,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `sessions_student_idx` ON `sessions` (`student_id`,`started_at`);--> statement-breakpoint
CREATE TABLE `skill_state` (
	`student_id` text NOT NULL,
	`skill_id` text NOT NULL,
	`alpha` real NOT NULL,
	`beta` real NOT NULL,
	`attempt_count` integer DEFAULT 0 NOT NULL,
	`last_seen_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `skill_state_pk` ON `skill_state` (`student_id`,`skill_id`);--> statement-breakpoint
CREATE TABLE `students` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`pack_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `turns` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`role` text NOT NULL,
	`text` text DEFAULT '' NOT NULL,
	`visual_spec` text,
	`image_data` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `turns_session_idx` ON `turns` (`session_id`,`created_at`);