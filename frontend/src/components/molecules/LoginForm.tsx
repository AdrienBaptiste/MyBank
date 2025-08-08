// components/organisms/LoginForm.tsx
import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Text from '../atoms/Text';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setError('');
    onLogin(email, password);
  };

  return (
    <div className="userLogin flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-[500px] max-w-sm">
      <Text variant="h2" className="text-2xl font-bold text-center mb-2">Connexion</Text>
      <Input className="portalInput mb-2" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input className="portalInput mb-2" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <Button content="Log-in" type="submit" onClick={handleSubmit} />
      {error && <Text variant="p" className="text-red-600 text-center mt-2">{error}</Text>}
    </div>
  );
};

export default LoginForm;
