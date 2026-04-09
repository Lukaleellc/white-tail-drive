import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactOverlay: React.FC<ContactOverlayProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when the overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-500"
      onClick={onClose}
    >
      {/* Backdrop with Mist Effect */}
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-md" />

      {/* Contact Card */}
      <div
        className="relative z-10 w-full max-w-xl mx-6 bg-stone-900 border border-stone-800 p-12 md:p-20 text-center shadow-3xl animate-in zoom-in-95 slide-in-from-bottom-5 duration-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-stone-500 hover:text-stone-100 transition-colors duration-300"
          aria-label="Close"
        >
          <X size={24} strokeWidth={1} />
        </button>

        <div className="mb-12">
          <h4 className="text-stone-500 font-sans text-[0.7rem] uppercase tracking-[0.3rem] mb-4">Inquire</h4>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 italic">Private Showing</h2>
        </div>

        <div className="space-y-10">
          <div>
            <span className="block text-stone-600 font-sans text-[0.6rem] uppercase tracking-widest mb-2">Agent</span>
            <span className="text-xl md:text-2xl text-stone-200 font-serif">James Bigley</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-stone-800 pt-10">
            <div>
              <span className="block text-stone-600 font-sans text-[0.6rem] uppercase tracking-widest mb-2">Phone</span>
              <a href="tel:+15125550123" className="text-lg text-stone-300 hover:text-[#00A3FF] transition-colors duration-300 tracking-tighter">
                +1 (210) 241-9496
              </a>
            </div>
            <div>
              <span className="block text-stone-600 font-sans text-[0.6rem] uppercase tracking-widest mb-2">Email</span>
              <a href="mailto:jbigleyf4tf@gmail.com" className="text-lg text-stone-300 hover:text-[#00A3FF] transition-colors duration-300 tracking-tighter">
                jbigleyf4tf@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-stone-600 text-[0.65rem] uppercase tracking-[0.1rem] font-light">
          Available by appointment only
        </div>
      </div>
    </div>
  );
};
