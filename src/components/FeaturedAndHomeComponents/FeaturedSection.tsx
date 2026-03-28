/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from '@/components/Product/ProductCard';
import React from 'react';

interface FeaturedSectionProps {
  featuredBoatsData?: any;
  isLoading?: boolean;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  featuredBoatsData,
  isLoading,
}) => {
  // Transform featured boats data to match ProductCard expectations
  const transformedBoats =
    featuredBoatsData?.data?.map((item: any) => ({
      id: item.boat.id,
      name: item.boat.name,
      image:
        item.boat.images?.find((img: any) => img.imageType === 'COVER')?.file
          ?.url ||
        item.boat.images?.[0]?.file?.url ||
        '',
      location: `${item.boat.city}, ${item.boat.state}`,
      brand_make: item.boat.make,
      model: item.boat.model,
      built_year: item.boat.buildYear,
      price: item.boat.price,
      views: undefined, // Views not available in featured boats data
    })) || [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
          Featured Boats
        </h3>
        <p className="text-sm text-gray-500">
          {transformedBoats.length} featured boat
          {transformedBoats.length !== 1 ? 's' : ''} displayed
        </p>
      </div>

      {/* Featured Boats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {isLoading ? (
          // Loading state
          <>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="w-full aspect-[4/2.6] bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </>
        ) : transformedBoats.length > 0 ? (
          transformedBoats.map((boat: any) => (
            <ProductCard key={boat.id} product={boat} isPremium={true} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            <p className="text-lg">No featured boats available</p>
            <p className="text-sm mt-2">
              Featured boats will appear here when added
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedSection;
