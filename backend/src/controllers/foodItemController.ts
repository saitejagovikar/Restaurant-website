import express from 'express';
import FoodItem from '../models/FoodItem';

export const getFoodItems = async (req: express.Request, res: express.Response) => {
    try {
        let query = {};

        // Check if restaurantId is provided in query params
        if ((req.query as any).restaurantId) {
            query = { restaurantId: (req.query as any).restaurantId };
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

export const getFoodItemById = async (req: express.Request, res: express.Response) => {
    try {
        const item = await FoodItem.findById((req.params as any).id);

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

export const createFoodItem = async (req: express.Request, res: express.Response) => {
    try {
        const item = await FoodItem.create(req.body as any);
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

export const updateFoodItem = async (req: express.Request, res: express.Response) => {
    try {
        const item = await FoodItem.findByIdAndUpdate((req.params as any).id, req.body as any, {
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

export const deleteFoodItem = async (req: express.Request, res: express.Response) => {
    try {
        const item = await FoodItem.findByIdAndDelete((req.params as any).id);

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
