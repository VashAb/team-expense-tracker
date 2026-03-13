import { useState } from 'react';
import type { Expense } from './types/expense';
import { useExpenses } from './hooks/useExpenses';
import CategorySummary from './components/CategorySummary';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Button from './components/Button';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: expenses, isLoading } = useExpenses(selectedCategory || undefined);

  const handleClose = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Team Expense Tracker</h1>
          <Button onClick={() => { setEditingExpense(null); setShowForm(true); }}>
            Add Expense
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {showForm && (
          <ExpenseForm
            expense={editingExpense ?? undefined}
            onClose={handleClose}
          />
        )}
        <CategorySummary />
        <FilterBar
          value={selectedCategory}
          onChange={setSelectedCategory}
          expenseCount={expenses?.length}
          isLoading={isLoading}
        />
        <ExpenseList
          category={selectedCategory || undefined}
          onEdit={handleEdit}
          onAddNew={() => setShowForm(true)}
        />
      </main>
    </div>
  );
}

export default App;
