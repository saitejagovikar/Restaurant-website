
- **project**: [LINK](https://restaurant-website-gilt-tau.vercel.app) 

# Restaurant App - Full Stack Application

A complete restaurant management system with a public-facing restaurant finder and an admin panel for CRUD operations.

## 🏗️ Project Structure

```
restaurant-app/
├── backend/                 # Node.js + Express + MongoDB API
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── config/         # Database configuration
│   └── package.json
└── frontend/               # React + TypeScript + Tailwind CSS
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── types/          # TypeScript interfaces
    │   └── App.tsx         # Main app with routing
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **MongoDB** - Choose one option:
  - **Option 1**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free cloud database - Recommended)
  - **Option 2**: [Local MongoDB installation](https://www.mongodb.com/try/download/community)

To verify your installations, run:
```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show v9.0.0 or higher
```

### Step-by-Step Installation

#### 1. Clone or Extract the Project

If you received a .zip file, extract it to your desired location. Then navigate to the project directory:
```bash
cd restaurant-app
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install all dependencies
npm install

# Create environment configuration file
cp .env.example .env
```

**Configure Environment Variables:**

Open the `.env` file in a text editor and update the following:

```env
# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string_here

# Server Configuration
PORT=5002

# Environment
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important Notes:**
- **MongoDB URI**: 
  - For MongoDB Atlas: Get your connection string from your Atlas dashboard (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/restaurant-db`)
  - For Local MongoDB: Use `mongodb://localhost:27017/restaurant-db`
- **Cloudinary**: Sign up for a free account at [Cloudinary](https://cloudinary.com/) to get your credentials for image uploads

**Start the Backend Server:**
```bash
npm run dev
```

You should see: `Server running on port 5002` and `MongoDB Connected`

The backend API will be available at `http://localhost:5002`

#### 3. Frontend Setup

Open a **new terminal window** (keep the backend running), then:

```bash
# Navigate to frontend directory from project root
cd frontend

# Install all dependencies
npm install

# Start the development server
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to `http://localhost:3000`

### ✅ Verification

Once both servers are running, you should see:
- **Backend Terminal**: `Server running on port 5002` and `MongoDB Connected`
- **Frontend Browser**: The restaurant app home page with a list of restaurants

### 🌱 Seeding Sample Data (Optional)

To populate your database with sample restaurants:

```bash
# In the backend directory
npm run seed
```

This will add several example restaurants to your database.

## 📡 API Endpoints

### Restaurant CRUD Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/restaurants` | Get all restaurants |
| POST | `/api/restaurants` | Create new restaurant |
| PATCH | `/api/restaurants/:id` | Update restaurant |
| DELETE | `/api/restaurants/:id` | Delete restaurant |
| GET | `/api/restaurants/search?q=query` | Search restaurants |

## 🎯 Features

### Public Interface (Home Page)
- **Restaurant Discovery**: Browse all restaurants in a responsive grid
- **Search**: Real-time search by name, cuisine, or location
- **Filtering**: Filter by cuisine type, rating, and price range
- **Modern UI**: Clean design with Tailwind CSS and hover effects

### Admin Panel
- **Restaurant Management**: Full CRUD operations
- **Data Table**: Sortable table with restaurant information
- **Form Validation**: Client-side validation for all required fields
- **Success/Error Messages**: User feedback for all operations
- **Responsive Design**: Works on all device sizes

## 🧪 Testing CRUD Operations

### 1. Create a Restaurant
1. Navigate to `http://localhost:3000/admin`
2. Click "Add Restaurant"
3. Fill in the form:
   ```
   Name: "The Italian Place"
   Cuisine: "Italian"
   Rating: 4.5
   Price Range: "Medium"
   Location: "123 Main St, City"
   Image: "https://via.placeholder.com/150"
   Type: "Dine-in"
   Opening Hours: "11:00 AM - 10:00 PM"
   Has Outdoor Seating: true
   ```
4. Click "Create Restaurant"

### 2. Update a Restaurant
1. In the admin table, click the edit icon (pencil) on any restaurant
2. Modify any fields
3. Click "Update Restaurant"

### 3. Delete a Restaurant
1. In the admin table, click the delete icon (trash) on any restaurant
2. Confirm the deletion in the popup

### 4. View Changes on Public Site
1. Navigate to `http://localhost:3000`
2. Your changes should be reflected immediately

## 📊 Example Test Data

### Dine-in Restaurant Example
```json
{
  "name": "Sushi Master",
  "cuisine": "Japanese",
  "rating": 4.8,
  "priceRange": "High",
  "location": "456 Oak Avenue, Downtown",
  "image": "https://via.placeholder.com/150",
  "type": "DINE_IN",
  "openingHours": "5:00 PM - 11:00 PM",
  "hasOutdoorSeating": true
}
```

### Delivery Restaurant Example
```json
{
  "name": "Quick Pizza",
  "cuisine": "Italian",
  "rating": 4.2,
  "priceRange": "Low",
  "location": "789 Elm Street, Suburbs",
  "image": "https://via.placeholder.com/150",
  "type": "DELIVERY",
  "deliveryTime": "30-45 min",
  "minOrder": 15.00
}
```

## 🔧 Development Commands

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## 🎨 UI Components

### Components Overview
- **RestaurantCard**: Display restaurant information with image
- **SearchBar**: Real-time search input
- **FilterBar**: Dropdown filters for cuisine, rating, price
- **AdminTable**: Data table with edit/delete actions
- **AdminForm**: Reusable form for add/edit operations
- **Navbar**: Navigation with active state indicators

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Hover Effects**: Interactive elements
- **Color Coding**: Visual indicators for ratings and prices

## 🔍 Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure MongoDB is running
   - Check `.env` file configuration
   - Verify backend is running on port 5002

2. **Frontend Build Errors**
   - Run `npm install` to update dependencies
   - Clear node_modules and reinstall if needed

3. **CORS Issues**
   - Backend includes CORS middleware
   - Ensure both servers are running

4. **Database Connection**
   - Check MongoDB connection string
   - Ensure MongoDB service is running

### Port Conflicts
- Backend: 5002 (configurable in `.env`)
- Frontend: 3000 (Create React App default)

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "_id": "restaurant_id",
    "name": "Restaurant Name",
    "cuisine": "Cuisine Type",
    "rating": 4.5,
    "priceRange": "Medium",
    "location": "Restaurant Location",
    "image": "image_url",
    "type": "DINE_IN",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the TypeScript code: `npm run build`
3. Start production server: `npm start`

### Frontend Deployment
1. Build for production: `npm run build`
2. Deploy `build/` folder to hosting service
3. Update API base URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
