import React from 'react';
import { Restaurant } from '@models/Restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer group">
      <div className="relative overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-green-600 shadow-md">
          {restaurant.type}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-200">{restaurant.name}</h3>
        <p className="text-sm text-gray-600 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {restaurant.location}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
              <span className="text-yellow-500 mr-1 text-sm">★</span>
              <span className="text-sm font-semibold text-gray-800">{restaurant.rating}</span>
            </div>
          </div>
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
            {restaurant.cuisine} • {restaurant.type === 'DINE_IN' ? 'Dine Out' : 'Delivery'}
          </span>
        </div>

        {/* Book Table Button for Dine-In */}
        {restaurant.type === 'DINE_IN' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`Booking table at ${restaurant.name}`);
            }}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Table
          </button>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
