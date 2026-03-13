import { useState } from 'react';
import { useDeleteExpense } from '../hooks/useExpenseMutations';
import Button from './Button';
import ConfirmModal from './ConfirmModal';

interface DeleteButtonProps {
  expenseId: string;
  expenseTitle?: string;
}

const DeleteButton = ({ expenseId, expenseTitle }: DeleteButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const deleteMutation = useDeleteExpense();

  const handleDelete = () => {
    deleteMutation.mutate(expenseId, {
      onSuccess: () => setShowModal(false),
    });
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={() => setShowModal(true)}
        disabled={deleteMutation.isPending}
      >
        Delete
      </Button>
      {showModal && (
        <ConfirmModal
          title="Delete Expense"
          message={
            expenseTitle
              ? `Are you sure you want to delete "${expenseTitle}"? This action cannot be undone.`
              : 'Are you sure you want to delete this expense? This action cannot be undone.'
          }
          confirmLabel="Delete"
          isLoading={deleteMutation.isPending}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DeleteButton;
