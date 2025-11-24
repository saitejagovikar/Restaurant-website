import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant, { RestaurantData } from '../models/Restaurant';
import FoodItem from '../models/FoodItem';
import { dineOutRestaurants } from '../data/dineOutRestaurants';

dotenv.config();

// Delivery restaurants
const deliveryRestaurants: RestaurantData[] = [
  {
    name: "Burger Palace",
    cuisine: "American",
    rating: 4.5,
    priceRange: "Medium",
    location: "Downtown, 123 Main St",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
    type: "DELIVERY",
    deliveryTime: "30-40 mins",
    minOrder: 200
  },
  {
    name: "Sushi Master",
    cuisine: "Japanese",
    rating: 4.8,
    priceRange: "High",
    location: "Midtown, 456 Oak Ave",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
    type: "DELIVERY",
    deliveryTime: "40-50 mins",
    minOrder: 400
  },
  {
    name: "Pizza Heaven",
    cuisine: "Italian",
    rating: 4.2,
    priceRange: "Medium",
    location: "Westside, 789 Pine Rd",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    type: "DELIVERY",
    deliveryTime: "25-35 mins",
    minOrder: 250
  },
  {
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.6,
    priceRange: "Low",
    location: "East End, 321 Elm St",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    type: "DELIVERY",
    deliveryTime: "20-30 mins",
    minOrder: 150
  },
  {
    name: "Curry House",
    cuisine: "Indian",
    rating: 4.4,
    priceRange: "Medium",
    location: "Central, 654 Maple Dr",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
    type: "DELIVERY",
    deliveryTime: "35-45 mins",
    minOrder: 300
  },
  {
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.3,
    priceRange: "Low",
    location: "Chinatown, 987 Bamboo Ln",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800",
    type: "DELIVERY",
    deliveryTime: "30-40 mins",
    minOrder: 200
  },
  {
    name: "Le Petit Bistro",
    cuisine: "French",
    rating: 4.9,
    priceRange: "High",
    location: "Uptown, 147 Rue St",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
    type: "DELIVERY",
    deliveryTime: "45-55 mins",
    minOrder: 500
  },
  {
    name: "Greek Taverna",
    cuisine: "Greek",
    rating: 4.1,
    priceRange: "Medium",
    location: "Harbor, 258 Olive Way",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    type: "DELIVERY",
    deliveryTime: "30-40 mins",
    minOrder: 250
  },
  {
    name: "Thai Orchid",
    cuisine: "Thai",
    rating: 4.7,
    priceRange: "Medium",
    location: "Garden District, 369 Jasmine Pl",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800",
    type: "DELIVERY",
    deliveryTime: "35-45 mins",
    minOrder: 300
  },
  {
    name: "BBQ Smokehouse",
    cuisine: "American",
    rating: 4.5,
    priceRange: "Medium",
    location: "Industrial, 741 Smoke Ln",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    type: "DELIVERY",
    deliveryTime: "40-50 mins",
    minOrder: 350
  },
  {
    name: "Vegan Garden",
    cuisine: "Vegetarian",
    rating: 4.6,
    priceRange: "Medium",
    location: "Green Hills, 852 Spruce Ct",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    type: "DELIVERY",
    deliveryTime: "25-35 mins",
    minOrder: 200
  },
  {
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.3,
    priceRange: "Medium",
    location: "Little Italy, 963 Tomato Blvd",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    type: "DELIVERY",
    deliveryTime: "30-40 mins",
    minOrder: 250
  },
  {
    name: "Noodle Express",
    cuisine: "Asian",
    rating: 4.0,
    priceRange: "Low",
    location: "Student Quarter, 159 College Ave",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
    type: "DELIVERY",
    deliveryTime: "20-30 mins",
    minOrder: 150
  },
  {
    name: "Steakhouse Elite",
    cuisine: "American",
    rating: 4.8,
    priceRange: "High",
    location: "Financial District, 753 Wall St",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
    type: "DELIVERY",
    deliveryTime: "45-55 mins",
    minOrder: 600
  },
  {
    name: "Seafood Fresh",
    cuisine: "Seafood",
    rating: 4.4,
    priceRange: "High",
    location: "Waterfront, 951 Harbor Dr",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523e?w=800",
    type: "DELIVERY",
    deliveryTime: "40-50 mins",
    minOrder: 450
  }
];

// Combine all restaurants
const restaurants: RestaurantData[] = [
  ...deliveryRestaurants,
  ...dineOutRestaurants
];

// Food items for delivery
const foodItems = [
  {
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce",
    price: 299,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    category: "Burger",
    restaurantId: "burger-palace",
    restaurantName: "Burger Palace",
    isVegetarian: false,
    rating: 4.5
  },
  {
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, and basil on thin crust",
    price: 399,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
    category: "Pizza",
    restaurantId: "pizza-heaven",
    restaurantName: "Pizza Heaven",
    isVegetarian: true,
    rating: 4.7
  },
  {
    name: "California Roll",
    description: "Crab, avocado, and cucumber wrapped in rice and nori",
    price: 450,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
    category: "Sushi",
    restaurantId: "sushi-master",
    restaurantName: "Sushi Master",
    isVegetarian: false,
    rating: 4.8
  },
  {
    name: "Chicken Tikka Masala",
    description: "Tender chicken in creamy tomato curry sauce with aromatic spices",
    price: 350,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
    category: "Indian",
    restaurantId: "curry-house",
    restaurantName: "Curry House",
    isVegetarian: false,
    rating: 4.6
  },
  {
    name: "Pad Thai",
    description: "Stir-fried rice noodles with shrimp, peanuts, and tamarind sauce",
    price: 320,
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800",
    category: "Thai",
    restaurantId: "thai-orchid",
    restaurantName: "Thai Orchid",
    isVegetarian: false,
    rating: 4.4
  },
  {
    name: "Veggie Supreme Pizza",
    description: "Bell peppers, mushrooms, olives, onions, and tomatoes",
    price: 420,
    image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=800",
    category: "Pizza",
    restaurantId: "pizza-heaven",
    restaurantName: "Pizza Heaven",
    isVegetarian: true,
    rating: 4.3
  },
  {
    name: "Beef Tacos",
    description: "Three soft tacos with seasoned beef, salsa, and guacamole",
    price: 280,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    category: "Mexican",
    restaurantId: "taco-fiesta",
    restaurantName: "Taco Fiesta",
    isVegetarian: false,
    rating: 4.5
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 180,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800",
    category: "Dessert",
    restaurantId: "le-petit-bistro",
    restaurantName: "Le Petit Bistro",
    isVegetarian: true,
    rating: 4.9
  },
  {
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan, croutons, and Caesar dressing",
    price: 220,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    category: "Salad",
    restaurantId: "vegan-garden",
    restaurantName: "Vegan Garden",
    isVegetarian: true,
    rating: 4.2
  },
  {
    name: "Pepperoni Pizza",
    description: "Classic pizza with mozzarella and pepperoni slices",
    price: 380,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800",
    category: "Pizza",
    restaurantId: "pizza-heaven",
    restaurantName: "Pizza Heaven",
    isVegetarian: false,
    rating: 4.6
  },
  {
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with lemon butter sauce and vegetables",
    price: 550,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
    category: "Seafood",
    restaurantId: "seafood-fresh",
    restaurantName: "Seafood Fresh",
    isVegetarian: false,
    rating: 4.7
  },
  {
    name: "Vegan Buddha Bowl",
    description: "Quinoa, roasted vegetables, chickpeas, and tahini dressing",
    price: 340,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    category: "Vegan",
    restaurantId: "vegan-garden",
    restaurantName: "Vegan Garden",
    isVegetarian: true,
    rating: 4.5
  }
];

const seedData = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Restaurant.deleteMany({});
    await FoodItem.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await Restaurant.insertMany(restaurants);
    console.log(`Seeded ${restaurants.length} restaurants`);

    await FoodItem.insertMany(foodItems);
    console.log(`Seeded ${foodItems.length} food items`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
