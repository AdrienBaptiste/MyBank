import React from 'react';
import { Link } from 'react-router-dom';

const HomeLink: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700">
      <span className="inline-block w-2 h-2 bg-blue-600 rounded-sm" />
      <span>MyBank</span>
    </Link>
  );
};

export default HomeLink;
