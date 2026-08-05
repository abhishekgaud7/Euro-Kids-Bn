import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, Sparkles, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { GalleryImage } from '../types';

export const GalleryPage: React.FC = () => {
  const { galleryItems } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const categories = ['All', 'Campus', 'Classrooms', 'Curriculum', 'Activities'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-12 py-6 md:py-10">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 rounded-3xl p-8 md:p-12 text-slate-900 border-4 border-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-white/90 text-rose-900 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-rose-200">
            Life at EuroKids
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Moments of Joy, Discovery & Creativity
          </h1>
          <p className="text-base text-slate-800 font-medium leading-relaxed">
            Browse through our classroom learning sessions, outdoor play moments, storytelling circles, and creative art workshops.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-amber-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MASONRY / GRID LAYOUT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -6 }}
              onClick={() => setLightboxImage(item)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md cursor-pointer group hover:shadow-xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-xs">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-4 shadow-2xl relative overflow-hidden border border-slate-200"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden max-h-[70vh] mb-4">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="w-full h-full object-contain bg-slate-900"
                />
              </div>

              <div className="p-2">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                  {lightboxImage.category}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">{lightboxImage.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{lightboxImage.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
