// Notification Bell Component
'use client';

import {
  useGetAllNotificationsQuery,
  useMarkAllReadMutation,
  useMarkAsReadMutation,
} from '@/redux/features/notificaitonApi/notificationApi';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

// Type definitions based on API response
interface NotificationData {
  id: string;
  userId: string;
  notificationId: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    meta: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
  };
}

interface NotificationsResponse {
  success: boolean;
  message: string;
  data: NotificationData[];
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch notifications with polling every 30 seconds
  const { data: notificationsResponse, isLoading } =
    useGetAllNotificationsQuery(
      { page: 1, limit: 50 },
      {
        pollingInterval: 30000, // Poll every 30 seconds
        refetchOnMountOrArgChange: true,
      },
    );

  const [markAsRead] = useMarkAsReadMutation();
  const [markAllRead] = useMarkAllReadMutation();

  const notifications =
    (notificationsResponse as NotificationsResponse)?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Display only first 5 notifications unless "show all" is clicked
  const displayedNotifications = showAll
    ? notifications
    : notifications.slice(0, 5);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowAll(false); // Reset show all when closing
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'boat:approved':
      case 'queue:notification':
        return '✅';
      case 'boat:rejected':
        return '❌';
      case 'boat:new':
        return '🚤';
      default:
        return '🔔';
    }
  };

  const handleMarkAsRead = async (id: string, title: string) => {
    try {
      await markAsRead(id).unwrap();
      toast.success(`Notification marked as read ${title}`);
    } catch (error) {
      toast.error('Failed to mark notification as read');
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllRead({}).unwrap();
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all notifications as read');
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleNotificationClick = (notification: NotificationData) => {
    if (!notification.read) {
      handleMarkAsRead(
        notification.notificationId,
        notification.notification.title,
      );
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell className="w-6 h-6 cursor-pointer" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[32rem] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {notifications.length > 0 && unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-sm">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <>
                {displayedNotifications.map((item) => (
                  <div
                    key={item.notificationId}
                    onClick={() => handleNotificationClick(item)}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !item.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="shrink-0 text-2xl">
                        {getNotificationIcon(item.notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {item.notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {item.notification.message}
                        </p>
                        {item.notification.createdAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDistanceToNow(
                              new Date(item.notification.createdAt),
                              {
                                addSuffix: true,
                              },
                            )}
                          </p>
                        )}
                      </div>

                      {/* Read indicator */}
                      {!item.read && (
                        <div className="flex items-center gap-1">
                          <Check className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Show More Button */}
                {notifications.length > 3 && !showAll && (
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => setShowAll(true)}
                      className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Show {notifications.length - 3} more notifications
                    </button>
                  </div>
                )}

                {/* Show Less Button */}
                {showAll && notifications.length > 3 && (
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => setShowAll(false)}
                      className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Show less
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
