# 🍽️ Restaurant Website - Full Stack MERN Application

A modern, full-featured restaurant management platform with dual modes for food delivery and dine-in experiences. Built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript for type safety.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Deployment](#-deployment)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

### 🏠 Public Interface (Home Page)

#### Dual Mode System
- **Delivery Mode**: Browse food items from delivery restaurants
  - View individual dishes with prices, ratings, and images
  - Filter by vegetarian options
  - Real-time search across food items
  - Sort by price, rating, or name

- **Dine-In Mode**: Discover restaurants for dining out
  - Browse restaurants with detailed information
  - Filter by outdoor seating availability
  - View opening hours and location
  - Book table functionality
  - Pagination for easy navigation (9 restaurants per page)

#### Advanced Features
- **Real-time Search**: Instant filtering across names, cuisines, and locations
- **Multi-filter System**: Combine cuisine, vegetarian, and custom filters
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Skeleton Loading**: Smooth loading states for better UX
- **Hero Banner**: Eye-catching video background with search
- **Category Carousel**: Quick cuisine type selection

### 🔐 Admin Panel

- **Full CRUD Operations**: Create, Read, Update, Delete restaurants
- **Conditional Forms**: Dynamic fields based on restaurant type (Dine-in vs Delivery)
- **Image Upload**: Cloudinary integration for restaurant images
- **Food Item Management**: Manage menu items for delivery restaurants
- **Data Validation**: Client and server-side validation
- **Toast Notifications**: Real-time feedback for all operations
- **Responsive Table**: Sortable, scrollable data table

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type safety and better DX
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **React Hot Toast** - Toast notifications
- **NProgress** - Page loading indicator
- **Fetch API** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Cloudinary** - Image hosting
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Development Tools
- **ts-node-dev** - TypeScript development server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
restaurant-app/
├── backend/                      # Node.js + Express API
│   ├── src/
│   │   ├── config/              # Database & Cloudinary config
│   │   │   ├── db.ts           # MongoDB connection
│   │   │   └── cloudinary.ts   # Cloudinary setup
│   │   ├── controllers/         # Business logic
│   │   │   ├── restaurantController.ts
│   │   │   ├── foodItemController.ts
│   │   │   └── uploadController.ts
│   │   ├── models/              # Mongoose schemas
│   │   │   ├── Restaurant.ts   # Restaurant model
│   │   │   └── FoodItem.ts     # Food item model
│   │   ├── routes/              # API routes
│   │   │   ├── restaurantRoutes.ts
│   │   │   ├── foodItemRoutes.ts
│   │   │   └── uploadRoutes.ts
│   │   ├── types/               # TypeScript types
│   │   └── index.ts            # Server entry point
│   ├── dist/                    # Production build (generated)
│   ├── .env                     # Environment variables
│   ├── .env.example            # Environment template
│   ├── package.json
│   ├── tsconfig.json
│   └── DEPLOYMENT.md           # Deployment guide
│
└── frontend/                    # React + TypeScript
    ├── public/
    │   ├── herobanner.mp4      # Hero video background
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── admin/          # Admin panel components
    │   │   │   ├── AdminForm.tsx
    │   │   │   ├── AdminTable.tsx
    │   │   │   ├── ImageUpload.tsx
    │   │   │   ├── FoodItemManager.tsx
    │   │   │   └── SkeletonTable.tsx
    │   │   ├── home/           # Home page components
    │   │   │   ├── HeroBanner.tsx
    │   │   │   ├── SearchBar.tsx
    │   │   │   ├── FilterBar.tsx
    │   │   │   ├── CategoryCarousel.tsx
    │   │   │   ├── DeliveryToggle.tsx
    │   │   │   ├── RestaurantCard.tsx
    │   │   │   ├── FoodItemCard.tsx
    │   │   │   └── Skeleton*.tsx
    │   │   ├── layout/         # Layout components
    │   │   │   ├── Navbar.tsx
    │   │   │   └── Footer.tsx
    │   │   ├── shared/         # Shared components
    │   │   │   ├── EmptyState.tsx
    │   │   │   ├── SkeletonCard.tsx
    │   │   │   └── Toaster.tsx
    │   │   └── index.ts        # Component exports
    │   ├── hooks/              # Custom React hooks
    │   │   ├── usePageLoader.ts
    │   │   ├── useToast.ts
    │   │   └── index.ts
    │   ├── models/             # TypeScript interfaces
    │   │   ├── Restaurant.ts
    │   │   ├── FoodItem.ts
    │   │   └── index.ts
    │   ├── pages/              # Page components
    │   │   ├── Home.tsx
    │   │   ├── Admin.tsx
    │   │   └── index.ts
    │   ├── services/           # API service layer
    │   │   ├── api.ts
    │   │   └── index.ts
    │   ├── App.tsx             # Main app component
    │   ├── index.tsx           # React entry point
    │   └── index.css           # Global styles
    ├── build/                  # Production build (generated)
    ├── package.json
    └── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** v18.0.0 or higher - [Download](https://nodejs.org/)
- **npm** v9.0.0 or higher (comes with Node.js)
- **MongoDB Atlas Account** (free) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** (free) - [Sign up](https://cloudinary.com/)

Verify installations:
```bash
node --version  # Should show v18.0.0+
npm --version   # Should show v9.0.0+
```

### Installation

#### 1. Clone or Extract Project

```bash
cd restaurant-app
```

#### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant-db

# Server Configuration  
PORT=5002

# Environment
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a cluster (free tier available)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<database>` with `restaurant-db`

**Get Cloudinary Credentials:**
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy Cloud Name, API Key, and API Secret

**Start Backend:**
```bash
npm run dev
```

You should see:
```
🚀 Server is running on port 5002
📝 API documentation: http://localhost:5002/
🌍 Environment: development
MongoDB Connected: <your-cluster-name>
```

#### 3. Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# Navigate to frontend from project root
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### ✅ Verification

**Backend:** `http://localhost:5002/health` should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-20T...",
  "uptime": 123.45,
  "environment": "development"
}
```

**Frontend:** `http://localhost:3000` should display the restaurant homepage

## 📡 API Documentation

### Base URL
- **Development:** `http://localhost:5002/api`
- **Production:** `https://your-backend.onrender.com/api`

### Restaurant Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/restaurants` | Get all restaurants | Public |
| GET | `/restaurants/search?q=query` | Search restaurants | Public |
| POST | `/restaurants` | Create restaurant | Admin |
| PATCH | `/restaurants/:id` | Update restaurant | Admin |
| DELETE | `/restaurants/:id` | Delete restaurant | Admin |

### Food Item Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/food-items` | Get all food items | Public |
| GET | `/food-items?restaurantId=:id` | Get items by restaurant | Public |
| POST | `/food-items` | Create food item | Admin |
| PATCH | `/food-items/:id` | Update food item | Admin |
| DELETE | `/food-items/:id` | Delete food item | Admin |

### Upload Endpoint

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/upload` | Upload image to Cloudinary | Admin |

### Request/Response Examples

#### Create Restaurant
**Request:**
```http
POST /api/restaurants
Content-Type: application/json

{
  "name": "Sushi Master",
  "cuisine": "Japanese",
  "rating": 4.8,
  "priceRange": "High",
  "location": "Downtown",
  "image": "https://cloudinary.com/...",
  "type": "DINE_IN",
  "openingHours": "5:00 PM - 11:00 PM",
  "hasOutdoorSeating": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Sushi Master",
    "cuisine": "Japanese",
    "rating": 4.8,
    "priceRange": "High",
    "location": "Downtown",
    "image": "https://cloudinary.com/...",
    "type": "DINE_IN",
    "openingHours": "5:00 PM - 11:00 PM",
    "hasOutdoorSeating": true,
    "createdAt": "2024-01-20T14:30:00.000Z",
    "updatedAt": "2024-01-20T14:30:00.000Z"
  }
}
```

## 🏗️ Architecture

### Data Flow

```
User Interface (React)
        ↓
   API Service Layer (services/api.ts)
        ↓
  HTTP Request (Fetch API)
        ↓
  Express Routes (routes/)
        ↓
  Controllers (controllers/)
        ↓
  Mongoose Models (models/)
        ↓
  MongoDB Database
```

### Component Architecture

```
App.tsx (Router)
    ├── Navbar (Layout)
    ├── Home Page
    │   ├── HeroBanner
    │   ├── CategoryCarousel
    │   ├── DeliveryToggle
    │   ├── FilterBar
    │   ├── RestaurantCard (Dine-in mode)
    │   └── FoodItemCard (Delivery mode)
    └── Admin Page
        ├── AdminTable
        └── AdminForm
            ├── ImageUpload
            └── FoodItemManager
```

### State Management

- **React Hooks**: `useState`, `useEffect`, `useCallback`
- **Custom Hooks**: `usePageLoader`, `useToast`
- **Local State**: Component-level state management
- **No Redux**: Simplified state management for this app size

## 🚀 Deployment

### Backend Deployment (Render)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin master
```

2. **Create Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Root Directory:** `backend`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`

3. **Set Environment Variables**
   - Add all variables from `.env.example`
   - Use production MongoDB URI
   - Set `NODE_ENV=production`

4. **Deploy**
   - Render will automatically build and deploy
   - Note your backend URL: `https://your-app.onrender.com`

### Frontend Deployment (Vercel)

1. **Update API URL**
```typescript
// frontend/src/services/api.ts
const BASE_URL = 'https://your-backend.onrender.com/api';
```

2. **Build Production**
```bash
cd frontend
npm run build
```

3. **Deploy to Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Follow prompts
   - Or use [Vercel Dashboard](https://vercel.com/)

### Environment-Based Configuration

For automatic environment switching:

```typescript
// frontend/src/services/api.ts
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend.onrender.com/api'
  : 'http://localhost:5002/api';
```

## 💻 Development

### Available Scripts

#### Backend
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm run seed     # Seed database with sample data
```

#### Frontend
```bash
npm start        # Start development server (port 3000)
npm run build    # Create production build
npm test         # Run tests
npm run eject    # Eject from Create React App (irreversible)
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Automatic code formatting
- **Naming Conventions**:
  - Components: PascalCase (`RestaurantCard.tsx`)
  - Hooks: camelCase with 'use' prefix (`usePageLoader.ts`)
  - Files: Match component/function name

### Adding New Features

1. **Create Model** (if needed): `backend/src/models/`
2. **Create Controller**: `backend/src/controllers/`
3. **Add Routes**: `backend/src/routes/`
4. **Create Frontend Interface**: `frontend/src/models/`
5. **Add API Service**: `frontend/src/services/api.ts`
6. **Create Component**: `frontend/src/components/`
7. **Update Exports**: `frontend/src/components/index.ts`

## 🔧 Troubleshooting

### Common Issues

#### Backend won't start
```bash
# Check if port 5002 is in use
lsof -i :5002
# Kill process if needed
kill -9 <PID>
```

#### MongoDB connection error
- Verify `MONGO_URI` in `.env`
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for development)
- Ensure database user has read/write permissions

#### Frontend can't fetch data
- Verify backend is running on port 5002
- Check `BASE_URL` in `frontend/src/services/api.ts`
- Check browser console for CORS errors
- Ensure `FRONTEND_URL` is set in backend `.env`

#### Image upload fails
- Verify Cloudinary credentials in `.env`
- Check Cloudinary dashboard for usage limits
- Ensure all three variables are set correctly

#### Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Configuration

Default ports:
- **Backend:** 5002 (configurable via `PORT` in `.env`)
- **Frontend:** 3000 (Create React App default)

To change frontend port:
```bash
PORT=3001 npm start
```

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Check the [Troubleshooting](#-troubleshooting) section
- Review [DEPLOYMENT.md](backend/DEPLOYMENT.md) for deployment help
- Open an issue on GitHub

---

**Built with ❤️ using the MERN Stack**
