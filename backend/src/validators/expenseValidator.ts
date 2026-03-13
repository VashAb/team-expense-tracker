import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { CATEGORIES } from '../types';
import { VALIDATION } from '../constants';

export const createExpenseRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: VALIDATION.TITLE_MAX_LENGTH })
    .withMessage(`Title cannot exceed ${VALIDATION.TITLE_MAX_LENGTH} characters`),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: VALIDATION.AMOUNT_MIN })
    .withMessage(`Amount must be at least ${VALIDATION.AMOUNT_MIN}`),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([...CATEGORIES])
    .withMessage('Invalid category'),
  body('date').optional().isISO8601().withMessage('Date must be a valid ISO 8601 date'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: VALIDATION.NOTES_MAX_LENGTH })
    .withMessage(`Notes cannot exceed ${VALIDATION.NOTES_MAX_LENGTH} characters`),
];

export const updateExpenseRules = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: VALIDATION.TITLE_MAX_LENGTH })
    .withMessage(`Title cannot exceed ${VALIDATION.TITLE_MAX_LENGTH} characters`),
  body('amount')
    .optional()
    .isFloat({ min: VALIDATION.AMOUNT_MIN })
    .withMessage(`Amount must be at least ${VALIDATION.AMOUNT_MIN}`),
  body('category')
    .optional()
    .isIn([...CATEGORIES])
    .withMessage('Invalid category'),
  body('date').optional().isISO8601().withMessage('Date must be a valid ISO 8601 date'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: VALIDATION.NOTES_MAX_LENGTH })
    .withMessage(`Notes cannot exceed ${VALIDATION.NOTES_MAX_LENGTH} characters`),
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
