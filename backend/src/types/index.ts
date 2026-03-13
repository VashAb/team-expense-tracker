import { Document } from 'mongoose';

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

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: Category;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
