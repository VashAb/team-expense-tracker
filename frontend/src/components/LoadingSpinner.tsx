const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />
    </div>
  );
};

export default LoadingSpinner;
