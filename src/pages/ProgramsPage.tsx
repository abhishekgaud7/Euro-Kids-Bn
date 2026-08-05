import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Clock, Users, ArrowRight, BookOpen, Star, HelpCircle } from 'lucide-react';
import { PROGRAMS_DATA } from '../data/schoolData';
import { useData } from '../contexts/DataContext';

export const ProgramsPage: React.FC = () => {
  const { openEnquiryDrawer, openBookVisit } = useData();

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-amber-400 via-rose-300 to-sky-300 rounded-3xl p-8 md:p-12 text-slate-900 border-4 border-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-white/90 text-amber-900 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-amber-200">
            Curriculum & Programs
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Comprehensive Preschool Programs (1.8 to 6 Years)
          </h1>
          <p className="text-base text-slate-800 font-medium leading-relaxed">
            From first steps in Playgroup to confident Grade 1 readiness in Senior KG, explore our age-structured early childhood programs.
          </p>
        </div>
      </section>

      {/* DETAILED PROGRAM CARDS */}
      <section className="space-y-12">
        {PROGRAMS_DATA.map((prog, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              <div className={`lg:col-span-6 space-y-5 ${isEven ? '' : 'lg:order-2'}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-200">
                    {prog.badge}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-extrabold px-3 py-1 rounded-full">
                    Age: {prog.ageGroup}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {prog.timing}
                  </span>
                </div>

                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {prog.name}
                </h2>
                <p className="text-sm font-semibold text-amber-600">
                  {prog.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {prog.description}
                </p>

                {/* Key Outcomes */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Developmental Milestones:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {prog.keyOutcomes.map((out, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Highlights */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Daily Activities & Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {prog.dailyHighlights.map((hl, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Teacher Ratio: <strong className="text-slate-900">{prog.teacherRatio}</strong>
                  </span>

                  <button
                    onClick={openEnquiryDrawer}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105"
                  >
                    <span>Enquire for {prog.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className={`lg:col-span-6 ${isEven ? '' : 'lg:order-1'}`}>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-100 h-80 lg:h-96">
                  <img
                    src={prog.image}
                    alt={prog.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* CTA BANNER */}
      <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-4xl font-black">Not sure which program matches your child's age?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Try our interactive Age Calculator on the homepage or schedule a personal consultation with director Harsha Gupta.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={openBookVisit}
            className="px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-xs hover:bg-amber-300 transition-colors shadow-lg"
          >
            Book Campus Tour
          </button>
        </div>
      </section>
    </div>
  );
};
