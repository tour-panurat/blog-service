import { Request, Response, NextFunction } from 'express';

// Custom error class for handling different error types
class AppError extends Error {
  public status: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.status = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Set default status if not provided
  const statusCode = err.status || 500;

  // Log the error details for debugging (consider using a logging library)
  console.error(`[ERROR] ${err.message}`, { statusCode, stack: err.stack });

  // Send the error response
  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500 ? 'Something went wrong!' : err.message,
  });
};

// Example of how to create an AppError
export const createError = (message: string, statusCode: number) => {
  return new AppError(message, statusCode);
};
