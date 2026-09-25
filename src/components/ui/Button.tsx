import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'amber' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-brand-800 text-white hover:bg-brand-900 border border-brand-900 focus:ring-gold-500 shadow-sm',
    secondary:
      'bg-brand-50 text-brand-800 hover:bg-brand-100 border border-brand-200 focus:ring-brand-400',
    outline:
      'bg-transparent text-brand-800 hover:text-brand-900 hover:bg-brand-100/60 border border-brand-300 focus:ring-brand-400',
    ghost:
      'bg-transparent text-brand-700 hover:text-brand-900 hover:bg-brand-100/50 focus:ring-brand-300',
    amber:
      'bg-gold-500 text-white hover:bg-gold-600 border border-gold-600 focus:ring-gold-400 shadow-sm',
    gold:
      'bg-gold-500 text-white hover:bg-gold-600 border border-gold-600 focus:ring-gold-400 shadow-sm',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {content}
    </button>
  );
};
export default Button;
