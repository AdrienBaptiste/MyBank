import api from '../api/axios';

export const fetchCategories = async () => {
  const res = await api.get('/categories');
  return res.data['hydra:member'] || res.data;
};

export const createCategory = async (name: string) => {
  return api.post('/categories', { name });
};
