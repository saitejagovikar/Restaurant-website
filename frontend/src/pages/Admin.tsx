import React, { useState, useEffect } from 'react';
import { Restaurant } from '../models';
import { createRestaurant, deleteRestaurant, getRestaurants, updateRestaurant } from '../services';
import type { RestaurantFormData } from '../services/api';
import { AdminTable, SkeletonTable, AdminForm } from '../components';
import { useToast, usePageLoader } from '../hooks';

const Admin: React.FC = () => {
  usePageLoader();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await getRestaurants();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch restaurants. Please try again later.');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRestaurant = () => {
    setEditingRestaurant(null);
    setShowForm(true);
  };

  const handleEditRestaurant = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setShowForm(true);
  };

  const handleDeleteRestaurant = async (id: string) => {
    try {
      await deleteRestaurant(id);
      showSuccess('Restaurant deleted successfully!');
      fetchRestaurants();
    } catch (err) {
      showError('Failed to delete restaurant. Please try again.');
      console.error('Error deleting restaurant:', err);
    }
  };

  const handleSubmit = async (data: RestaurantFormData) => {
    try {
      if (editingRestaurant) {
        await updateRestaurant(editingRestaurant._id, data);
        showSuccess('Restaurant updated successfully!');
      } else {
        await createRestaurant(data);
        showSuccess('Restaurant created successfully!');
      }
      setShowForm(false);
      setEditingRestaurant(null);
      fetchRestaurants();
    } catch (err) {
      showError(`Failed to ${editingRestaurant ? 'update' : 'create'} restaurant. Please try again.`);
      console.error('Error submitting restaurant:', err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingRestaurant(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage restaurants</p>
          </div>

          <div className="mb-6">
            <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>

          <SkeletonTable />
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage restaurants</p>
        </div>

        {!showForm ? (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Restaurants ({restaurants.length})
                </h2>
              </div>
              <button
                onClick={handleAddRestaurant}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Restaurant
              </button>
            </div>

            <AdminTable
              restaurants={restaurants}
              onEdit={handleEditRestaurant}
              onDelete={handleDeleteRestaurant}
            />
          </div>
        ) : (
          <AdminForm
            initialValues={editingRestaurant || undefined}
            onSubmit={handleSubmit}
            buttonLabel={editingRestaurant ? 'Update Restaurant' : 'Create Restaurant'}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
