import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import restaurantRoutes from './routes/restaurantRoutes';
import foodItemRoutes from './routes/foodItemRoutes';
import uploadRoutes from './routes/uploadRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Log all requests with timestamp and method
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // CORS headers configuration
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL // Add production frontend URL from env
  ].filter(Boolean); // Remove undefined values

  const origin = req.get('origin') || '';

  // Set CORS headers if origin is in allowed list or allow all in production
  if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'production') {
    res.set('Access-Control-Allow-Origin', origin || '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Allow-Credentials', 'true');
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint for monitoring
app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/food-items', foodItemRoutes);
app.use('/api/upload', uploadRoutes);

// Root route
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Restaurant Listing API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      foodItems: '/api/food-items',
      upload: '/api/upload'
    }
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 API documentation: http://localhost:${PORT}/`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});