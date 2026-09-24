import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, CheckCircle2, ArrowRight, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

import { HeroPhotoSlider } from '../components/HeroPhotoSlider';
import { AgeFinderQuiz } from '../components/AgeFinderQuiz';

import { useData } from '../contexts/DataContext';
import { PROGRAMS_DATA, HEUREKA_CURRICULUM } from '../data/schoolData';

interface HomePageProps {
  onNavigateTab: (tabId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateTab }) => {
  const { schoolInfo, testimonials, openBookVisit, openEnquiryDrawer } = useData();
  const [selectedSlip, setSelectedSlip] = useState<{ title: string; image: string } | null>(null);

  return (
    <div className="space-y-10 py-4 md:py-6">
      {/* 1. SIDE-BY-SIDE (AAMNE-SAMNE) GRAND HERO BANNER */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#002D80] via-[#0B43A1] to-blue-900 p-6 sm:p-8 lg:p-10 overflow-hidden shadow-2xl border-4 border-white text-white">
        {/* Animated Background Doodles */}
        <div className="absolute top-6 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-10 right-12 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl animate-float-delayed pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline, CTAs, Stats & Bulletins */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black shadow-md">
              <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
              <span>Admissions Open 2026-27 • Balwant Nagar, Gwalior</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              A Happy Place Where <span className="text-amber-300 underline decoration-sky-400">Children Feel at Home</span> While They Learn.
            </h1>

            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed max-w-2xl">
              EuroKids Balwant Nagar, Thatipur, Gwalior provides a gentle, joyful transition into early learning with CCTV safety, nature play, and the Heureka thinking curriculum.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={openEnquiryDrawer}
                className="px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Apply for Admissions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openBookVisit}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#002D80] font-extrabold text-sm border-2 border-white shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#0B43A1]" />
                <span>Book Walkthrough</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="pt-3 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {schoolInfo.stats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-xs p-2.5 rounded-2xl border border-white/20">
                  <p className="text-xs font-extrabold text-amber-300 leading-tight">{stat.value}</p>
                  <p className="text-[10px] text-slate-200 font-semibold mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Safety & Quality Bulletins from Official Flyer */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-100">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% CCTV & Police Verified Staff</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>TUV Certified Centre (Fire Safety)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                <span>All AC Classes & 24x7 DG Power Backup</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>Open Green Play Garden</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                <span>Experienced Teachers (10+ Yrs)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                <span>Heureka Pedagogy (Harvard Zero Project)</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Hero Photo Slider (AAMNE-SAMNE) */}
          <div className="lg:col-span-5 w-full">
            <HeroPhotoSlider />
          </div>

        </div>
      </section>

      {/* 2. AGE FINDER QUIZ SECTION */}
      <section>
        <AgeFinderQuiz />
      </section>

      {/* 3. PROGRAMS OVERVIEW CARDS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-blue-100 text-[#002D80] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-blue-200">
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
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg flex flex-col justify-between group hover:border-[#0B43A1] hover:shadow-xl transition-all"
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
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#002D80] text-[11px] font-black px-2.5 py-1 rounded-lg shadow-sm border border-blue-100">
                    {prog.badge}
                  </span>
                </div>

                <span className="text-xs font-extrabold text-[#0B43A1] uppercase tracking-wider block mb-1">
                  Age: {prog.ageGroup}
                </span>

                <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-[#002D80] transition-colors">
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
                  className="text-xs font-extrabold text-[#0B43A1] hover:text-[#002D80] flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. HEUREKA CURRICULUM HINT PREVIEW */}
      <section className="bg-gradient-to-br from-[#002D80] via-[#0B43A1] to-blue-950 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl border-4 border-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-blue-700/50 pb-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full shadow-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>8th Edition EuroKids Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              HEUREKA - The Visible Thinking Pedagogy
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl">
              Developed on Harvard Zero Project principles, nurturing early holistic development across 5 essential life quotients.
            </p>
          </div>
          <Link
            to="/about"
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs self-start md:self-auto transition-all shadow-md hover:scale-105 flex items-center gap-1.5 shrink-0"
          >
            <span>Explore All 5 Quotients</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
          {HEUREKA_CURRICULUM.map((q) => (
            <Link
              key={q.id}
              to="/about"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-xs p-4 rounded-2xl border border-white/15 transition-all hover:translate-y-[-4px] group flex flex-col justify-between"
            >
              <div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${q.badgeBg} ${q.textColor} inline-block mb-2`}>
                  {q.quotient.replace(" Quotient", " (Q)")}
                </span>
                <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {q.quotient}
                </h4>
                <p className="text-[11px] text-blue-100 font-medium mt-1 leading-snug">
                  {q.shortDesc}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/10">
                <p className="text-[10px] font-bold text-amber-300 line-clamp-1">
                  {q.modules.map(m => m.name).join(" • ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS SPOTLIGHT */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="bg-blue-100 text-[#002D80] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-blue-200 inline-block">
            Parent Feedback
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                  "{item.quote}"
                </p>

                {item.feedbackImage && (
                  <button
                    type="button"
                    onClick={() => setSelectedSlip({ title: `${item.parentName} (${item.childNameAndGrade})`, image: item.feedbackImage! })}
                    className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span>Verified Form Slip</span>
                    <Eye className="w-3 h-3 ml-0.5" />
                  </button>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-900">{item.parentName}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{item.childNameAndGrade}</p>
                <p className="text-[10px] text-[#0B43A1] font-semibold">{item.locality}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEEDBACK SLIP LIGHTBOX MODAL */}
      {selectedSlip && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedSlip(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl relative space-y-4 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">{selectedSlip.title}</h3>
                <p className="text-[11px] text-emerald-600 font-semibold">Verified Parent Feedback Slip</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSlip(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
              <img 
                src={selectedSlip.image} 
                alt={selectedSlip.title} 
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-inner" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
