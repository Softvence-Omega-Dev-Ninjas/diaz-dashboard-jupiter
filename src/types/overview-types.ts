export interface DashboardStats {
  totalYachtsListed: number;
  totalPendingApprovals: number;
  totalVerifiedSellers: number;
  featuredYachts: number;
  totalYachtsListedChangePercent: number;
}

export interface QuickAction {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  action: () => void;
}

export interface RecentActivityItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  user?: string;
}
