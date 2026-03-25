import React from 'react';

interface PropertyStatProps {
  value: string | number;
  label: string;
  className?: string;
}

export const PropertyStat: React.FC<PropertyStatProps> = ({ 
  value, 
  label, 
  className = "" 
}) => {
  return (
    <div className={className}>
      <div className="text-stone-100 text-3xl font-serif mb-2">{value}</div>
      <div className="text-stone-600 font-sans text-[0.65rem] uppercase tracking-widest">{label}</div>
    </div>
  );
};
