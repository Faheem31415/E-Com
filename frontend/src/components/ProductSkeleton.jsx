import React from "react";

const ProductSkeleton = ({ count = 1 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white p-2.5 animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full aspect-square bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          {/* Details Skeleton */}
          <div className="pt-3 pb-1 px-1 space-y-2">
            {/* Title Skeleton */}
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            {/* Sub/Category Skeleton */}
            <div className="h-3 bg-gray-150 bg-gray-100 rounded-md w-1/2"></div>
            {/* Price Skeleton */}
            <div className="pt-1 flex items-center justify-between">
              <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
              <div className="h-3 bg-gray-100 rounded-full w-8"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;
