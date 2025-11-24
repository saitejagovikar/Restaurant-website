import { Request, Response } from 'express';
import FoodItem from '../models/FoodItem';

export const getFoodItems = async (req: Request, res: Response) => {
    try {
        let query = {};

        // Check if restaurantId is provided in query params
        if (req.query.restaurantId) {
            query = { restaurantId: req.query.restaurantId };
        }

        const items = await FoodItem.find(query);

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const getFoodItemById = async (req: Request, res: Response) => {
    try {
        const item = await FoodItem.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const createFoodItem = async (req: Request, res: Response) => {
    try {
        const item = await FoodItem.create(req.body);
        res.status(201).json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Invalid data'
        });
    }
};

export const updateFoodItem = async (req: Request, res: Response) => {
    try {
        const item = await FoodItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Invalid data'
        });
    }
};

export const deleteFoodItem = async (req: Request, res: Response) => {
    try {
        const item = await FoodItem.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
