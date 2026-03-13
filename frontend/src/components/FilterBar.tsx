import { CATEGORIES } from '../types/expense';

interface FilterBarProps {
  value: string;
  onChange: (category: string) => void;
}

const FilterBar = ({ value, onChange }: FilterBarProps) => {
  return (
    <div className="mb-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
