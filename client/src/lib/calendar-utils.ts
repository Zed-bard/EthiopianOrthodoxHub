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
  { number: 1, name: "Meskerem", days: 30, gregorianStart: { month: 9, day: 11 } },
  { number: 2, name: "Tikimt", days: 30, gregorianStart: { month: 10, day: 11 } },
  { number: 3, name: "Hidar", days: 30, gregorianStart: { month: 11, day: 10 } },
  { number: 4, name: "Tahsas", days: 30, gregorianStart: { month: 12, day: 10 } },
  { number: 5, name: "Tir", days: 30, gregorianStart: { month: 1, day: 9 } },
  { number: 6, name: "Yekatit", days: 30, gregorianStart: { month: 2, day: 8 } },
  { number: 7, name: "Megabit", days: 30, gregorianStart: { month: 3, day: 10 } },
  { number: 8, name: "Miyazya", days: 30, gregorianStart: { month: 4, day: 9 } },
  { number: 9, name: "Ginbot", days: 30, gregorianStart: { month: 5, day: 9 } },
  { number: 10, name: "Sene", days: 30, gregorianStart: { month: 6, day: 8 } },
  { number: 11, name: "Hamle", days: 30, gregorianStart: { month: 7, day: 8 } },
  { number: 12, name: "Nehase", days: 30, gregorianStart: { month: 8, day: 7 } },
  { number: 13, name: "Pagume", days: 5, gregorianStart: { month: 9, day: 6 } }, // 6 days in leap year
];

// Important Holy Days in Ethiopian Orthodox Calendar
const holyDays: HolyDay[] = [
  {
    id: 1,
    day: 1,
    month: 1,
    name: "Ethiopian New Year (Enkutatash)",
    description: "Meskerem 1 (September 11) - A celebration of the new year with flowers and songs"
  },
  {
    id: 2,
    day: 17,
    month: 1,
    name: "Meskel (Finding of the True Cross)",
    description: "Meskerem 17 (September 27) - Commemorating the discovery of the True Cross"
  },
  {
    id: 3,
    day: 28,
    month: 1,
    name: "Feast of St. Michael",
    description: "Meskerem 28 (October 8) - Honoring the Archangel Michael"
  },
  {
    id: 4,
    day: 21,
    month: 3,
    name: "St. Mary's Day",
    description: "Hidar 21 (November 30) - Dedicated to the Virgin Mary"
  },
  {
    id: 5,
    day: 29,
    month: 3,
    name: "St. Gabriel's Day",
    description: "Hidar 29 (December 8) - Honoring the Archangel Gabriel"
  },
  {
    id: 6,
    day: 29,
    month: 4,
    name: "Christmas (Genna)",
    description: "Tahsas 29 (January 7) - Celebration of the birth of Jesus Christ"
  },
  {
    id: 7,
    day: 11,
    month: 5,
    name: "Epiphany (Timket)",
    description: "Tir 11 (January 19) - Commemorating the baptism of Jesus Christ"
  },
  {
    id: 8,
    day: 23,
    month: 6,
    name: "Beginning of Great Lent",
    description: "Yekatit 23 (varies) - Start of the 55-day fasting period before Easter"
  },
  {
    id: 9,
    day: 27,
    month: 7,
    name: "Palm Sunday",
    description: "Megabit 27 (varies) - Commemorating Jesus's entry into Jerusalem"
  },
  {
    id: 10,
    day: 30,
    month: 7,
    name: "Good Friday",
    description: "Megabit 30 (varies) - Commemorating the crucifixion of Jesus Christ"
  },
  {
    id: 11,
    day: 1,
    month: 8,
    name: "Easter (Fasika)",
    description: "Miyazya 1 (varies) - Celebration of the resurrection of Jesus Christ"
  },
  {
    id: 12,
    day: 10,
    month: 10,
    name: "Ascension Day",
    description: "Sene 10 (varies) - Commemorating Jesus's ascension to heaven"
  },
  {
    id: 13,
    day: 20,
    month: 10,
    name: "Pentecost",
    description: "Sene 20 (varies) - Commemorating the descent of the Holy Spirit"
  },
  {
    id: 14,
    day: 1,
    month: 11,
    name: "Fast of the Apostles",
    description: "Hamle 1 (varies) - Fasting period honoring the Apostles"
  },
  {
    id: 15,
    day: 16,
    month: 12,
    name: "Feast of the Transfiguration",
    description: "Nehase 16 (August 22) - Commemorating the transfiguration of Jesus"
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
 * Get the current Ethiopian date (approximate)
 * This is a simplified conversion and may not be exact
 */
export const getCurrentEthiopianDate = (): EthiopianDate => {
  const now = new Date();
  const gregorianMonth = now.getMonth() + 1; // 1-based month
  const gregorianDay = now.getDate();
  const gregorianYear = now.getFullYear();
  
  // Find the Ethiopian month that corresponds to the current Gregorian date
  let ethiopianMonth: EthiopianMonth | undefined;
  let nextMonth: EthiopianMonth | undefined;
  
  for (let i = 0; i < ethiopianMonths.length; i++) {
    if (ethiopianMonths[i].gregorianStart?.month === gregorianMonth) {
      if (ethiopianMonths[i].gregorianStart.day <= gregorianDay) {
        ethiopianMonth = ethiopianMonths[i];
        nextMonth = ethiopianMonths[i + 1 === ethiopianMonths.length ? 0 : i + 1];
        break;
      }
    }
  }
  
  // If not found in the current month, check the previous month
  if (!ethiopianMonth) {
    const prevGregorianMonth = gregorianMonth === 1 ? 12 : gregorianMonth - 1;
    for (let i = 0; i < ethiopianMonths.length; i++) {
      if (ethiopianMonths[i].gregorianStart?.month === prevGregorianMonth) {
        ethiopianMonth = ethiopianMonths[i];
        nextMonth = ethiopianMonths[i + 1 === ethiopianMonths.length ? 0 : i + 1];
        break;
      }
    }
  }
  
  // Default to first month if still not found
  if (!ethiopianMonth) {
    ethiopianMonth = ethiopianMonths[0];
    nextMonth = ethiopianMonths[1];
  }
  
  // Calculate Ethiopian year based on month and gregorian date
  // Ethiopian New Year is around September 11
  let ethiopianYear = gregorianMonth >= 9 ? gregorianYear - 8 : gregorianYear - 7;
  
  // Adjust for Pagume (13th month)
  if (ethiopianMonth.number === 13) {
    ethiopianYear = gregorianYear - 8;
  }
  
  // Calculate the day within the Ethiopian month
  let ethiopianDay = 1;
  if (ethiopianMonth.gregorianStart) {
    if (ethiopianMonth.gregorianStart.month === gregorianMonth) {
      ethiopianDay = gregorianDay - ethiopianMonth.gregorianStart.day + 1;
    } else {
      // We're in the next Gregorian month
      const daysInPrevGregorianMonth = new Date(gregorianYear, gregorianMonth - 1, 0).getDate();
      ethiopianDay = daysInPrevGregorianMonth - ethiopianMonth.gregorianStart.day + gregorianDay + 1;
    }
  }
  
  // Ensure day is valid
  ethiopianDay = Math.max(1, Math.min(ethiopianDay, ethiopianMonth.days));
  
  return {
    year: ethiopianYear,
    month: ethiopianMonth.number,
    day: ethiopianDay
  };
};
