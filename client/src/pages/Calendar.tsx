import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PatternBorder } from "@/components/ui/pattern-border";
import { 
  getEthiopianMonthName, 
  getEthiopianMonthDays, 
  getEthiopianHolyDays,
  getEthiopianMonths,
  getCurrentEthiopianDate,
  getEthiopianHour,
  EthiopianDate,
  HolyDay
} from "@/lib/calendar-utils";
import { Helmet } from 'react-helmet';
import { useLanguage } from "@/lib/LanguageContext";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { getSaintCommemorationsByDay } from "@/lib/saint-commemorations";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";

const DecorativeDivider = () => (
  <div className="flex items-center justify-center mb-12">
    <div className="h-px bg-gold w-24"></div>
    <div className="mx-4 text-gold">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl">
        <path d="M12 2l2 4h3l-2.5 3 1 4-3.5-2-3.5 2 1-4L7 6h3z"/>
        <path d="M12 14v8"/>
      </svg>
    </div>
    <div className="h-px bg-gold w-24"></div>
  </div>
);

const CalendarDay = ({ 
  day, 
  currentMonth, 
  holyDays 
}: { 
  day: number | null; 
  currentMonth: boolean; 
  holyDays: HolyDay[];
}) => {
  const { language, t } = useLanguage();
  const lang = language === 'am' ? 'am' : 'om'; // Default to Oromo for other languages
  
  // Find if this day is a holy day
  const holyDay = holyDays.find(h => h.day === day);
  const isHolyDay = Boolean(holyDay);
  const isToday = day === getCurrentEthiopianDate().day;
  
  // Find saint commemorations for this day
  const saintCommemoration = day ? getSaintCommemorationsByDay(day) : undefined;
  const hasSaintCommemoration = Boolean(saintCommemoration);
  
  if (!day) {
    return <div className="calendar-day border-b border-r p-2 min-h-[80px]"></div>;
  }
  
  return (
    <TooltipProvider>
      <Popover>
        <PopoverTrigger asChild>
          <div 
            className={`
              calendar-day border-b border-r p-2 flex flex-col min-h-[80px] relative cursor-pointer
              ${isHolyDay ? 'bg-burgundy bg-opacity-5' : ''}
              ${currentMonth ? 'hover:bg-gray-50 transition-colors duration-200' : 'bg-gray-50'}
              ${isToday ? 'ring-2 ring-burgundy ring-opacity-50' : ''}
              ${hasSaintCommemoration ? 'border-b-gold border-b-2' : ''}
            `}
          >
            <span 
              className={`
                text-lg font-medium mb-1
                ${currentMonth ? 'text-gray-800' : 'text-gray-400'}
                ${isToday ? 'text-burgundy font-bold' : ''}
                ${isHolyDay ? 'text-burgundy' : ''}
              `}
            >
              {day}
            </span>
            {isHolyDay && (
              <span className="text-xs text-burgundy mt-auto font-medium bg-burgundy bg-opacity-10 px-2 py-1 rounded-full">
                {holyDay?.name}
              </span>
            )}
            {hasSaintCommemoration && (
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-gold rounded-full"></div>
            )}
          </div>
        </PopoverTrigger>
        {hasSaintCommemoration && saintCommemoration && (
          <PopoverContent className="w-72 p-3 bg-white shadow-md border-gold border-l-2">
            <h4 className="font-heading text-burgundy text-lg border-b border-gold pb-1 mb-2">
              {t('calendarLabels', 'saintCommemorations')}
            </h4>
            <ul className="text-sm space-y-1">
              {saintCommemoration.names[lang].map((name, idx) => (
                <li key={idx} className="list-disc list-inside font-medium">
                  {name}
                </li>
              ))}
            </ul>
          </PopoverContent>
        )}
      </Popover>
    </TooltipProvider>
  );
};

const Calendar = () => {
  const { t, language } = useLanguage();
  
  // Get the current Ethiopian date
  const ethiopianToday = getCurrentEthiopianDate();
  const [currentDate, setCurrentDate] = useState<EthiopianDate>(ethiopianToday);
  
  // Current Ethiopian time
  const [ethiopianTime, setEthiopianTime] = useState(getEthiopianHour());
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setEthiopianTime(getEthiopianHour());
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  const monthName = getEthiopianMonthName(currentDate.month);
  const daysInMonth = getEthiopianMonthDays(currentDate.month);
  const holyDays = getEthiopianHolyDays(currentDate.month);
  const months = getEthiopianMonths();
  
  // Gregorian date reference - using real date calculation for May 2025
  const gregMonth = currentDate.month <= 4 ? 8 + currentDate.month : currentDate.month - 4;
  const gregYear = 2025; // Using 2025 as the reference year
  
  const previousMonth = () => {
    setCurrentDate(prev => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: 13 }; // Go to Qaammee of previous year
      } else {
        return { ...prev, month: prev.month - 1 };
      }
    });
  };
  
  const nextMonth = () => {
    setCurrentDate(prev => {
      if (prev.month === 13) {
        return { year: prev.year + 1, month: 1 }; // Go to Fulbaana of next year
      } else {
        return { ...prev, month: prev.month + 1 };
      }
    });
  };

  const selectMonth = (month: number) => {
    setCurrentDate(prev => ({ ...prev, month }));
  };

  return (
    <>
      <Helmet>
        <title>Ethiopian Orthodox Calendar | Holy Days and Festivals</title>
        <meta name="description" content="View the Ethiopian Orthodox calendar with holy days, festivals, fasting periods, and important religious dates following the ancient traditions." />
      </Helmet>
      <div className="py-16 min-h-screen">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-heading text-burgundy text-center mb-2">{t('calendarLabels', 'calendarTitle')}</h1>
          <p className="text-center text-gray-600 mb-8">{t('calendarLabels', 'holyDaysAndSeasons')}</p>
          
          <DecorativeDivider />
          
          {/* Current Ethiopian Date and Time Display */}
          <div className="max-w-lg mx-auto mb-10 bg-burgundy bg-opacity-10 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="text-burgundy mr-2" />
              <h3 className="font-heading text-xl text-burgundy">{t('calendarLabels', 'currentTime')}</h3>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-10">
              <div className="text-center">
                <span className="block text-sm text-gray-600">{t('calendarLabels', 'ethiopianDate')}</span>
                <span className="font-semibold text-xl text-burgundy">
                  {getEthiopianMonthName(ethiopianToday.month)} {ethiopianToday.day}, {ethiopianToday.year} E.C.
                </span>
              </div>
              <div className="text-center">
                <span className="block text-sm text-gray-600">{t('calendarLabels', 'ethiopianTime')}</span>
                <span className="font-semibold text-xl text-burgundy">
                  {ethiopianTime.hour}:{ethiopianTime.minute < 10 ? '0' + ethiopianTime.minute : ethiopianTime.minute} {ethiopianTime.period}
                </span>
              </div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {/* Month selector sidebar */}
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-heading text-lg text-burgundy mb-3">{t('calendarLabels', 'monthsLabel')}</h3>
                    <PatternBorder className="mb-4" />
                    <ul className="space-y-1">
                      {months.map((month) => (
                        <li key={month.number}>
                          <button 
                            className={`w-full text-left px-3 py-2 rounded ${currentDate.month === month.number ? 'bg-burgundy text-white' : 'hover:bg-gray-100'}`}
                            onClick={() => selectMonth(month.number)}
                          >
                            {month.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardContent className="p-4">
                    <h3 className="font-heading text-lg text-burgundy mb-3">{t('calendarLabels', 'aboutCalendar')}</h3>
                    <PatternBorder className="mb-4" />
                    <p className="text-sm text-gray-700">
                      The Ethiopian Orthodox calendar is based on the ancient Coptic calendar and differs from the Gregorian calendar. It has 13 months, with 12 months of 30 days each and a shorter month at the end of the year with 5 or 6 days.
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      The Ethiopian year begins on September 11 (or September 12 in leap years), and the current Ethiopian year is {currentDate.year} E.C. (Ethiopian Calendar).
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Calendar */}
              <div className="md:col-span-3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Calendar Header */}
                  <div className="bg-burgundy text-white p-4 flex justify-between items-center">
                    <button 
                      className="text-white hover:text-gold transition"
                      onClick={previousMonth}
                      aria-label="Previous month"
                    >
                      <ChevronLeft />
                    </button>
                    <h3 className="font-heading text-xl">
                      {monthName} {currentDate.year} E.C. ({new Date(gregYear, gregMonth - 1, 1).toLocaleString('default', { month: 'long' })} {gregYear})
                    </h3>
                    <button 
                      className="text-white hover:text-gold transition"
                      onClick={nextMonth}
                      aria-label="Next month"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                  
                  {/* Days of Week */}
                  <div className="grid grid-cols-7 text-center bg-gray-100">
                    <div className="py-2 font-semibold">{t('calendarLabels', 'sun')}</div>
                    <div className="py-2 font-semibold">{t('calendarLabels', 'mon')}</div>
                    <div className="py-2 font-semibold">{t('calendarLabels', 'tue')}</div>
                    <div className="py-2 font-semibold">{t('calendarLabels', 'wed')}</div>
                    <div className="py-2 font-semibold">{t('calendarLabels', 'thu')}</div>
                    <div className="py-2 font-semibold">{t('calendarLabels', 'fri')}</div>
                    <div className="py-2 font-semibold">{t('calendarLabels', 'sat')}</div>
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 border-t border-l">
                    {/* First week with potential previous month days */}
                    {Array.from({ length: 7 }).map((_, index) => {
                      // This is a simplified example, adjust based on actual calculation of day of week
                      if (index < 5) { // Assume month starts on 6th day (Friday)
                        return <CalendarDay key={`prev-${index}`} day={26 + index} currentMonth={false} holyDays={[]} />;
                      } else {
                        return <CalendarDay key={`day-${index - 4}`} day={index - 4} currentMonth={true} holyDays={holyDays} />;
                      }
                    })}
                    
                    {/* Remaining days */}
                    {Array.from({ length: 35 }).map((_, index) => {
                      const day = index + 3; // Start from 3 (continuing from first week)
                      if (day <= daysInMonth) {
                        return <CalendarDay key={`day-${day}`} day={day} currentMonth={true} holyDays={holyDays} />;
                      } else {
                        // Next month days
                        return <CalendarDay key={`next-${day - daysInMonth}`} day={day - daysInMonth} currentMonth={false} holyDays={[]} />;
                      }
                    })}
                  </div>
                </div>
                
                {/* Calendar Legend */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm flex flex-wrap items-center gap-4 justify-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-burgundy bg-opacity-10 rounded-full mr-2"></div>
                    <span className="text-gray-600">{t('calendarLabels', 'holyDays')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 border-b-2 border-gold mr-2"></div>
                    <span className="text-gray-600">{t('calendarLabels', 'saintCommemorations')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 ring-2 ring-burgundy ring-opacity-50 rounded mr-2"></div>
                    <span className="text-gray-600">{t('calendarLabels', 'today')}</span>
                  </div>
                </div>
                
                {/* Holy Days for this month */}
                <div className="mt-8">
                  <h3 className="text-2xl font-heading text-burgundy mb-4">{t('calendarLabels', 'holyDaysIn')} {monthName}</h3>
                  
                  {holyDays.length > 0 ? (
                    <div className="space-y-4">
                      {holyDays.map((holyDay) => (
                        <div key={holyDay.id} className="flex items-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-burgundy">
                          <div className="bg-burgundy text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                            <span className="font-semibold">{holyDay.day}</span>
                          </div>
                          <div>
                            <h4 className="font-heading text-lg">{holyDay.name}</h4>
                            <p className="text-gray-600">{holyDay.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 italic">{t('calendarLabels', 'noHolyDays')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
