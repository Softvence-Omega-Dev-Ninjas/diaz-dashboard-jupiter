import { Save, Upload, X } from 'lucide-react';
import React from 'react';
import type { OurStorySectionProps } from './types';

export const OurStorySection: React.FC<OurStorySectionProps> = ({
  formData,
  onInputChange,
  onImageChange,
  onSave,
  isSaving = false,
}) => {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageKey: string,
  ) => {
    const file = e.target.files?.[0] || null;
    onImageChange(imageKey, file);
  };

  const removeImage = (imageKey: string) => {
    onImageChange(imageKey, null);
  };

  const getImagePreview = (imageKey: string): string | null => {
    const fileKey = imageKey as keyof typeof formData;
    const existingKey =
      `existing${imageKey.charAt(0).toUpperCase() + imageKey.slice(1)}` as keyof typeof formData;

    const file = formData[fileKey];
    const existingImage = formData[existingKey];

    if (file && file instanceof File) {
      return URL.createObjectURL(file);
    }
    if (typeof existingImage === 'string' && existingImage) {
      return existingImage;
    }
    return null;
  };

  const renderImageUpload = (imageNumber: number) => {
    const imageKey = `image${imageNumber}`;
    const preview = getImagePreview(imageKey);

    return (
      <div key={imageKey} className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image {imageNumber}
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt={`Preview ${imageNumber}`}
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(imageKey)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload</span>
              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG up to 10MB
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, imageKey)}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Our Story Section
        </h2>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Our Story'}
        </button>
      </div>

      {/* Title */}
      <div className="mb-6">
        <label
          htmlFor="ourStoryTitle"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title *
        </label>
        <input
          type="text"
          id="ourStoryTitle"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          placeholder="Our Story"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label
          htmlFor="ourStoryDescription"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="ourStoryDescription"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="This is our story..."
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Image Uploads */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Images (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((num) => renderImageUpload(num))}
        </div>
      </div>
    </div>
  );
};
