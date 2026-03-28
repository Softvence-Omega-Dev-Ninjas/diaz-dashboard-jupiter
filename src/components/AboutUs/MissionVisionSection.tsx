import { Save, Upload, X } from 'lucide-react';
import React from 'react';
import type { MissionVisionSectionProps } from './types';

export const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({
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
          Mission & Vision Section
        </h2>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Mission & Vision'}
        </button>
      </div>

      {/* Title */}
      <div className="mb-6">
        <label
          htmlFor="missionVisionTitle"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Main Title *
        </label>
        <input
          type="text"
          id="missionVisionTitle"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          placeholder="Mission & Vision"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Mission Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Mission Section
        </h3>

        {/* Mission Title */}
        <div className="mb-4">
          <label
            htmlFor="missionTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mission Title *
          </label>
          <input
            type="text"
            id="missionTitle"
            name="missionTitle"
            value={formData.missionTitle}
            onChange={onInputChange}
            placeholder="Our Mission"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Mission Description */}
        <div>
          <label
            htmlFor="missionDescription"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mission Description *
          </label>
          <textarea
            id="missionDescription"
            name="description"
            value={formData.description}
            onChange={onInputChange}
            placeholder="Our mission is to..."
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
        </div>
      </div>

      {/* Vision Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Vision Section
        </h3>

        {/* Vision Title */}
        <div className="mb-4">
          <label
            htmlFor="visionTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Vision Title *
          </label>
          <input
            type="text"
            id="visionTitle"
            name="visionTitle"
            value={formData.visionTitle}
            onChange={onInputChange}
            placeholder="Our Vision"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Vision Description */}
        <div>
          <label
            htmlFor="visionDescription"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Vision Description *
          </label>
          <textarea
            id="visionDescription"
            name="visionDescription"
            value={formData.visionDescription}
            onChange={onInputChange}
            placeholder="Our vision is to..."
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
        </div>
      </div>

      {/* Image Uploads */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Images (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((num) => renderImageUpload(num))}
        </div>
      </div>
    </div>
  );
};
