import React from 'react';

interface SiteSelectorProps {
  selectedSite: 'FLORIDA' | 'JUPITER';
  onChange: (site: 'FLORIDA' | 'JUPITER') => void;
}

const SiteSelector: React.FC<SiteSelectorProps> = ({
  selectedSite,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Site <span className="text-red-500">*</span>
      </label>
      <select
        value={selectedSite}
        onChange={(e) => onChange(e.target.value as 'FLORIDA' | 'JUPITER')}
        className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="FLORIDA">Florida</option>
        <option value="JUPITER">Jupiter</option>
      </select>
      <p className="text-xs text-gray-500 mt-2">
        Select which site to manage brands for
      </p>
    </div>
  );
};

export default SiteSelector;
