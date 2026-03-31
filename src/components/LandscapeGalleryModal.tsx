'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { landscapeGallery } from '../data/galleries';

interface LandscapeGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LandscapeGalleryModal({ isOpen, onClose }: LandscapeGalleryModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Mist Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-xl transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] w-12 h-12 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-400 bg-stone-900/50 backdrop-blur-md transition-all duration-300"
        aria-label="Close Gallery"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </button>

      {/* Scrolling Content Area */}
      <div className="relative z-[105] w-full h-full overflow-y-auto px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          {/* Gallery Header */}
          <div className="mb-16 md:mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-100 mb-4 tracking-tight">The Landscape</h2>
            <div className="w-12 h-px bg-[#00A3FF] mx-auto"></div>
            <p className="mt-6 text-stone-400 font-light tracking-wide max-w-2xl mx-auto">
              A comprehensive view of the 36.25 acre property, from the spring-fed pond to the expansive post oak canopy.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {landscapeGallery.map((image, index) => (
              <div key={index} className="relative w-full aspect-[4/3] group overflow-hidden bg-stone-900">
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
