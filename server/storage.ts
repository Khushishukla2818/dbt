import { type User, type InsertUser, type AadhaarRecord, type InsertAadhaarRecord, type QuizAttempt, type InsertQuizAttempt } from "@shared/schema";
import { randomUUID } from "crypto";

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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private aadhaarRecords: Map<string, AadhaarRecord>;
  private quizAttempts: Map<string, QuizAttempt>;

  constructor() {
    this.users = new Map();
    this.aadhaarRecords = new Map();
    this.quizAttempts = new Map();
    
    // Initialize with sample DBT data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleRecords = [
      { aadhaar: "123456789012", name: "Rahul Kumar", dbtEnabled: true },
      { aadhaar: "987654321098", name: "Anita Sharma", dbtEnabled: false },
      { aadhaar: "555666777888", name: "Priya Singh", dbtEnabled: true },
      { aadhaar: "444555666777", name: "Amit Patel", dbtEnabled: false },
      { aadhaar: "333444555666", name: "Sunita Devi", dbtEnabled: true },
    ];

    sampleRecords.forEach(record => {
      const id = randomUUID();
      const aadhaarRecord: AadhaarRecord = { ...record, id };
      this.aadhaarRecords.set(record.aadhaar, aadhaarRecord);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAadhaarRecord(aadhaar: string): Promise<AadhaarRecord | undefined> {
    return this.aadhaarRecords.get(aadhaar);
  }

  async createAadhaarRecord(insertRecord: InsertAadhaarRecord): Promise<AadhaarRecord> {
    const id = randomUUID();
    const record: AadhaarRecord = { 
      ...insertRecord, 
      id,
      dbtEnabled: insertRecord.dbtEnabled ?? false 
    };
    this.aadhaarRecords.set(insertRecord.aadhaar, record);
    return record;
  }

  async getAllAadhaarRecords(): Promise<AadhaarRecord[]> {
    return Array.from(this.aadhaarRecords.values());
  }

  async createQuizAttempt(insertAttempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = randomUUID();
    const attempt: QuizAttempt = { 
      ...insertAttempt, 
      id,
      completedAt: new Date().toISOString()
    };
    this.quizAttempts.set(id, attempt);
    return attempt;
  }

  async getQuizAttempts(): Promise<QuizAttempt[]> {
    return Array.from(this.quizAttempts.values());
  }
}

export const storage = new MemStorage();
