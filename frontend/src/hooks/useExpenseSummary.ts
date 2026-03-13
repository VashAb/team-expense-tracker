import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import type { ExpenseSummary } from '../types/expense';

export const useExpenseSummary = () => {
  return useQuery<ExpenseSummary[]>({
    queryKey: ['expenses', 'summary'],
    queryFn: async () => {
      const { data } = await api.get('/expenses/summary');
      return data;
    },
  });
};
