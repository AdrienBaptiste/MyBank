import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Text from '../atoms/Text';

interface RegisterFormProps {
  onRegister: (name: string, email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !password) return;
    onRegister(name, email, password);
  };

  return (
    <div className="userRegister flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-[500px] max-w-sm">
      <Text variant="h2" className="text-2xl font-bold text-center mb-2">Inscription</Text>
      <Input className="portalInput mb-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input className="portalInput mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input className="portalInput mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button content="Register" onClick={handleSubmit} />
    </div>
  );
};

export default RegisterForm;
