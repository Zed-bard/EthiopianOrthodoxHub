import { 
  users, 
  type User, 
  type InsertUser, 
  newsletterSubscriptions, 
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  prayers,
  type Prayer
} from "@shared/schema";

// Import prayer data for initialization
import { prayers as prayersData } from "../client/src/lib/data";

// Extended storage interface with newsletter subscriptions
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Newsletter subscription methods
  createNewsletterSubscription(subscription: InsertNewsletterSubscription & { subscribed_at: string }): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  
  // Prayer methods
  getPrayers(category?: string): Promise<Prayer[]>;
  getPrayerBySlug(slug: string): Promise<Prayer | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscriptions: Map<number, NewsletterSubscription>;
  private prayers: Map<string, Prayer>;
  private currentUserId: number;
  private currentSubscriptionId: number;

  constructor() {
    this.users = new Map();
    this.subscriptions = new Map();
    this.prayers = new Map();
    this.currentUserId = 1;
    this.currentSubscriptionId = 1;
    
    // Initialize with prayer data
    this.initializePrayers();
  }

  // Initialize prayers from the data file
  private initializePrayers(): void {
    prayersData.forEach((prayer) => {
      this.prayers.set(prayer.slug, {
        ...prayer,
        originalTitle: prayer.originalTitle
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Newsletter subscription methods
  async createNewsletterSubscription(
    subscription: InsertNewsletterSubscription & { subscribed_at: string }
  ): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existingSubscription = Array.from(this.subscriptions.values()).find(
      (sub) => sub.email === subscription.email
    );

    if (existingSubscription) {
      const error = new Error("Email already subscribed") as any;
      error.code = "DUPLICATE_EMAIL";
      throw error;
    }

    const id = this.currentSubscriptionId++;
    const newSubscription: NewsletterSubscription = {
      ...subscription,
      id,
      active: true,
    };

    this.subscriptions.set(id, newSubscription);
    return newSubscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.subscriptions.values());
  }

  // Prayer methods
  async getPrayers(category?: string): Promise<Prayer[]> {
    const allPrayers = Array.from(this.prayers.values());
    
    if (!category) {
      return allPrayers;
    }
    
    return allPrayers.filter(prayer => 
      prayer.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getPrayerBySlug(slug: string): Promise<Prayer | undefined> {
    return this.prayers.get(slug);
  }
}

export const storage = new MemStorage();
