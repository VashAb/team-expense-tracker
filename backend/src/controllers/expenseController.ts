import { Request, Response } from 'express';
import Expense from '../models/Expense';
import asyncHandler from '../middleware/asyncHandler';
import { VALIDATION } from '../constants';

// @desc    Get all expenses (optionally filtered by category)
// @route   GET /api/expenses
export const getExpenses = asyncHandler(async (req: Request, res: Response) => {
  const filter: Record<string, string> = {};
  if (req.query.category && typeof req.query.category === 'string') {
    filter.category = req.query.category;
  }

  const expenses = await Expense.find(filter).sort({ date: -1 }).limit(VALIDATION.EXPENSE_LIST_LIMIT);
  res.json(expenses);
});

// @desc    Create a new expense
// @route   POST /api/expenses
export const createExpense = asyncHandler(async (req: Request, res: Response) => {
  const { title, amount, category, date, notes } = req.body;
  const expense = await Expense.create({ title, amount, category, date, notes });
  res.status(201).json(expense);
});

// @desc    Get a single expense by ID
// @route   GET /api/expenses/:id
export const getExpenseById = asyncHandler(async (req: Request, res: Response) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });
    return;
  }
  res.json(expense);
});

// @desc    Update an expense
// @route   PUT /api/expenses/:id
export const updateExpense = asyncHandler(async (req: Request, res: Response) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });
    return;
  }
  res.json(expense);
});

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
export const deleteExpense = asyncHandler(async (req: Request, res: Response) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);
  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });
    return;
  }
  res.status(204).send();
});

// @desc    Get expense summary grouped by category
// @route   GET /api/expenses/summary
export const getExpenseSummary = asyncHandler(async (_req: Request, res: Response) => {
  const summary = await Expense.aggregate([
    {
      $group: {
        _id: '$category',
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { totalAmount: -1 } },
    {
      $project: {
        _id: 0,
        category: '$_id',
        totalAmount: 1,
        count: 1,
      },
    },
  ]);
  res.json(summary);
});
