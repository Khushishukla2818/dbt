import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAadhaarRecordSchema, insertQuizAttemptSchema } from "@shared/schema";
import { z } from "zod";

const aadhaarCheckSchema = z.object({
  aadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits")
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Check DBT status for Aadhaar number
  app.post("/api/aadhaar/check", async (req, res) => {
    try {
      const { aadhaar } = aadhaarCheckSchema.parse(req.body);
      const record = await storage.getAadhaarRecord(aadhaar);
      
      if (!record) {
        return res.status(404).json({ 
          success: false, 
          message: "Aadhaar number not found in database",
          status: "not_found"
        });
      }

      res.json({
        success: true,
        data: record,
        status: record.dbtEnabled ? "enabled" : "not_enabled"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: error.errors[0].message 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get analytics data
  app.get("/api/analytics", async (req, res) => {
    try {
      const records = await storage.getAllAadhaarRecords();
      const quizAttempts = await storage.getQuizAttempts();
      
      const totalStudents = records.length;
      const dbtEnabled = records.filter(r => r.dbtEnabled).length;
      const notEnabled = totalStudents - dbtEnabled;
      
      // Simulated regional data
      const regionalData = {
        North: { enabled: 385, notEnabled: 115 },
        South: { enabled: 425, notEnabled: 75 },
        East: { enabled: 320, notEnabled: 140 },
        West: { enabled: 388, notEnabled: 102 },
        Central: { enabled: 400, notEnabled: 108 }
      };

      res.json({
        success: true,
        data: {
          overview: {
            totalStudents,
            dbtEnabled,
            notEnabled,
            enabledPercentage: Math.round((dbtEnabled / totalStudents) * 100)
          },
          regional: regionalData,
          quizStats: {
            totalAttempts: quizAttempts.length,
            averageScore: quizAttempts.length > 0 
              ? Math.round(quizAttempts.reduce((sum, attempt) => sum + (attempt.score / attempt.totalQuestions), 0) / quizAttempts.length * 100)
              : 0
          }
        }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Submit quiz attempt
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const quizData = insertQuizAttemptSchema.parse(req.body);
      const attempt = await storage.createQuizAttempt(quizData);
      
      res.json({
        success: true,
        data: attempt
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: error.errors[0].message 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
