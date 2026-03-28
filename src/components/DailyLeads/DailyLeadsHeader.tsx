import React from 'react';

interface DailyLeadsHeaderProps {
  totalLeads: number;
}

export const DailyLeadsHeader: React.FC<DailyLeadsHeaderProps> = ({
  totalLeads,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daily Leads</h1>
        <p className="text-sm text-gray-600 mt-1">
          Total {totalLeads} {totalLeads === 1 ? 'lead' : 'leads'} generated
          today
        </p>
      </div>
    </div>
  );
};
