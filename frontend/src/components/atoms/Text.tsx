// src/components/atoms/Text.tsx
import React from 'react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, variant = 'p', className = '' }) => {
  const Component = variant as React.ElementType;
  return <Component className={className}>{children}</Component>;
};

export default Text;

// Usage example:
//
// import Text from './components/atoms/Text';
// <Text variant="h3">Titre</Text>
// <Text variant="p" className="error">Erreur</Text>