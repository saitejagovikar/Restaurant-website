import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can replace 'any' with your user type if you have one
      file?: any; // For multer file uploads
      files?: any[]; // For multiple file uploads
    }
  }
}

// This makes the file a module
export {};
