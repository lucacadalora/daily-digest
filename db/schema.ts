import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name"),
  subscribed: boolean("subscribed").default(true).notNull(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  categories: text("categories").array(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers);
export const selectSubscriberSchema = createSelectSchema(subscribers);
export type InsertSubscriber = typeof subscribers.$inferInsert;
export type SelectSubscriber = typeof subscribers.$inferSelect;
