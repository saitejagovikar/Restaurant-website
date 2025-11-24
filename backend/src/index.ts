import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import restaurantRoutes from './routes/restaurantRoutes';
import foodItemRoutes from './routes/foodItemRoutes';
import uploadRoutes from './routes/uploadRoutes';

dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use((req: Request, res: Response, next: NextFunction) => {
  // Log all requests with timestamp and method
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

  // CORS headers configuration
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];

  const origin = req.headers.origin as string;

  // Set CORS headers if origin is in allowed list
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Body parser middleware
app.use(express.json() as express.RequestHandler);
app.use(express.urlencoded({ extended: true }) as express.RequestHandler);

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/food-items', foodItemRoutes);
app.use('/api/upload', uploadRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Restaurant Listing API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants'
    }
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/`);
});
