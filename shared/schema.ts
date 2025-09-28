import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const aadhaarRecords = pgTable("aadhaar_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  aadhaar: text("aadhaar").notNull().unique(),
  name: text("name").notNull(),
  dbtEnabled: boolean("dbt_enabled").notNull().default(false),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentName: text("student_name").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  completedAt: text("completed_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAadhaarRecordSchema = createInsertSchema(aadhaarRecords).omit({
  id: true,
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({
  id: true,
  completedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AadhaarRecord = typeof aadhaarRecords.$inferSelect;
export type InsertAadhaarRecord = z.infer<typeof insertAadhaarRecordSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
