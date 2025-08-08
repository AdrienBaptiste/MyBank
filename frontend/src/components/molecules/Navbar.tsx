import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  onNavigate?: () => void;
  className?: string;
  isAuthenticated?: boolean;
};

const linkBase = 'px-3 py-2 rounded-md text-sm font-medium';
const linkActive = 'bg-blue-600 text-white';
const linkInactive = 'text-gray-700 hover:bg-gray-100 hover:text-gray-900';

const Navbar: React.FC<Props> = ({ onNavigate, className = '', isAuthenticated = false }) => {
  return (
    <nav className={`flex flex-col gap-1 md:flex-row md:items-center md:gap-2 ${className}`}>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
        onClick={onNavigate}
      >
        Dashboard
      </NavLink>
      {isAuthenticated && (
        <NavLink
          to="/categories"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
          onClick={onNavigate}
        >
          Catégories
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
