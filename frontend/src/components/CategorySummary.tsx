import { useExpenseSummary } from '../hooks/useExpenseSummary';
import { formatCurrency } from '../utils/format';
import LoadingSpinner from './LoadingSpinner';

const CategorySummary = () => {
  const { data: summary, isLoading, error, refetch } = useExpenseSummary();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-center">
        <p className="text-sm text-red-700 mb-2">Failed to load summary.</p>
        <button
          onClick={() => refetch()}
          className="text-sm font-medium text-red-700 underline hover:text-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!summary || summary.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 mb-6">
      {summary.map((item) => (
        <div
          key={item.category}
          className="rounded-lg bg-white p-4 shadow-sm border border-gray-200"
        >
          <p className="text-sm font-medium text-gray-500">{item.category}</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(item.totalAmount)}</p>
          <p className="text-xs text-gray-400">
            {item.count} expense{item.count !== 1 ? 's' : ''}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategorySummary;
