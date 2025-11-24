import React, { useState, useEffect } from 'react';
import { getFoodItemsByRestaurant, createFoodItem, updateFoodItem, deleteFoodItem } from '../../services/api';
import { FoodItem } from '../../models/FoodItem';
import ImageUpload from '../shared/ImageUpload';
import { useToast } from '../../hooks/useToast';

interface FoodItemManagerProps {
    restaurantId: string;
    restaurantName: string;
}

const FoodItemManager: React.FC<FoodItemManagerProps> = ({ restaurantId, restaurantName }) => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<FoodItem>>({});
    const { showSuccess, showError } = useToast();

    useEffect(() => {
        fetchFoodItems();
    }, [restaurantId]);

    const fetchFoodItems = async () => {
        try {
            setLoading(true);
            const items = await getFoodItemsByRestaurant(restaurantId);
            setFoodItems(items);
        } catch (error) {
            console.error('Error fetching food items:', error);
            showError('Failed to load food items');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            if (!currentItem.name || !currentItem.price || !currentItem.description || !currentItem.image) {
                showError('Please fill in all required fields (Name, Price, Description, and Image)');
                return;
            }

            const itemData = {
                ...currentItem,
                name: currentItem.name?.trim(),
                description: currentItem.description?.trim(),
                restaurantId,
                restaurantName,
                price: Number(currentItem.price),
                rating: currentItem.rating || 0,
                isVegetarian: currentItem.isVegetarian || false,
                category: currentItem.category || 'Main Course' // Ensure category has a default value
            };

            if (currentItem._id) {
                await updateFoodItem(currentItem._id, itemData);
                showSuccess('Food item updated successfully');
            } else {
                await createFoodItem(itemData);
                showSuccess('Food item created successfully');
            }

            setIsEditing(false);
            setCurrentItem({});
            fetchFoodItems();
        } catch (error) {
            console.error('Error saving food item:', error);
            showError('Failed to save food item');
        }
    };

    const handleDelete = async (id?: string) => {
        if (!id) {
            console.error('Cannot delete: Item ID is undefined');
            return;
        }
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await deleteFoodItem(id);
            await fetchFoodItems();
            showSuccess('Food item deleted successfully');
        } catch (error) {
            console.error('Error deleting food item:', error);
            showError('Failed to delete food item');
        }
    };

    const startEdit = (item?: FoodItem) => {
        if (item) {
            setCurrentItem(item);
        } else {
            setCurrentItem({
                category: 'Main Course',
                isVegetarian: false,
                rating: 0
            });
        }
        setIsEditing(true);
    };

    if (loading) return <div className="text-center py-4">Loading menu items...</div>;

    return (
        <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Menu Items</h3>
                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => startEdit()}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm"
                    >
                        Add Food Item
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="text-md font-medium mb-4">{currentItem._id ? 'Edit Item' : 'New Item'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <ImageUpload
                                label="Food Item Image"
                                currentImage={currentItem.image}
                                onImageUpload={(url: string) => setCurrentItem({ ...currentItem, image: url })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                            <input
                                type="text"
                                value={currentItem.name || ''}
                                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                            <input
                                type="number"
                                value={currentItem.price || ''}
                                onChange={(e) => setCurrentItem({ ...currentItem, price: Number(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={currentItem.category || 'Main Course'}
                                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="Starters">Starters</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Beverages">Beverages</option>
                            </select>
                        </div>

                        <div className="flex items-center mt-6">
                            <input
                                type="checkbox"
                                checked={currentItem.isVegetarian || false}
                                onChange={(e) => setCurrentItem({ ...currentItem, isVegetarian: e.target.checked })}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">Vegetarian</label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                            <input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={currentItem.rating ?? ''}
                                onChange={(e) => setCurrentItem({ 
                                    ...currentItem, 
                                    rating: e.target.value === '' ? undefined : Number(e.target.value) 
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                                placeholder="0-5"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                            <textarea
                                value={currentItem.description || ''}
                                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                        >
                            Save Item
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {foodItems.map((item) => (
                        <div key={item._id} className="flex items-start p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                            />
                            <div className="ml-4 flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                                        <p className="text-sm text-gray-500">{item.category} • ${item.price}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEdit(item)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                                {item.isVegetarian && (
                                    <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        Vegetarian
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {foodItems.length === 0 && (
                        <div className="col-span-2 text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            No food items added yet. Click "Add Food Item" to create your menu.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FoodItemManager;
