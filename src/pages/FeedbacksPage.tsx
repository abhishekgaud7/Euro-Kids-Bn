import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Send, User, MapPin, Heart, Sparkles } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const FeedbacksPage: React.FC = () => {
  const { testimonials, addTestimonial } = useData();

  const [parentName, setParentName] = useState('');
  const [childNameAndGrade, setChildNameAndGrade] = useState('');
  const [locality, setLocality] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !quote) return;

    addTestimonial({
      parentName,
      childNameAndGrade: childNameAndGrade || 'EuroKids Parent',
      locality: locality || 'Gwalior',
      quote,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating
    });

    setParentName('');
    setChildNameAndGrade('');
    setLocality('');
    setQuote('');
  };

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-300 rounded-3xl p-8 md:p-12 text-slate-900 border-4 border-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-white/90 text-emerald-900 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200">
            Parent Community Wall
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Loved & Trusted by Families Across Gwalior
          </h1>
          <p className="text-base text-slate-800 font-medium leading-relaxed">
            Read authentic feedback from parents in Thatipur, Gandhi Road, Balwant Nagar, and Morar whose children flourish at EuroKids.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS WALL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <img
                src={item.avatar}
                alt={item.parentName}
                className="w-10 h-10 rounded-full object-cover border border-amber-300"
              />
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">{item.parentName}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{item.childNameAndGrade}</p>
                <p className="text-[10px] text-amber-600 font-semibold">{item.locality}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SUBMIT FEEDBACK FORM */}
      <section className="bg-amber-50 rounded-3xl p-6 md:p-10 border border-amber-200 max-w-3xl mx-auto shadow-lg">
        <div className="text-center space-y-2 mb-6">
          <span className="bg-white text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-200 uppercase tracking-wider">
            Share Your Experience
          </span>
          <h2 className="text-2xl font-black text-slate-900">Are You a EuroKids Parent?</h2>
          <p className="text-xs text-slate-600">Leave your review below to guide new parents in Gwalior.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Neha Sharma"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Child's Name & Grade</label>
              <input
                type="text"
                placeholder="e.g. Parent of Aarav (Nursery)"
                value={childNameAndGrade}
                onChange={(e) => setChildNameAndGrade(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Locality (Gwalior)</label>
              <input
                type="text"
                placeholder="e.g. Thatipur, Gwalior"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rating (1 to 5 Stars)</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs bg-white font-bold text-amber-600"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Feedback / Review *</label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about how your child enjoys school, the teachers' care, campus safety, etc..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Post Parent Review</span>
          </button>
        </form>
      </section>
    </div>
  );
};
