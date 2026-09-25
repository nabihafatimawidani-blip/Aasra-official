import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderAccent?: 'none' | 'brand' | 'amber' | 'emerald' | 'gold';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  borderAccent = 'none',
}) => {
  const accentStyles = {
    none: '',
    brand: 'border-t-4 border-t-brand-700',
    amber: 'border-t-4 border-t-gold-500',
    emerald: 'border-t-4 border-t-brand-600',
    gold: 'border-t-4 border-t-gold-500',
  };

  return (
    <div
      className={`bg-white rounded-lg border border-brand-200/80 shadow-sm overflow-hidden ${
        hoverEffect ? 'transition-all duration-200 hover:shadow-md hover:border-brand-300' : ''
      } ${accentStyles[borderAccent]} ${className}`}
    >
      {children}
    </div>
  );
};
export default Card;
