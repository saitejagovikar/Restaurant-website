import mongoose, { Document, Schema } from 'mongoose';

export interface IFoodItem extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    restaurantId: string;
    restaurantName?: string;
    isVegetarian: boolean;
    rating: number;
}

const FoodItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    restaurantId: { type: String, required: true }, // In a real app, this would be an ObjectId ref
    restaurantName: { type: String }, // Optional restaurant name for display
    isVegetarian: { type: Boolean, default: false },
    rating: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model<IFoodItem>('FoodItem', FoodItemSchema);
