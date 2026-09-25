import React from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: string;
  variant?: 'brand' | 'amber' | 'emerald' | 'slate' | 'gold';
  badgeText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  trend,
  variant = 'brand',
  badgeText,
}) => {
  const iconColor = {
    brand: 'text-brand-800 bg-brand-50 border-brand-200',
    amber: 'text-gold-700 bg-gold-50 border-gold-200',
    emerald: 'text-brand-700 bg-brand-50 border-brand-200',
    slate: 'text-brand-700 bg-brand-50 border-brand-200',
    gold: 'text-gold-700 bg-gold-50 border-gold-200',
  };

  return (
    <div className="bg-white rounded-lg border border-brand-200/80 p-5 shadow-sm hover:border-brand-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-brand-500 uppercase tracking-wider">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-brand-800 tracking-tight">{value}</p>
        </div>
        {icon && (
          <div
            className={`p-2.5 rounded-lg border shrink-0 ${iconColor[variant]}`}
          >
            {icon}
          </div>
        )}
      </div>

      {(subtext || trend || badgeText) && (
        <div className="mt-3 pt-3 border-t border-brand-100 flex items-center justify-between text-xs text-brand-500">
          {subtext && <span>{subtext}</span>}
          {badgeText && (
            <span className="font-semibold text-brand-800 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              {badgeText}
            </span>
          )}
          {trend && <span className="text-gold-700 font-medium">{trend}</span>}
        </div>
      )}
    </div>
  );
};
export default StatCard;
