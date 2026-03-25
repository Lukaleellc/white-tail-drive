import React from 'react';
import Image from 'next/image';

interface WildlifeCardProps {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
}

export const WildlifeCard: React.FC<WildlifeCardProps> = ({ 
  title, 
  description, 
  imageSrc, 
  className = "" 
}) => {
  return (
    <div className={`relative group overflow-hidden rounded-sm border border-stone-800 ${className}`}>
      <div className="relative aspect-[4/5] w-full">
        <Image 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-105" 
          alt={title} 
          src={imageSrc} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
          <h4 className="text-xl font-serif text-stone-100 italic mb-2">{title}</h4>
          <p className="text-stone-400 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
