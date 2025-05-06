import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PatternBorder } from "@/components/ui/pattern-border";
import { 
  getEthiopianMonthName, 
  getEthiopianMonthDays, 
  getEthiopianHolyDays,
  getEthiopianMonths,
  EthiopianDate,
  HolyDay
} from "@/lib/calendar-utils";
import { Helmet } from 'react-helmet';

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

const Calendar = () => {
  // Using current Ethiopian year (2016 EC)
  const [currentDate, setCurrentDate] = useState<EthiopianDate>({ year: 2016, month: 1 });
  
  const monthName = getEthiopianMonthName(currentDate.month);
  const daysInMonth = getEthiopianMonthDays(currentDate.month);
  const holyDays = getEthiopianHolyDays(currentDate.month);
  const months = getEthiopianMonths();
  
  // Gregorian date reference
  const gregMonth = currentDate.month <= 4 ? 8 + currentDate.month : currentDate.month - 4;
  const gregYear = currentDate.month <= 4 ? 2023 : 2024;
  
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
          <h1 className="text-4xl md:text-5xl font-heading text-burgundy text-center mb-2">Ethiopian Orthodox Calendar</h1>
          <p className="text-center text-gray-600 mb-8">Holy days and liturgical seasons</p>
          
          <DecorativeDivider />
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {/* Month selector sidebar */}
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-heading text-lg text-burgundy mb-3">Months</h3>
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
                    <h3 className="font-heading text-lg text-burgundy mb-3">About the Calendar</h3>
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
                
                {/* Holy Days for this month */}
                <div className="mt-8">
                  <h3 className="text-2xl font-heading text-burgundy mb-4">Holy Days in {monthName}</h3>
                  
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
                    <p className="text-gray-600 italic">No major holy days in this month.</p>
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
