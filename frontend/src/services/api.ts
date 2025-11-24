import { Restaurant } from '@models/Restaurant';
import { FoodItem } from '@models/FoodItem';

// Production backend URL on Render
const BASE_URL = 'https://restaurant-website-168p.onrender.com/api';

export interface RestaurantFormData {
  _id?: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  location: string;
  image: string;
  type?: string;
  openingHours?: string;
  hasOutdoorSeating?: boolean;
  deliveryTime?: string;
  minOrder?: number;
  foodItems?: FoodItem[];
}

export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const url = `${BASE_URL}/restaurants`;
    console.log('Fetching from:', url);  // Debug log
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const createRestaurant = async (restaurantData: RestaurantFormData): Promise<Restaurant> => {
  try {
    const response = await fetch(`${BASE_URL}/restaurants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurantData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
};

export const updateRestaurant = async (id: string, restaurantData: Partial<RestaurantFormData>): Promise<Restaurant> => {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurantData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw error;
  }
};

export const deleteRestaurant = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
};

// FoodItem interface is imported from '../types/FoodItem'

export const getFoodItems = async (): Promise<FoodItem[]> => {
  try {
    const url = `${BASE_URL}/food-items`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
};

export const getFoodItemsByRestaurant = async (restaurantId: string): Promise<FoodItem[]> => {
  try {
    const url = `${BASE_URL}/food-items?restaurantId=${restaurantId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching restaurant food items:', error);
    throw error;
  }
};

export const createFoodItem = async (foodItemData: Partial<FoodItem>): Promise<FoodItem> => {
  try {
    const response = await fetch(`${BASE_URL}/food-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodItemData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating food item:', error);
    throw error;
  }
};

export const updateFoodItem = async (id: string, foodItemData: Partial<FoodItem>): Promise<FoodItem> => {
  try {
    const response = await fetch(`${BASE_URL}/food-items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodItemData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating food item:', error);
    throw error;
  }
};

export const deleteFoodItem = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/food-items/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting food item:', error);
    throw error;
  }
};
