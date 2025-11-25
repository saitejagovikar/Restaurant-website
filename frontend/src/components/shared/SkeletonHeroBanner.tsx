import React from 'react';

const SkeletonHeroBanner: React.FC = () => {
    return (
        <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    {/* Title skeleton */}
                    <div className="h-12 bg-white/20 rounded-lg animate-shimmer mx-auto w-3/4"></div>

                    {/* Subtitle skeleton */}
                    <div className="h-6 bg-white/20 rounded-lg animate-shimmer mx-auto w-1/2"></div>

                    {/* Search bar skeleton */}
                    <div className="mt-8">
                        <div className="h-14 bg-white/30 rounded-full animate-shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonHeroBanner;
