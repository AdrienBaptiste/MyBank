import React, { useState, useEffect } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import { fetchCategories } from '../services/category';
import { createOperation } from '../services/operation';

const OperationForm: React.FC = () => {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setError('Erreur lors du chargement des catégories'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createOperation(label, parseFloat(amount), category, date);
      setSuccess('Opération créée !');
      setLabel(''); setAmount(''); setCategory(''); setDate('');
    } catch (err) {
      setError('Erreur lors de la création de l\'opération');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-[500px] max-w-sm">
        <Text variant="h2" className="text-2xl font-bold text-center mb-2">Nouvelle opération</Text>
        <Input type="text" placeholder="Libellé" value={label} onChange={e => setLabel(e.target.value)} />
        <Input type="number" placeholder="Montant" value={amount} onChange={e => setAmount(e.target.value)} />
        <select className="portalInput mb-2" value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Sélectionner une catégorie</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <Input type="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
        <Button type="submit" content="Créer l'opération" />
        {success && <Text className="text-green-600 text-center">{success}</Text>}
        {error && <Text className="text-red-600 text-center">{error}</Text>}
      </form>
    </div>
  );
};

export default OperationForm;
