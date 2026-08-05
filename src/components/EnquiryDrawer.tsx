import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, User, Phone, Mail, MessageSquare, Baby, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const EnquiryDrawer: React.FC = () => {
  const { isEnquiryDrawerOpen, closeEnquiryDrawer, addEnquiry } = useData();

  const [childName, setChildName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('Nursery');
  const [childAge, setChildAge] = useState('3 Years');
  const [message, setMessage] = useState('');

  if (!isEnquiryDrawerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone || !childName) {
      return;
    }

    addEnquiry({
      childName,
      parentName,
      phone,
      email,
      program,
      childAge,
      message
    });

    // Reset & close
    setChildName('');
    setParentName('');
    setPhone('');
    setEmail('');
    setMessage('');
    closeEnquiryDrawer();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-md h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-amber-100"
        >
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    Admission Enquiry
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold">
                    Academic Session 2026-27
                  </p>
                </div>
              </div>

              <button
                onClick={closeEnquiryDrawer}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Fill out your child's details below. Our admissions counselor will connect with you via call/WhatsApp within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Child's Name *
                </label>
                <div className="relative">
                  <Baby className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Child Age *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2.5 Years"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Program
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800 font-medium"
                  >
                    <option value="Playgroup">Playgroup (1.8 - 3 Yrs)</option>
                    <option value="Nursery">Nursery (3 - 4 Yrs)</option>
                    <option value="Junior KG">Junior KG (4 - 5 Yrs)</option>
                    <option value="Senior KG">Senior KG (5 - 6 Yrs)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Parent / Guardian Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neha Sharma"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="neha@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Message / Queries
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={3}
                    placeholder="Tell us any specific questions about fees, bus routes, or timings..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Admission Enquiry</span>
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              EuroKids Balwant Nagar, Gwalior • Phone: +91-9183686765
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
