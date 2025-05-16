export type LanguageString = {
  en: string;
  am: string;
  om: string;
  ti: string;
};

export interface Teaching {
  id: number;
  title: LanguageString;
  slug: string;
  shortDescription: LanguageString;
  content: LanguageString;
  imageUrl: string;
}

export interface Prayer {
  id: number;
  title: LanguageString;
  originalTitle: string;
  slug: string;
  description: LanguageString;
  content: {
    time: string;
    significance: {
      en: string[];
      am: string[];
      om: string[];
      ti: string[];
    };
  };
  category: {
    en: string;
    am: string;
    om: string;
    ti: string;
  };
  imageUrl: string;
}

export interface Church {
  id: number;
  name: LanguageString;
  slug: string;
  description: LanguageString;
  longDescription: string;
  location: string;
  imageUrl: string;
  significantFeatures: string[];
}

export interface Tradition {
  id: number;
  name: LanguageString;
  description: LanguageString;
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
