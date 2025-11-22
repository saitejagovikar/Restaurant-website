import mongoose, { Document, Schema } from 'mongoose';

export type RestaurantType = 'DINE_IN' | 'DELIVERY';

export interface IRestaurant extends Document {
  name: string;
  cuisine: string;
  rating: number;
  priceRange: 'Low' | 'Medium' | 'High';
  location: string;
  image: string;
  type: RestaurantType;
  // Dine-in specific fields
  openingHours?: string;
  hasOutdoorSeating?: boolean;
  // Delivery specific fields
  deliveryTime?: string;
  minOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Type for creating new restaurants (without Document fields)
export interface RestaurantData {
  name: string;
  cuisine: string;
  rating: number;
  priceRange: 'Low' | 'Medium' | 'High';
  location: string;
  image: string;
  type: RestaurantType;
  openingHours?: string;
  hasOutdoorSeating?: boolean;
  deliveryTime?: string;
  minOrder?: number;
}


const RestaurantSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a restaurant name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  cuisine: {
    type: String,
    required: [true, 'Please add a cuisine type'],
    trim: true,
    maxlength: [50, 'Cuisine cannot be more than 50 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  priceRange: {
    type: String,
    required: [true, 'Please add a price range'],
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
    trim: true,
    maxlength: [200, 'Location cannot be more than 200 characters']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
    trim: true
  },
  type: {
    type: String,
    enum: ['DINE_IN', 'DELIVERY'],
    required: [true, 'Please specify restaurant type (DINE_IN or DELIVERY)']
  },
  // Dine-in specific fields
  openingHours: {
    type: String,
    trim: true,
    maxlength: [50, 'Opening hours cannot be more than 50 characters'],
    required: function (this: any) {
      return this.get('type') === 'DINE_IN';
    }
  },
  hasOutdoorSeating: {
    type: Boolean,
    default: false
  },
  // Delivery specific fields
  deliveryTime: {
    type: String,
    trim: true,
    maxlength: [20, 'Delivery time cannot be more than 20 characters'],
    required: function (this: any) {
      return this.get('type') === 'DELIVERY';
    }
  },
  minOrder: {
    type: Number,
    min: [0, 'Minimum order cannot be negative'],
    required: function () { return this.type === 'DELIVERY'; }
  }
}, {
  timestamps: true
});

// Create a compound index for better query performance
RestaurantSchema.index({ type: 1, name: 1 });

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
