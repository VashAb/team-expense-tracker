import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'Invalid expense ID format' });
    return;
  }
  next();
};

export default validateObjectId;
