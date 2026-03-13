import type { Expense } from '../types/expense';
import { formatCurrency, formatDate } from '../utils/format';
import { CATEGORY_COLORS } from '../constants';
import DeleteButton from './DeleteButton';

interface ExpenseCardProps {
  expense: Expense;
  onClick: (expense: Expense) => void;
}

const ExpenseCard = ({ expense, onClick }: ExpenseCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(expense)}
      className="w-full text-left cursor-pointer rounded-lg bg-white p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 truncate pr-2">{expense.title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
            {formatCurrency(expense.amount)}
          </span>
          <DeleteButton expenseId={expense._id} />
        </div>
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
    </button>
  );
};

export default ExpenseCard;
