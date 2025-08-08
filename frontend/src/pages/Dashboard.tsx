import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { fetchOperations, deleteOperation } from '../services/operation';
import type { Operation } from '../types/operation';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [operations, setOperations] = useState<Operation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOperations();
  }, []);

  const loadOperations = async () => {
    try {
      setLoading(true);
      const data = await fetchOperations();
      setOperations(data);
    } catch {
      setError('Erreur lors du chargement des opérations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette opération ?')) {
      try {
        await deleteOperation(id);
        setOperations(operations.filter(op => op.id !== id));
      } catch {
        setError('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/operation/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Text variant="h1" className="text-3xl font-bold text-gray-900">
              Dashboard{user ? `, ${user.name}` : ''}
            </Text>
            <Text className="text-gray-600 mt-2">
              Gérez vos opérations bancaires
            </Text>
          </div>
          <div className="flex gap-4">
            <Button 
              content="Nouvelle opération" 
              onClick={() => navigate('/operation/new')}
              variant="primary"
            />
          </div>
        </div>

        {/* Operations List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Text variant="h2" className="text-xl font-semibold mb-4">
            Mes opérations
          </Text>
          
          {loading && <Text>Chargement...</Text>}
          {error && <Text className="text-red-600">{error}</Text>}
          
          {!loading && operations.length === 0 && (
            <Text className="text-gray-500 text-center py-8">
              Aucune opération trouvée. Créez votre première opération !
            </Text>
          )}

          {!loading && operations.length > 0 && (
            <div className="space-y-4">
              {operations.map((operation) => (
                <div key={operation.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <Text variant="h3" className="font-medium text-lg">
                        {operation.label}
                      </Text>
                      <span className={`text-lg font-semibold ${operation.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {operation.amount >= 0 ? '+' : ''}{operation.amount}€
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>📅 {new Date(operation.date).toLocaleDateString('fr-FR')}</span>
                      {operation.category && (
                        <span>🏷️ {operation.category.title}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(operation.id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(operation.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
