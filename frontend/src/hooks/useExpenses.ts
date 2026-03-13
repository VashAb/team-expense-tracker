import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { Expense } from '../types/expense';

export const useExpenses = (category?: string) => {
  return useQuery<Expense[]>({
    queryKey: ['expenses', category],
    queryFn: async () => {
      const params = category ? { category } : {};
      const { data } = await api.get('/expenses', { params });
      return data;
    },
  });
};
