import React, { useState, useEffect } from 'react';
import { RestaurantFormData } from '../services/api';
import { FoodItem } from '../models/FoodItem';
import ImageUpload from './shared/ImageUpload';
import FoodItemManager from './restaurant/FoodItemManager';

interface AdminFormProps {
  initialValues?: Partial<RestaurantFormData>;
  onSubmit: (data: RestaurantFormData) => void;
  buttonLabel: string;
  onCancel?: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({
  initialValues = {},
  onSubmit,
  buttonLabel,
  onCancel
}) => {
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: '',
    cuisine: '',
    rating: 0,
    priceRange: 'Medium',
    location: '',
    image: '',
    type: 'DINE_IN',
    openingHours: '',
    hasOutdoorSeating: false,
    deliveryTime: '',
    minOrder: 0,
    foodItems: [],
    ...initialValues
  });
  
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    // Ensure we have a proper array of FoodItem objects
    const initialFoodItems = initialValues?.foodItems || [];
    return Array.isArray(initialFoodItems) ? initialFoodItems : [];
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Only update the form data when initialValues actually changes
    if (Object.keys(initialValues).length > 0) {
      setFormData(prev => ({
        name: '',
        cuisine: '',
        rating: 0,
        priceRange: 'Medium',
        location: '',
        image: '',
        type: 'DINE_IN',
        openingHours: '',
        hasOutdoorSeating: false,
        deliveryTime: '',
        minOrder: 0,
        ...initialValues,
        // Ensure foodItems is always an array
        foodItems: Array.isArray(initialValues.foodItems) ? initialValues.foodItems : []
      }));
    }
  }, [JSON.stringify(initialValues)]); // Use JSON.stringify to prevent infinite loop

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.cuisine.trim()) {
      newErrors.cuisine = 'Cuisine is required';
    }

    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }

    if (formData.type === 'DINE_IN' && !formData.openingHours?.trim()) {
      newErrors.openingHours = 'Opening hours are required for Dine-in restaurants';
    }

    if (formData.type === 'DELIVERY' && (!formData.deliveryTime?.trim() || formData.minOrder === undefined)) {
      newErrors.delivery = 'Delivery time and minimum order are required for Delivery restaurants';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        foodItems: formData.type === 'DELIVERY' ? foodItems : []
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) :
        type === 'checkbox' ? (e.target as HTMLInputElement).checked :
          value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{buttonLabel}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cuisine *
            </label>
            <input
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.cuisine ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.cuisine && <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating (0-5) *
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.rating ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range *
            </label>
            <select
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <ImageUpload
            label="Restaurant Image"
            currentImage={formData.image}
            onImageUpload={(url) => setFormData(prev => ({ ...prev, image: url }))}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="DINE_IN">Dine-in</option>
              <option value="DELIVERY">Delivery</option>
            </select>
          </div>

          {formData.type === 'DINE_IN' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opening Hours *
                </label>
                <input
                  type="text"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleChange}
                  placeholder="e.g., 9:00 AM - 10:00 PM"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.openingHours ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.openingHours && <p className="text-red-500 text-sm mt-1">{errors.openingHours}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasOutdoorSeating"
                  checked={formData.hasOutdoorSeating}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Has Outdoor Seating
                </label>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Time *
                </label>
                <input
                  type="text"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  placeholder="e.g., 30-45 min"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.delivery ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Order ($) *
                </label>
                <input
                  type="number"
                  name="minOrder"
                  value={formData.minOrder}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.delivery ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.delivery && <p className="text-red-500 text-sm mt-1">{errors.delivery}</p>}
              </div>

              {formData.type === 'DELIVERY' && (
                <div className="col-span-full mt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Menu Items</h3>
                  <FoodItemManager
                    restaurantId={initialValues?._id || 'new'}
                    restaurantName={formData.name}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {buttonLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
