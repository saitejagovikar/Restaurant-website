import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200 animate-shimmer"></div>

      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded animate-shimmer"></div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-shimmer w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-shimmer w-3/4"></div>
        </div>

        {/* Location/cuisine skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-shimmer w-1/2"></div>

        {/* Rating and price skeleton */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 bg-gray-200 rounded animate-shimmer w-12"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded animate-shimmer w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
