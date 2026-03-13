import { CATEGORIES } from '../types/expense';
import type { Expense } from '../types/expense';
import { useExpenseForm } from '../hooks/useExpenseForm';
import Modal from './Modal';
import FormField from './FormField';
import Button from './Button';

interface ExpenseFormProps {
  expense?: Expense;
  onClose: () => void;
}

const ExpenseForm = ({ expense, onClose }: ExpenseFormProps) => {
  const { formData, fieldErrors, isPending, handleSubmit, handleChange } =
    useExpenseForm(expense, onClose);

  return (
    <Modal onClose={onClose} size="lg">
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
            step="any"
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
    </Modal>
  );
};

export default ExpenseForm;
