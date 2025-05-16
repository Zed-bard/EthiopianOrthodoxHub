import { Prayer, Teaching } from "./types";
import { Language } from "./LanguageContext";

export interface LanguageString {
  en: string;
  am: string;
  om: string;
  ti: string;
}

export interface Church {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  content: {
    [key: string]: string;
  };
}

export interface Tradition {
  id: string;
  name: string;
  description: string;
  icon: string;
  content: {
    [key: string]: string;
  };
}

export type PrayerCategory = {
  en: "Morning Prayer" | "Evening Prayer" | "Liturgical Hymn" | "Fasting Prayer" | "Daily Prayer";
  am: "የማልዳ ጸሎት" | "የማታ ጸሎት" | "የሥርዓት መዝሙር" | "የጾም ጸሎት" | "የዕለት ጸሎት";
  om: "Kadhannaa Ganamaa" | "Kadhannaa Galgalaa" | "Faarfannaa Tawaahidoo" | "Kadhannaa fi Sagada" | "Kadhannaa Guyyaa";
  ti: "ጸሎት ንግሆ" | "ጸሎት ማታ" | "መዝሙር ስርዓት" | "ጸሎት ጾም" | "ዕለታዊ ጸሎት";
};

/**
 * Helper function to get localized content by language
 * Handles both language codes and full language names
 */
export function getLocalizedContent<T extends Record<string, string>>(
  content: T,
  language: string
): string {
  // Map full language names to language codes if needed
  const languageMap: Record<string, keyof T> = {
    'English': 'en',
    'Amharic': 'am',
    'Afaan Oromoo': 'om',
    'Tigrinya': 'ti',
    'en': 'en',
    'am': 'am',
    'om': 'om',
    'ti': 'ti'
  };

  // Get the proper language key based on input
  const langKey = languageMap[language] as keyof T;
  
  // Return the content in the requested language, fall back to English if not available
  return content[langKey] || content['en'];
}

export const prayerCategories: Record<keyof PrayerCategory, PrayerCategory[keyof PrayerCategory][]> = {
  en: ["Morning Prayer", "Evening Prayer", "Liturgical Hymn", "Fasting Prayer", "Daily Prayer"],
  am: ["የማልዳ ጸሎት", "የማታ ጸሎት", "የሥርዓት መዝሙር", "የጾም ጸሎት", "የዕለት ጸሎት"],
  om: ["Kadhannaa Ganamaa", "Kadhannaa Galgalaa", "Faarfannaa Tawaahidoo", "Kadhannaa fi Sagada", "Kadhannaa Guyyaa"],
  ti: ["ጸሎት ንግሆ", "ጸሎት ማታ", "መዝሙር ስርዓት", "ጸሎት ጾም", "ዕለታዊ ጸሎት"]
};

// Add the new function to get prayer categories by language
export function getPrayerCategoriesByLanguage(language: string): string[] {
  const languageKey = language as keyof PrayerCategory;
  return prayerCategories[languageKey] || prayerCategories.en;
}

// Gets a teaching by language
export function getTeachingsByLanguage(language: string): 
  Array<{id: number, title: string, slug: string, shortDescription: string, content: string, imageUrl: string}> {
  return teachings.map(teaching => ({
    id: teaching.id,
    title: getLocalizedContent(teaching.title, language),
    slug: teaching.slug,
    shortDescription: getLocalizedContent(teaching.shortDescription, language),
    content: getLocalizedContent(teaching.content, language),
    imageUrl: teaching.imageUrl
  }));
}

// Gets prayers by language
export function getPrayersByLanguage(language: string): 
  Array<{id: number, title: string, originalTitle: string, slug: string, description: string, content: {time: string, significance: string[]}, category: string, imageUrl: string}> {
  return prayers.map(prayer => ({
    id: prayer.id,
    title: getLocalizedContent(prayer.title, language),
    originalTitle: prayer.originalTitle,
    slug: prayer.slug,
    description: getLocalizedContent(prayer.description, language),
    content: {
      time: prayer.content.time,
      significance: prayer.content.significance[language as keyof typeof prayer.content.significance] || prayer.content.significance.en
    },
    category: getLocalizedContent(prayer.category, language),
    imageUrl: prayer.imageUrl
  }));
}

// Gets churches by language
export function getChurchesByLanguage(language: string): Church[] {
  return churches.map(church => ({
    ...church,
    description: church.content[language] || church.content.en
  }));
}

// Gets traditions by language
export function getTraditionsByLanguage(language: string): Tradition[] {
  return traditions.map(tradition => ({
    ...tradition,
    description: tradition.content[language] || tradition.content.en
  }));
}

export const teachings: Teaching[] = [
  {
    id: 1,
    title: {
      en: "Foundations of Faith",
      am: "የእምነት መሰረቶች",
      om: "Bu'uura Amantaa",
      ti: "መሰረታት እምነት"
    },
    slug: "foundations-of-faith",
    shortDescription: {
      en: "The Ethiopian Orthodox Tewahedo Church firmly believes in the existence of One God. This God is the creator of all things, visible and invisible, the sustainer of the universe, and the ultimate source of all life and goodness.",
      am: "የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን በአንድ አምላክ መኖር ታምናለች። ይህ አምላክ የሁሉም ነገር ፈጣሪ፣ የሚታየውና የማይታየው፣ የዓለማት ደጋፊ፣ የሕይወትና የበጎ ነገር ሁሉ ምንጭ ነው። (Placeholder - verify from Barumsaa.md)",
      om: "Manni Amantaa Ortodoksii Tawaahidoo Itoophiyaa Waaqayyo tokkicha jiraachuutti cimsee amana. Waaqni kun uumaa waan hundumaa kan mul'atuufi hin mul'anne, kan addunyaa kana deeggaru, madda jireenyaafi gaarummaa hundaa isa guddaadha. (Placeholder - verify from Barumsaa.md)",
      ti: "ቤተ ክርስቲያን ኦርቶዶክስ ተዋሕዶ ኢትዮጵያ ብህላወ ሓደ ኣምላኽ ኣጽኒዓ ትኣምን። እዚ ኣምላኽ እዚ ፈጣሪ ኩሉ ነገር፡ ዝርአን ዘይርአን፡ ደጋፊ ዓለማት፡ ናይ ህይወትን ሰናይ ነገርን ዘበለ ምንጪ እዩ። (Placeholder - verify from Barumsaa.md)"
    },
    content: {
      en: "The Ethiopian Orthodox Tewahedo Church firmly believes in the existence of One God. This God is the creator of all things, visible and invisible, the sustainer of the universe, and the ultimate source of all life and goodness. This section would typically elaborate further on the attributes of God, the nature of faith, and other core tenets related to the foundations of belief within the church.",
      am: "የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን በአንድ አምላክ መኖር ታምናለች። ይህ አምላክ የሁሉም ነገር ፈጣሪ፣ የሚታየውና የማይታየው፣ የዓለማት ደጋፊ፣ የሕይወትና የበጎ ነገር ሁሉ ምንጭ ነው። ይህ ክፍል ስለ እግዚአብሔር ባህርያት፣ ስለ እምነት ምንነት እና ከእምነት መሰረቶች ጋር የተያያዙ ሌሎች ዋና ዋና መርሆዎችን በስፋት ያብራራል። (Placeholder - verify from Barumsaa.md)",
      om: "Manni Amantaa Ortodoksii Tawaahidoo Itoophiyaa Waaqayyo tokkicha jiraachuutti cimsee amana. Waaqni kun uumaa waan hundumaa kan mul'atuufi hin mul'anne, kan addunyaa kana deeggaru, madda jireenyaafi gaarummaa hundaa isa guddaadha. Kutaan kun waa'ee amaloota Waaqayyoo, waa'ee amantaa fi bu'uura amantaa mana kiristaanaa keessatti argaman irratti bal'inaan ibsa. (Placeholder - verify from Barumsaa.md)",
      ti: "ቤተ ክርስቲያን ኦርቶዶክስ ተዋሕዶ ኢትዮጵያ ብህላወ ሓደ ኣምላኽ ኣጽኒዓ ትኣምን። እዚ ኣምላኽ እዚ ፈጣሪ ኩሉ ነገር፡ ዝርአን ዘይርአን፡ ደጋፊ ዓለማት፡ ናይ ህይወትን ሰናይ ነገርን ዘበለ ምንጪ እዩ። እዚ ክፍሊ እዚ ብዛዕባ ባህርያት ኣምላኽ፡ ባህሪ እምነትን ካልኦት ምስ መሰረታት እምነት ቤተ ክርስቲያን ዝተኣሳሰሩ ዋና ዋና መትከላት ብዝርዝር ይገልጽ። (Placeholder - verify from Barumsaa.md)"
    },
    imageUrl: "/Sillaasee.jpg"
  },
  {
    id: 2,
    title: {
      en: "The Mystery of the Trinity",
      am: "የሥላሴ ምስጢር (Placeholder)",
      om: "Iccitii Sillaasee (Placeholder)",
      ti: "ምስጢረ ሥላሴ (Placeholder)"
    },
    slug: "mystery-of-the-trinity",
    shortDescription: {
      en: "Exploring the doctrine of the Holy Trinity: One God in three persons - Father, Son, and Holy Spirit.",
      am: "Placeholder Amharic short description for The Mystery of the Trinity.",
      om: "Placeholder Afaan Oromoo short description for The Mystery of the Trinity.",
      ti: "Placeholder Tigrinya short description for The Mystery of the Trinity."
    },
    content: {
      en: "Detailed explanation of the Holy Trinity, its significance in Orthodox theology, and scriptural basis. (Content from Barumsaa.md to be added here)",
      am: "Placeholder Amharic content for The Mystery of the Trinity. (Content from Barumsaa.md to be added here)",
      om: "Placeholder Afaan Oromoo content for The Mystery of the Trinity. (Content from Barumsaa.md to be added here)",
      ti: "Placeholder Tigrinya content for The Mystery of the Trinity. (Content from Barumsaa.md to be added here)"
    },
    imageUrl: "/dingl.jpg"
  },
  {
    id: 3,
    title: {
      en: "God's Providence",
      am: "የእግዚአብሔር ጥበቃ (Placeholder)",
      om: "Tiksitii Waaqayyoo (Placeholder)",
      ti: "ኣጠቓቕማ ኣምላኽ (Placeholder)"
    },
    slug: "gods-providence",
    shortDescription: {
      en: "Understanding God's continuous care, guidance, and governance over creation and human affairs.",
      am: "Placeholder Amharic short description for God's Providence.",
      om: "Placeholder Afaan Oromoo short description for God's Providence.",
      ti: "Placeholder Tigrinya short description for God's Providence."
    },
    content: {
      en: "Discussion on divine providence, God's intervention in the world, and trust in His plan. (Content from Barumsaa.md to be added here)",
      am: "Placeholder Amharic content for God's Providence. (Content from Barumsaa.md to be added here)",
      om: "Placeholder Afaan Oromoo content for God's Providence. (Content from Barumsaa.md to be added here)",
      ti: "Placeholder Tigrinya content for God's Providence. (Content from Barumsaa.md to be added here)"
    },
    imageUrl: "/images/teachings/providence.jpg"
  },
  {
    id: 5, // Skipping ID 4 as it's merged
    title: {
      en: "Angels",
      am: "መላእክት (Placeholder)",
      om: "Ergamoota (Placeholder)",
      ti: "መላእኽቲ (Placeholder)"
    },
    slug: "angels",
    shortDescription: {
      en: "The Orthodox teaching on angels, their nature, hierarchy, and role in God's plan and human life.",
      am: "Placeholder Amharic short description for Angels.",
      om: "Placeholder Afaan Oromoo short description for Angels.",
      ti: "Placeholder Tigrinya short description for Angels."
    },
    content: {
      en: "Exploring the different orders of angels, their service to God, and their interactions with humanity. (Content from Barumsaa.md to be added here)",
      am: "Placeholder Amharic content for Angels. (Content from Barumsaa.md to be added here)",
      om: "Placeholder Afaan Oromoo content for Angels. (Content from Barumsaa.md to be added here)",
      ti: "Placeholder Tigrinya content for Angels. (Content from Barumsaa.md to be added here)"
    },
    imageUrl: "/images/teachings/angels.jpg"
  },
  {
    id: 6,
    title: {
      en: "Church History",
      am: "የቤተክርስቲያን ታሪክ",
      om: "Seenaa Mana Kiristaanaa",
      ti: "ታሪኽ ቤተ ክርስቲያን"
    },
    slug: "church-history",
    shortDescription: {
      en: "A brief overview of the history of the Ethiopian Orthodox Tewahedo Church, from its apostolic origins to the present day.",
      am: "የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ታሪክ ከአ apostolic አመጣጥ እስከ ዛሬ ድረስ አጭር ቅኝት። (Verify from Barumsaa.md)",
      om: "Seenaa Mana Kiristaanaa Ortodoksii Tawaahidoo Itoophiyaa, jalqaba Ergamootarraa kaasee hanga har'aatti gabaabaatti. (Verify from Barumsaa.md)",
      ti: "ታሪኽ ቤተ ክርስቲያን ኦርቶዶክስ ተዋሕዶ ኢትዮጵያ ካብ መበገሲኡ ክሳብ ሎሚ ዘሎ ምሕጻር። (Verify from Barumsaa.md)"
    },
    content: {
      en: "Key events, figures, and developments in the rich history of the EOTC. (Content from Barumsaa.md to be added here)",
      am: "Placeholder Amharic content for Church History. (Content from Barumsaa.md to be added here)",
      om: "Placeholder Afaan Oromoo content for Church History. (Content from Barumsaa.md to be added here)",
      ti: "Placeholder Tigrinya content for Church History. (Content from Barumsaa.md to be added here)"
    },
    imageUrl: "/images/teachings/history.jpg"
  },
  {
    id: 7,
    title: {
      en: "Demons/Satans",
      am: "አጋንንት/ሰይጣናት (Placeholder)",
      om: "Jinniiwwan/Sheyxaanota (Placeholder)",
      ti: "ኣጋንንቲ/ሰይጣናት (Placeholder)"
    },
    slug: "demons-satans",
    shortDescription: {
      en: "Understanding the Orthodox perspective on demons, Satan, their nature, and influence.",
      am: "Placeholder Amharic short description for Demons/Satans.",
      om: "Placeholder Afaan Oromoo short description for Demons/Satans.",
      ti: "Placeholder Tigrinya short description for Demons/Satans."
    },
    content: {
      en: "Teachings on spiritual warfare, the fall of angels, and the power of Christ over evil forces. (Content from Barumsaa.md to be added here)",
      am: "Placeholder Amharic content for Demons/Satans. (Content from Barumsaa.md to be added here)",
      om: "Placeholder Afaan Oromoo content for Demons/Satans. (Content from Barumsaa.md to be added here)",
      ti: "Placeholder Tigrinya content for Demons/Satans. (Content from Barumsaa.md to be added here)"
    },
    imageUrl: "/images/teachings/demons.jpg"
  },
  {
    id: 8,
    title: {
      en: "Human Nature and Fall",
      am: "የሰው ልጅ ተፈጥሮና ውድቀት (Placeholder)",
      om: "Uumama Namaafi Kufaatii (Placeholder)",
      ti: "ተፈጥሮ ሰብን ውድቀትን (Placeholder)"
    },
    slug: "human-nature-fall",
    shortDescription: {
      en: "The creation of humankind in God's image, the concept of original sin, and the consequences of the fall.",
      am: "Placeholder Amharic short description for Human Nature and Fall.",
      om: "Placeholder Afaan Oromoo short description for Human Nature and Fall.",
      ti: "Placeholder Tigrinya short description for Human Nature and Fall."
    },
    content: {
      en: "Exploring human nature before and after the fall, free will, and the need for salvation. (Content from Barumsaa.md to be added here)",
      am: "Placeholder Amharic content for Human Nature and Fall. (Content from Barumsaa.md to be added here)",
      om: "Placeholder Afaan Oromoo content for Human Nature and Fall. (Content from Barumsaa.md to be added here)",
      ti: "Placeholder Tigrinya content for Human Nature and Fall. (Content from Barumsaa.md to be added here)"
    },
    imageUrl: "/images/teachings/human_nature.jpg"
  },
  {
    id: 9,
    title: {
      en: "The Mystery of Incarnation",
      am: "የሥጋዌ ምስጢር (Placeholder)",
      om: "Iccitii Foon Uffachuu (Placeholder)",
      ti: "ምስጢረ ሥጋዌ (Placeholder)"
    },
    slug: "mystery-of-incarnation",
    shortDescription: {
      en: "The doctrine of the Incarnation: Jesus Christ as fully God and fully human.",
      am: "Placeholder Amharic short description for The Mystery of Incarnation.",
      om: "Placeholder Afaan Oromoo short description for The Mystery of Incarnation.",
      ti: "Placeholder Tigrinya short description for The Mystery of Incarnation."
    },
    content: {
      en: "Understanding the two natures of Christ, His virgin birth, and the significance of God becoming man. (Content from Barumsaa.md to be added here)",
      am: "Placeholder Amharic content for The Mystery of Incarnation. (Content from Barumsaa.md to be added here)",
      om: "Placeholder Afaan Oromoo content for The Mystery of Incarnation. (Content from Barumsaa.md to be added here)",
      ti: "Placeholder Tigrinya content for The Mystery of Incarnation. (Content from Barumsaa.md to be added here)"
    },
    imageUrl: "/images/teachings/incarnation.jpg"
  },
  {
    id: 10,
    title: {
      en: "The Passion, Death, Resurrection, and Ascension of Christ",
      am: "የክርስቶስ ሕማማት፣ ሞት፣ ትንሣኤና ዕርገት (Placeholder)",
      om: " rakkina, Du'a, Du'aa Ka'uu fi Ol Fudhatamuu Kiristoos (Placeholder)",
      ti: "ሕማማት፣ ሞት፣ ትንሣኤን ዕርገትን ክርስቶስ (Placeholder)"
    },
    slug: "passion-christ",
    shortDescription: {
      en: "The central events of Christian faith: Christ's suffering, crucifixion, resurrection, and ascension.",
      am: "Placeholder Amharic short description for The Passion, Death, Resurrection, and Ascension of Christ.",
      om: "Placeholder Afaan Oromoo short description for The Passion, Death, Resurrection, and Ascension of Christ.",
      ti: "Placeholder Tigrinya short description for The Passion, Death, Resurrection, and Ascension of Christ."
    },
    content: {
      en: "Detailed exploration of the theological meaning of Christ's passion, its fulfillment of prophecy, the victory over death through resurrection, and the glory of ascension. (Content from Barumsaa.md to be added here)",
      am: "Placeholder Amharic content for The Passion, Death, Resurrection, and Ascension of Christ. (Content from Barumsaa.md to be added here)",
      om: "Placeholder Afaan Oromoo content for The Passion, Death, Resurrection, and Ascension of Christ. (Content from Barumsaa.md to be added here)",
      ti: "Placeholder Tigrinya content for The Passion, Death, Resurrection, and Ascension of Christ. (Content from Barumsaa.md to be added here)"
    },
    imageUrl: "/images/teachings/passion.jpg"
  },
  {
    id: 11,
    title: {
      en: "New Spiritual Book",
      am: "አዲስ መንፈሳዊ መጽሐፍ",
      om: "Kitaaba Hafuuraa Haaraa",
      ti: "ሓድሽ መንፈሳዊ መጽሓፍ"
    },
    slug: "new-spiritual-book",
    shortDescription: {
      en: "Discover sacred texts and spiritual literature that guide our faith journey and deepen our understanding of Orthodox teachings.",
      am: "የእምነታችንን ጉዞ የሚመሩና የኦርቶዶክስ ትምህርቶችን ግንዛቤ የሚያዳብሩ ቅዱስ ጽሑፎችንና መንፈሳዊ ድርሳናትን ያግኙ።",
      om: "Barreeffamoota qulqulluu fi kitaabota hafuuraa imala amantii keenyaa qajeelchanii fi hubannaa barsiisa Orthodoksii keenyaa gabbisan argadhaa.",
      ti: "ቅዱሳት ጽሑፋትን መንፈሳዊ ድርሳናትን ነቲ ናይ እምነትና ጉዕዞ ዝመርሑን ናይ ኦርቶዶክሳዊ ትምህርትታትና ፍልጠት ዘዕምቑን ርኸቡ።"
    },
    content: {
      en: "A comprehensive collection of spiritual texts and literature that enriches our understanding of Orthodox faith and traditions. These include ancient manuscripts, theological commentaries, and contemporary spiritual writings that illuminate our path to salvation.",
      am: "የኦርቶዶክስ እምነትና ወግን ግንዛቤያችንን የሚያበለጽጉ መንፈሳዊ ጽሑፎችና ድርሳናት ሰፊ ስብስብ። ይህም ጥንታዊ የእጅ ጽሑፎችን፣ የመለኮታዊ ትርጓሜዎችን እና የዘመናዊ መንፈሳዊ ጽሑፎችን የሚያካትት ሲሆን እነዚህም ወደ ደህንነት የሚወስደውን መንገዳችንን ያበራሉ።",
      om: "Sasaxabbii guutuu kan barreeffamoota hafuuraa fi ogbarruu hubannaa amantii fi aadaa Orthodoksii keenya bal'isu. Kana keessatti barreeffamoota durii harka, hiikkaa waaqa-qabeessaa, fi barreeffamoota hafuuraa ammayyaa kan karaa fayyinaa keenyaa ibsan dabalata.",
      ti: "ሰፊ ዝርዝር ናይ መንፈሳዊ ጽሑፋትን ድርሳናትን ነቲ ናይ ኦርቶዶክሳዊ እምነትን ባህልን ፍልጠትና ዘበርኽ። እዚ ድማ ጥንታዊ ኢድ ጽሑፋት፡ መለኮታዊ ትርጓሜታትን ዘመናዊ መንፈሳዊ ጽሑፋትን ዘጠቓልል ኮይኑ፡ ነቲ ናብ ምድሓን ዝወስድ መገድና ዘብርህዎ።"
    },
    imageUrl: "/images/teachings/spiritual_book.jpg"
  },
  {
    id: 12,
    title: {
      en: "New Prayer",
      am: "አዲስ ጸሎት",
      om: "Kadhannaa Haaraa",
      ti: "ሓድሽ ጸሎት"
    },
    slug: "new-prayer",
    shortDescription: {
      en: "Learn and practice new prayer forms that strengthen our connection with God and deepen our spiritual life.",
      am: "ከእግዚአብሔር ጋር ያለንን ግንኙነት የሚያጠናክሩና መንፈሳዊ ሕይወታችንን የሚያዳብሩ አዳዲስ የጸሎት ዘዴዎችን ይማሩና ይለማመዱ።",
      om: "Akaakuu kadhannaa haaraa walitti dhufeenya keenya Waaqayyoon wajjin jabeessu fi jireenya hafuuraa keenya gabbisan baradhaa, shaakala.",
      ti: "ሓደሽቲ መገድታት ጸሎት ነቲ ምስ እግዚኣብሔር ዘሎና ርክብ ዘደልድሉን መንፈሳዊ ህይወትና ዘዕምቑን ተማሂርኩምን ለማሚድኩምን።"
    },
    content: {
      en: "Explore sacred prayers handed down through generations, their spiritual significance, and proper methods of prayer that enhance our communion with God. This section includes guidance on personal prayer, communal worship, and meditation practices.",
      am: "ከትውልድ ወደ ትውልድ የተላለፉ ቅዱስ ጸሎቶችን፣ መንፈሳዊ ጠቀሜታቸውን እና ከእግዚአብሔር ጋር ያለንን ኅብረት የሚያጎለብቱ ትክክለኛ የጸሎት ዘዴዎችን ያስተውሉ። ይህ ክፍል የግል ጸሎት፣ የጋራ አምልኮ እና የማሰላሰል ልምምዶችን ይመራል።",
      om: "Kadhannoota qulqulluu dhaloota irraa gara dhalootaatti darban, barbaachisummaa hafuuraa isaanii, fi tooftaalee kadhannaa sirrii walitti dhufeenya keenya Waaqayyo waliin cimsaniif qajeelfama argadhaa. Kutaan kun qajeelfama kadhannaa dhuunfaa, kadhannaa gamtaa, fi shaakala xiinxalaa of keessaa qaba.",
      ti: "ካብ ወለዶ ናብ ወለዶ ዝተሓላለፉ ቅዱሳት ጸሎታት፡ መንፈሳዊ ጠቕሚኦምን ነቲ ምስ እግዚኣብሔር ዘሎና ሕብረት ዘደልድሉ ቅኑዓት ኣገባባት ጸሎትን ኣስተውዕሉ። እዚ ክፍሊ እዚ ናይ ውልቃዊ ጸሎት፡ ሓባራዊ ኣምልኾን ናይ ምሕላይ ልምምድን መምርሒ የጠቓልል።"
    },
    imageUrl: "/images/teachings/new_prayer.jpg"
  },
  {
    id: 13,
    title: {
      en: "New Education",
      am: "አዲስ ትምህርት",
      om: "Barumsa Haaraa",
      ti: "ሓድሽ ትምህርቲ"
    },
    slug: "new-education",
    shortDescription: {
      en: "Modern approaches to Orthodox education that help us understand and apply ancient wisdom in contemporary life.",
      am: "ጥንታዊ ጥበብን በዘመናዊ ሕይወት ለመረዳትና ለመተግበር የሚያግዙ ዘመናዊ የኦርቶዶክስ ትምህርት አቀራረቦች።",
      om: "Mala barnoota Orthodoksii ammayyaa ogummaa durii jireenya ammaa keessatti hubachuuf fi hojiirra oolchuuf nu gargaaru.",
      ti: "ዘመናዊ ኣገባባት ኦርቶዶክሳዊ ትምህርቲ ነቲ ጥንታዊ ጥበብ ኣብ ዘመናዊ ህይወት ክንርድኦን ክንጥቀመሉን ዝሕግዙ።"
    },
    content: {
      en: "Discover innovative educational methods that bridge traditional Orthodox teachings with contemporary learning needs. This section explores digital resources, interactive study materials, and modern pedagogical approaches while maintaining the authenticity of our faith traditions.",
      am: "ባህላዊ የኦርቶዶክስ ትምህርቶችን ከዘመናዊ የመማር ፍላጎቶች ጋር የሚያገናኙ ዘመናዊ የትምህርት ዘዴዎችን ያግኙ። ይህ ክፍል የእምነት ወጎቻችንን ትክክለኛነት እያስጠበቀ፣ ዲጂታል ሀብቶችን፣ ተናባቢ የጥናት ቁሳቁሶችን እና ዘመናዊ የማስተማሪያ አቀራረቦችን ያጠናል።",
      om: "Maloota barnootaa haaraa kan barsiisa aadaa Orthodoksii fedhii barnootaa ammayyaa waliin walitti fidanu argadhaa. Kutaan kun dhugummaa aadaa amantii keenyaa eegaa, qabeenya dijitaalaa, meeshaalee barnootaa walii galaa, fi mala barnoota ammayyaa qorata.",
      ti: "ሓደሽቲ ኣገባባት ምምሃር ነቲ ባህላዊ ኦርቶዶክሳዊ ትምህርትታት ምስቲ ዘመናዊ ድሌታት ምምሃር ዘራኽቡ ርኸቡ። እዚ ክፍሊ እዚ ነቲ ሓቅነት ናይ እምነታዊ ባህልታትና እናሓለወ፡ ዲጂታላዊ ጸጋታት፡ ተዋስኦኣዊ ናውቲ መጽናዕትን ዘመናዊ ኣገባባት ምምሃርን የጽንዕ።"
    },
    imageUrl: "/images/teachings/new_education.jpg"
  }
];

export const churches: Church[] = [
  {
    id: "orthodox-tewahedo",
    name: "Orthodox Tewahedo Church",
    description: "The Ethiopian Orthodox Tewahedo Church maintains the ancient Christian tradition of one united nature in Christ.",
    imageUrl: "/images/churches/tewahedo.jpg",
    slug: "orthodox-tewahedo",
    content: {
      en: "The Ethiopian Orthodox Tewahedo Church emphasizes the united divine and human natures of Christ, maintaining ancient traditions and practices.",
      am: "የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን የክርስቶስን አንድ ተዋሕዶአዊ ባሕርይ የምታስተምር ጥንታዊት ቤተ ክርስቲያን ናት።",
      or: "Waldaa Ortodoksii Tawaahidoo Itoophiyaa barsiisa amantii Kiristoos baay'ina tokko qabu barsiisa.",
      ti: "ቤተ ክርስትያን ኦርቶዶክስ ተዋሕዶ ኢትዮጵያ ሓደ ተዋሕዶኣዊ ባሕርይ ክርስቶስ እትምህር ጥንታዊት ቤተ ክርስትያን እያ።"
    }
  },
  {
    id: "greek-orthodox",
    name: "Greek Orthodox Tradition",
    description: "The Greek Orthodox tradition maintains the teaching of two natures in Christ while preserving ancient liturgical practices.",
    imageUrl: "/images/churches/greek-orthodox.jpg",
    slug: "greek-orthodox",
    content: {
      en: "The Greek Orthodox Church maintains the doctrine of two natures in Christ while sharing many ancient traditions with other Orthodox churches.",
      am: "የግሪክ ኦርቶዶክስ ቤተ ክርስቲያን ለክርስቶስ ሁለት ባሕርያት እንዳሉት የምታስተምር ሲሆን ጥንታዊ ወግን ታስጠብቃለች።",
      or: "Waldaan Ortodoksii Giriikii amantaa Kiristoos baay'ina lama qabu barsiifti.",
      ti: "ቤተ ክርስትያን ግሪኽ ኦርቶዶክስ ክልተ ባሕርያት ክርስቶስ እትምህር እያ።"
    }
  }
];

export const traditions: Tradition[] = [
  {
    id: "liturgical",
    name: "Liturgical Traditions",
    description: "Ancient liturgical practices including the Divine Liturgy of St. Mary and the various anaphoras.",
    icon: "🕊️",
    content: {
      en: "The Ethiopian Orthodox Church preserves ancient liturgical traditions, including various anaphoras and the Divine Liturgy.",
      am: "የኢትዮጵያ ኦርቶዶክስ ቤተ ክርስቲያን የቅዱስ ቁርባን አከባበርን ጨምሮ ጥንታዊ የአምልኮ ሥርዓቶችን ጠብቃ ታቆያለች።",
      or: "Waldaan Ortodoksii Itoophiyaa aadaa amantii durii of keessaa qabu kunuunsa.",
      ti: "ቤተ ክርስትያን ኦርቶዶክስ ኢትዮጵያ ጥንታዊ ስርዓተ ኣምልኾ ትሕልው።"
    }
  },
  {
    id: "sacraments",
    name: "Seven Sacraments",
    description: "The seven holy sacraments that form the foundation of Orthodox spiritual life.",
    icon: "✝️",
    content: {
      en: "The seven sacraments include Baptism, Confirmation, Holy Communion, Confession, Holy Orders, Matrimony, and Anointing of the Sick.",
      am: "ሰባቱ ምስጢራተ ቤተ ክርስቲያን፡ ጥምቀት፣ ሜሮን፣ ቁርባን፣ ንስሐ፣ ክህነት፣ ተክሊል እና ቀንዲል ናቸው።",
      or: "Iccitiiwwan Waldaa torba: Cuuphaa, Dibata, Qurbaana, Gabbii, Lubummaa, Fuudhaa fi Heeruma, fi Dibata Dhukkubsatootaa dha.",
      ti: "ሸውዓተ ምስጢራት ቤተ ክርስትያን፡ ጥምቀት፣ ሜሮን፣ ቁርባን፣ ንስሓ፣ ክህነት፣ ተክሊልን ቀንዲልን እዮም።"
    }
  }
];

export const prayers: Prayer[] = [
  {
    id: 1,
    title: {
      en: "Morning Prayer (Tselote Negih)",
      am: "ጸሎተ ነግህ",
      om: "Kadhannaa Ganamaa",
      ti: "ጸሎት ንግሆ"
    },
    originalTitle: "ጸሎተ ነግህ",
    slug: "morning-prayer",
    description: {
      en: "The first prayer of the day at 6 AM, commemorating Adam's creation and Christ's future coming for judgment.",
      am: "የቀኑ የመጀመሪያ ጸሎት በጠዋት 12:00 ሰዓት፣ የአዳምን ፍጥረትና ክርስቶስ ለፍርድ የሚመጣበትን የሚያስታውስ።",
      om: "Kadhannaa jalqabaa guyyaa sa'a 12:00 ganama, uumama Addaamii fi dhufaatii Kiristoos firdiitiif yaadachiisu.",
      ti: "ናይ መዓልቲ ቀዳማይ ጸሎት ሰዓት 12:00 ንጉሆ፡ ምፍጣር ኣዳምን መጽኢ ፍርዲ ክርስቶስን ዘዘኻኽር።"
    },
    content: {
      time: "6:00 AM",
      significance: {
        en: [
          "Time when Adam was created",
          "Hour when Christ will come for judgment",
          "We thank God for protecting us through the night",
          "Time to remember Christ standing in judgment for our sake"
        ],
        am: [
          "አዳም የተፈጠረበት ሰዓት",
          "ክርስቶስ ለፍርድ የሚመጣበት ሰዓት",
          "በሌሊት ስለጠበቀን እግዚአብሔርን እናመሰግናለን",
          "ክርስቶስ ስለእኛ በፍርድ ቤት መቆሙን የምናስታውስበት"
        ],
        om: [
          "Yeroo Addaam itti uumame",
          "Sa'atii Kiristoos firdiitiif itti dhufu",
          "Halkan nu eeguu isaatiif Waaqa galateeffanna",
          "Yeroo Kiristoos nuuf jedhee firdii dura dhaabbate yaadannu"
        ],
        ti: [
          "ግዜ ምፍጣር ኣዳም",
          "ሰዓት ምምጻእ ክርስቶስ ንፍርዲ",
          "ንምሕላው ኣምላኽ ኣብ ለይቲ ነመስግን",
          "ግዜ ምዝካር ክርስቶስ ኣብ ቤት ፍርዲ ብዛዕባና ደው ምባሉ"
        ]
      }
    },
    category: {
      en: "Daily Prayer",
      am: "የዕለት ጸሎት",
      om: "Kadhannaa Guyyaa",
      ti: "ዕለታዊ ጸሎት"
    },    imageUrl: "/Adam.jpg"
  },
  {
    id: 2,
    title: {
      en: "Third Hour Prayer (Tselote Selest)",
      am: "ጸሎተ ሠለስት",
      om: "Kadhannaa Sa'aatii Sadaffaa",
      ti: "ጸሎት ሰለስተ"
    },
    originalTitle: "ጸሎተ ሠለስት",
    slug: "third-hour-prayer",
    description: {
      en: "Prayer at 9 AM, commemorating Christ's journey to Calvary and the descent of the Holy Spirit.",
      am: "በጠዋት 9 ሰዓት የሚደረግ፣ ክርስቶስ ወደ ቀራንዮ የጀመረበትንና መንፈስ ቅዱስ የወረደበትን የሚያስታውስ ጸሎት።",
      om: "Kadhannaa sa'a 9 ganama, imala Kiristoos gara Qaraaniyootti fi bu'iinsa Hafuura Qulqulluu yaadachiisu.",
      ti: "ጸሎት ሰዓት 9 ንጉሆ፡ ጉዕዞ ክርስቶስ ናብ ቀራንዮን ምውራድ መንፈስ ቅዱስን ዘዘኻኽር።"
    },
    content: {
      time: "9:00 AM",
      significance: {
        en: [
          "Beginning of Christ's journey to Calvary",
          "Annunciation to Virgin Mary by Gabriel",
          "Descent of the Holy Spirit on the 120 faithful"
        ],
        am: [
          "ክርስቶስ ወደ ቀራንዮ መጓዙ የተጀመረበት",
          "ገብርኤል ለድንግል ማርያም ያበሰረበት",
          "መንፈስ ቅዱስ በ120 ምእመናን ላይ የወረደበት"
        ],
        om: [
          "Jalqabbii imala Kiristoos gara Qaraaniyootti",
          "Gabri'eel Durbee Maariyaamiif beeksisuu",
          "Bu'iinsa Hafuura Qulqulluu amanttoota 120 irra"
        ],
        ti: [
          "መጀመርታ ጉዕዞ ክርስቶስ ናብ ቀራንዮ",
          "ምብሳር ገብርኤል ንድንግል ማርያም",
          "ምውራድ መንፈስ ቅዱስ ኣብ 120 ምእመናን"
        ]
      }
    },
    category: {
      en: "Daily Prayer",
      am: "የዕለት ጸሎት",
      om: "Kadhannaa Guyyaa",
      ti: "ዕለታዊ ጸሎት"
    },
    imageUrl: "/image.png"
  },
  {
    id: 3,
    title: {
      en: "Sixth Hour Prayer (Tselote Sidist)",
      am: "ጸሎተ ስድስት",
      om: "Kadhannaa Sa'aatii Jahaffaa",
      ti: "ጸሎት ሽዱሽተ"
    },
    originalTitle: "ጸሎተ ስድስት",
    slug: "sixth-hour-prayer",
    description: {
      en: "Midday prayer at 12 PM, commemorating Christ's crucifixion on the Cross.",
      am: "በቀትር 6 ሰዓት፣ ክርስቶስ በመስቀል የተሰቀለበትን የሚያስታውስ ጸሎት።",
      om: "Kadhannaa guyyaa walakkaa sa'a 6, fannifamuu  Gooftaa Keenya Iyyesuus Kiristoos yaadachiisu.",
      ti: "ጸሎት ሰዓት 6 ቀትሪ፡ ምስቃል ክርስቶስ ኣብ መስቀል ዘዘኻኽር።"
    },
    content: {
      time: "6:00 ",
      significance: {
        en: [
          "Hour of Christ's crucifixion",
          "Time when darkness covered the earth",
          "When the serpent tempted Adam and Eve"
        ],
        am: [
          "ክርስቶስ የተሰቀለበት ሰዓት",
          "ጨለማ ምድርን የሸፈነበት ጊዜ",
          "እባብ አዳምንና ሔዋንን ያታለለበት"
        ],
        om: [
          "Sa'atii fannifamuu Gooftaa keenyaa Iyyesuus Kiristoos",
          "Yeroo dukkanni lafaa uwwise",
          "Yeroo Seexannii Addaam fi Hewaan qore"
        ],
        ti: [
          "ሰዓት ምስቃል ክርስቶስ",
          "ግዜ ጸልማት ምድሪ ዝሸፈነ",
          "ተመን ንኣዳምን ሄዋንን ዝፈተነሉ"
        ]
      }
    },
    category: {
      en: "Daily Prayer",
      am: "የዕለት ጸሎት",
      om: "Kadhannaa Guyyaa",
      ti: "ዕለታዊ ጸሎት"
    },
    imageUrl: "/cross.jpg"
  },
  {
    id: 4,
    title: {
      en: "Ninth Hour Prayer (Tselote Tesa'at)",
      am: "ጸሎተ ተሰዓት",
      om: "Kadhannaa Sa'aatii Saglaffaa",
      ti: "ጸሎት ትሽዓተ"
    },
    originalTitle: "ጸሎተ ተሰዓት",
    slug: "ninth-hour-prayer",
    description: {
      en: "Afternoon prayer at 3 PM, commemorating Christ's death on the Cross and the miracles that occurred.",
      am: "በከሰዓት 9 ሰዓት፣ ክርስቶስ በመስቀል ላይ የሞተበትንና የተከሰቱትን ተአምራት የሚያስታውስ ጸሎት።",
      om: "Kadhannaa sa'a 9 waaree booda, du'a Kiristoos fannoo irratti fi dinqiiwwan raawwataman yaadachiisu.",
      ti: "ጸሎት ሰዓት 9 ድሕሪ ቀትሪ፡ ሞት ክርስቶስ ኣብ መስቀልን ተኣምራት ዝተፈጸሙን ዘዘኻኽር።"
    },
    content: {
      time: "3:00 PM",
      significance: {
        en: [
          "Hour when Christ gave up His spirit",
          "When miracles occurred at His death",
          "Time to remember His death and the gift of life"
        ],
        am: [
          "ክርስቶስ መንፈሱን የሰጠበት ሰዓት",
          "በሞቱ ጊዜ ተአምራት የተከሰተበት",
          "ሞቱንና የሕይወት ስጦታውን የምናስታውስበት"
        ],
        om: [
          "Sa'atii Gooftaan Keenya iyyesuus Kiristoos afuura isaa kenneef",
          "Yeroo du'a isaan dinqiiwwan raawwataman",
          "Yeroo du'a isaa fi kennaa jireenya yaadannu"
        ],
        ti: [
          "ሰዓት ክርስቶስ መንፈሱ ዝሃበሉ",
          "ኣብ ግዜ ሞቱ ተኣምራት ዝተፈጸመሉ",
          "ግዜ ምዝካር ሞቱን ውህበት ህይወትን"
        ]
      }
    },
    category: {
      en: "Daily Prayer",
      am: "የዕለት ጸሎት",
      om: "Kadhannaa Guyyaa",
      ti: "ዕለታዊ ጸሎት"
    },
    imageUrl: "/crusifixion.jpg"
  },
  {
    id: 5,
    title: {
      en: "Evening Prayer (Tselote Serk)",
      am: "ጸሎተ ሠርክ",
      om: "Kadhannaa Sa'aatii 11:00",
      ti: "ጸሎት ሰርክ"
    },
    originalTitle: "ጸሎተ ሠርክ",
    slug: "evening-prayer",
    description: {
      en: "Evening prayer at 5 PM, commemorating Christ's removal from the Cross and His descent into Sheol.",
      am: "በ 11:00 ፣ ክርስቶስ ከመስቀል መውረዱንና ወደ ሲኦል መውረዱን የሚያስታውስ ጸሎት።",
      om: "Kadhannaa sa'a 11:00 galgalaa, Ulfinni Fi Galanni Waamamuu Maqaa Isaatiif haa ta'u yeroo kannatti Gooftaan Keenya fannoo irraa yooseefi Niqoodimoosin Buufame .",
      ti: "ጸሎት ሰዓት 11:00 ማታ፡ ምውራድ ክርስቶስ ካብ መስቀልን ምውራዱ ናብ ሲኦልን ዘዘኻኽር።"
    },
    content: {
      time: "5:00 PM",
      significance: {
        en: [
          "Time when Christ's body was taken down",
          "When He descended to Sheol",
          "We remember His burial"
        ],
        am: [
          "ክርስቶስ ከመስቀል የወረደበት ሰዓት",
          "ወደ ሲኦል የወረደበት",
          "መቃብር ማደሩን የምናስታውስበት"
        ],
        om: [
          "Yeroo qaamni Kiristoos fannoo irraa buufame",
          "Yeroo gara Si'ool bu'e",
          "Awwaala isaa yaadanna"
        ],
        ti: [
          "ሰዓት ሬሳ ክርስቶስ ካብ መስቀል ዝወረደሉ",
          "ናብ ሲኦል ዝወረደሉ",
          "ምቕባሩ እንዝክረሉ"
        ]
      }
    },
    category: {
      en: "Daily Prayer",
      am: "የዕለት ጸሎት",
      om: "Kadhannaa Guyyaa",
      ti: "ዕለታዊ ጸሎት"
    },
    imageUrl: "/Joseph.jpg"
  },
  {
    id: 6,
    title: {
      en: "Night Prayer (Tselote Niwam)",
      am: "ጸሎተ ንዋም",
      om: "Kadhannaa Niwam",
      ti: "ጸሎት ንዋም"
    },
    originalTitle: "ጸሎተ ንዋም",
    slug: "night-prayer",
    description: {
      en: "Night prayer at 9 PM, commemorating Christ's prayer in Gethsemane and His arrest.",
      am: "በምሽት 9 ሰዓት፣ ክርስቶስ በጌቴሴማኒ የጸለየበትንና የተያዘበትን የሚያስታውስ ጸሎት።",
      om: "Kadhannaa sa'a 9 galgalaa, kadhannaa Kiristoos Getsemaanii keessatti fi qabamuu isaa yaadachiisu.",
      ti: "ጸሎት ሰዓት 9 ምሸት፡ ጸሎት ክርስቶስ ኣብ ጌትሰማኒን ምትሓዙን ዘዘኻኽር።"
    },
    content: {
      time: "9:00 PM",
      significance: {
        en: [
          "Time of Christ's prayer in Gethsemane",
          "When He taught the Apostles to pray",
          "When He was arrested"
        ],
        am: [
          "ክርስቶስ በጌቴሴማኒ የጸለየበት ሰዓት",
          "ሐዋርያትን ጸሎት ያስተማረበት",
          "የተያዘበት ጊዜ"
        ],
        om: [
          "Yeroo Kiristoos Getsemaanii keessatti kadhate",
          "Yeroo Ergamoota kadhachuu barsiise",
          "Yeroo qabame"
        ],
        ti: [
          "ግዜ ጸሎት ክርስቶስ ኣብ ጌትሰማኒ",
          "ንሃዋርያት ጸሎት ዝመሃረሉ",
          "ዝተታሕዘሉ ግዜ"
        ]
      }
    },
    category: {
      en: "Daily Prayer",
      am: "የዕለት ጸሎት",
      om: "Kadhannaa Guyyaa",
      ti: "ዕለታዊ ጸሎት"
    },
    imageUrl: "/Home.jpg"
  },
  {
    id: 7,
    title: {
      en: "Midnight Prayer (Tselote Menfeke Leliet)",
      am: "ጸሎተ መንፈቀ ሌሊት",
      om: "Kadhannaa Walakkaa Halkanii",
      ti: "ጸሎት መንፈቀ ለይቲ"
    },
    originalTitle: "ጸሎተ መንፈቀ ሌሊት",
    slug: "midnight-prayer",
    description: {
      en: "Midnight prayer at 12 AM, commemorating Christ's resurrection while the tomb was sealed.",
      am: "በሌሊት 12 ሰዓት፣ ክርስቶስ መቃብሩ ተዘግቶ እንዳለ የተነሳበትን የሚያስታውስ ጸሎት።",
      om: "Kadhannaa sa'a 12 halkan walakkaa, du'aa ka'uu Kiristoos yeroo awwaalli isaa cufaa ture yaadachiisu.",
      ti: "ጸሎት ሰዓት 12 ለይቲ፡ ትንሳኤ ክርስቶስ እንከሎ መቓብሩ ዕጹው ዘዘኻኽር።"
    },
    content: {
      time: "12:00 AM",
      significance: {
        en: [
          "Time of Christ's resurrection",
          "When He conquered death while the tomb was sealed",
          "Confirmation of our own resurrection"
        ],
        am: [
          "ክርስቶስ የተነሳበት ሰዓት",
          "መቃብሩ ተዘግቶ እያለ ሞትን የሸነፈበት",
          "የእኛን ትንሣኤ ያረጋገጠበት"
        ],
        om: [
          "Yeroo Kiristoos du'aa ka'e",
          "Yeroo awwaalli cufaa osoo jiruu du'a mo'e",
          "Du'aa ka'uu keenya mirkaneesse"
        ],
        ti: [
          "ሰዓት ትንሳኤ ክርስቶስ",
          "መቓብሩ ዕጹው እንከሎ ሞት ዝሰዓረሉ",
          "ትንሳኤና ዘረጋገጸሉ"
        ]
      }
    },
    category: {
      en: "Daily Prayer",
      am: "የዕለት ጸሎት",
      om: "Kadhannaa Guyyaa",
      ti: "ዕለታዊ ጸሎት"
    },
    imageUrl: "/ress.jpg"
  }
];
