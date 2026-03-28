import React from 'react';
import BrandCard from './BrandCard';
import type { FeaturedBrandItem } from './types';

interface BrandsGridProps {
  brands: FeaturedBrandItem[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, file: File) => void;
  deletingBrandId?: string;
}

const BrandsGrid: React.FC<BrandsGridProps> = ({
  brands,
  onDelete,
  onUpdate,
  deletingBrandId,
}) => {
  if (brands.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No brands added yet.</p>
        <p className="text-sm text-gray-400 mt-1">
          Click "Add Brand" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isDeleting={deletingBrandId === brand.id}
        />
      ))}
    </div>
  );
};

export default BrandsGrid;
