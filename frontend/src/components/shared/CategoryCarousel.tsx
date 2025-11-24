import React, { useRef, useState, useEffect } from 'react';
import { getFoodItems } from '../../services/api';
import { FoodItem } from '../../models/FoodItem';

interface Category {
    id: string;
    name: string;
    image: string;
}

// Mapping of cuisine types to representative images
const cuisineImages: { [key: string]: string } = {
    'Biryani': 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80',
    'Pizza': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=300&q=80',
    'Italian': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=300&q=80',
    'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80',
    'American': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80',
    'Chinese': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=300&q=80',
    'Asian': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=300&q=80',
    'Cake': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=300&q=80',
    'Ice Cream': 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=300&q=80',
    'North Indian': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80',
    'Indian': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80',
    'South Indian': 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e7?auto=format&fit=crop&w=300&q=80',
    'Mexican': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=300&q=80',
    'Japanese': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=300&q=80',
    'Sushi': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=300&q=80',
    'Thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=300&q=80',
    'French': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=300&q=80',
    'Greek': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80',
    'Mediterranean': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80',
    'Seafood': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=300&q=80',
    'Vegetarian': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',
    'Dessert': 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=300&q=80', // Added for fallback
};

const CategoryCarousel: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const foodItems = await getFoodItems();

            // Extract unique categories from food items and use first food item's image for each
            const categoryMap = new Map<string, string>();

            foodItems.forEach((item: FoodItem) => {
                if (item.category && !categoryMap.has(item.category)) {
                    // Store the first food item's image for this category
                    categoryMap.set(item.category, item.image);
                }
            });

            // Convert to category format with actual food images
            const uniqueCategories: Category[] = Array.from(categoryMap.entries())
                .slice(0, 12) // Limit to 12 categories
                .map(([category, image], index) => ({
                    id: `${index + 1}`,
                    name: category,
                    image: image || cuisineImages[category] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80'
                }));

            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback to default categories if fetch fails
            setCategories([
                { id: '1', name: 'Pizza', image: cuisineImages['Pizza'] },
                { id: '2', name: 'Burger', image: cuisineImages['Burger'] },
                { id: '3', name: 'Biryani', image: cuisineImages['Biryani'] },
                { id: '4', name: 'Chinese', image: cuisineImages['Chinese'] },
                { id: '5', name: 'Sushi', image: cuisineImages['Sushi'] },
                { id: '6', name: 'Dessert', image: cuisineImages['Cake'] },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            });
        }
    };

    if (loading) {
        return (
            <div className="relative py-8 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">What's on your mind?</h2>
                    <div className="flex gap-8 overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 flex flex-col items-center">
                                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gray-200 animate-pulse mb-3"></div>
                                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative py-8 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">What's on your mind?</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
                            aria-label="Scroll left"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
                            aria-label="Scroll right"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex-shrink-0 flex flex-col items-center cursor-pointer group"
                        >
                            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mb-3 border-4 border-transparent group-hover:border-primary-100 transition-all duration-300 shadow-sm group-hover:shadow-md">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = `https://via.placeholder.com/150/cccccc/666666?text=${encodeURIComponent(category.name)}`;
                                    }}
                                />
                            </div>
                            <span className="text-gray-700 font-medium text-lg group-hover:text-primary-600 transition-colors">
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCarousel;
