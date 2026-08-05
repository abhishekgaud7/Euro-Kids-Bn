import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const FloatingWhatsApp: React.FC = () => {
  const { schoolInfo } = useData();
  const rawNumber = schoolInfo.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(
    "Hello EuroKids Balwant Nagar! I'd like to enquire about preschool admissions for my child."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip bubble on desktop */}
      <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-2xl shadow-xl border border-slate-800 animate-pulse-slow">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>Chat with Admissions Desk</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group relative border-2 border-white"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white text-[9px] font-black flex items-center justify-center">
          1
        </span>
      </a>
    </div>
  );
};
