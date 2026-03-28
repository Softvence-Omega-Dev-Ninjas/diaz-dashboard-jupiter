import { Plus, Save, Trash2, Upload, X } from 'lucide-react';
import type { CategoryFormData } from './types';

interface CategoryManagementFormProps {
  categories: CategoryFormData[];
  onAddCategory: () => void;
  onUpdateCategory: (
    id: string,
    field: keyof CategoryFormData,
    value: string | File,
  ) => void;
  onRemoveCategory: (id: string) => void;
  onImageUpload: (id: string, file: File) => void;
  onRemoveImage: (id: string) => void;
  onSaveCategory: (id: string) => void;
  onCreateCategory: (id: string) => void;
  isLoading?: boolean;
}

const CategoryManagementForm = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onRemoveCategory,
  onImageUpload,
  onRemoveImage,
  onSaveCategory,
  onCreateCategory,
  isLoading = false,
}: CategoryManagementFormProps) => {
  const handleImageChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(id, file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">
          Categories <span className="text-red-500">*</span>
        </h3>
        <button
          onClick={onAddCategory}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="p-4 border border-gray-200 rounded-lg space-y-3 bg-white"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">
                Category {index + 1}
              </h4>
              <div className="flex items-center gap-2">
                {category.id?.startsWith('temp-') ? (
                  <button
                    onClick={() => {
                      console.log(
                        'Save button clicked for new category:',
                        category,
                      );
                      onCreateCategory(category.id!);
                    }}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Save new category"
                  >
                    <Save className="w-3 h-3" />
                    Save
                  </button>
                ) : category.id ? (
                  <button
                    onClick={() => {
                      console.log(
                        'Update button clicked for category:',
                        category,
                      );
                      onSaveCategory(category.id!);
                    }}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Update category"
                  >
                    <Save className="w-3 h-3" />
                    Update
                  </button>
                ) : null}
                <button
                  onClick={() => onRemoveCategory(category.id!)}
                  disabled={isLoading}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Title */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={category.title}
                onChange={(e) =>
                  onUpdateCategory(category.id!, 'title', e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter category title..."
                disabled={isLoading}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs text-gray-600 mb-2">
                Category Image
              </label>
              <div className="flex items-start gap-4">
                {category.imagePreview && (
                  <div className="relative">
                    <img
                      src={category.imagePreview}
                      alt={category.title}
                      className="w-32 h-32 object-cover rounded border border-gray-200"
                    />
                    <button
                      onClick={() => onRemoveImage(category.id!)}
                      disabled={isLoading}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors disabled:opacity-50"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">
                    {category.imagePreview ? 'Change Image' : 'Upload Image'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(category.id!, e)}
                    className="hidden"
                    disabled={isLoading}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No categories yet. Click "Add Category" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagementForm;
