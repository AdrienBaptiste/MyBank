import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import HomeLink from '../atoms/HomeLink';
import Navbar from '../molecules/Navbar';
import Button from '../atoms/Button';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    setOpen(false);
    navigate('/');
  };

  const onAuthNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HomeLink />
        </div>

        {/* Desktop navbar */}
        <div className="hidden md:flex items-center gap-4">
          <Navbar isAuthenticated={isAuthenticated} />
          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button type="button" content="Connexion" onClick={() => onAuthNavigate('/login')} variant="primary" />
              <Button type="button" content="Inscription" onClick={() => onAuthNavigate('/register')} variant="secondary" />
            </div>
          ) : (
            <Button type="button" content="Déconnexion" onClick={onLogout} variant="danger" />
          )}
        </div>

        {/* Burger button */}
        <button
          aria-label="Menu"
          className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-gray-100"
          onClick={() => setOpen(o => !o)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer with overlay and slide animation */}
      <div className={`md:hidden fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity ${open ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
          aria-hidden
        />
        {/* Side panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="px-4 py-4 flex items-center justify-between border-b">
            <HomeLink />
            <button
              aria-label="Fermer le menu"
              className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-4 py-4 flex flex-col gap-3">
            <Navbar isAuthenticated={isAuthenticated} onNavigate={() => setOpen(false)} />
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button type="button" content="Connexion" onClick={() => onAuthNavigate('/login')} variant="primary" fullWidth />
                <Button type="button" content="Inscription" onClick={() => onAuthNavigate('/register')} variant="secondary" fullWidth />
              </div>
            ) : (
              <Button type="button" content="Déconnexion" onClick={onLogout} variant="danger" fullWidth />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
