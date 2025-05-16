import { createContext, useState, useContext, ReactNode } from 'react';

// Define the available languages
export type Language = 'en' | 'am' | 'om' | 'ti';

export const languages: Language[] = ['en', 'am', 'om', 'ti'];

export const languageNames: Record<Language, string> = {
  en: 'English',
  am: 'አማርኛ',
  om: 'Afaan Oromoo',
  ti: 'ትግርኛ'
};

// Define translations interface
export interface TranslationValue {
  [key: string]: {
    [languageKey: string]: string;
  } | TranslationValue;
}

export interface Translations {
  [category: string]: TranslationValue;
}

// Create translations for common UI elements
export const translations: Translations = {
  footer: {
    about: {
      'en': 'About',
      'am': 'ስለ እኛ',
      'om': 'Waa\'ee Keenya',
      'ti': 'ብዛዕባና'
    },
    aboutDescription: {
      'en': 'A digital platform dedicated to preserving and sharing the rich traditions, teachings, and practices of the Ethiopian Orthodox Tewahedo Church.',
      'am': 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ባህል፣ ትምህርቶች እና ልምዶችን ለመጠበቅና ለማካፈል የተዋቀረ ዲጂታል መድረክ ነው።',
      'om': 'Pilaatfoormiin dijitaalaa aadaa, barnoonniifi shaakallii Mana Amantaa Ortodoksii Tawaahidoo Itoophiyaa qabsiisuufi qooduuf kan kenname.',
      'ti': 'ባህላዊ ልምድን፡ ትምህርትታትን፡ ስርዓታትን ናይ ቤተ-ክርስትያን ኦርቶዶክስ ተዋሕዶ ኢትዮጵያ ንምዕቃብን ምክፋልን ዝተወፈየ ዲጂታዊ መድረኽ።'
    },
    quickLinks: {
      'en': 'Quick Links',
      'am': 'ፈጣን አገናኞች',
      'om': 'Geessituu Ariifachiisaa',
      'ti': 'ቅልጡፍ መራኸቢታት'
    },
    home: {
      'en': 'Home',
      'am': 'መነሻ',
      'om': 'Mana',
      'ti': 'ገዛ'
    },
    teachings: {
      'en': 'Teachings',
      'am': 'ትምህርቶች',
      'om': 'Barumsoota',
      'ti': 'ትምህርትታት'
    },
    teachingTypes: {
      fundamentals: {
        'en': 'Fundamentals',
        'am': 'መሰረታዊ እውቀቶች',
        'om': 'Bu\'uuraalee',
        'ti': 'መሰረታውያን'
      },
      saints: {
        'en': 'Lives of Saints',
        'am': 'የቅዱሳን ሕይወት',
        'om': 'Jireenya Qulqulloota',
        'ti': 'ናይ ቅዱሳን ሂወት'
      },
      scripture: {
        'en': 'Scripture Studies',
        'am': 'የመጽሐፍ ቅዱስ ጥናቶች',
        'om': 'Qo\'annaa Kitaaba Qulqulluu',
        'ti': 'መጽናዕቲ መጽሓፍ ቅዱስ'
      }
    },
    calendar: {
      'en': 'Calendar',
      'am': 'የቀን መቁጠሪያ',
      'om': 'Kaaleendarii',
      'ti': 'ካላንደር'
    },
    prayers: {
      'en': 'Prayers & Hymns',
      'am': 'ጸሎቶች እና መዝሙሮች',
      'om': 'Kadhannaa fi Faaruu',
      'ti': 'ጸሎታትን መዝሙራትን'
    },
    churches: {
      'en': 'Churches & Traditions',
      'am': 'ቤተ ክርስቲያናት እና ባህሎች',
      'om': 'Mana Amantaa fi Aadaa',
      'ti': 'ኣብያተ ክርስትያናትን ባህልታትን'
    },
    resources: {
      'en': 'Resources',
      'am': 'ሀብቶች',
      'om': 'Qabeenyi',
      'ti': 'ጸጋታት'
    },
    holyScriptures: {
      'en': 'Holy Scriptures',
      'am': 'መጻሕፍት ቅዱሳት',
      'om': 'Kitaabota Qulqulluu',
      'ti': 'ቅዱሳት መጻሕፍቲ'
    },
    divineLiturgy: {
      'en': 'Divine Liturgy',
      'am': 'ቅዳሴ',
      'om': 'Qiddaasee',
      'ti': 'ቅዳሴ'
    },
    fastingGuidelines: {
      'en': 'Fasting Guidelines',
      'am': 'የጾም መመሪያዎች',
      'om': 'Qajeelfama Soomana',
      'ti': 'መምርሒታት ጾም'
    },
    saintsCalendar: {
      'en': 'Saints Calendar',
      'am': 'የቅዱሳን የቀን መቁጠሪያ',
      'om': 'Kaaleendarii Qulqullootaa',
      'ti': 'ካላንደር ቅዱሳን'
    },
    historicalArchives: {
      'en': 'Historical Archives',
      'am': 'ታሪካዊ መዛግብት',
      'om': 'Galmee Seenaa',
      'ti': 'ታሪኻዊ መዛግብቲ'
    },
    contact: {
      'en': 'Contact',
      'am': 'አግኙን',
      'om': 'Nu Quunnamaa',
      'ti': 'ርክብ'
    },
    email: {
      'en': 'xofoogabrekristos@gmail.com',
      'am': 'xofoogabrekristos@gmail.com',
      'om': 'xofoogabrekristos@gmail.com',
      'ti': 'xofoogabrekristos@gmail.com'
    },
    phone: {
      'en': '+251 9248 39341',
      'am': '+251 9248 39341',
      'om': '+251 9248 39341',
      'ti': '+251 9248 39341'
    },
    address: {
      'en': 'Addis Ababa, Ethiopia',
      'am': 'አዲስ አበባ፣ ኢትዮጵያ',
      'om': 'Finfinnee, Itoophiyaa',
      'ti': 'ኣዲስ ኣበባ፣ ኢትዮጵያ'
    },
    copyright: {
      'en': 'Grooms St. Gebre Christos Mahiber. All rights reserved.',
      'am': 'የሙሽራው የቅዱስ ገብረ ክርስቶስ ማህበር ድህረ ገጽ። መብቱ በህግ የተጠበቀ ነው።',
      'om': 'Xofoo Missiroo Q/Gabra Kiristoos . Mirgi hundi kan seeraatiin eegame.',
      'ti': 'ማሕበር መርዓዊ ቅዱስ ገብረ ክርስቶስ መርበብ ። ኩሉ መሰላት ሕሉዋት እዮም።'
    },
  },
  navItems: {
    home: {
      'en': 'Home',
      'am': 'መነሻ',
      'om': 'Mana',
      'ti': 'ቤት'
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
      'Afaan Oromoo': 'kadhannaa',
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
      'Afaan Oromoo': 'M/Amantaa',
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
    },
    ethiopianDate: {
      'en': 'Ethiopian Date',
      'am': 'የኢትዮጵያ ቀን',
      'om': 'Guyyaa Itoophiyaa',
      'ti': 'ናይ ኢትዮጵያ ዕለት'
    },
    saintCommemorations: {
      'en': 'Saint Commemorations',
      'am': 'የቅዱሳን ቀን',
      'om': 'Yaadannoo Qulqullootaa',
      'ti': 'ምዝካር ቅዱሳን'
    },
    today: {
      'en': 'Today',
      'am': 'ዛሬ',
      'om': 'Hardha',
      'ti': 'ሎሚ'
    },
    ethiopianTime: {
      'English': 'Ethiopian Time:',
      'Amharic': 'የኢትዮጵያ ሰዓት:',
      'Afaan Oromoo': 'Yeroo Itoophiyaa:',
      'Tigrinya': 'ኢትዮጵያዊ ሰዓት:'
    },
    calendarTitle: {
      'English': 'Ethiopian Orthodox Calendar',
      'Amharic': 'የኢትዮጵያ ኦርቶዶክስ የቀን መቁጠሪያ',
      'Afaan Oromoo': 'Kaalendarii Ortodoksii Itoophiyaa',
      'Tigrinya': 'ናይ ኢትዮጵያ ኦርቶዶክስ ካላንደር'
    },
    holyDaysAndSeasons: {
      'English': 'Holy days and liturgical seasons',
      'Amharic': 'በዓላት እና የአምልኮ ወቅቶች',
      'Afaan Oromoo': 'Guyyoota qulqulluu fi yeroo waaqeffannaa',
      'Tigrinya': 'ቅዱሳት መዓልትታትን ወቕታዊ ዝገርን'
    },
    upcomingHolyDays: {
      'English': 'Upcoming Holy Days',
      'Amharic': 'መጪ በዓላት',
      'Afaan Oromoo': 'Guyyoota Qulqulluu Dhufan',
      'Tigrinya': 'ዝመጽእ ቅዱሳት መዓልታት'
    },
    noHolyDays: {
      'English': 'No major holy days in this month.',
      'Amharic': 'በዚህ ወር ውስጥ ዋና በዓላት የሉም።',
      'Afaan Oromoo': 'Baatii kana keessatti guyyoonni qulqulluu gudaan hin jiran.',
      'Tigrinya': 'ኣብዚ ወርሒ ዓበይቲ ቅዱሳት መዓልትታት የለዉን።'
    },
    monthsLabel: {
      'English': 'Months',
      'Amharic': 'ወራት',
      'Afaan Oromoo': 'Baatiiwwan',
      'Tigrinya': 'ኣዋርሕ'
    },
    aboutCalendar: {
      'English': 'About the Calendar',
      'Amharic': 'ስለ የቀን መቁጠሪያው',
      'Afaan Oromoo': 'Waaee Kaalendarii',
      'Tigrinya': 'ብዛዕባ ካላንደር'
    },
    holyDaysIn: {
      'English': 'Holy Days in',
      'Amharic': 'በዓላት በ',
      'Afaan Oromoo': 'Guyyoota Qulqulluu',
      'Tigrinya': 'ቅዱሳት መዓልታት ኣብ'
    },
    sun: {
      'English': 'Sun',
      'Amharic': 'እሁድ',
      'Afaan Oromoo': 'Dilbata',
      'Tigrinya': 'ሰንበት'
    },
    mon: {
      'English': 'Mon',
      'Amharic': 'ሰኞ',
      'Afaan Oromoo': 'Wiixata',
      'Tigrinya': 'ሰኑይ'
    },
    tue: {
      'English': 'Tue',
      'Amharic': 'ማክሰኞ',
      'Afaan Oromoo': 'Kibxata',
      'Tigrinya': 'ሰሉስ'
    },
    wed: {
      'English': 'Wed',
      'Amharic': 'ረቡዕ',
      'Afaan Oromoo': 'Roobii',
      'Tigrinya': 'ረቡዕ'
    },
    thu: {
      'English': 'Thu',
      'Amharic': 'ሐሙስ',
      'Afaan Oromoo': 'Kamiisa',
      'Tigrinya': 'ሓሙስ'
    },
    fri: {
      'English': 'Fri',
      'Amharic': 'አርብ',
      'Afaan Oromoo': 'Jimaata',
      'Tigrinya': 'ዓርቢ'
    },
    sat: {
      'English': 'Sat',
      'Amharic': 'ቅዳሜ',
      'Afaan Oromoo': 'Sanbata',
      'Tigrinya': 'ቀዳም'
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
  },
  heroSection: {
    title: {
      'English': 'Ethiopian Orthodox Tewahedo Church The Grooms St. Gebre Christos Mahiber',
      'Amharic': 'በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ የሙሽራው የቅዱስ ገብረ ክርስቶስ ማህበር',
      'Afaan Oromoo': 'Xofoo Missiroo Q/Gabra Kiristoos Ortodoksii Tawaahidoo Itiyoophiyaa',
      'Tigrinya': 'ናይ ኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ማሕበር መርዓዊ ቅዱስ ገብረ ክርስቶስ'
    },
    subtitle: {
      'English': 'Religious Education, Daily Prayers, Brotherhood Love',
      'Amharic': 'የሃይማኖት ትምህርት፣ ዕለታዊ ጸሎቶች፣ የወንድምናዊ ፍቅር',
      'Afaan Oromoo': 'Barumsaa Amantaa, Kadhannaa Guyyaatti Si\'a Torbaa, Jaalala Obbolummaa',
      'Tigrinya': 'ሃይማኖታዊ ትምህርት፣ ዕለታዊ ጸሎታት፣ ወንድማዊ ፍቕሪ'
    },
    exploreTeachings: {
      'English': 'Explore Teachings',
      'Amharic': 'ትምህርቶችን ያስሱ',
      'Afaan Oromoo': 'Barumsa Baradhu',
      'Tigrinya': 'ትምህርትታት ኣርኢ'
    },
    viewCalendar: {
      'English': 'View Calendar',
      'Amharic': 'የቀን መቁጠሪያ ይመልከቱ',
      'Afaan Oromoo': 'Kaaleendarii Ilaalaa',
      'Tigrinya': 'ካላንደር ርኢ'
    }
  },
  introSection: {
    title: {
      'English': 'Welcome to Our Spiritual Community',
      'Amharic': 'ወደ መንፈሳዊ ማህበረሰባችን እንኳን በደህና መጡ',
      'Afaan Oromoo': 'Guyyaa Gaarii Mana Amantaa Fayyaa Keessan',
      'Tigrinya': 'ናብ መንፈሳዊ ማሕበረሰብና እንቋዕ ብደሓን መጻእኩም'
    },
    description: {
      'English': 'This platform is dedicated to preserving and sharing the rich traditions, teachings, and practices of the Ethiopian Orthodox Tewahedo Church, And We Share Brotherly Love',
      'Amharic': 'ይህ መድረክ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን የባህል፣ የትምህርት እና የተግባር, እና የወንድማማችነት ፍቅርን እናካፍላለን።',
      'Afaan Oromoo': 'Xofoo kana keessatti aadaa, barumsaa fi hojii amantaa Ortodoksii Tawaahidoo Itoophiyaa Akkasumaas Jaalala obbolummaa Waliin Qoodanna\'e kanatti fayyadamaa jira.',
      'Tigrinya': 'እዚ መድረኽ እዚ ናይ ኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ዝበሃል ባህላዊ ትምህርትን ልምድን ንምዕቃብን ንምክፋልን ዝተደለየ እዩ።ሕውነታዊ ፍቕሪ ድማ ንካፈል።'
    },
    features: {
      sacredTeachings: {
        title: {
          'English': 'Sacred Teachings',
          'Amharic': 'ቅዱስ ትምህርቶች',
          'Afaan Oromoo': 'Barumsa Qulqulluu',
          'Tigrinya': 'ቅዱስ ትምህርትታት'
        },
        description: {
          'English': 'Access ancient spiritual wisdom and theological insights from Ethiopian Orthodox tradition.',
          'Amharic': 'ከኢትዮጵያ ኦርቶዶክስ ባህል የተገኘውን ታሪካዊ መንፈሳዊ ጥበብ እና አምላካዊ እውቀት ያግኙ።',
          'Afaan Oromoo': 'Ogbarruu fi beekumsa amantaa Ortodoksii Itoophiyaa irraa argadhu.',
          'Tigrinya': 'ካብ ኢትዮጵያ ኦርቶዶክስ ባህሊ ዝመጸ ኣረጋዊ መንፈሳዊ ጥበብን ኣምላካዊ ፍልጠትን ርኸብ።'
        }
      },      religiousCalendar: {
        title: {
          'English': 'Religious Calendar',
          'Amharic': 'የሃይማኖት የቀን መቁጠሪያ',
          'Afaan Oromoo': 'Kadhannaa',
          'Tigrinya': 'ናይ ሃይማኖት ካላንደር',
          'en': 'Religious Calendar',
          'am': 'የሃይማኖት የቀን መቁጠሪያ',
          'om': 'Kadhannaa',
          'ti': 'ናይ ሃይማኖት ካላንደር'
        },
        description: {
          'English': 'Follow the Ethiopian Orthodox calendar with holy days, festivals, and fasting periods.',
          'Amharic': 'ቅዱስ ቀናት፣ በዓላት እና የጾም ጊዜያትን ያካተተውን የኢትዮጵያ ኦርቶዶክስ የቀን መቁጠሪያ ይከተሉ።',
          'Afaan Oromoo': 'Guyyoota qulqulluu, ayyaannoo fi yeroo soorataa kaaleendarii Ortodoksii Itoophiyaa hordofaa.',
          'Tigrinya': 'ቅዱሳት መዓልታትን በዓላትን ውዕል ጾምን ዝሓዘ ናይ ኢትዮጵያ ኦርቶዶክስ ካላንደር ተኸተል።'
        }
      },
      prayersHymns: {
        title: {
          'English': 'Prayers & Hymns',
          'Amharic': 'ጸሎቶች እና መዝሙሮች',
          'Afaan Oromoo': 'kadhannaa fi Faarfannaa',
          'Tigrinya': 'ጸሎታትን መዝሙራትን'
        },
        description: {
          'English': 'Discover traditional prayers, chants, and hymns to enrich your spiritual practice.',
          'Amharic': 'መንፈሳዊ ልምድዎን ለማሳደግ ባህላዊ ጸሎቶችን፣ ዜማዎችን እና መዝሙሮችን ያግኙ።',
          'Afaan Oromoo': 'kadhannaa, Faarfannaa fi sirba aadaa amantaa keessatti argadhu.',
          'Tigrinya': 'ንመንፈሳዊ ልምድኩም ንምልሳዕ ባህላዊ ጸሎታትን ዜማታትን መዝሙራትን ርኸብ።'
        }
      }
    }
  },
  prayersSection: {
    title: {
      'en': 'Seven Daily Prayers',
      'am': 'ሰባቱ የጸሎት ጊዜያት',
      'om': 'Kadhannaa Guyyaa Torban',
      'ti': 'ሸውዓተ ዕለታዊ ጸሎታት'
    },
    subtitle: {
      'en': 'As the prophet King David declared, "Seven times a day I praise You" (Psalm 119:164), a rule has been established for us believers to be diligent in prayer seven times a day.',
      'am': 'ነቢዩ ንጉሡ ዳዊት ‹‹ሰባት ጊዜ በቀን አመሰግንሃለሁ›› በማለት እንደገለጸው ምእመናን ለጸሎት በቀን ውስጥ ሰባት ጊዜ መትጋት እንዳብን ሥርዓት ተበጀልን (ተሠራልን)፤ (መዝ.፻፲፰፥፻፷፬)',
      'om': 'Akka raajichi mootichi Daawit, "Guyyaatti yeroo torba sin galateeffadha" (Faarf. 119:164) jedheetti, nuti amantoonni guyyaatti yeroo torba kadhannaaf akka jabaannu seera nuuf tumameera.',
      'ti': 'ከምቲ ነቢይ ንጉስ ዳዊት ‹‹ብሰብዓተ ጊዜ ብመዓልቲ አመስግነካ አሎኹ›› (መዝ. ፻፲፱፥፻፷፬) ኢሉ ዝገለጾ፡ ምእመናን ንጸሎት ኣብ ውሽጢ መዓልቲ ሸውዓተ ጊዜ ክንጸዓር ስርዓት ተሰሪዑልና ኣሎ።'
    },
    prayerTimes: {
      morning: {
        title: {
          'en': 'Morning Prayer (6 AM)',
          'am': 'ጸሎተ ነግህ / የጠዋት ጸሎት (ጠዋት ዐሥራ ሁለት ሰዓት)',
          'om': 'Kadhannaa Ganama (Sa\'a 6)',
          'ti': 'ጸሎት ንግሆ (ሰዓት 6)'
        },
        significance: {
          'en': 'We thank Him for allowing us to pass the dark night in peace, protected from evil. This is the hour Adam was created and when Christ will come for judgment.',
          'am': 'ጨለማውን (ሌሊቱን) ጊዜ በሰላም አሳልፎ፣ ከክፉ ነገር ተጠብቀን ብርሃን እንድናይ ስለደረግን እናመሰግነዋለን። ይህ ሰዓት አባታችን አዳም የተፈጠረበት እና ጌታችን ኢየሱስ ክርስቶስ ለፍርድ የሚመጣበት ሰዓት ነው።',
          'om': 'Halkan nagaan nu dabarsee, hamaa irraa nu eegee ifa akka arginu waan nu taasiseef galateeffanna. Sa\'atiin kun kan Addaam uumame fi Gooftaan Iyyesuus Kiristoos murtii dhufuuf.',
          'ti': 'ንጸልማት (ለይቲ) ብሰላም ስለ ዘሕለፈና፣ ካብ ክፉእ ተሓልዩና ብርሃን ክንርኢ ስለ ዝገበረና ነመስግኖ። እዚ ሰዓት እዚ ኣቦና ኣዳም ዝተፈጥረሉን ጎይታና ኢየሱስ ክርስቶስ ንፍርዲ ዝመጽኣሉን ሰዓት እዩ።'
        }
      },
      thirdHour: {
        title: {
          'en': 'Third Hour Prayer (9 AM)',
          'am': 'ጸሎተ ሠለስት ሰዓት (ጠዋት ረፋድ ሦስት ሰዓት)',
          'om': 'Kadhannaa Sa\'a Sadaffaa (Sa\'a 9)',
          'ti': 'ጸሎት ሳልሳይ ሰዓት (ሰዓት 9)'
        },
        significance: {
          'en': 'The hour Christ\'s journey to Calvary began, when Gabriel announced to Virgin Mary, and when the Holy Spirit descended upon the 120 chosen ones.',
          'am': 'ይህ ሰዓት ጌታችንን መስቀል አሸክመው ወደ ቀራንዮ ተራራ ለመውሰድ ጉዞ የተጀመረበት፣ ቅዱስ ገብርኤል ለእመቤታችን ቅድስት ድንግል ማርያም ጌታችንን እንደምትወልደው የምሥራች ያበሠረበት፣ እና መንፈስ ቅዱስ ጸጋ በጽርሐ ጽዮን የተሰጠበት ሰዓት ነው።',
          'om': 'Sa\'atii Kiristoos gara Qaraaniyootti imala jalqabe, Gabri\'eel Maariyaamitti beeksise, Hafuurri Qulqulluunis namoota 120 filataman irratti bu\'e.',
          'ti': 'እዚ ሰዓት እዚ ጎይታና መስቀል ተሰኪሙ ናብ ቀራንዮ ዝጀመረሉ፣ ቅዱስ ገብርኤል ንእግዝእትነ ማርያም ብዛዕባ ጎይታና ዝበሰረላ፣ መንፈስ ቅዱስ\'ውን ኣብ ጽርሃ ጽዮን ዝወረደሉ ሰዓት እዩ።'
        }
      },
      sixthHour: {
        title: {
          'en': 'Sixth Hour Prayer (12 PM)',
          'am': 'ጸሎተ ስድስት ሰዓት (እኩለ ቀን)',
          'om': 'Kadhannaa Sa\'a Jahaffaa (Sa\'a 12)',
          'ti': 'ጸሎት ሻድሻይ ሰዓት (ሰዓት 12)'
        },
        significance: {
          'en': 'The hour Christ was crucified, when darkness covered the earth, and when the serpent tempted Adam and Eve.',
          'am': 'ጌታችን የተሰቀለበት፣ ጨለማ ምድርን የሸፈነበት፣ እባብ አዳምንና ሔዋንን ያታለለበት ሰዓት ነው።',
          'om': 'Sa\'atii Kiristoos fannifame, dukkanni lafaa uwwise, bofa Addaam fi Hewaan qorame.',
          'ti': 'ጎይታና ዝተሰቕለሉ፣ ጸልማት ምድሪ ዝሸፈነሉ፣ ተመን ንኣዳምን ሄዋንን ዝፈተነሉ ሰዓት እዩ።'
        }
      },
      ninthHour: {
        title: {
          'en': 'Ninth Hour Prayer (3 PM)',
          'am': 'ጸሎተ ዘጠኝ ሰዓት (ከሰዓት በኋላ ሦስት ሰዓት)',
          'om': 'Kadhannaa Sa\'a Sagalaffaa (Sa\'a 3)',
          'ti': 'ጸሎት ታሽዓይ ሰዓት (ሰዓት 3)'
        },
        significance: {
          'en': 'The hour Christ gave up His spirit, when He descended to Hades, and when Adam and Eve were expelled from Paradise.',
          'am': 'ጌታችን መንፈሱን የሰጠበት፣ ወደ ሲኦል የወረደበት፣ አዳምና ሔዋን ከገነት የተባረሩበት ሰዓት ነው።',
          'om': 'Sa\'atii Kiristoos hafuura isaa kenneef, gara Si\'oolitti bu\'e, Addaam fi Hewaan Jannata irraa ari\'aman.',
          'ti': 'ጎይታና መንፈሱ ዝሃበሉ፣ ናብ ሲኦል ዝወረደሉ፣ ኣዳምን ሄዋንን ካብ ገነት ዝተባረሩሉ ሰዓት እዩ።'
        }
      },
      evening: {
        title: {
          'en': 'Evening Prayer (6 PM)',
          'am': 'ጸሎተ ሰርክ / የመሸት ጸሎት (ምሽት ዐሥራ ሁለት ሰዓት)',
          'om': 'Kadhannaa Galgalaa (Sa\'a 6)',
          'ti': 'ጸሎት ምሸት (ሰዓት 6)'
        },
        significance: {
          'en': 'The hour Christ was taken down from the cross, when He blessed bread and wine, and when Noah\'s dove returned with an olive branch.',
          'am': 'ጌታችን ከመስቀል የወረደበት፣ እንጀራንና ወይኑን የባረከበት፣ የኖኅ ርግብ የወይራ ቅጠል ይዛ የተመለሰችበት ሰዓት ነው።',
          'om': 'Sa\'atii Kiristoos fannoo irraa buufame, buddeena fi daadhii eebbise, gugeen Nooh damee zaayitii qabuun deebi\'e.',
          'ti': 'ጎይታና ካብ መስቀል ዝወረደሉ፣ ንእንጌራን ወይንን ዝባረኸሉ፣ ርግቢ ኖህ ቆጽሊ ወይራ ሒዛ ዝተመልሰትሉ ሰዓት እዩ።'
        }
      },
      compline: {
        title: {
          'en': 'Compline Prayer (9 PM)',
          'am': 'ጸሎተ ንዋም / የእንቅልፍ ጸሎት (ሌሊት ሦስት ሰዓት)',
          'om': 'Kadhannaa Hirribaa (Sa\'a 9)',
          'ti': 'ጸሎት ድቃስ (ሰዓት 9)'
        },
        significance: {
          'en': 'The hour Christ prayed in Gethsemane, when He sweated blood, and when the disciples slept.',
          'am': 'ጌታችን በጌቴሴማኒ የጸለየበት፣ ደም ላብ የላበተበት፣ ደቀ መዛሙርቱ የተኙበት ሰዓት ነው።',
          'om': 'Sa\'atii Kiristoos Getseemaanetti kadhate, dhiiga dhangala\'e, barattoonni rafan.',
          'ti': 'ጎይታና ኣብ ጌትሴማኒ ዝጸለየሉ፣ ደም ዝኣረቐሉ፣ ደቀ መዛሙርቱ ዝደቀሱሉ ሰዓት እዩ።'
        }
      },
      midnight: {
        title: {
          'en': 'Midnight Prayer (12 AM)',
          'am': 'ጸሎተ መንፈቀ ሌሊት (እኩለ ሌሊት)',
          'om': 'Kadhannaa Walakkaa Halkanaa (Sa\'a 12)',
          'ti': 'ጸሎት ፍርቂ ለይቲ (ሰዓት 12)'
        },
        significance: {
          'en': 'The hour Christ will come for judgment, when the wise virgins entered with the bridegroom, and when there was a cry at midnight.',
          'am': 'ጌታችን ለፍርድ የሚመጣበት፣ ጥበበኛት ደናግል ከሙሽራው ጋር የገቡበት፣ በእኩለ ሌሊት ጩኸት የተሰማበት ሰዓት ነው።',
          'om': 'Sa\'atii Kiristoos murtii dhufuuf, dubartoonni qaroo misirrootti galan, halkan walakkaa iyyichi dhaga\'ame.',
          'ti': 'ጎይታና ንፍርዲ ዝመጽኣሉ፣ ጥበበኛታት ደናግል ምስ መርዓዊ ዝኣተዋሉ፣ ኣብ ፍርቂ ለይቲ ጭርሖ ዝተሰምዐሉ ሰዓት እዩ።'
        }
      }
    },
    conclusion: {
      'en': 'These seven prayer times have special meaning in our lives, helping us remember and give thanks for what God has done for us.',
      'am': 'እነዚህ ሰባቱ የጸሎት ጊዜያት በሕይወታችን ልዩ ትርጉም ያላቸው ናቸው፤ እግዚአብሔር ለእኛ ያደረገልንን እያስታወስን ለምስጋና በጸሎት መትጋት ያስፈልገናል።',
      'om': 'Yeroon kadhannaa torban kun jireenya keenyaaf hiika addaa qabu, waan Waaqayyo nuuf godhe yaadachaa galateeffachuuf nu gargaaru.',
      'ti': 'እዞም ሸውዓተ ግዜያት ጸሎት ኣብ ህይወትና ፍሉይ ትርጉም ዘለዎም እዮም፣ እግዚኣብሄር ንዓና ዝገበረልና እናዘከርና ምስጋና ንምቕራብ ይሕግዙና።'
    }
  },
  teachingsSection: {
    title: {
      'en': 'Spiritual Teachings',
      'am': 'መንፈሳዊ ትምህርቶች',
      'om': 'Barumsa Amantaa',
      'ti': 'መንፈሳዊ ትምህርትታት'
    },
    subtitle: {
      'en': 'Pillar of Faith',
      'am': 'ዓምደ ሃይማኖት',
      'om': 'Bu,uura Amantaa',
      'ti': 'ዓምደ ሃይማኖት'
    },
    viewAllTeachings: {
      'en': 'View All Teachings',
      'am': 'ሁሉንም ትምህርቶች ይመልከቱ',
      'om': 'Barumsa Hunda Ilaalaa',
      'ti': 'ኩሉ ትምህርትታት ርኢ'
    },
    categories: {
      'foundations-of-faith': {
        'en': 'Foundations of Faith',
        'am': 'የእምነት መሰረቶች',
        'om': "Bu'uura Amantaa",
        'ti': 'መሰረታት እምነት'
      },
      'mystery-of-the-trinity': {
        'en': 'The Mystery of the Trinity',
        'am': 'የሥላሴ ምስጢር (Placeholder)',
        'om': 'Iccitii Sillaasee (Placeholder)',
        'ti': 'ምስጢረ ሥላሴ (Placeholder)'
      },
      'gods-providence': {
        'en': "God's Providence",
        'am': 'የእግዚአብሔር ጥበቃ (Placeholder)',
        'om': 'Tiksitii Waaqayyoo (Placeholder)',
        'ti': 'ኣጠቓቕማ ኣምላኽ (Placeholder)'
      },
      'angels': {
        'en': 'Angels',
        'am': 'መላእክት (Placeholder)',
        'om': 'Ergamoota (Placeholder)',
        'ti': 'መላእኽቲ (Placeholder)'
      },
      'church-history': {
        'en': 'Church History',
        'am': 'የቤተክርስቲያን ታሪክ',
        'om': 'Seenaa Mana Kiristaanaa',
        'ti': 'ታሪኽ ቤተ ክርስቲያን'
      },
      'demons-satans': {
        'en': 'Demons/Satans',
        'am': 'አጋንንት/ሰይጣናት (Placeholder)',
        'om': 'Jinniiwwan/Sheyxaanota (Placeholder)',
        'ti': 'ኣጋንንቲ/ሰይጣናት (Placeholder)'
      },
      'human-nature-fall': {
        'en': 'Human Nature and Fall',
        'am': 'የሰው ልጅ ተፈጥሮና ውድቀት (Placeholder)',
        'om': 'Uumama Namaafi Kufaatii (Placeholder)',
        'ti': 'ተፈጥሮ ሰብን ውድቀትን (Placeholder)'
      },
      'mystery-of-incarnation': {
        'en': 'The Mystery of Incarnation',
        'am': 'የሥጋዌ ምስጢር (Placeholder)',
        'om': 'Iccitii Foon Uffachuu (Placeholder)',
        'ti': 'ምስጢረ ሥጋዌ (Placeholder)'
      },
      'passion-christ': {
        'en': 'The Passion of Christ',
        'am': 'የክርስቶስ ሕማማት (Placeholder)',
        'om': 'Rakkina Kiristoos (Placeholder)',
        'ti': 'ሕማማት ክርስቶስ (Placeholder)'
      }
    }
  },
  prayers: {
    daily: {
      'en': 'Daily Prayers',
      'am': 'የዕለት ጸሎቶች',
      'om': 'Kadhannaa Guyyaa',
      'ti': 'ዕለታዊ ጸሎታት'
    },
    seasonal: {
      'en': 'Seasonal Prayers',
      'am': 'የወቅት ጸሎቶች',
      'om': 'Kadhannaa Yeroo',
      'ti': 'ወቕታዊ ጸሎታት'
    },
    special: {
      'en': 'Special Prayers',
      'am': 'ልዩ ጸሎቶች',
      'om': 'Kadhannaa Addaa',
      'ti': 'ፍሉያት ጸሎታት'
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
  const [language, setLanguage] = useState<Language>('en'); // Set default language to English

  // Translation function
  const t = (category: string, key: string): string => {
    try {
      const keys = key.split('.');
      let current: any = translations[category];
      
      // Navigate through nested keys
      for (const k of keys) {
        if (current && current[k]) {
          current = current[k];
        } else {
          throw new Error(`Translation key not found: ${category}.${key}`);
        }
      }
      
      // Map the language code to full name if needed for translations
      const langMap: Record<string, string> = {
        'en': 'English',
        'am': 'Amharic',
        'om': 'Afaan Oromoo',
        'ti': 'Tigrinya'
      };
      
      const fullLangName = language.length === 2 ? langMap[language] : language;
      
      // If we found a translation object with language keys
      if (current && typeof current === 'object' && !Array.isArray(current)) {
        // Check for language code first
        if (current[language]) {
          return current[language];
        }
        // Then check for full language name
        if (current[fullLangName]) {
          return current[fullLangName];
        }
        // Fallback to English if translation not found
        if (current['English'] || current['en']) {
          return current['English'] || current['en'];
        }
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