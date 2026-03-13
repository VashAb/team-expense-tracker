import { useState } from 'react';
import { CATEGORIES } from '../types/expense';
import type { Expense, ExpenseFormData, ApiError } from '../types/expense';
import { useCreateExpense, useUpdateExpense } from '../hooks/useExpenseMutations';
import FormField from './FormField';
import Button from './Button';
import { VALIDATION } from '../constants';

interface ExpenseFormProps {
  expense?: Expense;
  onClose: () => void;
}

const initialFormData: ExpenseFormData = {
  title: '',
  amount: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  notes: '',
};

const ExpenseForm = ({ expense, onClose }: ExpenseFormProps) => {
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

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {expense ? 'Edit Expense' : 'Add Expense'}
      </h2>
      {fieldErrors.form && (
        <p className="text-sm text-red-600 mb-3">{fieldErrors.form}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="title"
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          error={fieldErrors.title}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            id="amount"
            name="amount"
            label="Amount ($)"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.amount}
            onChange={handleChange}
            onKeyDown={(e) => { if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault(); }}
            error={fieldErrors.amount}
          />

          <FormField
            as="select"
            id="category"
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            error={fieldErrors.category}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </FormField>

          <FormField
            id="date"
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <FormField
          as="textarea"
          id="notes"
          name="notes"
          label="Notes"
          rows={2}
          value={formData.notes}
          onChange={handleChange}
          error={fieldErrors.notes}
        />

        <div className="flex gap-3">
          <Button
            type="submit"
            isLoading={isPending}
            loadingText={expense ? 'Updating...' : 'Creating...'}
          >
            {expense ? 'Update Expense' : 'Create Expense'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
