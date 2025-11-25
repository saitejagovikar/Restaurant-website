import React from 'react';

const SkeletonFilterBar: React.FC = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {/* Delivery toggle skeleton */}
            <div className="w-full sm:w-auto">
                <div className="h-12 w-64 bg-gray-200 rounded-lg animate-shimmer"></div>
            </div>

            {/* Filter controls skeleton */}
            <div className="w-full sm:w-auto flex gap-3">
                <div className="h-12 w-40 bg-gray-200 rounded-lg animate-shimmer"></div>
                <div className="h-12 w-40 bg-gray-200 rounded-lg animate-shimmer"></div>
                <div className="h-12 w-32 bg-gray-200 rounded-lg animate-shimmer"></div>
            </div>
        </div>
    );
};

export default SkeletonFilterBar;
