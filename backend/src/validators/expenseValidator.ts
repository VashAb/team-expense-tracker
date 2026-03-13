import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { CATEGORIES } from '../types';

export const createExpenseRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 120 })
    .withMessage('Title cannot exceed 120 characters'),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be at least 0.01'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([...CATEGORIES])
    .withMessage('Invalid category'),
  body('date').optional().isISO8601().withMessage('Date must be a valid ISO 8601 date'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
];

export const updateExpenseRules = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 120 })
    .withMessage('Title cannot exceed 120 characters'),
  body('amount')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be at least 0.01'),
  body('category')
    .optional()
    .isIn([...CATEGORIES])
    .withMessage('Invalid category'),
  body('date').optional().isISO8601().withMessage('Date must be a valid ISO 8601 date'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
];

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().map((err) => ({
      field: 'path' in err ? err.path : 'unknown',
      message: err.msg,
    }));
    res.status(400).json({ error: 'Validation failed', details });
    return;
  }
  next();
};
