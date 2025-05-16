import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { checkForUpdates } from '@/lib/version';
import { checkHoliday, getUpcomingHolidays, type Holiday } from '@/lib/holidays';

interface Notification {
  id: string;
  type: 'update' | 'prayer' | 'holiday';
  message: string;
  isRead: boolean;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Ethiopian Orthodox Church prayer times
const PRAYER_TIMES = [
  { name: 'ንጋት (Night Prayer)', hour: 0, minute: 0 }, // 12:00 AM
  { name: 'ውዳሴ ማርያም (Prime)', hour: 6, minute: 0 }, // 6:00 AM
  { name: 'ሦስት (Terce)', hour: 9, minute: 0 }, // 9:00 AM
  { name: 'ስድስት (Sext)', hour: 12, minute: 0 }, // 12:00 PM
  { name: 'ተስዕት (None)', hour: 15, minute: 0 }, // 3:00 PM
  { name: 'ሰርክ (Vespers)', hour: 18, minute: 0 }, // 6:00 PM
  { name: 'ምሽት (Compline)', hour: 21, minute: 0 }, // 9:00 PM
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Check for prayer times and add notifications
  useEffect(() => {
    const checkPrayerTimes = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      PRAYER_TIMES.forEach(prayer => {
        if (currentHour === prayer.hour && currentMinute === 0) {
          const notification: Omit<Notification, 'id' | 'isRead' | 'timestamp'> = {
            type: 'prayer',
            message: `Time for ${prayer.name}`,
          };
          
          addNotification(notification);
          
          // Show toast notification
          toast({
            title: 'Prayer Time',
            description: `It's time for ${prayer.name}`,
            variant: 'default',
          });

          // Show system notification if supported
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Prayer Time', {
              body: `It's time for ${prayer.name}`,
              icon: '/icons/prayer-notification.png',
              badge: '/icons/badge.png',
              tag: 'prayer-time',
            });
          }
        }
      });
    };

    // Request notification permission
    const requestNotificationPermission = async () => {
      if ('Notification' in window) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            console.log('Notification permission granted');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }
    };

    requestNotificationPermission();

    const interval = setInterval(checkPrayerTimes, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [toast]);

  // Check for holidays
  useEffect(() => {
    const checkHolidays = () => {
      const holiday = checkHoliday();
      if (holiday) {
        const notification: Omit<Notification, 'id' | 'isRead' | 'timestamp'> = {
          type: 'holiday',
          message: `Today is ${holiday.name}: ${holiday.description}`,
        };
        
        addNotification(notification);
        
        // Show toast notification
        toast({
          title: 'Holiday Today',
          description: `Today is ${holiday.name}`,
          variant: 'default',
        });

        // Show system notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Ethiopian Orthodox Holiday', {
            body: `Today is ${holiday.name}: ${holiday.description}`,
            icon: '/icons/holiday-notification.png',
            badge: '/icons/badge.png',
            tag: 'holiday',
          });
        }
      }

      // Check upcoming holidays
      const upcomingHolidays = getUpcomingHolidays(3);
      upcomingHolidays.forEach((holiday: Holiday) => {
        const daysUntil = Math.ceil((holiday.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        if (daysUntil === 7) { // Notify a week before
          const notification: Omit<Notification, 'id' | 'isRead' | 'timestamp'> = {
            type: 'holiday',
            message: `${holiday.name} is coming up in 7 days`,
          };
          
          addNotification(notification);
          
          // Show toast notification
          toast({
            title: 'Upcoming Holiday',
            description: `${holiday.name} is coming up in 7 days`,
            variant: 'default',
          });
        }
      });
    };

    // Check holidays daily at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      checkHolidays();
      // After first check, set up daily interval
      const interval = setInterval(checkHolidays, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, [toast]);

  // Check for app updates
  useEffect(() => {
    const checkUpdates = async () => {
      const update = await checkForUpdates();
      if (update) {
        const notification: Omit<Notification, 'id' | 'isRead' | 'timestamp'> = {
          type: 'update',
          message: `New version ${update.version} available${update.required ? ' (Required)' : ''}: ${update.features.join(', ')}`,
        };
        
        addNotification(notification);
        
        // Show toast notification
        toast({
          title: 'App Update Available',
          description: `Version ${update.version} is available${update.required ? ' (Required)' : ''}`,
          variant: 'default',
        });

        // Show system notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('App Update Available', {
            body: `Version ${update.version} is available${update.required ? ' (Required)' : ''}\n${update.features.join(', ')}`,
            icon: '/icons/update-notification.png',
            badge: '/icons/badge.png',
            tag: 'update',
          });
        }
      }
    };

    // Check for updates every hour
    checkUpdates();
    const interval = setInterval(checkUpdates, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [toast]);

  const addNotification = (notification: Omit<Notification, 'id' | 'isRead' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      isRead: false,
      timestamp: new Date(),
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
