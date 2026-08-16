import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

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

  const currentSlide = PHOTO_SLIDES[currentIndex];

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 group w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* High-Resolution Side-by-Side Fixed Proportional Slider */}
      <div className="relative h-[300px] sm:h-[360px] lg:h-[400px] w-full overflow-hidden bg-slate-950">
        {/* High Quality Crisp Image Slide */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`img-${currentSlide.id}`}
            src={currentSlide.image}
            alt={currentSlide.caption}
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Top Badges Overlay */}
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
          <span className="bg-amber-400 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-slate-950" />
            <span>EuroKids Campus</span>
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full hidden sm:inline-block border border-white/20">
            {currentSlide.tag}
          </span>
        </div>

        {/* Counter Top Right */}
        <div className="absolute top-3.5 right-3.5 z-20 bg-slate-900/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full border border-white/20 shadow-md">
          {currentIndex + 1} / {PHOTO_SLIDES.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-2xl bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 shadow-xl transition-all opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-2xl bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 shadow-xl transition-all opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Caption & Dot Indicators */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-10 pb-3.5 px-5 flex flex-col items-center text-center">
          <p className="text-xs sm:text-sm font-black text-white tracking-wide max-w-xl mb-2 drop-shadow-md">
            {currentSlide.caption}
          </p>

          <div className="flex items-center gap-1.5">
            {PHOTO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
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
