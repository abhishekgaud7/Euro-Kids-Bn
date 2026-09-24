import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  BookOpen,
  Award,
  Users,
  Sun,
  Coffee,
  Trees,
  Palette,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Brain,
  Activity,
  Music,
  Lightbulb,
  Eye,
  Layers,
  Compass
} from 'lucide-react';
import { DAY_ROUTINE, FACULTY_MEMBERS, HEUREKA_CURRICULUM } from '../data/schoolData';
import { useData } from '../contexts/DataContext';

export const AboutPage: React.FC = () => {
  const { schoolInfo } = useData();
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [activeQuotientTab, setActiveQuotientTab] = useState<string>('all');

  const getRoutineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return Sun;
      case 'Users': return Users;
      case 'BookOpen': return BookOpen;
      case 'Coffee': return Coffee;
      case 'Trees': return Trees;
      case 'Palette': return Palette;
      case 'Heart': return Heart;
      default: return Sparkles;
    }
  };

  const getQuotientIcon = (id: string) => {
    switch (id) {
      case 'eq': return Heart;
      case 'pq': return Activity;
      case 'iq': return Brain;
      case 'cq': return Palette;
      case 'sq': return Sparkles;
      default: return Lightbulb;
    }
  };

  const filteredQuotients = activeQuotientTab === 'all'
    ? HEUREKA_CURRICULUM
    : HEUREKA_CURRICULUM.filter(q => q.id === activeQuotientTab);

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* HEADER HERO */}
      <section className="bg-gradient-to-r from-amber-400 via-amber-300 to-rose-300 rounded-3xl p-8 md:p-12 text-slate-900 border-4 border-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="bg-white/90 text-amber-900 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-amber-200">
            About EuroKids Balwant Nagar
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Nurturing Curiosity, Confidence & Emotional Security
          </h1>
          <p className="text-base text-slate-800 font-medium leading-relaxed">
            Established in {schoolInfo.established}, our Gwalior center has created a warm space where children feel safe to question, experiment, and grow every single day.
          </p>
        </div>
      </section>

      {/* DISCOVER THE 8TH EDITION HEUREKA CURRICULUM */}
      <section className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#002D80] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Discover the 8th Edition of EuroKids Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              HEUREKA™ — The Visible Thinking Curriculum
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Rooted in the renowned Harvard Zero Project framework, the 8th Edition Heureka curriculum makes young children's thinking active, visible, and expressive. It holistically empowers every child across <strong>5 Foundational Quotients</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowBrochureModal(true)}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md hover:scale-105 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>View Official Brochure Poster</span>
          </button>
        </div>

        {/* Quotient Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveQuotientTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeQuotientTab === 'all'
                ? 'bg-[#002D80] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All 5 Quotients (Overview)
          </button>
          {HEUREKA_CURRICULUM.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => setActiveQuotientTab(q.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeQuotientTab === q.id
                  ? 'bg-[#002D80] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {q.quotient}
            </button>
          ))}
        </div>

        {/* 5 Quotients Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotients.map((q) => {
            const QIcon = getQuotientIcon(q.id);
            return (
              <motion.div
                key={q.id}
                whileHover={{ y: -4 }}
                className="bg-slate-50/80 rounded-3xl p-6 border-2 border-slate-200 hover:border-[#0B43A1] transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${q.badgeBg} ${q.textColor} border ${q.borderColor}`}>
                      {q.quotient}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-700">
                      <QIcon className="w-4 h-4 text-[#0B43A1]" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-semibold mb-5">
                    {q.shortDesc}
                  </p>

                  <div className="space-y-3">
                    {q.modules.map((mod, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                        <div className="flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <h4 className="text-xs font-black tracking-wide text-slate-900">
                            {mod.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed pl-5">
                          {mod.tagline}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 text-[10px] text-slate-400 font-bold uppercase tracking-wider text-right">
                  {q.modules.length} {q.modules.length === 1 ? 'Core Module' : 'Dedicated Modules'}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* BROCHURE POSTER LIGHTBOX MODAL */}
      {showBrochureModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowBrochureModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative space-y-4 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">EuroKids Heureka 8th Edition Curriculum</h3>
                <p className="text-[11px] text-blue-600 font-semibold">Official Visible Thinking Pedagogy Chart</p>
              </div>
              <button
                type="button"
                onClick={() => setShowBrochureModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
              <img
                src="/images/feedbacks/curriculum-heureka.jpeg"
                alt="EuroKids Heureka Curriculum"
                className="max-h-[72vh] w-auto object-contain rounded-xl shadow-inner"
              />
            </div>
          </div>
        </div>
      )}

      {/* FULL DAY ROUTINE TIMELINE */}
      <section className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
            A Day in the Life
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Our Interactive Day Routine
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A structured yet flexible rhythm balancing focused learning, snack breaks, outdoor play, and story time.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {DAY_ROUTINE.map((step, idx) => {
            const IconComp = getRoutineIcon(step.iconName);
            return (
              <motion.div
                key={idx}
                whileHover={{ x: 6 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 transition-all"
              >
                <div className="w-16 text-xs font-black text-amber-600 bg-amber-100 px-3 py-1.5 rounded-xl text-center shrink-0">
                  {step.time}
                </div>

                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <IconComp className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <h4 className="text-base font-extrabold text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FACULTY & LEADERSHIP SPOTLIGHT */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-10 text-white shadow-2xl">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <div className="rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl">
              <img
                src={FACULTY_MEMBERS[0].image}
                alt={FACULTY_MEMBERS[0].name}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <span className="bg-amber-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Director Spotlight
            </span>

            <h3 className="text-3xl font-black tracking-tight">{FACULTY_MEMBERS[0].name}</h3>
            <p className="text-xs font-bold text-amber-400">{FACULTY_MEMBERS[0].role} • {FACULTY_MEMBERS[0].qualification}</p>

            <p className="text-sm text-slate-300 leading-relaxed italic">
              "{FACULTY_MEMBERS[0].bio}"
            </p>

            <div className="pt-2 border-t border-slate-700 flex items-center gap-4 text-xs text-slate-400">
              <span>Experience: <strong className="text-white">{FACULTY_MEMBERS[0].experience}</strong></span>
              <span>•</span>
              <span>Specialty: <strong className="text-white">{FACULTY_MEMBERS[0].specialty}</strong></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
