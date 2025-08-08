import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur MyBank !</h1>
      <p className="mb-8">Connectez-vous ou créez un compte pour accéder à votre dashboard.</p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Se connecter</Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">Créer un compte</Link>
      </div>
    </div>
  );
};

export default Home;
