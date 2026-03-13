import { CATEGORIES } from '../types/expense';

interface FilterBarProps {
  value: string;
  onChange: (category: string) => void;
  expenseCount?: number;
  isLoading?: boolean;
}

const FilterBar = ({ value, onChange, expenseCount, isLoading }: FilterBarProps) => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {expenseCount !== undefined && (
        <span className="text-sm text-gray-500">
          Showing {expenseCount} expense{expenseCount === 1 ? '' : 's'}
        </span>
      )}
    </div>
  );
};

export default FilterBar;
