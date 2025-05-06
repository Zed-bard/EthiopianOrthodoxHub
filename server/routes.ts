import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriptionSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for newsletter subscriptions
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      // Validate the request body against our schema
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Add timestamp
      const subscriptionData = {
        ...validatedData,
        subscribed_at: new Date().toISOString()
      };
      
      // Store the subscription
      const subscription = await storage.createNewsletterSubscription(subscriptionData);
      
      res.status(201).json({
        message: "Subscription successful!",
        subscription
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Invalid subscription data",
          errors: error.errors
        });
      } else if ((error as any).code === "DUPLICATE_EMAIL") {
        res.status(409).json({
          message: "This email is already subscribed"
        });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({
          message: "Failed to process subscription"
        });
      }
    }
  });

  // Get prayers by category
  app.get("/api/prayers", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const prayers = await storage.getPrayers(category);
      
      res.json(prayers);
    } catch (error) {
      console.error("Error fetching prayers:", error);
      res.status(500).json({
        message: "Failed to fetch prayers"
      });
    }
  });

  // Get prayer by slug
  app.get("/api/prayers/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const prayer = await storage.getPrayerBySlug(slug);
      
      if (!prayer) {
        return res.status(404).json({
          message: "Prayer not found"
        });
      }
      
      res.json(prayer);
    } catch (error) {
      console.error("Error fetching prayer:", error);
      res.status(500).json({
        message: "Failed to fetch prayer"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
