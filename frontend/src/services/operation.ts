import api from '../api/axios';

export const fetchOperations = async () => {
  const res = await api.get('/api/operations');
  return res.data['hydra:member'] || res.data;
};

export const createOperation = async (label: string, amount: number, category: string, date: string) => {
  return api.post('/api/operations', {
    label,
    amount,
    category: `/api/categories/${category}`,
    date,
  });
};

export const updateOperation = async (id: number, label: string, amount: number, category: string, date: string) => {
  return api.put(`/api/operations/${id}`, {
    label,
    amount,
    category: `/api/categories/${category}`,
    date,
  });
};

export const deleteOperation = async (id: number) => {
  return api.delete(`/api/operations/${id}`);
};
