import { useState } from 'react';
import CategorySummary from './components/CategorySummary';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Team Expense Tracker</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <CategorySummary />
        <FilterBar value={selectedCategory} onChange={setSelectedCategory} />
        <ExpenseList
          category={selectedCategory || undefined}
          onEdit={() => {}}
          onAddNew={() => {}}
        />
      </main>
    </div>
  );
}

export default App;
