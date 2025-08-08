import api from '../api/axios';

export const fetchCategories = async () => {
  const res = await api.get('/api/categories');
  // API Platform retourne un objet avec member/hydra:member/items selon le format
  console.log('Categories API response:', res.data);
  if (res.data && Array.isArray(res.data.member)) {
    return res.data.member;
  }
  if (res.data && Array.isArray(res.data['hydra:member'])) {
    return res.data['hydra:member'];
  }
  if (res.data && Array.isArray(res.data.items)) {
    return res.data.items;
  }
  if (Array.isArray(res.data)) {
    return res.data;
  }
  console.error('Unexpected categories format:', res.data);
  return [];
};

export const createCategory = async (title: string) => {
  console.log('Creating category with title:', title);
  return api.post('/api/categories', { title });
};
