import OverviewCards from '@/components/Overview/OverviewCards';
import PerformanceOverview from '@/components/Overview/PerformanceOverview';
import QuickActions from '@/components/Overview/QuickActions';
import RecentActivity from '@/components/Overview/RecentActivity';
import {
  useGetDashboardOverviewQuery,
  useGetPerformanceOverviewQuery,
  useGetRecentActivityQuery,
} from '@/redux/features/overview/dashboardOverview';

const Overview = () => {
  const { data: dashboardData } = useGetDashboardOverviewQuery({});
  const { data: recentActivityData } = useGetRecentActivityQuery({});
  const { data: performanceOverviewData } = useGetPerformanceOverviewQuery({});
  const cardsData = {
    totalYachts: dashboardData?.totalYachtsListed || 0,
    pendingApprovals: dashboardData?.totalPendingApprovals || 0,
    verifiedSellers: dashboardData?.totalVerifiedSellers || 0,
    featuredYachts: dashboardData?.featuredYachts || 0,
    totalYatchPercentageChange:
      dashboardData?.totalYachtsListedChangePercent || 0,
  };

  console.log('Dashboard Data:', dashboardData); // For debugging purposes
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
      <p className="text-sm text-[#4A5565] mt-2">
        Welcome back! Here's what's happening today
      </p>
      <OverviewCards cardsData={cardsData} />
      <div className="flex flex-col items-center md:flex-row md:items-stretch gap-5 flex-1 min-h-0">
        <RecentActivity recentActivityData={recentActivityData} />
        <QuickActions />
      </div>
      <PerformanceOverview performanceOverviewData={performanceOverviewData} />
    </div>
  );
};

export default Overview;
