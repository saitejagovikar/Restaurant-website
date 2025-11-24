import React, { useState, useEffect, useCallback } from 'react';
import { Restaurant, FoodItem } from '../models';
import { getRestaurants, getFoodItems } from '../services';
import { 
  HeroBanner, 
  RestaurantCard, 
  CategoryCarousel, 
  FilterBar, 
  SkeletonCard, 
  FoodItemCard, 
  EmptyState, 
  DeliveryToggle 
} from '../components';
import { usePageLoader } from '../hooks';

const Home: React.FC = () => {
  usePageLoader();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'DELIVERY' | 'DINE_IN'>('DELIVERY');
  const [filters, setFilters] = useState({
    cuisine: '',
    isVeg: false,
    hasOutdoorSeating: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const itemsPerPage = 9; // 3 columns x 3 rows

  // Fetch restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const applyFiltersAndSearch = useCallback(() => {
    let filtered = [...restaurants];
    let filteredFood = [...foodItems];

    // Helper to find restaurant for a food item
    const findRestaurant = (item: FoodItem) => {
      return restaurants.find(r =>
        r._id === item.restaurantId ||
        (item.restaurantName && r.name === item.restaurantName) ||
        // Fallback for slug-like IDs (e.g. "burger-palace" -> "Burger Palace")
        r.name.toLowerCase().replace(/\s+/g, '-') === item.restaurantId
      );
    };

    // Apply view mode filter
    if (viewMode === 'DELIVERY') {
      // In delivery mode, show only food items, not restaurants
      filtered = [];

      // Apply veg filter to food items
      if (filters.isVeg) {
        filteredFood = filteredFood.filter(item => item.isVegetarian);
      }

      // Apply cuisine filter to food items (by checking restaurant cuisine)
      if (filters.cuisine) {
        filteredFood = filteredFood.filter(item => {
          const restaurant = findRestaurant(item);
          return restaurant?.cuisine?.toLowerCase() === filters.cuisine.toLowerCase();
        });
      }

      // Apply search filter to food items
      if (searchQuery) {
        filteredFood = filteredFood.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.restaurantName && item.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
    } else {
      // In dine-out mode, show only restaurants, not food items
      filteredFood = [];

      filtered = filtered.filter(restaurant => {
        const type = restaurant.type?.toUpperCase();
        return type === 'DINE_IN' || type === 'BOTH';
      });

      // Apply veg filter to restaurants (check if restaurant has any veg items)
      if (filters.isVeg) {
        filtered = filtered.filter(restaurant => {
          // Find if this restaurant has any vegetarian items
          const restaurantItems = foodItems.filter(item => {
            // Check if this item belongs to the restaurant (using same loose matching)
            return item.restaurantId === restaurant._id ||
              (item.restaurantName && item.restaurantName === restaurant.name) ||
              restaurant.name.toLowerCase().replace(/\s+/g, '-') === item.restaurantId;
          });
          return restaurantItems.some(item => item.isVegetarian);
        });
      }

      // Apply search filter to restaurants
      if (searchQuery) {
        filtered = filtered.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply cuisine filter
      if (filters.cuisine) {
        filtered = filtered.filter(restaurant => {
          return restaurant.cuisine?.toLowerCase() === filters.cuisine.toLowerCase();
        });
      }

      // Apply outdoor seating filter (Dine-In only)
      if (filters.hasOutdoorSeating) {
        filtered = filtered.filter(restaurant => restaurant.hasOutdoorSeating);
      }
    }

    // Sort function for food items
    const sortFoodItems = (items: FoodItem[]) => {
      const sorted = [...items];
      switch (sortBy) {
        case 'rating-desc':
          return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'price-asc':
          return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return sorted.sort((a, b) => b.price - a.price);
        case 'name-asc':
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
          return sorted;
      }
    };

    // Apply sorting to restaurants
    const sortedRestaurants = sortRestaurants(filtered);
    const sortedFoodItems = sortFoodItems(filteredFood);

    setFilteredRestaurants(sortedRestaurants);
    setFilteredFoodItems(sortedFoodItems);
  }, [restaurants, foodItems, filters, searchQuery, sortBy, viewMode]);

  // Apply filters and search whenever they change
  useEffect(() => {
    console.log('Filters changed:', { filters, searchQuery, viewMode, sortBy });
    applyFiltersAndSearch();
    setCurrentPage(1); // Reset to first page when filters change
  }, [applyFiltersAndSearch, filters, searchQuery, viewMode, sortBy]);

  // Handle filter changes from FilterBar
  const handleFilterChange = (newFilters: { cuisine: string; isVeg: boolean; hasOutdoorSeating?: boolean }) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Handle veg toggle
  const handleVegToggle = (isVeg: boolean) => {
    setFilters({ ...filters, isVeg });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({ cuisine: '', isVeg: false, hasOutdoorSeating: false });
  };

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const [restaurantsData, foodItemsData] = await Promise.all([
        getRestaurants(),
        getFoodItems()
      ]);
      setRestaurants(restaurantsData);
      setFoodItems(foodItemsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get price level as number (e.g., '$' -> 1, '$$' -> 2, etc.)
  const getPriceLevel = (priceRange?: string | null): number => {
    if (!priceRange) return 0;
    return priceRange.length;
  };

  // Sort function based on current sortBy value
  const sortRestaurants = (restaurants: Restaurant[]) => {
    const sorted = [...restaurants];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => getPriceLevel(a.priceRange) - getPriceLevel(b.priceRange));
      case 'price-desc':
        return sorted.sort((a, b) => getPriceLevel(b.priceRange) - getPriceLevel(a.priceRange));
      case 'rating-desc':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Restaurant Finder
          </h1>

          <div className="mb-8">
            <div className="h-12 bg-gray-300 rounded-lg animate-pulse mb-4"></div>
            <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeroBanner
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={(e) => e.preventDefault()}
      />

      <main className="flex-grow bg-gray-50">
        <div className="relative z-10 -mt-16 mb-8">
          <CategoryCarousel />
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full sm:w-auto">
              <DeliveryToggle mode={viewMode} onToggle={setViewMode} />
            </div>
            <div className="w-full sm:w-auto">
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onSortChange={setSortBy}
                onVegToggle={handleVegToggle}
                sortBy={sortBy}
                className="w-full"
                viewMode={viewMode}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {viewMode === 'DELIVERY' ? (
            // Delivery Mode - Show Food Items Only
            filteredFoodItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFoodItems.map((foodItem) => (
                  <FoodItemCard key={foodItem._id} foodItem={foodItem} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8">
                <EmptyState
                  title="No food items found"
                  description="Try adjusting your search to find what you're looking for."
                />
              </div>
            )
          ) : (
            // Dine-Out Mode - Show Restaurants Only
            filteredRestaurants.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((restaurant) => (
                      <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                    ))}
                </div>

                {/* Pagination Controls */}
                {filteredRestaurants.length > itemsPerPage && (
                  <div className="mt-8 flex justify-center items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: Math.ceil(filteredRestaurants.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredRestaurants.length / itemsPerPage), prev + 1))}
                      disabled={currentPage === Math.ceil(filteredRestaurants.length / itemsPerPage)}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8">
                <EmptyState
                  title="No restaurants found"
                  description="Try adjusting your search or filters to find what you're looking for."
                />
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
