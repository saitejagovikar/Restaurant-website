import React from 'react';
import { FoodItem } from '@models/FoodItem';

interface FoodItemCardProps {
    foodItem: FoodItem;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ foodItem }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
                <img
                    src={foodItem.image}
                    alt={foodItem.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x300?text=Food+Item';
                    }}
                />
                {foodItem.isVegetarian && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Veg
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{foodItem.name}</h3>
                {foodItem.restaurantName && (
                    <p className="text-sm text-gray-500 mb-2">{foodItem.restaurantName}</p>
                )}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{foodItem.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-600">₹{foodItem.price}</span>
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-sm text-gray-600">{foodItem.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodItemCard;
