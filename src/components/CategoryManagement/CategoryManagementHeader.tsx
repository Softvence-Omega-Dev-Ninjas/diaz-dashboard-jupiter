import { ArrowLeft, Eye } from 'lucide-react';

interface CategoryManagementHeaderProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onBack: () => void;
}

const CategoryManagementHeader = ({
  isPreviewMode,
  onTogglePreview,
  onBack,
}: CategoryManagementHeaderProps) => {
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
            Category Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage yacht categories and their display
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={onTogglePreview}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          {isPreviewMode ? 'Edit' : 'Preview'}
        </button>
      </div>
    </div>
  );
};

export default CategoryManagementHeader;
