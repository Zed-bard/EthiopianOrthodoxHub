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
  // Find if this day is a holy day
  const holyDay = holyDays.find(h => h.day === day);
  const isHolyDay = Boolean(holyDay);

  return (
    <div className={`calendar-day border-b border-r p-2 flex flex-col ${isHolyDay ? 'holy-day' : ''}`}>
      <span className={currentMonth ? '' : 'text-gray-400'}>{day}</span>
      {isHolyDay && (
        <span className="text-xs text-burgundy mt-auto">{holyDay?.name}</span>
      )}
    </div>
  );
};

const HolyDayItem = ({ day, name, description }: { day: number; name: string; description: string }) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-burgundy">
    <div className="bg-burgundy text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
      <span className="font-semibold">{day}</span>
    </div>
    <div>
      <h4 className="font-heading text-lg">{name}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const CalendarSection = () => {
  const { t } = useLanguage();
  
  // Get the current Ethiopian date
  const ethiopianToday = getCurrentEthiopianDate();
  const [currentDate, setCurrentDate] = useState<EthiopianDate>(ethiopianToday);
  const [ethiopianTime, setEthiopianTime] = useState(getEthiopianHour());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setEthiopianTime(getEthiopianHour());
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
        return { year: prev.year - 1, month: 13 }; // Go to Pagume of previous year
      } else {
        return { ...prev, month: prev.month - 1 };
      }
    });
  };
  
  const nextMonth = () => {
    setCurrentDate(prev => {
      if (prev.month === 13) {
        return { year: prev.year + 1, month: 1 }; // Go to Meskerem of next year
      } else {
        return { ...prev, month: prev.month + 1 };
      }
    });
  };

  return (
    <section id="calendar" className="py-16 container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-heading text-burgundy text-center mb-2">Ethiopian Orthodox Calendar</h2>
      <p className="text-center text-gray-600 mb-8">Holy days and liturgical seasons</p>
      
      <DecorativeDivider />
      
      {/* Current Ethiopian Date and Time Display */}
      <div className="max-w-lg mx-auto mb-10 bg-burgundy bg-opacity-10 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Clock className="text-burgundy mr-2" />
          <h3 className="font-heading text-xl text-burgundy">{t('calendarLabels', 'currentTime')}</h3>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-10">
          <div className="text-center">
            <span className="block text-sm text-gray-600">Ethiopian Date:</span>
            <span className="font-semibold text-burgundy">
              {getEthiopianMonthName(ethiopianToday.month)} {ethiopianToday.day}, {ethiopianToday.year} E.C.
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm text-gray-600">Ethiopian Time:</span>
            <span className="font-semibold text-burgundy">
              {ethiopianTime.hour}:{ethiopianTime.minute < 10 ? '0' + ethiopianTime.minute : ethiopianTime.minute} {ethiopianTime.period}
            </span>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
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
            <div className="py-2 font-semibold">Sun</div>
            <div className="py-2 font-semibold">Mon</div>
            <div className="py-2 font-semibold">Tue</div>
            <div className="py-2 font-semibold">Wed</div>
            <div className="py-2 font-semibold">Thu</div>
            <div className="py-2 font-semibold">Fri</div>
            <div className="py-2 font-semibold">Sat</div>
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
        
        {/* Upcoming Holidays */}
        <div className="mt-12">
          <h3 className="text-2xl font-heading text-burgundy mb-6">Upcoming Holy Days</h3>
          
          <div className="space-y-4">
            {upcomingHolyDays.map((holyDay) => (
              <HolyDayItem 
                key={holyDay.id}
                day={holyDay.day}
                name={holyDay.name}
                description={holyDay.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
