import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export const CardImage = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`card-image ${className}`}>
      {children}
    </div>
  );
};