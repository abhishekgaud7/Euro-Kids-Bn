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
      className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 group max-w-7xl mx-auto my-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Grand High-Resolution Full Showcase Slider */}
      <div className="relative h-[380px] sm:h-[480px] md:h-[560px] lg:h-[620px] w-full overflow-hidden">
        {/* Full Image Slide with Subtle Scale Animation */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`slide-${currentSlide.id}`}
            src={currentSlide.image}
            alt={currentSlide.caption}
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Top Badges overlay */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
            <Camera className="w-4 h-4 text-slate-950" />
            <span>EuroKids Balwant Nagar</span>
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full hidden sm:inline-block border border-white/20">
            {currentSlide.tag}
          </span>
        </div>

        {/* Counter Top Right */}
        <div className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/20 shadow-md">
          {currentIndex + 1} / {PHOTO_SLIDES.length}
        </div>

        {/* Big Touch-Friendly Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 shadow-xl transition-all opacity-80 hover:opacity-100 hover:scale-110"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 shadow-xl transition-all opacity-80 hover:opacity-100 hover:scale-110"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Rich Bottom Caption & Dot Indicators */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-12 pb-5 px-6 flex flex-col items-center text-center">
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
