import React from 'react';
import { useNotifications } from '@/lib/NotificationContext';

export default function NotificationList() {
  const { notifications, markAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'update':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'prayer':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 21h-11a2 2 0 01-2-2V5c0-1.1.9-2 2-2h11a2 2 0 012 2v14a2 2 0 01-2 2zm-11-1h11a1 1 0 001-1V5a1 1 0 00-1-1h-11a1 1 0 00-1 1v14a1 1 0 001 1z M12 17v.01 M12 13.5v.01 M12 10v.01 M12 6.5v.01" />
          </svg>
        );
      case 'holiday':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No notifications
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
            !notification.isRead ? 'bg-burgundy-50' : ''
          }`}
          onClick={() => markAsRead(notification.id)}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1">
              <p className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatTime(new Date(notification.timestamp))}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
