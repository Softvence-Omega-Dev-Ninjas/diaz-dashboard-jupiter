import React from 'react';
import { type WorkingHour } from './types';

interface WorkingHoursSectionProps {
  workingHours: WorkingHour[];
  onChange: (index: number, field: 'day' | 'hours', value: string) => void;
}

const WorkingHoursSection: React.FC<WorkingHoursSectionProps> = ({
  workingHours,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Working Hours <span className="text-red-500">*</span>
      </h3>
      <div className="space-y-3">
        {workingHours.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Day</label>
              <input
                type="text"
                value={item.day}
                onChange={(e) => onChange(index, 'day', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Monday"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Hours</label>
              <input
                type="text"
                value={item.hours}
                onChange={(e) => onChange(index, 'hours', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 9am to 5pm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingHoursSection;
