import { useState, useEffect, useRef } from 'react';
import { useDeleteExpense } from '../hooks/useExpenseMutations';
import { DELETE_CONFIRM_TIMEOUT_MS } from '../constants';

interface DeleteButtonProps {
  expenseId: string;
}

const DeleteButton = ({ expenseId }: DeleteButtonProps) => {
  const [confirming, setConfirming] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const deleteMutation = useDeleteExpense();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirming) {
      deleteMutation.mutate(expenseId);
      setConfirming(false);
    } else {
      setConfirming(true);
      timeoutRef.current = setTimeout(() => setConfirming(false), DELETE_CONFIRM_TIMEOUT_MS);
    }
  };

  const handleBlur = () => {
    setConfirming(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <button
      onClick={handleClick}
      onBlur={handleBlur}
      disabled={deleteMutation.isPending}
      className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
        confirming
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'bg-red-50 text-red-600 hover:bg-red-100'
      } disabled:opacity-50`}
    >
      {deleteMutation.isPending && 'Deleting...'}
      {!deleteMutation.isPending && confirming && 'Confirm?'}
      {!deleteMutation.isPending && !confirming && 'Delete'}
    </button>
  );
};

export default DeleteButton;
