import { LuDollarSign, LuEye, LuTrendingUp, LuUsers } from 'react-icons/lu';

interface PerformanceOverviewData {
  totalVisitors: number;
  totalPageViews: number;
  totalListingValue: number;
}

interface PerformanceOverviewProps {
  performanceOverviewData?: PerformanceOverviewData;
}

const PerformanceOverview = ({
  performanceOverviewData,
}: PerformanceOverviewProps) => {
  const formatNumber = (num: number | undefined) => {
    if (!num && num !== 0) return '$0';
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toLocaleString()}`;
  };

  const formatCount = (num: number | undefined) => {
    if (!num && num !== 0) return '0';
    return num.toLocaleString();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-lg bg-white mt-5">
      <h1 className="text-lg font-semibold">Performace Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-5">
        <div className="flex flex-col text-center items-center justify-center gap-2 p-4 rounded-lg bg-[#EFF6FF]">
          <LuTrendingUp className="text-[#006EF0] text-3xl" />
          <p className="text-xl">
            {formatCount(performanceOverviewData?.totalVisitors)}
          </p>
          <p className="text-sm">Total Visitors (Month)</p>
        </div>
        <div className="flex flex-col text-center items-center justify-center gap-3 p-4 rounded-lg bg-[#EFF6FF]">
          <LuEye className="text-[#006EF0] text-3xl" />
          <p className="text-xl">
            {formatCount(performanceOverviewData?.totalPageViews)}
          </p>
          <p className="text-sm">Page Views (Month)</p>
        </div>
        <div className="flex flex-col text-center items-center justify-center gap-3 p-4 rounded-lg bg-[#EFF6FF]">
          <LuDollarSign className="text-[#006EF0] text-3xl" />
          <p className="text-xl">
            {formatNumber(performanceOverviewData?.totalListingValue)}
          </p>
          <p className="text-sm">Total Listing Value</p>
        </div>
        <div className="flex flex-col text-center items-center justify-center gap-3 p-4 rounded-lg bg-[#EFF6FF]">
          <LuUsers className="text-[#006EF0] text-3xl" />
          <p className="text-xl">5,234</p>
          <p className="text-sm">Active App Users</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;
