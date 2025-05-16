import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  getEthiopianMonthName, 
  getEthiopianMonthDays, 
  getEthiopianHolyDays,
  getCurrentEthiopianDate,
  getEthiopianHour,
  EthiopianDate,
  HolyDay
} from "@/lib/calendar-utils";
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
  <div className="flex items-center justify-center mb-8 sm:mb-12">
    <div className="h-px bg-gold w-16 sm:w-24"></div>
    <div className="mx-3 sm:mx-4 text-gold">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl sm:w-6 sm:h-6">
        <path d="M12 2l2 4h3l-2.5 3 1 4-3.5-2-3.5 2 1-4L7 6h3z"/>
        <path d="M12 14v8"/>
      </svg>
    </div>
    <div className="h-px bg-gold w-16 sm:w-24"></div>
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
  const lang = language === 'am' ? 'am' : 'om';
  
  const holyDay = holyDays.find(h => h.day === day);
  const isHolyDay = Boolean(holyDay);
  const isToday = day === getCurrentEthiopianDate().day;
  
  const saintCommemoration = day ? getSaintCommemorationsByDay(day) : undefined;
  const hasSaintCommemoration = Boolean(saintCommemoration);
  
  if (!day) {
    return <div className="calendar-day p-1 sm:p-2 min-h-[60px] sm:min-h-[80px] bg-gray-50/30"></div>;
  }
  
  return (
    <TooltipProvider>
      <Popover>
        <PopoverTrigger asChild>
          <div 
            className={`
              calendar-day p-1 sm:p-2 flex flex-col min-h-[60px] sm:min-h-[80px] relative cursor-pointer
              rounded-lg m-0.5 transition-all duration-200 ease-in-out
              ${isHolyDay ? 'bg-burgundy/5 hover:bg-burgundy/10' : 'hover:bg-gray-100'}
              ${currentMonth ? '' : 'opacity-50'}
              ${isToday ? 'ring-2 ring-burgundy ring-opacity-50 shadow-lg' : ''}
              ${hasSaintCommemoration ? 'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/3 after:h-0.5 after:bg-gold' : ''}
            `}
          >
            <span 
              className={`
                text-base sm:text-lg font-medium mb-1 transition-colors
                ${currentMonth ? 'text-gray-800' : 'text-gray-400'}
                ${isToday ? 'text-burgundy font-bold' : ''}
                ${isHolyDay ? 'text-burgundy' : ''}
              `}
            >
              {day}
            </span>
            {isHolyDay && (
              <span className="text-[10px] sm:text-xs text-burgundy mt-auto font-medium bg-burgundy/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full truncate hover:bg-burgundy/20 transition-colors">
                {holyDay?.name}
              </span>
            )}
          </div>
        </PopoverTrigger>
        {hasSaintCommemoration && saintCommemoration && (
          <PopoverContent className="w-64 sm:w-72 p-2 sm:p-3 bg-white shadow-lg border-gold border-l-2 rounded-lg backdrop-blur-sm">
            <h4 className="font-heading text-burgundy text-base sm:text-lg border-b border-gold pb-1 mb-2">
              {t('calendarLabels', 'saintCommemorations')}
            </h4>
            <ul className="text-xs sm:text-sm space-y-1">
              {saintCommemoration.names[lang].map((name, idx) => (
                <li key={idx} className="list-disc list-inside font-medium text-gray-700 hover:text-burgundy transition-colors">
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

const HolyDayItem = ({ day, name, description }: { day: number; name: string; description: string }) => (
  <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border-l-4 border-burgundy">
    <div className="bg-burgundy text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
      <span className="font-semibold text-sm sm:text-base">{day}</span>
    </div>
    <div>
      <h4 className="font-heading text-base sm:text-lg">{name}</h4>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  </div>
);

const CalendarSection = () => {
  const { t } = useLanguage();
  
  // Get the current Ethiopian date
  const ethiopianToday = getCurrentEthiopianDate();
  const [currentDate, setCurrentDate] = useState<EthiopianDate>(ethiopianToday);
  const [ethiopianTime, setEthiopianTime] = useState('');
  
  // Update time every minute
  useEffect(() => {
    const formatEthiopianTime = () => {
      const time = getEthiopianHour();
      const formattedMinute = time.minute < 10 ? `0${time.minute}` : time.minute;
      return `${time.hour}:${formattedMinute} ${time.period}`;
    };

    setEthiopianTime(formatEthiopianTime());
    const timer = setInterval(() => {
      setEthiopianTime(formatEthiopianTime());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  const monthName = getEthiopianMonthName(currentDate.month);
  const daysInMonth = getEthiopianMonthDays(currentDate.month);
  const holyDays = getEthiopianHolyDays(currentDate.month);
  
  // Get upcoming holy days (for display in the bottom section)
  const upcomingHolyDays = holyDays.slice(0, 3);

  // Gregorian date reference for 2025
  const gregMonth = currentDate.month <= 4 ? 8 + currentDate.month : currentDate.month - 4;
  const gregYear = 2025;
  
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

  return (
    <section id="calendar" className="py-10 sm:py-16 container mx-auto px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-burgundy text-center mb-2 leading-tight">{t('calendarLabels', 'calendarTitle')}</h2>
      <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-[90%] mx-auto">{t('calendarLabels', 'holyDaysAndSeasons')}</p>
      
      <DecorativeDivider />
      
      {/* Current Ethiopian Date and Time Display */}
      <div className="max-w-lg mx-auto mb-8 sm:mb-10 bg-gradient-to-br from-burgundy/5 to-burgundy/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center shadow-lg border border-burgundy/10">
        <div className="flex items-center justify-center mb-3">
          <Clock className="text-burgundy w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-pulse" />
          <h3 className="font-heading text-lg sm:text-xl text-burgundy">{t('calendarLabels', 'currentTime')}</h3>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-12">
          <div className="text-center group transition-all duration-300 hover:scale-105">
            <span className="block text-xs sm:text-sm text-gray-600 mb-1">{t('calendarLabels', 'ethiopianDate')}</span>
            <span className="font-semibold text-burgundy text-sm sm:text-base bg-white/50 px-4 py-2 rounded-lg shadow-sm group-hover:shadow-md transition-all">
              {getEthiopianMonthName(ethiopianToday.month)} {ethiopianToday.day}, {ethiopianToday.year} E.C.
            </span>
          </div>
          <div className="text-center group transition-all duration-300 hover:scale-105">
            <span className="block text-xs sm:text-sm text-gray-600 mb-1">{t('calendarLabels', 'ethiopianTime')}</span>
            <span className="font-semibold text-burgundy text-sm sm:text-base bg-white/50 px-4 py-2 rounded-lg shadow-sm group-hover:shadow-md transition-all">
              {ethiopianTime}
            </span>
          </div>
        </div>
      </div>
      
      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <Button 
          variant="outline" 
          size="sm"
          onClick={previousMonth}
          className="text-sm sm:text-base py-2 sm:py-2.5 px-3 sm:px-4 hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-burgundy" />
          {t('calendarLabels', 'previous')}
        </Button>
        <h3 className="font-heading text-lg sm:text-xl text-burgundy group">
          <span className="inline-block group-hover:scale-105 transition-transform duration-200">
            {monthName} {currentDate.year} E.C.
            <span className="text-sm text-gray-500 block sm:inline sm:ml-2">
              ({gregMonth}/{gregYear})
            </span>
          </span>
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={nextMonth}
          className="text-sm sm:text-base py-2 sm:py-2.5 px-3 sm:px-4 hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md"
        >
          {t('calendarLabels', 'next')}
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-burgundy" />
        </Button>
      </div>
      
      {/* Calendar Grid */}
      <div className="rounded-xl overflow-hidden bg-white shadow-xl mb-8 sm:mb-10 transition-all duration-300 hover:shadow-2xl">
        {/* Calendar header */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-burgundy/10 to-burgundy/5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 sm:p-3 text-center border-b border-burgundy/10">
              <span className="text-xs sm:text-sm font-medium text-burgundy">{day}</span>
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0.5 p-2 bg-gray-50/30">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i + 1 <= daysInMonth ? i + 1 : null;
            return (
              <CalendarDay 
                key={i} 
                day={day} 
                currentMonth={true} 
                holyDays={holyDays}
              />
            );
          })}
        </div>
      </div>
      
      {/* Upcoming Holy Days */}
      <div className="space-y-4 sm:space-y-5">
        <h3 className="font-heading text-lg sm:text-xl text-burgundy mb-3 sm:mb-4 flex items-center">
          <span className="mr-2">{t('calendarLabels', 'upcomingHolyDays')}</span>
          <div className="h-px flex-grow bg-burgundy/20"></div>
        </h3>
        <div className="grid gap-4 sm:gap-5">
          {upcomingHolyDays.map((holyDay, index) => (
            <HolyDayItem 
              key={index}
              day={holyDay.day}
              name={holyDay.name}
              description={holyDay.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
