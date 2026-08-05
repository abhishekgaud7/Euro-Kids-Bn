import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle2, Download, Building } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';

export const BookVisitModal: React.FC = () => {
  const { isBookVisitOpen, closeBookVisit, schoolInfo, addEnquiry } = useData();

  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:30 AM');
  const [program, setProgram] = useState('Nursery');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isBookVisitOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone || !visitDate) {
      toast.error('Please fill in your name, phone number, and visit date.');
      return;
    }

    addEnquiry({
      childName: `Child of ${parentName}`,
      parentName,
      phone,
      email: email || 'not-provided@example.com',
      program,
      message: `Booked Campus Visit for ${visitDate} at ${preferredTime}`,
    });

    setIsSuccess(true);
  };

  const downloadPass = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(245, 158, 11); // Amber
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text('EuroKids Balwant Nagar, Gwalior', 14, 22);
      doc.setFontSize(12);
      doc.text('Official Campus Visit Pass', 14, 32);

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(14);
      doc.text('Visit Confirmation Details', 14, 55);

      doc.setFontSize(11);
      doc.text(`Parent Name: ${parentName}`, 14, 68);
      doc.text(`Phone Number: ${phone}`, 14, 76);
      doc.text(`Scheduled Date: ${visitDate}`, 14, 84);
      doc.text(`Preferred Slot: ${preferredTime}`, 14, 92);
      doc.text(`Program Interest: ${program}`, 14, 100);

      doc.setDrawColor(226, 232, 240);
      doc.line(14, 110, 196, 110);

      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Campus Address: ${schoolInfo.address}`, 14, 120);
      doc.text(`Front Desk Contact: ${schoolInfo.phone}`, 14, 128);

      doc.save(`EuroKids-Visit-Pass-${parentName.replace(/\s+/g, '-')}.pdf`);
      toast.success('Visit pass downloaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate PDF pass');
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    closeBookVisit();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative overflow-hidden border border-amber-100 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-amber-600" />
                  <span>Campus Walkthrough</span>
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                Schedule a School Visit
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Come experience our bright classrooms, outdoor play areas, and meet director Harsha Gupta.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Parent / Guardian Full Name *
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number *
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
                      Program Interest
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Preferred Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                      >
                        <option value="10:00 AM">10:00 AM Slot</option>
                        <option value="11:30 AM">11:30 AM Slot</option>
                        <option value="02:00 PM">02:00 PM Slot</option>
                        <option value="04:00 PM">04:00 PM Slot</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Campus Tour Appointment</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Visit Scheduled!</h3>
              <p className="text-xs text-slate-600 mb-6 max-w-xs mx-auto">
                Thank you <strong>{parentName}</strong>. We look forward to welcoming you on <strong>{visitDate}</strong> at <strong>{preferredTime}</strong>.
              </p>

              <div className="space-y-3">
                <button
                  onClick={downloadPass}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official Visit Pass (PDF)</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Done & Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
