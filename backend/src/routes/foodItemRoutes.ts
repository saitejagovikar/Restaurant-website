import { Router } from 'express';
import {
    getFoodItems,
    getFoodItemById,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem
} from '../controllers/foodItemController';

const router = Router();

router.route('/')
    .get(getFoodItems)
    .post(createFoodItem);

router.route('/:id')
    .get(getFoodItemById)
    .patch(updateFoodItem)
    .delete(deleteFoodItem);

export default router;
