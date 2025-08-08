import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/category';

interface Category {
  id: number;
  title: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data as Category[]);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur lors du chargement des catégories';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-4">Chargement des catégories...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Mes catégories</h1>
        <a href="/category/new" className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm">Ajouter une catégorie</a>
      </div>
      {categories.length === 0 ? (
        <div className="text-gray-600">Aucune catégorie pour le moment.</div>
      ) : (
        <ul className="divide-y border rounded-md">
          {categories.map((c) => (
            <li key={c.id} className="p-3 flex items-center justify-between">
              <span>{c.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
