import type { CategoryFormData } from './types';

interface CategoryManagementPreviewProps {
  categories: CategoryFormData[];
}

const CategoryManagementPreview = ({
  categories,
}: CategoryManagementPreviewProps) => {
  const filledCategories = categories.filter(
    (category) => category.title.trim() && category.imagePreview,
  );

  return (
    <div className="prose max-w-none">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Browse by Category
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Explore our yacht categories
      </p>

      {filledCategories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filledCategories.map((category) => (
            <div
              key={category.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              {category.imagePreview && (
                <img
                  src={category.imagePreview}
                  alt={category.title}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No categories to preview yet.</p>
          <p className="text-sm mt-2">
            Add categories with images to see the preview.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryManagementPreview;
