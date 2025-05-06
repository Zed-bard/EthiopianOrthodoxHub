import { createContext, useState, useContext, ReactNode } from 'react';

// Define the available languages
export type Language = 'English' | 'Amharic' | 'Afaan Oromoo' | 'Tigrinya';

// Define translations interface
export interface TranslationValue {
  [key: string]: {
    [languageKey: string]: string;
  };
}

export interface Translations {
  [category: string]: TranslationValue;
}

// Create translations for common UI elements
export const translations: Translations = {
  navItems: {
    home: {
      'English': 'Home',
      'Amharic': 'መነሻ',
      'Afaan Oromoo': 'Mana',
      'Tigrinya': 'መበገሲ'
    },
    teachings: {
      'English': 'Teachings',
      'Amharic': 'ትምህርቶች',
      'Afaan Oromoo': 'Barnoota',
      'Tigrinya': 'ትምህርትታት'
    },
    prayers: {
      'English': 'Prayers',
      'Amharic': 'ጸሎቶች',
      'Afaan Oromoo': 'Kadhaa',
      'Tigrinya': 'ጸሎታት'
    },
    calendar: {
      'English': 'Calendar',
      'Amharic': 'የቀን መቁጠሪያ',
      'Afaan Oromoo': 'Kaaleendarii',
      'Tigrinya': 'ካላንደር'
    },
    churches: {
      'English': 'Churches',
      'Amharic': 'ቤተ ክርስቲያናት',
      'Afaan Oromoo': 'Waldaalee',
      'Tigrinya': 'ኣብያተ ክርስትያናት'
    }
  },
  calendarLabels: {
    months: {
      'English': 'Months',
      'Amharic': 'ወራት',
      'Afaan Oromoo': 'Baatiiwwan',
      'Tigrinya': 'ኣዋርሕ'
    },
    holyDays: {
      'English': 'Holy Days',
      'Amharic': 'በዓላት',
      'Afaan Oromoo': 'Guyyoota Qulqulluu',
      'Tigrinya': 'ቅዱሳት መዓልታት'
    },
    currentTime: {
      'English': 'Current Ethiopian Date & Time',
      'Amharic': 'የኢትዮጵያ ቀን እና ሰዓት',
      'Afaan Oromoo': 'Guyyaa fi Yeroo Itoophiyaa Ammaa',
      'Tigrinya': 'ህሉው ናይ ኢትዮጵያ ዕለትን ሰዓትን'
    }
  },
  common: {
    subscribe: {
      'English': 'Subscribe',
      'Amharic': 'ተመዝገብ',
      'Afaan Oromoo': 'Galmeessaa',
      'Tigrinya': 'ተመዝገብ'
    },
    readMore: {
      'English': 'Read More',
      'Amharic': 'ተጨማሪ አንብብ',
      'Afaan Oromoo': 'Dabalataan Dubbisi',
      'Tigrinya': 'ተወሳኺ ኣንብብ'
    },
    learnMore: {
      'English': 'Learn More',
      'Amharic': 'ተጨማሪ እወቅ',
      'Afaan Oromoo': 'Dabalataan Baradhu',
      'Tigrinya': 'ተወሳኺ ፍለጥ'
    }
  }
};

// Create the language context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (category: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('English');

  // Translation function
  const t = (category: string, key: string): string => {
    try {
      if (
        translations[category] && 
        translations[category][key] && 
        translations[category][key][language]
      ) {
        return translations[category][key][language];
      }
      // Fallback to English if translation not found
      if (
        translations[category] && 
        translations[category][key] && 
        translations[category][key]['English']
      ) {
        return translations[category][key]['English'];
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
    // Return the key as is if no translation exists
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};