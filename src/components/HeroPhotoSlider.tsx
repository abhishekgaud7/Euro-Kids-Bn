import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Calendar, Heart, ShieldCheck, Camera, Play, Pause } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export interface SlideData {
  id: string;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  tag: string;
  color: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    image: '/images/slider/slide1.jpg',
    badge: 'Morning Discipline & Values',
    title: 'Warm Namaste Greetings & Cultural Values',
    subtitle: 'Toddlers learning respect, mindfulness, and healthy habits together every morning on soft safety mats.',
    tag: 'Balwant Nagar Campus',
    color: 'from-amber-500/90 to-rose-600/90'
  },
  {
    id: 'slide-2',
    image: '/images/slider/slide2.jpg',
    badge: 'Creative Art & Expression',
    title: 'Proud of My Very First Apple Drawing',
    subtitle: 'Encouraging young artists to explore colors, improve pencil grip, and beam with self-confidence.',
    tag: 'Sensory Art Zone',
    color: 'from-rose-500/90 to-purple-600/90'
  },
  {
    id: 'slide-3',
    image: '/images/slider/slide3.jpg',
    badge: 'Nurturing Educators',
    title: 'Joyful Teacher Guidance & Caring Smiles',
    subtitle: 'Dedicated teachers building strong emotional bonds so every child feels completely at home.',
    tag: 'Child First Care',
    color: 'from-sky-500/90 to-indigo-600/90'
  },
  {
    id: 'slide-4',
    image: '/images/slider/slide4.jpg',
    badge: 'Heureka Curriculum',
    title: 'Hands-on Puzzles, Numbers & Phonics Sorting',
    subtitle: 'Tactile learning blocks that make counting, number recognition, and letter sounds effortless.',
    tag: 'Visible Thinking',
    color: 'from-emerald-500/90 to-teal-700/90'
  },
  {
    id: 'slide-5',
    image: '/images/slider/slide5.jpg',
    badge: 'Motor Skills & Play',
    title: 'Constructing Towers & Spatial Problem Solving',
    subtitle: 'Interactive toy blocks fostering early engineering thinking, focus, and hand-eye coordination.',
    tag: 'Playgroup Activity',
    color: 'from-orange-500/90 to-amber-600/90'
  }
];

export const HeroPhotoSlider: React.FC = () => {
  const { openBookVisit, openEnquiryDrawer } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Image with Fade Animation */}
      <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.title}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 text-white z-20">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-slate-950" />
              <span>Real Balwant Nagar Campus</span>
            </span>

            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentSlide.badge}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Auto-Sliding ({currentIndex + 1} / {HERO_SLIDES.length})</span>
          </div>
        </div>

        {/* Bottom Text & Actions */}
        <div className="max-w-2xl space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-2"
            >
              <span className="bg-rose-500/80 backdrop-blur-md text-white text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-md inline-block">
                {currentSlide.tag}
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
                {currentSlide.title}
              </h2>
              <p className="text-xs sm:text-base text-slate-200 font-medium leading-relaxed max-w-xl drop-shadow-xs">
                {currentSlide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={openEnquiryDrawer}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply for Admissions 2026-27</span>
            </button>

            <button
              onClick={openBookVisit}
              className="px-5 py-3 rounded-2xl bg-white/90 hover:bg-white text-slate-900 font-extrabold text-xs sm:text-sm border border-white shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-rose-500" />
              <span>Book Walkthrough</span>
            </button>
          </div>
        </div>
      </div>

      {/* Manual Prev / Next Controls */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all opacity-80 group-hover:opacity-100 hover:scale-110"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all opacity-80 group-hover:opacity-100 hover:scale-110"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Progress Bar & Dot Indicators */}
      <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-8 bg-amber-400 shadow-md'
                : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
