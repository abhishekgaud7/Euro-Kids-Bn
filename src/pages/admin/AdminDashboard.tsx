import React from 'react';
import { Users, MessageSquare, Image as ImageIcon, Sparkles, Clock, CheckCircle2, ArrowRight, Phone, MessageCircle, Download } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { enquiries, testimonials, galleryItems, schoolInfo } = useData();

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const visitedCount = enquiries.filter(e => e.status === 'Visited').length;
  const enrolledCount = enquiries.filter(e => e.status === 'Enrolled').length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Friendly Owner Welcome Box */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 md:p-8 rounded-3xl border-4 border-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Owner Control Panel</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Welcome back, EuroKids Admin!</h1>
          <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-xl">
            Yahan aap school ke aaye hue admission forms dekh sakte hain, parents ko WhatsApp kar sakte hain, aur naye photos upload kar sakte hain.
          </p>
        </div>

        <button
          onClick={() => onNavigate('enquiries')}
          className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-lg transition-all hover:scale-105 shrink-0 flex items-center justify-center gap-2"
        >
          <span>View All {enquiries.length} Admission Forms</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3 BIG EASY STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: New Enquiries */}
        <div
          onClick={() => onNavigate('enquiries')}
          className="bg-white p-6 rounded-3xl border-2 border-amber-300 shadow-md cursor-pointer hover:shadow-xl transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">🟡 New Pending Forms</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">{newEnquiriesCount}</p>
          <p className="text-xs text-amber-700 font-extrabold flex items-center gap-1">
            <span>Parents waiting for response</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </p>
        </div>

        {/* Card 2: Enrolled Students */}
        <div
          onClick={() => onNavigate('enquiries')}
          className="bg-white p-6 rounded-3xl border-2 border-emerald-300 shadow-md cursor-pointer hover:shadow-xl transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">🟢 Total Enrolled</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">{enrolledCount}</p>
          <p className="text-xs text-emerald-700 font-extrabold flex items-center gap-1">
            <span>Confirmed student admissions</span>
          </p>
        </div>

        {/* Card 3: Photo Gallery */}
        <div
          onClick={() => onNavigate('gallery')}
          className="bg-white p-6 rounded-3xl border-2 border-blue-300 shadow-md cursor-pointer hover:shadow-xl transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">📸 Live Campus Photos</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">{galleryItems.length}</p>
          <p className="text-xs text-blue-700 font-extrabold flex items-center gap-1">
            <span>Click to upload new photos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </p>
        </div>
      </div>

      {/* RECENT ENQUIRIES & QUICK WHATSAPP ACTIONS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">Latest Parent Admission Enquiries</h3>
            <p className="text-xs text-slate-500 font-medium">Click the green WhatsApp button to chat directly with parents.</p>
          </div>

          <button
            onClick={() => onNavigate('enquiries')}
            className="text-xs font-black text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Full Enquiries List</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {enquiries.slice(0, 4).map((e) => {
            const cleanPhone = e.phone.replace(/\D/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=${encodeURIComponent(
              `Hello ${e.parentName}! Greetings from EuroKids Balwant Nagar. We received your enquiry for ${e.childName} (${e.program}). When is a good time to connect?`
            )}`;

            return (
              <div key={e.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-all">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{e.childName}</h4>
                    <span className="bg-blue-100 text-blue-900 text-[10px] font-black px-2 py-0.5 rounded-md border border-blue-200">
                      {e.program}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      e.status === 'New' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {e.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    Parent: <strong>{e.parentName}</strong> • Phone: <strong className="font-mono">{e.phone}</strong> • Locality: {e.locality || 'Gwalior'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Parent</span>
                  </a>

                  <a
                    href={`tel:${e.phone}`}
                    className="px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-transform hover:scale-105"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
