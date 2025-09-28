import { users, aadhaarRecords, quizAttempts, type User, type InsertUser, type AadhaarRecord, type InsertAadhaarRecord, type QuizAttempt, type InsertQuizAttempt } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAadhaarRecord(aadhaar: string): Promise<AadhaarRecord | undefined>;
  createAadhaarRecord(record: InsertAadhaarRecord): Promise<AadhaarRecord>;
  getAllAadhaarRecords(): Promise<AadhaarRecord[]>;
  
  createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  getQuizAttempts(): Promise<QuizAttempt[]>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize with sample DBT data on startup
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    try {
      // Check if we already have data
      const existingRecords = await this.getAllAadhaarRecords();
      if (existingRecords.length > 0) {
        return; // Data already exists, skip initialization
      }

      // Insert sample Aadhaar records
      const sampleRecords = [
        { aadhaar: "123456789012", name: "Rahul Kumar", dbtEnabled: true },
        { aadhaar: "987654321098", name: "Anita Sharma", dbtEnabled: false },
        { aadhaar: "555666777888", name: "Priya Singh", dbtEnabled: true },
        { aadhaar: "444555666777", name: "Amit Patel", dbtEnabled: false },
        { aadhaar: "333444555666", name: "Sunita Devi", dbtEnabled: true },
      ];

      for (const record of sampleRecords) {
        await db.insert(aadhaarRecords).values(record).onConflictDoNothing();
      }
    } catch (error) {
      console.log("Note: Sample data initialization skipped (likely already exists)");
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAadhaarRecord(aadhaar: string): Promise<AadhaarRecord | undefined> {
    const [record] = await db.select().from(aadhaarRecords).where(eq(aadhaarRecords.aadhaar, aadhaar));
    return record || undefined;
  }

  async createAadhaarRecord(insertRecord: InsertAadhaarRecord): Promise<AadhaarRecord> {
    const [record] = await db.insert(aadhaarRecords).values(insertRecord).returning();
    return record;
  }

  async getAllAadhaarRecords(): Promise<AadhaarRecord[]> {
    return await db.select().from(aadhaarRecords);
  }

  async createQuizAttempt(insertAttempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const attemptWithTimestamp = {
      ...insertAttempt,
      completedAt: new Date().toISOString()
    };
    const [attempt] = await db.insert(quizAttempts).values(attemptWithTimestamp).returning();
    return attempt;
  }

  async getQuizAttempts(): Promise<QuizAttempt[]> {
    return await db.select().from(quizAttempts);
  }
}

export const storage = new DatabaseStorage();
