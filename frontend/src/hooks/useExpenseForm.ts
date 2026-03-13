import { useState } from 'react';
import type { Expense, ExpenseFormData, ApiError } from '../types/expense';
import { useCreateExpense, useUpdateExpense } from './useExpenseMutations';
import { VALIDATION } from '../constants';

const initialFormData: ExpenseFormData = {
  title: '',
  amount: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  notes: '',
};

export const useExpenseForm = (expense: Expense | undefined, onClose: () => void) => {
  const [formData, setFormData] = useState<ExpenseFormData>(
    expense
      ? {
          title: expense.title,
          amount: String(expense.amount),
          category: expense.category,
          date: expense.date.split('T')[0],
          notes: expense.notes || '',
        }
      : initialFormData
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const createMutation = useCreateExpense();
  const updateMutation = useUpdateExpense();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    else if (formData.title.length > VALIDATION.TITLE_MAX_LENGTH)
      errors.title = `Title cannot exceed ${VALIDATION.TITLE_MAX_LENGTH} characters`;

    const amount = Number.parseFloat(formData.amount);
    if (!formData.amount) errors.amount = 'Amount is required';
    else if (Number.isNaN(amount) || amount < VALIDATION.AMOUNT_MIN)
      errors.amount = `Amount must be at least ${VALIDATION.AMOUNT_MIN}`;
    else if (formData.amount.includes('.') && formData.amount.split('.')[1].length > 2)
      errors.amount = 'Amount cannot have more than 2 decimal places';

    if (!formData.category) errors.category = 'Category is required';

    if (formData.notes.length > VALIDATION.NOTES_MAX_LENGTH)
      errors.notes = `Notes cannot exceed ${VALIDATION.NOTES_MAX_LENGTH} characters`;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title: formData.title.trim(),
      amount: Number.parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      notes: formData.notes.trim() || undefined,
    };

    const onError = (err: ApiError) => {
      if (err.details) {
        const mapped: Record<string, string> = {};
        err.details.forEach((d) => {
          mapped[d.field] = d.message;
        });
        setFieldErrors(mapped);
      } else {
        setFieldErrors({ form: err.error });
      }
    };

    if (expense) {
      updateMutation.mutate({ id: expense._id, data: payload }, { onSuccess: onClose, onError });
    } else {
      createMutation.mutate(payload, { onSuccess: onClose, onError });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return { formData, fieldErrors, isPending, handleSubmit, handleChange };
};
