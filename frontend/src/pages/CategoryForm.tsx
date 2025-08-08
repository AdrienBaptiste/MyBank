import React, { useState } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import { createCategory } from '../services/category';
import { useNavigate } from 'react-router-dom';

const CategoryForm: React.FC = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const title = name.trim();
    if (!title) return;
    setLoading(true);
    try {
      await createCategory(title);
      setSuccess('Catégorie créée avec succès');
      setTimeout(() => navigate('/categories'), 600);
    } catch (err) {
      console.error('Create category failed', err);
      setError("Erreur lors de la création de la catégorie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <Text variant="h2" className="text-2xl font-bold text-center mb-2">Nouvelle catégorie</Text>
        <Input type="text" placeholder="Nom de la catégorie" value={name} onChange={e => setName(e.target.value)} />
        <div className="flex gap-2">
          <Button type="submit" content={loading ? 'Création...' : 'Créer la catégorie'} variant="primary" className="flex-1" disabled={loading || !name.trim()} />
          <Button type="button" content="Annuler" variant="outline" onClick={() => window.history.back()} />
        </div>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
      </form>
    </div>
  );
};

export default CategoryForm;
