import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Camera } from 'lucide-react';

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
    caption: 'Warm Namaste Greetings & Morning Prayer',
    tag: 'Balwant Nagar Campus'
  },
  {
    id: 'slide-2',
    image: '/images/slider/slide2.jpg',
    caption: 'Proud of My Apple Drawing Worksheet in Nursery Class',
    tag: 'Sensory Art & Creative Zone'
  },
  {
    id: 'slide-3',
    image: '/images/slider/slide3.jpg',
    caption: 'Joyful Teacher Guidance & Educator Care',
    tag: 'Learning Environment'
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

  const currentSlide = PHOTO_SLIDES[currentIndex];

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Photo Showcase Container */}
      <div className="relative h-[380px] sm:h-[460px] md:h-[500px] w-full flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Ambient Blurred Background for Vertical Portrait Photos */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`bg-${currentSlide.id}`}
            src={currentSlide.image}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125"
          />
        </AnimatePresence>

        {/* Full Uncropped Main Child Photo (object-contain ensures 100% of child face & body is visible) */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`img-${currentSlide.id}`}
            src={currentSlide.image}
            alt={currentSlide.caption}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 h-full w-auto max-w-full object-contain mx-auto shadow-2xl py-2"
          />
        </AnimatePresence>

        {/* Minimal Subtle Tag Top Left */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="bg-amber-400 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Balwant Nagar Campus</span>
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20 hidden sm:inline-block">
            {currentSlide.tag}
          </span>
        </div>

        {/* Slide Counter Top Right */}
        <div className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
          {currentIndex + 1} / {PHOTO_SLIDES.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all opacity-80 hover:opacity-100 hover:scale-110"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all opacity-80 hover:opacity-100 hover:scale-110"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Clean Subtle Caption Bar at Bottom (Does NOT cover child's face) */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-8 pb-3 px-4 flex flex-col items-center text-center">
          <p className="text-xs sm:text-sm font-bold text-white tracking-wide max-w-lg mb-2">
            {currentSlide.caption}
          </p>

          {/* Dot Progress Indicators */}
          <div className="flex items-center gap-1.5">
            {PHOTO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
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
