interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ message, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-gray-500 text-lg mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
