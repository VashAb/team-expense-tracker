import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    res.status(400).json({ error: 'Validation failed', details: messages });
    return;
  }

  // Mongoose cast error (bad ObjectId format)
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: 'Invalid expense ID format' });
    return;
  }

  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
};

export default errorHandler;
