const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(amount);
};

export const formatDate = (dateString: string): string => {
  return dateFormatter.format(new Date(dateString));
};
