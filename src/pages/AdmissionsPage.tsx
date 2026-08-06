import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList,
  Download,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  FileText,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { DOWNLOADS_LIST, ADMISSION_FAQS } from '../data/schoolData';
import { useData } from '../contexts/DataContext';
import { downloadProspectusPDF, downloadAdmissionFormPDF, downloadHealthFormPDF } from '../utils/pdfGenerator';
import toast from 'react-hot-toast';

export const AdmissionsPage: React.FC = () => {
  const { openEnquiryDrawer, openBookVisit } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      num: '01',
      title: 'Submit Online Enquiry',
      desc: 'Fill out our quick online drawer or call our desk to register your interest.',
      icon: FileText
    },
    {
      num: '02',
      title: 'Campus Tour & Interaction',
      desc: 'Schedule a visit to see our classrooms, outdoor play space, and meet our teachers.',
      icon: Calendar
    },
    {
      num: '03',
      title: 'Document Submission',
      desc: 'Provide child birth certificate, passport photos, and immunization records.',
      icon: ClipboardList
    },
    {
      num: '04',
      title: 'Seat Allocation & Welcome Kit',
      desc: 'Complete fee payment to confirm seat allotment and receive EuroKids learning kit.',
      icon: CheckCircle2
    }
  ];

  const handleDownloadItem = (id: string, title: string) => {
    if (id === 'd1' || title.toLowerCase().includes('prospectus')) {
      downloadProspectusPDF();
    } else if (id === 'd2' || title.toLowerCase().includes('application') || title.toLowerCase().includes('admission')) {
      downloadAdmissionFormPDF();
    } else if (id === 'd3' || title.toLowerCase().includes('health') || title.toLowerCase().includes('emergency')) {
      downloadHealthFormPDF();
    } else {
      downloadProspectusPDF();
    }
  };

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-amber-400 via-emerald-300 to-sky-300 rounded-3xl p-8 md:p-12 text-slate-900 border-4 border-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-white/90 text-amber-900 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-amber-200">
            Admissions 2026-27
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Simple, Transparent Admission Process
          </h1>
          <p className="text-base text-slate-800 font-medium leading-relaxed">
            We welcome parents to explore our center in Thatipur, Gwalior. Admissions are open for Playgroup, Nursery, Junior KG & Senior KG.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={openEnquiryDrawer}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Fill Admission Enquiry Form</span>
            </button>

            <button
              onClick={openBookVisit}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs border border-amber-300 shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Book Walkthrough Visit</span>
            </button>
          </div>
        </div>
      </section>

      {/* ADMISSION STEPS */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
            How It Works
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">4 Easy Admission Steps</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.num} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-amber-500">{step.num}</span>
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DOWNLOADS SECTION */}
      <section className="bg-amber-50 rounded-3xl p-6 md:p-10 border border-amber-200 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="bg-white text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-200 uppercase tracking-wider mb-2 inline-block">
              Resources & Forms
            </span>
            <h2 className="text-2xl font-black text-slate-900">Prospectus & Downloads</h2>
            <p className="text-xs text-slate-600 mt-1">Click the download button on any document to save the official PDF to your device.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DOWNLOADS_LIST.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 hover:border-amber-400 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{item.category} • {item.fileSize}</p>
                </div>
              </div>

              <button
                onClick={() => handleDownloadItem(item.id, item.title)}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95"
                title={`Download ${item.title} PDF`}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQS ACCORDION */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
            Parent Queries
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {ADMISSION_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-500' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
