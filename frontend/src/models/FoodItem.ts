export interface FoodItem {
  _id?: string;
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

export interface FoodItemFormData extends Omit<FoodItem, '_id' | 'restaurantId' | 'restaurantName'> {
  _id?: string;
  restaurantId?: string;
  restaurantName?: string;
}
