import { Request, Response } from 'express';
import Restaurant, { IRestaurant, RestaurantType } from '../models/Restaurant';
import { Types } from 'mongoose';

// @desc    Get all restaurants with optional type filter
// @route   GET /api/restaurants
// @access  Public
export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.query;
    const query: any = {};
    
    if (type === 'DINE_IN' || type === 'DELIVERY') {
      query.type = type;
    } else if (type) {
      res.status(400).json({
        success: false,
        message: 'Invalid restaurant type. Must be DINE_IN or DELIVERY'
      });
      return;
    }
    
    const restaurants = await Restaurant.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// @desc    Create new restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      name, 
      cuisine, 
      rating, 
      priceRange, 
      location, 
      image, 
      type,
      // Dine-in specific fields
      openingHours,
      hasOutdoorSeating,
      // Delivery specific fields
      deliveryTime,
      minOrder
    } = req.body;

    // Common validations
    const requiredFields = ['name', 'cuisine', 'rating', 'priceRange', 'location', 'type'];
    const missingFields = requiredFields.filter(field => !req.body[type === 'DINE_IN' ? field : field]);
    
    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
      return;
    }

    if (rating < 0 || rating > 5) {
      res.status(400).json({
        success: false,
        message: 'Rating must be between 0 and 5'
      });
      return;
    }

    // Type-specific validations
    if (type === 'DINE_IN' && !openingHours) {
      res.status(400).json({
        success: false,
        message: 'Opening hours are required for DINE_IN restaurants'
      });
      return;
    }

    if (type === 'DELIVERY' && (!deliveryTime || minOrder === undefined)) {
      res.status(400).json({
        success: false,
        message: 'Delivery time and minimum order are required for DELIVERY restaurants'
      });
      return;
    }

    const restaurantData: any = {
      name,
      cuisine,
      rating,
      priceRange,
      location,
      image: image || 'https://via.placeholder.com/150',
      type
    };

    // Add type-specific fields
    if (type === 'DINE_IN') {
      restaurantData.openingHours = openingHours;
      restaurantData.hasOutdoorSeating = hasOutdoorSeating || false;
    } else {
      restaurantData.deliveryTime = deliveryTime;
      restaurantData.minOrder = minOrder;
    }

    const restaurant = await Restaurant.create(restaurantData);

    res.status(201).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};

// @desc    Update restaurant
// @route   PATCH /api/restaurants/:id
// @access  Private/Admin
export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { 
      name, 
      cuisine, 
      rating, 
      priceRange, 
      location, 
      image,
      type,
      // Dine-in specific fields
      openingHours,
      hasOutdoorSeating,
      // Delivery specific fields
      deliveryTime,
      minOrder
    } = req.body;

    // Input validation
    if (rating && (rating < 0 || rating > 5)) {
      res.status(400).json({
        success: false,
        message: 'Rating must be between 0 and 5'
      });
      return;
    }

    // Get existing restaurant to check type if not provided
    const existingRestaurant = await Restaurant.findById(id);
    if (!existingRestaurant) {
      res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
      return;
    }

    const restaurantType = type || existingRestaurant.type;
    const updateData: any = {
      name,
      cuisine,
      rating,
      priceRange,
      location,
      image,
      type: restaurantType
    };

    // Add/update type-specific fields
    if (restaurantType === 'DINE_IN') {
      updateData.openingHours = openingHours !== undefined ? openingHours : existingRestaurant.openingHours;
      updateData.hasOutdoorSeating = hasOutdoorSeating !== undefined ? hasOutdoorSeating : existingRestaurant.hasOutdoorSeating;
      // Clear delivery-specific fields
      updateData.deliveryTime = undefined;
      updateData.minOrder = undefined;
    } else {
      updateData.deliveryTime = deliveryTime !== undefined ? deliveryTime : existingRestaurant.deliveryTime;
      updateData.minOrder = minOrder !== undefined ? minOrder : existingRestaurant.minOrder;
      // Clear dine-in specific fields
      updateData.openingHours = undefined;
      updateData.hasOutdoorSeating = undefined;
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: `Restaurant not found with id of ${id}`
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: error.message
      });
    } else if (error instanceof Error && error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: 'Invalid restaurant ID format'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};

// @desc    Delete restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
// @desc    Search restaurants by name, cuisine, or description
// @route   GET /api/restaurants/search
// @access  Public
export const searchRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    
    if (!q) {
      res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
      return;
    }

    // Create a case-insensitive regex for the search query
    const searchRegex = new RegExp(q as string, 'i');
    
    // Search in name, cuisine, and description fields
    const restaurants = await Restaurant.find({
      $or: [
        { name: searchRegex },
        { 'cuisine.name': searchRegex },
        { description: searchRegex }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    console.error('Error searching restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching restaurants'
    });
  }
};

// @desc    Delete restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: `Restaurant not found with id of ${id}`
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    if (error instanceof Error && error.name === 'CastError') {
      res.status(400).json({
        success: false,
        message: 'Invalid restaurant ID format'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
