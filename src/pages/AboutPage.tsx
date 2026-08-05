import React from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { DAY_ROUTINE, FACULTY_MEMBERS } from '../data/schoolData';
import { useData } from '../contexts/DataContext';

export const AboutPage: React.FC = () => {
  const { schoolInfo } = useData();

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

      {/* PHILOSOPHY & HEUREKA CURRICULUM */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="bg-sky-100 text-sky-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-sky-200">
            Our Pedagogy
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            The Heureka Visible Thinking Curriculum
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We believe learning happens best when children engage their senses. The Heureka framework encourages toddlers to think aloud, ask questions, manipulate tactile objects, and express their ideas without fear of being wrong.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Mindful Sensory Stations</h4>
                <p className="text-xs text-slate-600">Sand, clay, water sorting, and tactile word wheels for motor coordination.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <Heart className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Emotional First Principles</h4>
                <p className="text-xs text-slate-600">Encouraging toddlers to express feelings, resolve small disputes, and share toys gently.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Guarded & Verified Safety</h4>
                <p className="text-xs text-slate-600">Every staff member is police verified; classrooms & gates feature live CCTV cameras.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
              alt="Heureka Curriculum Activity"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

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
