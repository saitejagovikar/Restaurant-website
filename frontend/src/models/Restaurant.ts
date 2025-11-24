export interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  location: string;
  image: string;
  type: 'DINE_IN' | 'DELIVERY';
  // Dine-in specific fields
  openingHours?: string;
  hasOutdoorSeating?: boolean;
  // Delivery specific fields
  deliveryTime?: string;
  minOrder?: number;
}
