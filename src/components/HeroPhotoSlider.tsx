import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, Sparkles, Eye } from 'lucide-react';

export interface PhotoSlide {
  id: string;
  image: string;
  caption: string;
  tag: string;
}

const PHOTO_SLIDES: PhotoSlide[] = [
  {
    id: 'slide-1',
    image: '/images/slider/slide1.jpg',
    caption: 'Warm Namaste Greetings & Morning Values in Classroom',
    tag: 'Balwant Nagar Campus'
  },
  {
    id: 'slide-2',
    image: '/images/slider/slide2.jpg',
    caption: 'Proud of My Apple Drawing Worksheet in Nursery Class',
    tag: 'Sensory Art Zone'
  },
  {
    id: 'slide-3',
    image: '/images/slider/slide3.jpg',
    caption: 'Joyful Teacher Guidance & Dedicated Educator Care',
    tag: 'Learning Care'
  },
  {
    id: 'slide-4',
    image: '/images/slider/slide4.jpg',
    caption: 'Hands-on Number Puzzles & Phonics Activity',
    tag: 'Heureka Curriculum'
  },
  {
    id: 'slide-5',
    image: '/images/slider/slide5.jpg',
    caption: 'Building Block Towers & Motor Skills Play',
    tag: 'Playgroup Activity'
  }
];

export const HeroPhotoSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Preload images for instant rendering
  useEffect(() => {
    PHOTO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Auto-slide effect every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHOTO_SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PHOTO_SLIDES.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PHOTO_SLIDES.length) % PHOTO_SLIDES.length);
  };

  const prevIndex = (currentIndex - 1 + PHOTO_SLIDES.length) % PHOTO_SLIDES.length;
  const nextIndex = (currentIndex + 1) % PHOTO_SLIDES.length;

  const currentSlide = PHOTO_SLIDES[currentIndex];
  const prevSlide = PHOTO_SLIDES[prevIndex];
  const nextSlide = PHOTO_SLIDES[nextIndex];

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 group max-w-7xl mx-auto my-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Multi-Photo Stage Showcase Slider */}
      <div className="relative h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full flex items-center justify-between px-4 md:px-8 overflow-hidden bg-slate-950">
        {/* Soft Ambient Blurred Background for Seamless Color Aura */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`bg-${currentSlide.id}`}
            src={currentSlide.image}
            alt=""
            loading="eager"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 pointer-events-none"
          />
        </AnimatePresence>

        {/* LEFT SIDE PREVIEW CARD (Fills Left Space) */}
        <div
          onClick={goToPrev}
          className="hidden md:flex flex-col items-center justify-center shrink-0 w-44 lg:w-56 h-[75%] relative z-10 cursor-pointer group/prev transition-all duration-300 hover:scale-105 opacity-60 hover:opacity-100"
          title={`Previous: ${prevSlide.caption}`}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl relative">
            <img
              src={prevSlide.image}
              alt=""
              className="w-full h-full object-cover group-hover/prev:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/40 group-hover/prev:bg-slate-950/10 transition-colors" />
            <span className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[10px] font-black px-2 py-0.5 rounded-md border border-white/20">
              ‹ Previous
            </span>
          </div>
        </div>

        {/* CENTER MAIN ACTIVE PHOTO (100% Uncropped & Perfectly Centered) */}
        <div className="relative z-20 flex-1 h-full flex items-center justify-center py-2 px-2">
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${currentSlide.id}`}
              src={currentSlide.image}
              alt={currentSlide.caption}
              loading="eager"
              decoding="async"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-full w-auto max-w-full object-contain mx-auto drop-shadow-2xl rounded-xl"
            />
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE PREVIEW CARD (Fills Right Space) */}
        <div
          onClick={goToNext}
          className="hidden md:flex flex-col items-center justify-center shrink-0 w-44 lg:w-56 h-[75%] relative z-10 cursor-pointer group/next transition-all duration-300 hover:scale-105 opacity-60 hover:opacity-100"
          title={`Next: ${nextSlide.caption}`}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl relative">
            <img
              src={nextSlide.image}
              alt=""
              className="w-full h-full object-cover group-hover/next:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/40 group-hover/next:bg-slate-950/10 transition-colors" />
            <span className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-[10px] font-black px-2 py-0.5 rounded-md border border-white/20">
              Next ›
            </span>
          </div>
        </div>

        {/* Top Badges Overlay */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
          <span className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
            <Camera className="w-4 h-4 text-slate-950" />
            <span>EuroKids Balwant Nagar</span>
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full hidden sm:inline-block border border-white/20">
            {currentSlide.tag}
          </span>
        </div>

        {/* Counter Top Right */}
        <div className="absolute top-4 right-4 z-30 bg-slate-900/80 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/20 shadow-md">
          {currentIndex + 1} / {PHOTO_SLIDES.length}
        </div>

        {/* Mobile Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center border border-white/20 shadow-xl"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center border border-white/20 shadow-xl"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Caption Overlay */}
        <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent pt-12 pb-5 px-6 flex flex-col items-center text-center">
          <p className="text-sm sm:text-base md:text-lg font-black text-white tracking-wide max-w-2xl mb-3 drop-shadow-md">
            {currentSlide.caption}
          </p>

          <div className="flex items-center gap-2">
            {PHOTO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
