export interface Teaching {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  imageUrl: string;
}

export interface Prayer {
  id: number;
  title: string;
  originalTitle: string;
  slug: string;
  description: string;
  content: string;
  category: "Morning Prayer" | "Evening Prayer" | "Liturgical Hymn" | "Fasting Prayer";
  imageUrl: string;
}

export interface Church {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  location: string;
  imageUrl: string;
  significantFeatures: string[];
}

export interface Tradition {
  id: number;
  name: string;
  description: string;
  history: string;
  significance: string;
  icon: string;
}

export interface HolyDay {
  id: number;
  day: number;
  month: number;
  name: string;
  description: string;
}

export interface NewsletterSubscription {
  name: string;
  email: string;
}
