// components/atoms/Input.tsx
import React from 'react';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, type = 'text', value, onChange, checked, className }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      checked={checked}
      className={className}
    />
  );
};

export default Input;
