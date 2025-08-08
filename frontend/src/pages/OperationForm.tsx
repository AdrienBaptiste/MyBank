import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import { fetchCategories, createCategory } from '../services/category';
import { createOperation, updateOperation, fetchOperations } from '../services/operation';
import type { Category, Operation } from '../types/operation';

const OperationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    if (isEdit && id) {
      loadOperation(parseInt(id));
    }
  }, [isEdit, id]);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      // Vérifier que data est bien un tableau
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Categories data is not an array:', data);
        setCategories([]);
        setError('Format de données des catégories incorrect');
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
      setError('Erreur lors du chargement des catégories');
    }
  };

  const loadOperation = async (operationId: number) => {
    try {
      const operations = await fetchOperations();
      const operation = operations.find((op: Operation) => op.id === operationId);
      if (operation) {
        setLabel(operation.label);
        setAmount(operation.amount.toString());
        setCategory(operation.category?.id.toString() || '');
        setDate(operation.date);
      }
    } catch {
      setError('Erreur lors du chargement de l\'opération');
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    setLoading(true);
    try {
      const response = await createCategory(newCategoryName);
      const newCategory = response.data;
      // Recharger la liste complète des catégories de l'utilisateur
      await loadCategories();
      // Sélectionner la nouvelle catégorie créée
      if (newCategory?.id) {
        setCategory(String(newCategory.id));
      }
      setNewCategoryName('');
      setShowNewCategory(false);
      setSuccess('Catégorie créée avec succès !');
    } catch {
      setError('Erreur lors de la création de la catégorie');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      if (isEdit && id) {
        await updateOperation(parseInt(id), label, parseFloat(amount), category, date);
        setSuccess('Opération modifiée !');
      } else {
        await createOperation(label, parseFloat(amount), category, date);
        setSuccess('Opération créée !');
        setLabel(''); setAmount(''); setCategory(''); setDate('');
      }
      
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch {
      setError(isEdit ? 'Erreur lors de la modification de l\'opération' : 'Erreur lors de la création de l\'opération');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-[500px] max-w-lg">
        <Text variant="h2" className="text-2xl font-bold text-center mb-2">
          {isEdit ? 'Modifier l\'opération' : 'Nouvelle opération'}
        </Text>
        
        <Input 
          type="text" 
          placeholder="Libellé" 
          value={label} 
          onChange={e => setLabel(e.target.value)} 
          required 
        />
        
        <Input 
          type="number" 
          step="0.01"
          placeholder="Montant" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          required 
        />
        
        {/* Category Selection with Inline Creation */}
        <div className="space-y-2">
          <select 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {Array.isArray(categories) && categories.map((cat: Category) => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            ))}
          </select>
          
          {!showNewCategory && (
            <Button 
              type="button"
              content="+ Créer une nouvelle catégorie" 
              onClick={() => setShowNewCategory(true)}
              variant="success"
              size="sm"
              fullWidth
            />
          )}
          
          {showNewCategory && (
            <div className="flex gap-2">
              <Input 
                type="text" 
                placeholder="Nom de la nouvelle catégorie" 
                value={newCategoryName} 
                onChange={e => setNewCategoryName(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button"
                content="Créer" 
                onClick={handleCreateCategory}
                disabled={loading || !newCategoryName.trim()}
                variant="success"
              />
              <Button 
                type="button"
                content="Annuler" 
                onClick={() => {
                  setShowNewCategory(false);
                  setNewCategoryName('');
                }}
                variant="outline"
              />
            </div>
          )}
        </div>
        
        <Input 
          type="date" 
          placeholder="Date" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
          required 
        />
        
        <div className="flex gap-2">
          <Button 
            type="submit" 
            content={loading ? 'En cours...' : (isEdit ? 'Modifier l\'opération' : 'Créer l\'opération')}
            disabled={loading}
            variant="primary"
            className="flex-1"
          />
          <Button 
            type="button"
            content="Retour" 
            onClick={() => navigate('/dashboard')}
            variant="secondary"
          />
        </div>
        
        {success && <Text className="text-green-600 text-center">{success}</Text>}
        {error && <Text className="text-red-600 text-center">{error}</Text>}
      </form>
    </div>
  );
};

export default OperationForm;
