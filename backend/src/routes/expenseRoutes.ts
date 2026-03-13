import { Router } from 'express';
import {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
} from '../controllers/expenseController';
import validateObjectId from '../middleware/validateObjectId';
import {
  createExpenseRules,
  updateExpenseRules,
  validate,
} from '../validators/expenseValidator';

const router = Router();

router.get('/summary', getExpenseSummary);

router
  .route('/')
  .get(getExpenses)
  .post(createExpenseRules, validate, createExpense);

router
  .route('/:id')
  .all(validateObjectId)
  .get(getExpenseById)
  .put(updateExpenseRules, validate, updateExpense)
  .delete(deleteExpense);

export default router;
