import React, { useState } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';

const CategoryForm: React.FC = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call API to create category
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-[500px] max-w-sm">
        <Text variant="h2" className="text-2xl font-bold text-center mb-2">Nouvelle catégorie</Text>
        <Input type="text" placeholder="Nom de la catégorie" value={name} onChange={e => setName(e.target.value)} />
        <Button type="submit" content="Créer la catégorie" />
      </form>
    </div>
  );
};

export default CategoryForm;
