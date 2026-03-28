import React from 'react';

interface WhyUsStatsProps {
  excellence: string;
  boatsSoldPerYear: string;
  listingViewed: string;
  onChange: (field: string, value: string) => void;
}

const WhyUsStats: React.FC<WhyUsStatsProps> = ({
  excellence,
  boatsSoldPerYear,
  listingViewed,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Statistics</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Excellence/Experience
          </label>
          <input
            type="text"
            name="excellence"
            value={excellence}
            onChange={(e) => onChange('excellence', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 25+ Years of Excellence"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Boats Sold Per Year
          </label>
          <input
            type="text"
            name="boatsSoldPerYear"
            value={boatsSoldPerYear}
            onChange={(e) => onChange('boatsSoldPerYear', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 1000+"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            Listing Viewed
          </label>
          <input
            type="text"
            name="listingViewed"
            value={listingViewed}
            onChange={(e) => onChange('listingViewed', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 10M+"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyUsStats;
