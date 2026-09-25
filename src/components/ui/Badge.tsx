import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'emerald' | 'amber' | 'slate' | 'red' | 'indigo' | 'outline' | 'gold';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'md',
  className = '',
  icon,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  const variantStyles = {
    brand: 'bg-brand-100 text-brand-800 border border-brand-200',
    emerald: 'bg-brand-100 text-brand-800 border border-brand-200',
    amber: 'bg-gold-100 text-gold-800 border border-gold-200',
    gold: 'bg-gold-100 text-gold-800 border border-gold-200',
    slate: 'bg-brand-50 text-brand-700 border border-brand-200',
    red: 'bg-red-50 text-red-800 border border-red-200',
    indigo: 'bg-brand-100 text-brand-800 border border-brand-200',
    outline: 'bg-transparent text-brand-700 border border-brand-300',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
export default Badge;
