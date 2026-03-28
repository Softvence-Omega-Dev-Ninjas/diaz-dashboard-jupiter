// SocketProvider - Context for app-wide socket management
import { useNotifications } from '@/hooks/useNotifications';
import { useAppSelector } from '@/redux/typeHook';
import type { Notification } from '@/types/socket-types';
import { createContext, useContext, type ReactNode } from 'react';
import type { Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  notifications: Notification[];
  isConnected: boolean;
  error: string | null;
  markAsRead: (notificationId: string) => void;
  clearNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  // Get auth token from Redux store
  const token = useAppSelector((state) => state.auth.token);

  const {
    socket,
    notifications,
    isConnected,
    error,
    markAsRead,
    clearNotification,
    clearAllNotifications,
  } = useNotifications(token);

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        isConnected,
        error,
        markAsRead,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
