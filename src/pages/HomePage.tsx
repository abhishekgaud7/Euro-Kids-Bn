import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  ArrowRight,
  Sun,
  BookOpen,
  Calendar,
  Users,
  CheckCircle2,
  Star,
  MapPin,
  Compass,
  Play,
  Camera
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { PROGRAMS_DATA, DAY_ROUTINE } from '../data/schoolData';
import { AgeFinderQuiz } from '../components/AgeFinderQuiz';
import { HeroPhotoSlider } from '../components/HeroPhotoSlider';

interface HomePageProps {
  onNavigateTab?: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateTab }) => {
  const { schoolInfo, testimonials, openBookVisit, openEnquiryDrawer } = useData();

  return (
    <div className="space-y-10 py-4 md:py-6">
      {/* 1. TOP CAROUSEL: Auto-sliding Real Campus Photo Showcase (Normal Height, Directly Below Navbar) */}
      <section className="space-y-2">
        <HeroPhotoSlider />
      </section>

      {/* 2. ADMISSION ANNOUNCEMENT & STATS BANNER (DIRECTLY BELOW SLIDER) */}
      <section className="relative rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6 md:p-10 overflow-hidden shadow-xl border-4 border-white text-white">
        {/* Animated Background Doodles */}
        <div className="absolute top-6 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute bottom-10 right-12 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl animate-float-delayed" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black shadow-md">
              <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
              <span>Admissions Open 2026-27 • Balwant Nagar, Gwalior</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              A Happy Place Where <span className="text-amber-400 underline decoration-sky-400">Children Feel at Home</span> While They Learn.
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl">
              EuroKids Balwant Nagar, Thatipur, Gwalior provides a gentle, joyful transition into early learning with CCTV safety, nature play, and the Heureka thinking curriculum.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={openEnquiryDrawer}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Apply for Admissions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openBookVisit}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm border-2 border-white shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>Book Walkthrough</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {schoolInfo.stats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20">
                  <p className="text-xs font-extrabold text-amber-300 leading-tight">{stat.value}</p>
                  <p className="text-[10px] text-slate-200 font-semibold mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Director & Safety Quick Card */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border-2 border-white shadow-lg space-y-3 text-slate-900">
            <span className="bg-blue-100 text-blue-900 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-blue-200">
              EuroKids Quality Care
            </span>
            <h3 className="text-base font-extrabold text-slate-900">Why Gwalior Parents Choose Us</h3>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% CCTV & Police Verified Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Heureka Visible Thinking Curriculum</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Supervised Transport Across Gwalior</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AGE FINDER QUIZ SECTION */}
      <section>
        <AgeFinderQuiz />
      </section>

      {/* 4. PROGRAMS OVERVIEW CARDS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-rose-100 text-rose-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-rose-200">
            Our Early Childhood Programs
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Tailored Learning for Every Growth Stage
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Designed to foster social confidence, language mastery, and creative curiosity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS_DATA.map((prog) => (
            <motion.div
              key={prog.id}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg flex flex-col justify-between group hover:border-amber-400 hover:shadow-xl transition-all"
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden mb-4 h-48 bg-slate-100">
                  <img
                    src={prog.image}
                    alt={prog.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[11px] font-black px-2.5 py-1 rounded-lg shadow-sm">
                    {prog.badge}
                  </span>
                </div>

                <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider block mb-1">
                  Age: {prog.ageGroup}
                </span>

                <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                  {prog.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-2">
                  {prog.subtitle}
                </p>

                <div className="space-y-1.5 mb-6">
                  {prog.keyOutcomes.slice(0, 2).map((out, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-bold">{prog.timing}</span>
                <Link
                  to="/programs"
                  className="text-xs font-extrabold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. DAY ROUTINE PREVIEW */}
      <section className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
          <div>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-wider mb-2 inline-block">
              Daily Rhythm
            </span>
            <h2 className="text-3xl font-black tracking-tight">A Typical Day at EuroKids</h2>
          </div>
          <Link
            to="/about"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs self-start md:self-auto transition-colors"
          >
            Learn Full Routine & Pedagogy
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DAY_ROUTINE.slice(0, 4).map((step, idx) => (
            <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <span className="text-xs font-extrabold text-amber-400 block mb-1">{step.time}</span>
              <h4 className="text-base font-bold mb-1 text-white">{step.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS SPOTLIGHT */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
            Parent Feedback
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">What Gwalior Parents Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.parentName}
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 rounded-full object-cover border border-amber-300"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">{item.parentName}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{item.childNameAndGrade}</p>
                  <p className="text-[10px] text-amber-600 font-semibold">{item.locality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
