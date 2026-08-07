import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Send,
  User,
  Phone,
  Mail,
  MessageSquare,
  Baby,
  MapPin,
  Bus,
  Clock,
  CheckCircle2,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { sendWeb3FormsNotification } from '../utils/web3forms';

export const EnquiryDrawer: React.FC = () => {
  const { isEnquiryDrawerOpen, closeEnquiryDrawer, addEnquiry, schoolInfo } = useData();

  const [childName, setChildName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [childAgeGroup, setChildAgeGroup] = useState('3.0 – 3.5 Years');
  const [program, setProgram] = useState('Nursery');
  const [locality, setLocality] = useState('Thatipur, Gwalior');
  const [busNeeded, setBusNeeded] = useState(false);
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isEnquiryDrawerOpen) return null;

  // Auto-match EuroKids Program based on Age selection
  const handleAgeChange = (selectedAge: string) => {
    setChildAgeGroup(selectedAge);
    if (selectedAge.includes('1.8') || selectedAge.includes('2.5')) {
      setProgram('Playgroup');
    } else if (selectedAge.includes('3.0') || selectedAge.includes('3.5')) {
      setProgram('Nursery');
    } else if (selectedAge.includes('4.0')) {
      setProgram('Junior KG');
    } else if (selectedAge.includes('5.0')) {
      setProgram('Senior KG');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone || !childName) {
      return;
    }

    addEnquiry({
      childName,
      parentName,
      phone,
      email: email || undefined,
      program,
      childAge: childAgeGroup,
      locality,
      busNeeded,
      preferredContactTime: preferredTime,
      message: message || undefined
    });

    // Send instant email notification via Web3Forms (if key set)
    sendWeb3FormsNotification({
      subject: `New Admission Enquiry: ${childName} (${program}) - EuroKids Balwant Nagar`,
      child_name: childName,
      child_age: childAgeGroup,
      program_applied: program,
      parent_name: parentName,
      phone_number: phone,
      email_address: email || 'Not provided',
      locality: locality,
      bus_needed: busNeeded ? 'Yes' : 'No',
      preferred_call_time: preferredTime,
      parent_message: message || 'None'
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    // Reset state
    setChildName('');
    setParentName('');
    setPhone('');
    setEmail('');
    setMessage('');
    closeEnquiryDrawer();
  };

  const rawWhatsapp = schoolInfo.whatsapp.replace(/\D/g, '');
  const whatsappDirectUrl = `https://wa.me/${rawWhatsapp}?text=${encodeURIComponent(
    `Hello EuroKids Balwant Nagar! I just submitted an admission enquiry for my child ${childName} (${program}). Phone: ${phone}`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-lg h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-amber-100"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    Admission Enquiry
                  </h3>
                  <p className="text-xs text-amber-600 font-bold">
                    Academic Session 2026-27 • EuroKids Balwant Nagar
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* STEP 1: CHILD DETAILS */}
                <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-900 tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[11px]">1</span>
                    <span>Child Information</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Child's Full Name *
                    </label>
                    <div className="relative">
                      <Baby className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aarav Sharma"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-900 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Child Age Selection *
                      </label>
                      <select
                        value={childAgeGroup}
                        onChange={(e) => handleAgeChange(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-900 font-bold"
                      >
                        <option value="1.8 – 2.5 Years">1.8 – 2.5 Years (Playgroup)</option>
                        <option value="2.5 – 3.0 Years">2.5 – 3.0 Years (Playgroup)</option>
                        <option value="3.0 – 3.5 Years">3.0 – 3.5 Years (Nursery)</option>
                        <option value="3.5 – 4.0 Years">3.5 – 4.0 Years (Nursery)</option>
                        <option value="4.0 – 5.0 Years">4.0 – 5.0 Years (Junior KG)</option>
                        <option value="5.0 – 6.0 Years">5.0 – 6.0 Years (Senior KG)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Program (Auto-Matched)
                      </label>
                      <div className="px-3.5 py-2.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-black border border-amber-300 flex items-center justify-between">
                        <span>{program}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 2: PARENT CONTACT & LOCALITY */}
                <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-sky-900 tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-sky-400 text-slate-900 flex items-center justify-center text-[11px]">2</span>
                    <span>Parent Contact & Gwalior Location</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Parent / Guardian Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Neha Sharma"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none text-xs text-slate-900 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp / Mobile Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98260 00000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none text-xs text-slate-900 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Locality / Area in Gwalior
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                        <select
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none text-xs text-slate-900 font-semibold"
                        >
                          <option value="Thatipur, Gwalior">Thatipur</option>
                          <option value="Gandhi Road, Gwalior">Gandhi Road</option>
                          <option value="Balwant Nagar, Gwalior">Balwant Nagar</option>
                          <option value="Morar, Gwalior">Morar</option>
                          <option value="Pinto Park, Gwalior">Pinto Park</option>
                          <option value="DD Nagar, Gwalior">DD Nagar</option>
                          <option value="City Centre, Gwalior">City Centre</option>
                          <option value="Patel Nagar, Gwalior">Patel Nagar</option>
                          <option value="Other Area in Gwalior">Other Area in Gwalior</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 3: PREFERENCES & OPTIONS */}
                <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-900 tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[11px]">3</span>
                    <span>Preferences & Specific Queries</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Bus className="w-4 h-4 text-sky-600" />
                      <span>Require School Bus Transport Service?</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setBusNeeded(true)}
                        className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                          busNeeded
                            ? 'bg-sky-500 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Yes 🚌
                      </button>
                      <button
                        type="button"
                        onClick={() => setBusNeeded(false)}
                        className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                          !busNeeded
                            ? 'bg-slate-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Best Time for Counselor Call
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-semibold"
                        >
                          <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                          <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="neha@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Custom Message / Questions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ask us anything about fee structure, timings, snack menu..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Admission Enquiry</span>
                </button>
              </form>
            ) : (
              /* SUCCESS STATE WITH DIRECT WHATSAPP OPTION */
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900">Enquiry Submitted!</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                    Thank you <strong>{parentName}</strong>. Our EuroKids Balwant Nagar counselor will connect with you via call/WhatsApp shortly.
                  </p>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-left space-y-2 text-xs">
                  <p className="font-extrabold text-emerald-900 uppercase tracking-wider">Submitted Application Summary:</p>
                  <div className="text-slate-700 space-y-1">
                    <p>• Child: <strong className="text-slate-900">{childName} ({program})</strong></p>
                    <p>• Age: <strong className="text-slate-900">{childAgeGroup}</strong></p>
                    <p>• Contact Phone: <strong className="text-slate-900">{phone}</strong></p>
                    <p>• Locality: <strong className="text-slate-900">{locality}</strong></p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Connect directly on WhatsApp Now</span>
                  </a>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400 font-medium">
            EuroKids Balwant Nagar, Gwalior • Phone: {schoolInfo.phone}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
