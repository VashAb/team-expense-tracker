import type { Expense } from '../types/expense';
import { formatCurrency, formatDate } from '../utils/format';
import { CATEGORY_COLORS } from '../constants';
import Button from './Button';
import DeleteButton from './DeleteButton';

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
}

const ExpenseCard = ({ expense, onEdit }: ExpenseCardProps) => {
  return (
    <div className="flex flex-col h-full rounded-lg bg-white p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 truncate pr-2">{expense.title}</h3>
        <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
          {formatCurrency(expense.amount)}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[expense.category]}`}
        >
          {expense.category}
        </span>
        <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
      </div>
      {expense.notes && (
        <p className="text-sm text-gray-500 truncate">{expense.notes}</p>
      )}
      <div className="flex items-center justify-end gap-2 pt-2 mt-auto border-t border-gray-100">
        <Button variant="secondary" size="sm" onClick={() => onEdit(expense)}>
          Edit
        </Button>
        <DeleteButton expenseId={expense._id} expenseTitle={expense.title} />
      </div>
    </div>
  );
};

export default ExpenseCard;
