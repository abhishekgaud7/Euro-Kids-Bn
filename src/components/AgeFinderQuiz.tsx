import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles, ArrowRight, CheckCircle2, Baby, Smile, GraduationCap, Award } from 'lucide-react';
import { PROGRAMS_DATA } from '../data/schoolData';
import { ProgramItem } from '../types';
import { useData } from '../contexts/DataContext';

export const AgeFinderQuiz: React.FC = () => {
  const { openEnquiryDrawer } = useData();
  const [dob, setDob] = useState<string>('');
  const [ageMonths, setAgeMonths] = useState<number>(30); // Default ~2.5 yrs
  const [inputMode, setInputMode] = useState<'slider' | 'dob'>('slider');
  const [recommendedProgram, setRecommendedProgram] = useState<ProgramItem | null>(PROGRAMS_DATA[0]);

  const calculateAgeFromDob = (dateStr: string) => {
    if (!dateStr) return;
    const birthDate = new Date(dateStr);
    const today = new Date();
    let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += today.getMonth();

    if (months < 0) months = 0;
    setAgeMonths(months);
    matchProgram(months);
  };

  const matchProgram = (months: number) => {
    // 1.8 yrs = 21.6 months (~20 months) to 36 months => Playgroup
    // 36 to 48 months => Nursery
    // 48 to 60 months => Junior KG
    // 60+ months => Senior KG
    if (months < 36) {
      setRecommendedProgram(PROGRAMS_DATA[0]);
    } else if (months >= 36 && months < 48) {
      setRecommendedProgram(PROGRAMS_DATA[1]);
    } else if (months >= 48 && months < 60) {
      setRecommendedProgram(PROGRAMS_DATA[2]);
    } else {
      setRecommendedProgram(PROGRAMS_DATA[3]);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setAgeMonths(val);
    matchProgram(val);
  };

  const years = (ageMonths / 12).toFixed(1);

  const getProgramIcon = (id: string) => {
    switch (id) {
      case 'playgroup': return Baby;
      case 'nursery': return Smile;
      case 'junior-kg': return GraduationCap;
      case 'senior-kg': return Award;
      default: return Sparkles;
    }
  };

  const IconComponent = recommendedProgram ? getProgramIcon(recommendedProgram.id) : Sparkles;

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-3xl p-6 md:p-8 border-2 border-amber-200/80 shadow-xl relative overflow-hidden">
      {/* Background doodles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-300 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Program Matcher</span>
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Find the Right EuroKids Program for Your Child
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Adjust the slider or enter your child's date of birth to instantly discover their ideal learning group.
        </p>

        {/* Input mode selector */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setInputMode('slider')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              inputMode === 'slider'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white/80 text-slate-700 hover:bg-white'
            }`}
          >
            Use Age Slider
          </button>
          <button
            onClick={() => setInputMode('dob')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              inputMode === 'dob'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white/80 text-slate-700 hover:bg-white'
            }`}
          >
            Enter Date of Birth
          </button>
        </div>

        {/* Slider Input Controls */}
        {inputMode === 'slider' ? (
          <div className="bg-white/90 rounded-2xl p-5 border border-amber-100 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-800">Child's Current Age:</span>
              <span className="text-lg font-extrabold text-amber-600 bg-amber-100 px-3 py-1 rounded-xl">
                {years} Years ({ageMonths} Months)
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="72"
              step="1"
              value={ageMonths}
              onChange={handleSliderChange}
              className="w-full h-3 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
              <span>1.8 Yrs (Playgroup)</span>
              <span>3 Yrs (Nursery)</span>
              <span>4 Yrs (Junior KG)</span>
              <span>5-6 Yrs (Senior KG)</span>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 rounded-2xl p-5 border border-amber-100 shadow-sm mb-6">
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Select Child's Date of Birth:
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                calculateAgeFromDob(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-800 font-medium"
            />
          </div>
        )}

        {/* Result Card */}
        <AnimatePresence mode="wait">
          {recommendedProgram && (
            <motion.div
              key={recommendedProgram.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="bg-white rounded-2xl p-6 border-2 border-amber-400 shadow-lg relative"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      Recommended Program
                    </span>
                    <h4 className="text-2xl font-black text-slate-900 leading-none mt-0.5">
                      {recommendedProgram.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1.5 rounded-full border border-amber-200">
                    Age: {recommendedProgram.ageGroup}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {recommendedProgram.timing}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {recommendedProgram.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {recommendedProgram.keyOutcomes.slice(0, 4).map((outcome, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-500 font-medium">
                  Teacher Ratio: <strong className="text-slate-800">{recommendedProgram.teacherRatio}</strong>
                </span>

                <button
                  onClick={openEnquiryDrawer}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <span>Enquire for {recommendedProgram.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
