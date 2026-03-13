import mongoose, { Schema } from 'mongoose';
import { IExpense, CATEGORIES } from '../types';
import { VALIDATION } from '../constants';

const expenseSchema = new Schema<IExpense>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [VALIDATION.TITLE_MAX_LENGTH, `Title cannot exceed ${VALIDATION.TITLE_MAX_LENGTH} characters`],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [VALIDATION.AMOUNT_MIN, `Amount must be at least ${VALIDATION.AMOUNT_MIN}`],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: CATEGORIES,
        message: '{VALUE} is not a valid category',
      },
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [VALIDATION.NOTES_MAX_LENGTH, `Notes cannot exceed ${VALIDATION.NOTES_MAX_LENGTH} characters`],
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.index({ category: 1 });

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);

export default Expense;
