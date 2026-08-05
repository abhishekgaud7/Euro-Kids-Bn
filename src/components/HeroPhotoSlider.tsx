import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';

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
    caption: 'Warm Namaste Greetings & Morning Discipline',
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
    caption: 'Joyful Teacher Guidance & Educator Care',
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

  // Preload next image for instant performance
  useEffect(() => {
    PHOTO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Auto-slide effect every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHOTO_SLIDES.length);
    }, 3500);

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
      className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-slate-900 group max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Compact Normal Height Slider Showcase */}
      <div className="relative h-[280px] sm:h-[350px] md:h-[380px] w-full flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Ambient Blurred Background for Vertical Portrait Photos */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`bg-${currentSlide.id}`}
            src={currentSlide.image}
            alt=""
            loading="eager"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          />
        </AnimatePresence>

        {/* Uncropped Child Photo (object-contain guarantees 100% visible face & body) */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`img-${currentSlide.id}`}
            src={currentSlide.image}
            alt={currentSlide.caption}
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 h-full w-auto max-w-full object-contain mx-auto shadow-xl py-1.5"
          />
        </AnimatePresence>

        {/* Minimal Subtle Tag Top Left */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 uppercase tracking-wider">
            <Camera className="w-3 h-3 text-slate-950" />
            <span>Balwant Nagar Campus</span>
          </span>
          <span className="bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-1 rounded-full hidden sm:inline-block border border-white/20">
            {currentSlide.tag}
          </span>
        </div>

        {/* Counter Top Right */}
        <div className="absolute top-3 right-3 z-20 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
          {currentIndex + 1} / {PHOTO_SLIDES.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Caption & Dot Indicators at Bottom */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-6 pb-2.5 px-3 flex flex-col items-center text-center">
          <p className="text-xs font-bold text-white tracking-wide max-w-md mb-1.5 truncate">
            {currentSlide.caption}
          </p>

          <div className="flex items-center gap-1.5">
            {PHOTO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
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
