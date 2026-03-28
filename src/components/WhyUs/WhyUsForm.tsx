import React from 'react';
import WhyUsImageUpload from './WhyUsImageUpload';
import WhyUsStats from './WhyUsStats';
import { type WhyUsFormData } from './types';

interface WhyUsFormProps {
  formData: WhyUsFormData;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onImageChange: (
    imageKey: 'image1' | 'image2' | 'image3',
    file: File | null,
  ) => void;
  onRemoveImage: (imageKey: 'image1' | 'image2' | 'image3') => void;
}

const WhyUsForm: React.FC<WhyUsFormProps> = ({
  formData,
  onInputChange,
  onImageChange,
  onRemoveImage,
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter main title..."
          required
        />
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter description..."
        />
      </div>

      {/* Stats */}
      <WhyUsStats
        excellence={formData.excellence}
        boatsSoldPerYear={formData.boatsSoldPerYear}
        listingViewed={formData.listingViewed}
        onChange={(field, value) => {
          const event = {
            target: { name: field, value },
          } as React.ChangeEvent<HTMLInputElement>;
          onInputChange(event);
        }}
      />

      {/* Button Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Call-to-Action Button
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Button Text
            </label>
            <input
              type="text"
              name="buttonText"
              value={formData.buttonText}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., List Your Boat For Sale"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Button Link
            </label>
            <input
              type="text"
              name="buttonLink"
              value={formData.buttonLink}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., /search-listing"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <WhyUsImageUpload
        image1={formData.image1}
        image2={formData.image2}
        image3={formData.image3}
        onImageChange={onImageChange}
        onRemoveImage={onRemoveImage}
      />
    </div>
  );
};

export default WhyUsForm;
