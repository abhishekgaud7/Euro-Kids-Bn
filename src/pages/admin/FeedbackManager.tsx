import React from 'react';
import { Star, Trash2, MessageSquare } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const FeedbackManager: React.FC = () => {
  const { testimonials, deleteTestimonial } = useData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Feedback & Review Moderation</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage testimonials displayed on the public Parent Reviews wall.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-bold">{t.date}</span>
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">"{t.quote}"</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <img src={t.avatar} alt={t.parentName} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">{t.parentName}</h4>
                  <p className="text-[10px] text-slate-500">{t.childNameAndGrade} • {t.locality}</p>
                </div>
              </div>

              <button
                onClick={() => deleteTestimonial(t.id)}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Remove Testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
