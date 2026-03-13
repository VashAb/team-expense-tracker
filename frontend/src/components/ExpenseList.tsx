import { useExpenses } from '../hooks/useExpenses';
import { Expense } from '../types/expense';
import ExpenseCard from './ExpenseCard';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

interface ExpenseListProps {
  category?: string;
  onEdit: (expense: Expense) => void;
  onAddNew: () => void;
}

const ExpenseList = ({ category, onEdit, onAddNew }: ExpenseListProps) => {
  const { data: expenses, isLoading, error } = useExpenses(category);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-center">
        <p className="text-sm text-red-700">
          Failed to load expenses. Please try again.
        </p>
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return (
      <EmptyState
        message="No expenses found. Add your first one!"
        actionLabel="Add Expense"
        onAction={onAddNew}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {expenses.map((expense) => (
        <ExpenseCard key={expense._id} expense={expense} onClick={onEdit} />
      ))}
    </div>
  );
};

export default ExpenseList;
