import React from 'react';
import { type WhyUsFormData } from './types';

interface WhyUsPreviewProps {
  formData: WhyUsFormData;
}

const WhyUsPreview: React.FC<WhyUsPreviewProps> = ({ formData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {formData.title || 'Why Us Title'}
        </h1>
        {formData.description && (
          <p className="text-gray-600 mb-8 text-lg">{formData.description}</p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {formData.excellence && (
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-blue-600">
                {formData.excellence}
              </h3>
              <p className="text-gray-600">Excellence</p>
            </div>
          )}
          {formData.boatsSoldPerYear && (
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-green-600">
                {formData.boatsSoldPerYear}
              </h3>
              <p className="text-gray-600">Boats Sold Per Year</p>
            </div>
          )}
          {formData.listingViewed && (
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-purple-600">
                {formData.listingViewed}
              </h3>
              <p className="text-gray-600">Listing Viewed</p>
            </div>
          )}
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[formData.image1, formData.image2, formData.image3].map(
            (image, index) =>
              image &&
              (image.preview || image.url) && (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img
                    src={image.preview || image.url || ''}
                    alt={`Why Us ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ),
          )}
        </div>

        {/* Button */}
        {formData.buttonText && (
          <div className="text-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {formData.buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhyUsPreview;
