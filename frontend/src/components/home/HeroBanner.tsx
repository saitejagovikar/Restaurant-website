import React from 'react';
import SearchBar from './SearchBar';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (e: React.FormEvent) => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  return (
    <div className="relative w-screen h-screen min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/herobanner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center px-4 relative z-10">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-2xl"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}
          >
            <span className="text-orange-400">Savor Every Moment,</span>
            <span className="block mt-2">Delivered to Your Door</span>
          </h1>

          <p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white font-light"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)' }}
          >
            From cozy dine-in experiences to lightning-fast delivery
            <br className="hidden md:block" />
            <span className="inline-block mt-2 px-4 py-1.5 bg-orange-500/20 backdrop-blur-md rounded-full text-sm font-medium border border-orange-400/30 text-orange-200 shadow-lg">
              Your perfect meal is just a tap away
            </span>
          </p>

          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            searchButton={true}
            placeholder="Search for restaurants, cuisines, or locations..."
            className="w-full bg-white text-black placeholder-gray-500 border border-gray-300 rounded-full px-4 pr-32 py-3 text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          />

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {['Italian', 'Chinese', 'Indian', 'Mexican', 'Sushi', 'Pizza'].map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => onSearchChange(cuisine)}
                className="px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg border border-white/20 text-white"
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
