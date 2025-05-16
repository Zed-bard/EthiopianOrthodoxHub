export interface Holiday {
  name: string;
  date: Date;
  description: string;
}

// Function to calculate Easter date for a given year
function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month - 1, day + 7); // Adding 7 days for Ethiopian Orthodox Easter
}

// Get all holidays for a given year
export function getHolidays(year: number): Holiday[] {
  const easter = calculateEaster(year);
  
  const holidays: Holiday[] = [
    {
      name: 'ጾመ ነነዌ (Fast of Nineveh)',
      date: new Date(year, 1, 6), // February 6
      description: 'Three-day fast commemorating the repentance of Nineveh'
    },
    {
      name: 'ዓቢይ ጾም (Great Lent)',
      date: new Date(easter.getTime() - (55 * 24 * 60 * 60 * 1000)),
      description: '55-day fast preceding Easter'
    },
    {
      name: 'ሆሳዕና (Palm Sunday)',
      date: new Date(easter.getTime() - (7 * 24 * 60 * 60 * 1000)),
      description: 'Commemorates Jesus\'s triumphal entry into Jerusalem'
    },
    {
      name: 'ስቅለት (Good Friday)',
      date: new Date(easter.getTime() - (2 * 24 * 60 * 60 * 1000)),
      description: 'Commemorates the crucifixion of Jesus'
    },
    {
      name: 'ትንሳኤ (Easter)',
      date: easter,
      description: 'Celebrates the resurrection of Jesus Christ'
    },
    {
      name: 'ጾመ ሐዋርያት (Fast of the Apostles)',
      date: new Date(year, 5, 25), // June 25
      description: 'Fast commemorating the Apostles'
    },
    {
      name: 'ጾመ ድህነት (Fast of Salvation)',
      date: new Date(year, 7, 7), // August 7
      description: 'Two-week fast preceding the feast of the Assumption of Mary'
    },
    {
      name: 'ፍልሰታ ለማርያም (Feast of the Assumption of Mary)',
      date: new Date(year, 7, 22), // August 22
      description: 'Commemorates the Assumption of Mary into Heaven'
    },
    {
      name: 'መስቀል (The Finding of the True Cross)',
      date: new Date(year, 8, 27), // September 27
      description: 'Commemorates the finding of the True Cross'
    },
    {
      name: 'ገና (Ethiopian Christmas)',
      date: new Date(year, 0, 7), // January 7
      description: 'Celebrates the birth of Jesus Christ'
    },
    {
      name: 'ጥምቀት (Epiphany)',
      date: new Date(year, 0, 19), // January 19
      description: 'Commemorates the baptism of Jesus in the Jordan River'
    }
  ];

  return holidays;
}

// Check if today is a holiday
export function checkHoliday(): Holiday | null {
  const today = new Date();
  const holidays = getHolidays(today.getFullYear());
  
  return holidays.find(holiday => 
    holiday.date.getDate() === today.getDate() &&
    holiday.date.getMonth() === today.getMonth()
  ) || null;
}

// Get upcoming holidays
export function getUpcomingHolidays(limit: number = 3): Holiday[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const holidays = [...getHolidays(currentYear), ...getHolidays(currentYear + 1)];
  
  return holidays
    .filter(holiday => holiday.date > today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, limit);
} 