import React from 'react';

export interface SectionHeaderProps {
  pretitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  pretitle,
  title,
  description,
  centered = false,
  action,
}) => {
  return (
    <div
      className={`mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 ${
        centered ? 'text-center items-center' : ''
      }`}
    >
      <div className={`max-w-3xl ${centered ? 'mx-auto' : ''}`}>
        {pretitle && (
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-gold-500 inline-block"></span>
            <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">
              {pretitle}
            </span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-800 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm sm:text-base text-brand-700 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
export default SectionHeader;
