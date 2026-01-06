import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const bots = pgTable("bots", {
  id: uuid("id").defaultRandom().primaryKey(),
  enName: text("en_name").notNull(),
  arName: text("ar_name").notNull(),
  ckbName: text("ckb_name").notNull(),
  enDesc: text("en_desc").notNull(),
  arDesc: text("ar_desc").notNull(),
  ckbDesc: text("ckb_desc").notNull(),
  image: text("image").notNull(),
  iconImage: text("icon_image").notNull(),
  link: text("link").notNull(),
  repoLink: text("repo_link").notNull(),
  status: text("status", { enum: ["active", "down"] })
    .notNull()
    .default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Bot = typeof bots.$inferSelect & {
  name?: string;
  description?: string;
};
export type NewBot = typeof bots.$inferInsert;
