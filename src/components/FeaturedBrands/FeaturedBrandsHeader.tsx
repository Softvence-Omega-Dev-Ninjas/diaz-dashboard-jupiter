import { ArrowLeft, Eye, Plus, Save } from 'lucide-react';
import React from 'react';

interface FeaturedBrandsHeaderProps {
  onBack: () => void;
  onTogglePreview: () => void;
  onSave: () => void;
  isPreviewMode: boolean;
  isSaving: boolean;
  onAdd: () => void;
}

const FeaturedBrandsHeader: React.FC<FeaturedBrandsHeaderProps> = ({
  onBack,
  onTogglePreview,
  onSave,
  isPreviewMode,
  isSaving,
  onAdd,
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Featured Brands
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage featured brand logos
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        {!isPreviewMode && (
          <button
            onClick={onAdd}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Brand
          </button>
        )}
        <button
          onClick={onTogglePreview}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          {isPreviewMode ? 'Edit' : 'Preview'}
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default FeaturedBrandsHeader;
