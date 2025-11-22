import { Router } from 'express';
import {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurants
} from '../controllers/restaurantController';

const router = Router();

// Public routes
router
  .route('/')
  .get(getRestaurants);

// Search route
router.get('/search', searchRestaurants);

// Protected routes (add authentication middleware here if needed)
router.post('/', createRestaurant);
router
  .route('/:id')
  .patch(updateRestaurant)
  .delete(deleteRestaurant);

export default router;
