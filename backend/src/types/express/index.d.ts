// Import the original types from Express
import * as express from 'express';

declare global {
  namespace Express {
    // Extend the Request interface
    interface Request {
      user?: any;
      file?: any;
      files?: any[];
    }
    
    // Re-export the types
    export type Request = express.Request;
    export type Response = express.Response;
    export type NextFunction = express.NextFunction;
    export type Application = express.Application;
  }
}

export = express;
export as namespace Express;
