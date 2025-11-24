# HavGo - Restaurant Finder Frontend

A modern React + TypeScript application for discovering and managing restaurants with beautiful UI and seamless user experience.

## ✨ Features

- 🔍 **Smart Search**: Real-time search with 300ms debounce across name, cuisine, and location
- 🎯 **Advanced Filtering**: Filter by cuisine type, rating, and price range with clear filters option
- 📱 **Responsive Design**: Mobile-first design that adapts from 1-4 columns
- 🎨 **Modern UI**: Beautiful cards with hover effects, smooth transitions, and loading skeletons
- 🔔 **Toast Notifications**: Global success/error notifications using react-hot-toast
- 📊 **Admin Panel**: Full CRUD operations with responsive table and forms
- ⚡ **Performance**: Page-level loading indicators and optimized API calls
- 🎯 **TypeScript**: Full type safety throughout the application
- 🍽️ **Professional Design**: Clean, modern interface with HavGo branding

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend API running on port 5002

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔧 Environment Configuration

Create a `.env` file based on `.env.example`:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5002

# Environment
NODE_ENV=development

# Optional: Enable React Strict Mode for development
REACT_APP_STRICT_MODE=true
```

## 📱 Usage Guide

### For Users
1. **Browse Restaurants**: View all restaurants in a responsive grid layout
2. **Search**: Type to search restaurants by name, cuisine, or location (with auto-debounce)
3. **Filter**: Use dropdown filters to narrow down results by cuisine, rating, or price
4. **Clear Filters**: Reset all filters with one click
5. **Responsive**: Works seamlessly on mobile, tablet, and desktop

### For Admins
1. **Access Admin Panel**: Navigate to `/admin`
2. **View All Restaurants**: See all restaurants in a responsive table
3. **Add New Restaurant**: Click "Add Restaurant" to create new entries
4. **Edit Restaurant**: Click the edit icon to modify existing restaurants
5. **Delete Restaurant**: Click the delete icon with confirmation
6. **Form Validation**: All forms include proper validation and error handling

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AdminForm.tsx           # Restaurant creation/editing form
│   ├── AdminTable.tsx          # Admin table with CRUD operations
│   ├── EmptyState.tsx          # Beautiful empty state component
│   ├── FilterBar.tsx           # Advanced filtering with clear option
│   ├── Footer.tsx              # Professional footer component
│   ├── Navbar.tsx              # Responsive navigation with mobile menu
│   ├── RestaurantCard.tsx      # Enhanced restaurant cards with hover effects
│   ├── SearchBar.tsx            # Debounced search with clear button
│   ├── SkeletonCard.tsx        # Loading skeleton for cards
│   ├── SkeletonTable.tsx       # Loading skeleton for admin table
│   └── Toaster.tsx             # Custom toast notification styling
├── hooks/
│   ├── usePageLoader.ts        # Page-level loading indicator
│   └── useToast.ts             # Toast notification hook
├── pages/
│   ├── Admin.tsx               # Admin panel with full CRUD
│   └── Home.tsx                # Main restaurant browsing page
├── services/
│   └── api.ts                  # API service with environment support
├── types/
│   └── Restaurant.ts           # TypeScript interfaces
├── App.tsx                     # Main app with routing
├── index.tsx                   # App entry point
└── index.css                   # Global styles with Tailwind
```

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🏛️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **react-hot-toast** - Beautiful toast notifications
- **nprogress** - Page loading indicators
- **Create React App** - Build tooling

## 🎨 UI Features

### Home Page
- Responsive grid: 1 column (mobile) → 2 columns (tablet) → 3-4 columns (desktop)
- Loading skeletons during data fetch
- Empty state with beautiful illustration
- Real-time search with visual feedback
- Advanced filtering with clear option

### Admin Panel
- Responsive table with horizontal scroll on mobile
- Loading skeleton for table
- Form validation and error handling
- Toast notifications for all CRUD operations
- Mobile-friendly button layouts

### Navigation
- Sticky navigation bar
- Mobile hamburger menu
- Active route highlighting
- Smooth transitions

## 🚀 Production Build

1. Create production environment variables
2. Build the application:
```bash
npm run build
```

3. Deploy the `build/` folder to your hosting service

## 📋 Testing Checklist

### ✅ Basic Functionality
- [ ] App loads successfully
- [ ] Restaurants display in grid
- [ ] Search functionality works
- [ ] Filters work correctly
- [ ] Clear filters button works
- [ ] Responsive design on mobile/tablet/desktop

### ✅ Admin Features
- [ ] Admin panel loads
- [ ] Table displays all restaurants
- [ ] Add new restaurant works
- [ ] Edit restaurant works
- [ ] Delete restaurant works
- [ ] Form validation works
- [ ] Toast notifications appear

### ✅ UI/UX
- [ ] Loading skeletons appear during fetch
- [ ] Empty state displays when no results
- [ ] Hover effects work on cards
- [ ] Mobile menu functions correctly
- [ ] Page loading indicator works
- [ ] Toast notifications are styled correctly

## 🔗 API Integration

The frontend connects to the backend API at `REACT_APP_API_URL` (default: `http://localhost:5002`).

### Endpoints Used:
- `GET /api/restaurants` - Fetch all restaurants
- `POST /api/restaurants` - Create new restaurant
- `PATCH /api/restaurants/:id` - Update restaurant
- `DELETE /api/restaurants/:id` - Delete restaurant

## 🌟 Production Optimizations

- ✅ Image lazy loading
- ✅ React.StrictMode enabled
- ✅ Debounced search to minimize API calls
- ✅ Optimized re-renders with proper dependencies
- ✅ TypeScript for error prevention
- ✅ Responsive images with proper sizing
- ✅ CSS-in-JS animations for smooth transitions

## 📄 License

This project is part of the HavGo restaurant management system.
