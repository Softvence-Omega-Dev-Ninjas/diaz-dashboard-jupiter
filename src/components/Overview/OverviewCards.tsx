/* eslint-disable @typescript-eslint/no-explicit-any */
import { LuCircleCheckBig, LuShip, LuStar, LuUserCheck } from 'react-icons/lu';

const OverviewCards = ({ cardsData }: any) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 py-6">
      <div className="flex items-center gap-3 justify-between bg-[#003235] text-white px-5 xl:px-3 2xl:px-6 py-4 rounded-lg">
        <div className="space-y-1">
          <p className="text-xs">Total Yachts Listed</p>
          <h1 className="text-xl">{cardsData.totalYachts}</h1>
          <p className="text-xs">
            +{cardsData.totalYatchPercentageChange}% from last month
          </p>
        </div>
        <LuShip className="h-8 w-8 text-white" />
      </div>
      <div className="flex items-center gap-3 justify-between bg-[#00555A] text-white px-5 xl:px-3 2xl:px-6 py-4 rounded-lg">
        <div className="space-y-1">
          <p className="text-xs">Pending Approvals</p>
          <h1 className="text-xl">{cardsData.pendingApprovals}</h1>
          <p className="text-xs">Needs attention</p>
        </div>
        <LuCircleCheckBig className="h-8 w-8 text-white" />
      </div>
      <div className="flex items-center gap-3 justify-between bg-[#007B82] text-white px-5 xl:px-3 2xl:px-6 py-4 rounded-lg">
        <div className="space-y-1">
          <p className="text-xs">Verified Sellers</p>
          <h1 className="text-xl">{cardsData.verifiedSellers}</h1>
          <p className="text-xs">+8 this week</p>
        </div>
        <LuUserCheck className="h-8 w-8 text-white" />
      </div>
      <div className="flex items-center gap-3 justify-between bg-[#00A3AC] text-white px-5 xl:px-3 2xl:px-6 py-4 rounded-lg">
        <div className="space-y-1">
          <p className="text-xs">Featured Yachts</p>
          <h1 className="text-xl">{cardsData.featuredYachts}</h1>
          <p className="text-xs">Active listings</p>
        </div>
        <LuStar className="h-8 w-8 text-white" />
      </div>
    </div>
  );
};

export default OverviewCards;
