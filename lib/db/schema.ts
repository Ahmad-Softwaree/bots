import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const bots = pgTable("bots", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  iconImage: text("icon_image").notNull(),
  link: text("link").notNull(),
  repoLink: text("repo_link").notNull(),
  status: text("status").notNull().default("active"), // 'active' or 'down'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Bot = typeof bots.$inferSelect;
export type NewBot = typeof bots.$inferInsert;
