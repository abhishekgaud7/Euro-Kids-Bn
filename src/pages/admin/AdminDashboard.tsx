import React from 'react';
import { Users, MessageSquare, Image as ImageIcon, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { enquiries, testimonials, galleryItems, schoolInfo } = useData();

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const visitedCount = enquiries.filter(e => e.status === 'Visited').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Dashboard Overview</h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time summary of admissions, enquiries, and school media.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('enquiries')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-amber-400 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Enquiries</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{enquiries.length}</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">{newEnquiriesCount} new pending response</p>
        </div>

        <div
          onClick={() => onNavigate('enquiries')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-sky-400 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Campus Visits</span>
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{visitedCount}</p>
          <p className="text-[11px] text-sky-600 font-semibold mt-1">Scheduled / Completed tours</p>
        </div>

        <div
          onClick={() => onNavigate('feedbacks')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-400 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Parent Testimonials</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{testimonials.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Published reviews</p>
        </div>

        <div
          onClick={() => onNavigate('gallery')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-rose-400 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Gallery Photos</span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{galleryItems.length}</p>
          <p className="text-[11px] text-rose-600 font-semibold mt-1">Live campus images</p>
        </div>
      </div>

      {/* RECENT ENQUIRIES TABLE PREVIEW */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900">Recent Parent Enquiries</h3>
          <button
            onClick={() => onNavigate('enquiries')}
            className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
          >
            <span>Manage All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold">
                <th className="pb-3">Child Name</th>
                <th className="pb-3">Parent Name</th>
                <th className="pb-3">Program</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.slice(0, 5).map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-900">{e.childName}</td>
                  <td className="py-3 text-slate-700">{e.parentName}</td>
                  <td className="py-3 text-amber-600 font-semibold">{e.program}</td>
                  <td className="py-3 text-slate-600">{e.phone}</td>
                  <td className="py-3 text-slate-500">{e.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      e.status === 'New'
                        ? 'bg-amber-100 text-amber-800'
                        : e.status === 'Visited'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
