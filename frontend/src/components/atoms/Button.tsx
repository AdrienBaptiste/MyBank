// components/atoms/Button.tsx
import React from 'react';

interface ButtonProps {
  content: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const base = 'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
  secondary: 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-400',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
  outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-300',
  ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-200',
};

const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  type = 'button',
  className,
  disabled,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}) => {
  const cls = [
    base,
    sizes[size],
    variants[variant],
    fullWidth ? 'w-full' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button onClick={onClick} type={type} className={cls} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;
