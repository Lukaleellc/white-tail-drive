import React from 'react';

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
  labelClassName?: string;
  titleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  label, 
  title, 
  className = "", 
  labelClassName = "", 
  titleClassName = "" 
}) => {
  return (
    <div className={`mb-12 ${className}`}>
      <h4 className={`section-label ${labelClassName}`}>{label}</h4>
      <h2 className={`section-title ${titleClassName}`}>{title}</h2>
    </div>
  );
};
