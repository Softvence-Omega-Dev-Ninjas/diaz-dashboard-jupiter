// Visitor Counter Component - Shows real-time visitor stats
'use client';

import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { Clock, Eye, Users } from 'lucide-react';

export function VisitorCounter() {
  const { stats, isConnected } = useVisitorTracking();

  return (
    <div className="flex items-center gap-4 text-sm">
      {/* Connection Status Indicator */}
      <div className="flex items-center gap-1">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
          }`}
        />
        <span className="text-gray-600 text-xs">
          {isConnected ? 'Live' : 'Offline'}
        </span>
      </div>

      {/* Active Visitors */}
      <div className="flex items-center gap-1.5 text-gray-700">
        <Users className="w-4 h-4 text-green-600" />
        <span className="font-medium">{stats.active}</span>
        <span className="text-gray-500">online</span>
      </div>

      {/* Today's Visitors */}
      <div className="hidden sm:flex items-center gap-1.5 text-gray-700">
        <Eye className="w-4 h-4 text-blue-600" />
        <span className="font-medium">{stats.todayVisitors}</span>
        <span className="text-gray-500">today</span>
      </div>

      {/* Total Visitors */}
      <div className="hidden md:flex items-center gap-1.5 text-gray-700">
        <Clock className="w-4 h-4 text-purple-600" />
        <span className="font-medium">{stats.totalVisitors}</span>
        <span className="text-gray-500">total</span>
      </div>
    </div>
  );
}
