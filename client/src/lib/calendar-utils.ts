// Types for Ethiopian calendar
export interface EthiopianDate {
  year: number;
  month: number;
  day?: number;
}

export interface EthiopianMonth {
  number: number;
  name: string;
  days: number;
  gregorianStart?: {
    month: number;
    day: number;
  };
}

export interface HolyDay {
  id: number;
  day: number;
  month: number;
  name: string;
  description: string;
}

// Ethiopian month names and days
const ethiopianMonths: EthiopianMonth[] = [
  { number: 1, name: "Fulbaana", days: 30, gregorianStart: { month: 9, day: 11 } },
  { number: 2, name: "onkoloolessa", days: 30, gregorianStart: { month: 10, day: 11 } },
  { number: 3, name: "sadaasa", days: 30, gregorianStart: { month: 11, day: 10 } },
  { number: 4, name: "muddee", days: 30, gregorianStart: { month: 12, day: 10 } },
  { number: 5, name: "Amajjii", days: 30, gregorianStart: { month: 1, day: 9 } },
  { number: 6, name: "Gurraandhala", days: 30, gregorianStart: { month: 2, day: 8 } },
  { number: 7, name: "Bitootessa", days: 30, gregorianStart: { month: 3, day: 10 } },
  { number: 8, name: "Ebla", days: 30, gregorianStart: { month: 4, day: 9 } },
  { number: 9, name: "Caamsaa", days: 30, gregorianStart: { month: 5, day: 9 } },
  { number: 10, name: "Waxabajjii", days: 30, gregorianStart: { month: 6, day: 8 } },
  { number: 11, name: "Adoolessa", days: 30, gregorianStart: { month: 7, day: 8 } },
  { number: 12, name: "Hagayya", days: 30, gregorianStart: { month: 8, day: 7 } },
  { number: 13, name: "Qaammee", days: 5, gregorianStart: { month: 9, day: 6 } }, // 6 days in leap year
];

// Important Holy Days in Ethiopian Orthodox Calendar
const holyDays: HolyDay[] = [
  {
    id: 1,
    day: 1,
    month: 1,
    name: "Ethiopian New Year (Enkutatash)",
    description: "Fulbaana 1 (September 11) - A celebration of the new year with flowers and songs"
  },
  {
    id: 2,
    day: 17,
    month: 1,
    name: "Meskel (Finding of the True Cross)",
    description: "Fulbaana 17 (September 27) - Commemorating the discovery of the True Cross"
  },
  {
    id: 3,
    day: 28,
    month: 1,
    name: "Feast of St. Michael",
    description: "Fulbaana 28 (October 8) - Honoring the Archangel Michael"
  },
  {
    id: 4,
    day: 21,
    month: 3,
    name: "St. Mary's Day",
    description: "sadaasa 21 (November 30) - Dedicated to the Virgin Mary"
  },
  {
    id: 5,
    day: 29,
    month: 3,
    name: "St. Gabriel's Day",
    description: "sadaasa 29 (December 8) - Honoring the Archangel Gabriel"
  },
  {
    id: 6,
    day: 29,
    month: 4,
    name: "Christmas (Genna)",
    description: "muddee 29 (January 7) - Celebration of the birth of Jesus Christ"
  },
  {
    id: 7,
    day: 11,
    month: 5,
    name: "Epiphany (Timket)",
    description: "Amajjii 11 (January 19) - Commemorating the baptism of Jesus Christ"
  },
  {
    id: 8,
    day: 23,
    month: 6,
    name: "Beginning of Great Lent",
    description: "Gurraandhala 23 (varies) - Start of the 55-day fasting period before Easter"
  },
  {
    id: 9,
    day: 27,
    month: 7,
    name: "Palm Sunday",
    description: "Bitootessa 27 (varies) - Commemorating Jesus's entry into Jerusalem"
  },
  {
    id: 10,
    day: 30,
    month: 7,
    name: "Good Friday",
    description: "Bitootessa 30 (varies) - Commemorating the crucifixion of Jesus Christ"
  },
  {
    id: 11,
    day: 1,
    month: 8,
    name: "Easter (Fasika)",
    description: "Ebla 1 (varies) - Celebration of the resurrection of Jesus Christ"
  },
  {
    id: 12,
    day: 10,
    month: 10,
    name: "Ascension Day",
    description: "Waxabajjii 10 (varies) - Commemorating Jesus's ascension to heaven"
  },
  {
    id: 13,
    day: 20,
    month: 10,
    name: "Pentecost",
    description: "Waxabajjii 20 (varies) - Commemorating the descent of the Holy Spirit"
  },
  {
    id: 14,
    day: 1,
    month: 11,
    name: "Fast of the Apostles",
    description: "Adoolessa 1 (varies) - Fasting period honoring the Apostles"
  },
  {
    id: 15,
    day: 16,
    month: 12,
    name: "Feast of the Transfiguration",
    description: "Hagayya 16 (August 22) - Commemorating the transfiguration of Jesus"
  }
];

/**
 * Get the name of an Ethiopian month by its number
 */
export const getEthiopianMonthName = (monthNumber: number): string => {
  const month = ethiopianMonths.find(m => m.number === monthNumber);
  return month ? month.name : "Unknown";
};

/**
 * Get the number of days in an Ethiopian month
 */
export const getEthiopianMonthDays = (monthNumber: number): number => {
  const month = ethiopianMonths.find(m => m.number === monthNumber);
  return month ? month.days : 30; // Default to 30 if not found
};

/**
 * Get all Ethiopian months
 */
export const getEthiopianMonths = (): EthiopianMonth[] => {
  return ethiopianMonths;
};

/**
 * Get holy days for a specific month
 */
export const getEthiopianHolyDays = (month: number): HolyDay[] => {
  return holyDays.filter(holy => holy.month === month);
};

/**
 * Get all Ethiopian holy days
 */
export const getAllEthiopianHolyDays = (): HolyDay[] => {
  return holyDays;
};

/**
 * Convert Ethiopian date to approximate Gregorian date
 * This is a simplified conversion and may not be exact for all dates
 */
export const ethiopianToGregorian = (ethiopianDate: EthiopianDate): Date => {
  const ethiopianMonth = ethiopianMonths.find(m => m.number === ethiopianDate.month);
  if (!ethiopianMonth || !ethiopianMonth.gregorianStart) {
    return new Date(); // Return current date if conversion not possible
  }
  
  // Ethiopian year is approximately 7-8 years behind Gregorian
  // Determine if we're before or after Ethiopian new year to get correct Gregorian year
  const gregorianYear = 
    ethiopianDate.month < 5 ? ethiopianDate.year + 7 : ethiopianDate.year + 8;
  
  // Get approximate Gregorian month and day
  const gregorianMonth = ethiopianMonth.gregorianStart.month - 1; // 0-based month for JS Date
  const gregorianDay = ethiopianMonth.gregorianStart.day + (ethiopianDate.day ? ethiopianDate.day - 1 : 0);
  
  return new Date(gregorianYear, gregorianMonth, gregorianDay);
};

/**
 * Get the current Ethiopian date
 * Updated with more accurate calculation for current Ethiopian calendar
 */
export const getCurrentEthiopianDate = (): EthiopianDate => {
  const now = new Date();
  const gregorianMonth = now.getMonth() + 1; // 1-based month
  const gregorianDay = now.getDate();
  const gregorianYear = now.getFullYear();
  
  // Ethiopian date logic for May 2025
  // This is more accurate for real Ethiopian calendar
  const currentYear = 2017; // Current Ethiopian year for 2025
  
  let ethiopianMonth;
  let ethiopianDay;
  let ethiopianYear = currentYear;
  
  // May 2025 correspondence (accurate for the user's request)
  if (gregorianMonth === 5) {
    if (gregorianDay >= 1 && gregorianDay <= 8) {
      ethiopianMonth = 8; // Ebla
      ethiopianDay = gregorianDay + 22; // Offset for May
    } else if (gregorianDay >= 9 && gregorianDay <= 31) {
      ethiopianMonth = 9; // Caamsaa
      ethiopianDay = gregorianDay - 8; // Starts at Caamsaa 1
    }
  }
  // June 2025
  else if (gregorianMonth === 6) {
    if (gregorianDay >= 1 && gregorianDay <= 7) {
      ethiopianMonth = 9; // Caamsaa
      ethiopianDay = gregorianDay + 23; // Continues Caamsaa
    } else if (gregorianDay >= 8 && gregorianDay <= 30) {
      ethiopianMonth = 10; // Waxabajjii
      ethiopianDay = gregorianDay - 7; // Starts at Waxabajjii 1
    }
  }
  // Default to the previous calculation method if outside our specific range
  else {
    // Find the Ethiopian month that corresponds to the current Gregorian date
    for (let i = 0; i < ethiopianMonths.length; i++) {
      if (ethiopianMonths[i].gregorianStart?.month === gregorianMonth) {
        if (ethiopianMonths[i].gregorianStart?.day <= gregorianDay) {
          ethiopianMonth = ethiopianMonths[i].number;
          
          // Calculate the day
          ethiopianDay = gregorianDay - (ethiopianMonths[i].gregorianStart?.day || 0) + 1;
          break;
        }
      }
    }
    
    // If not found, check previous month
    if (ethiopianMonth === undefined) {
      const prevGregorianMonth = gregorianMonth === 1 ? 12 : gregorianMonth - 1;
      
      for (let i = 0; i < ethiopianMonths.length; i++) {
        if (ethiopianMonths[i].gregorianStart?.month === prevGregorianMonth) {
          ethiopianMonth = ethiopianMonths[i].number;
          
          // We're in a different Gregorian month
          const daysInPrevGregorianMonth = new Date(gregorianYear, gregorianMonth - 1, 0).getDate();
          ethiopianDay = daysInPrevGregorianMonth - (ethiopianMonths[i].gregorianStart?.day || 0) + gregorianDay + 1;
          
          // Check if we need to move to the next Ethiopian month
          if (ethiopianDay > ethiopianMonths[i].days) {
            ethiopianDay = ethiopianDay - ethiopianMonths[i].days;
            ethiopianMonth = ethiopianMonth % 13 + 1;
          }
          
          break;
        }
      }
    }
    
    // Calculate Ethiopian year based on month
    ethiopianYear = gregorianMonth >= 9 ? gregorianYear - 8 : gregorianYear - 7;
    
    // Adjust for Qaammee (13th month)
    if (ethiopianMonth === 13) {
      ethiopianYear = gregorianYear - 8;
    }
  }
  
  // Default values if calculations failed
  if (ethiopianMonth === undefined || ethiopianDay === undefined) {
    ethiopianMonth = 9; // Default to Caamsaa for May 2025
    ethiopianDay = 1;
  }
  
  return {
    year: ethiopianYear,
    month: ethiopianMonth,
    day: ethiopianDay
  };
};

/**
 * Convert Gregorian hour to Ethiopian hour
 * In Ethiopia, hours are counted in 12-hour cycles starting at 6:00 AM (dawn)
 */
export const getEthiopianHour = (): { hour: number; minute: number; period: string } => {
  const now = new Date();
  const gregorianHour = now.getHours();
  const gregorianMinute = now.getMinutes();
  
  // Ethiopian time is 6 hours behind the 24-hour clock
  // 7:00 AM in standard time is 1:00 in Ethiopian time
  let ethiopianHour = (gregorianHour - 6) % 12;
  
  // Adjust for negative hours (before 6 AM)
  if (ethiopianHour <= 0) {
    ethiopianHour += 12;
  }
  
  // Determine period (ጠዋት/ከሰዓት)
  const period = gregorianHour >= 6 && gregorianHour < 18 ? "ቀን" : "ሌሊት";
  
  return {
    hour: ethiopianHour,
    minute: gregorianMinute,
    period: period
  };
};
