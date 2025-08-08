// components/atoms/Input.tsx
import React from 'react';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  className?: string;
  required?: boolean;
  step?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, type = 'text', value, onChange, checked, className, required, step }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      checked={checked}
      className={className || 'portalInput mb-2'}
      required={required}
      step={step}
    />
  );
};

export default Input;
