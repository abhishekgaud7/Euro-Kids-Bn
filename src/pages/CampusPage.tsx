import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Bus, CheckCircle2, Sparkles, MapPin, Eye, Camera, HeartPulse } from 'lucide-react';
import { FACILITIES } from '../data/schoolData';
import { BusRouteChecker } from '../components/BusRouteChecker';

export const CampusPage: React.FC = () => {
  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-sky-400 via-amber-300 to-emerald-300 rounded-3xl p-8 md:p-12 text-slate-900 border-4 border-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-white/90 text-sky-900 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-sky-200">
            Campus Infrastructure
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Designed for Child Safety & Experiential Learning
          </h1>
          <p className="text-base text-slate-800 font-medium leading-relaxed">
            Our Balwant Nagar campus features rounded child-safe furniture, rubberized outdoor play flooring, CCTV coverage, and hygienic dining space.
          </p>
        </div>
      </section>

      {/* FACILITIES GRID */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
            Balwant Nagar Facilities
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Explore Our Campus Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((facility) => (
            <motion.div
              key={facility.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                    {facility.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900">{facility.title}</h3>
                  <p className="text-xs font-bold text-amber-600">{facility.subtitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{facility.description}</p>

                  <div className="pt-2 space-y-1.5">
                    {facility.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SAFETY STANDARDS SPOTLIGHT */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
            <Camera className="w-8 h-8 text-amber-400" />
            <h4 className="text-base font-bold">24/7 CCTV Monitoring</h4>
            <p className="text-xs text-slate-400">All classroom areas, play zones, and entry gates are continuously monitored.</p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h4 className="text-base font-bold">Verified Educators & Staff</h4>
            <p className="text-xs text-slate-400">Police background checks for all teachers, maid staff, and bus drivers.</p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
            <HeartPulse className="w-8 h-8 text-rose-400" />
            <h4 className="text-base font-bold">First Aid Certified</h4>
            <p className="text-xs text-slate-400">Emergency medical kits and trained first-aid personnel on campus at all times.</p>
          </div>
        </div>
      </section>

      {/* BUS ROUTE CHECKER TOOL */}
      <section>
        <BusRouteChecker />
      </section>
    </div>
  );
};
