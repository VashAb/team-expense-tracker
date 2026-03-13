import { useExpenses } from '../hooks/useExpenses';
import type { Expense } from '../types/expense';
import ExpenseCard from './ExpenseCard';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import Button from './Button';

interface ExpenseListProps {
  category?: string;
  onEdit: (expense: Expense) => void;
  onAddNew: () => void;
}

const ExpenseList = ({ category, onEdit, onAddNew }: ExpenseListProps) => {
  const { data: expenses, isLoading, isFetching, error, refetch } = useExpenses(category);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-center">
        <p className="text-sm text-red-700 mb-2">
          Failed to load expenses. Please try again.
        </p>
        <Button variant="link" onClick={() => refetch()}>Retry</Button>
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
    <div className="relative">
      {isFetching && !isLoading && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded-lg">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {expenses.map((expense) => (
          <ExpenseCard key={expense._id} expense={expense} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
