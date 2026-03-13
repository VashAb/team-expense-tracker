export const CATEGORIES = [
  'Food',
  'Travel',
  'Software',
  'Equipment',
  'Office Supplies',
  'Marketing',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseSummary {
  category: Category;
  totalAmount: number;
  count: number;
}

export interface ExpenseFormData {
  title: string;
  amount: string;
  category: Category | '';
  date: string;
  notes: string;
}

export interface ApiError {
  error: string;
  details?: { field: string; message: string }[];
}
