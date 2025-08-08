import React from 'react';
import { useAppSelector } from '../store/hooks';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenue sur votre dashboard{user ? `, ${user.name}` : ''} !
      </h1>
      <p className="mb-8">Gérez ici vos opérations bancaires, catégories, etc.</p>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Se déconnecter</button>
    </div>
  );
};

export default Dashboard;
