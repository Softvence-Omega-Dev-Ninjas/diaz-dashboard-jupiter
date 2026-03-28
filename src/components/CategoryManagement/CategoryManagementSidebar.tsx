import { Info } from 'lucide-react';

const CategoryManagementSidebar = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
      <div className="flex items-start gap-2">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-blue-900 mb-2">
            Category Management Tips
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Add clear and descriptive category titles</li>
            <li>• Upload high-quality images for better visual appeal</li>
            <li>• Categories will be displayed on the main website</li>
            <li>• You can edit or delete categories anytime</li>
            <li>• Changes are saved immediately to the database</li>
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2 text-sm">
          Image Guidelines
        </h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Recommended size: 800x600px</li>
          <li>• Format: PNG, JPG, or WEBP</li>
          <li>• Max file size: 5MB</li>
          <li>• Use clear, high-contrast images</li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryManagementSidebar;
