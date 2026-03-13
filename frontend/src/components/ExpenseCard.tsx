import { Expense, Category } from '../types/expense';
import { formatCurrency, formatDate } from '../utils/format';

const categoryColors: Record<Category, string> = {
  Food: 'bg-green-100 text-green-800',
  Travel: 'bg-blue-100 text-blue-800',
  Software: 'bg-purple-100 text-purple-800',
  Equipment: 'bg-orange-100 text-orange-800',
  'Office Supplies': 'bg-yellow-100 text-yellow-800',
  Marketing: 'bg-pink-100 text-pink-800',
  Other: 'bg-gray-100 text-gray-800',
};

interface ExpenseCardProps {
  expense: Expense;
  onClick: (expense: Expense) => void;
}

const ExpenseCard = ({ expense, onClick }: ExpenseCardProps) => {
  return (
    <div
      onClick={() => onClick(expense)}
      className="cursor-pointer rounded-lg bg-white p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 truncate pr-2">{expense.title}</h3>
        <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
          {formatCurrency(expense.amount)}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[expense.category]}`}
        >
          {expense.category}
        </span>
        <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
      </div>
      {expense.notes && (
        <p className="text-sm text-gray-500 truncate">{expense.notes}</p>
      )}
    </div>
  );
};

export default ExpenseCard;
