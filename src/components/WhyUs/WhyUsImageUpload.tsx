import { Upload, X } from 'lucide-react';
import React from 'react';
import { type ImageData } from './types';

interface WhyUsImageUploadProps {
  image1: ImageData | null;
  image2: ImageData | null;
  image3: ImageData | null;
  onImageChange: (
    imageKey: 'image1' | 'image2' | 'image3',
    file: File | null,
  ) => void;
  onRemoveImage: (imageKey: 'image1' | 'image2' | 'image3') => void;
}

const WhyUsImageUpload: React.FC<WhyUsImageUploadProps> = ({
  image1,
  image2,
  image3,
  onImageChange,
  onRemoveImage,
}) => {
  const images = [
    { key: 'image1' as const, data: image1, label: 'Image 1' },
    { key: 'image2' as const, data: image2, label: 'Image 2' },
    { key: 'image3' as const, data: image3, label: 'Image 3' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Images <span className="text-red-500">* (3 required)</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map(({ key, data, label }) => (
          <div key={key} className="space-y-2">
            <label className="block text-xs text-gray-600">
              {label} <span className="text-red-500">*</span>
            </label>
            {data ? (
              <div className="relative">
                <img
                  src={data.preview || data.url || ''}
                  alt={`Preview ${label}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(key)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-xs text-gray-500">Click to upload</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onImageChange(key, file);
                    }
                  }}
                />
              </label>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        All 3 images are required. Upload JPG, PNG or WebP files.
      </p>
    </div>
  );
};

export default WhyUsImageUpload;
