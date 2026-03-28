import React from 'react';
import type { FeaturedBrandItem } from './types';

interface BrandsPreviewProps {
  brands: FeaturedBrandItem[];
}

const BrandsPreview: React.FC<BrandsPreviewProps> = ({ brands }) => {
  if (brands.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No brands to preview.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Featured Brands</h1>
        <p className="text-gray-600">Trusted brands we work with</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
          >
            {brand.featuredbrandLogo?.url && (
              <img
                src={brand.featuredbrandLogo.url}
                alt={brand.featuredbrandLogo.originalFilename}
                className="w-full h-20 object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsPreview;
