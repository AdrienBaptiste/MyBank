import api from '../api/axios';

export const createOperation = async (label: string, amount: number, category: string, date: string) => {
  return api.post('/operations', {
    label,
    amount,
    category: `/api/categories/${category}`,
    date,
  });
};
