import React, { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { EnquiryManager } from './EnquiryManager';
import { GalleryManager } from './GalleryManager';
import { SettingsManager } from './SettingsManager';
import { FeedbackManager } from './FeedbackManager';
import {
  Users,
  ImageIcon,
  Settings,
  LogOut,
  Globe,
  Sparkles,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const AdminPortal: React.FC = () => {
  const { enquiries } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('eurokids_admin_auth') === 'true';
  });

  // Simple 3 Tabs: 'enquiries' (Forms), 'gallery' (Photos), 'settings' (Settings & Passcode)
  const [activeTab, setActiveTab] = useState<'enquiries' | 'gallery' | 'settings'>('enquiries');

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('eurokids_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('eurokids_admin_auth');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLogin} />;
  }

  const newCount = enquiries.filter(e => e.status === 'New').length;

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-12">
      {/* 1. TOP OWNER BAR */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
              EK
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white leading-none">
                EuroKids Balwant Nagar
              </h1>
              <p className="text-[11px] text-amber-400 font-bold mt-0.5">
                School Owner Control Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">View Website</span>
            </a>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN OWNER DASHBOARD CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        {/* Simple Explanation Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 rounded-3xl border-4 border-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
              Namaste Owner! 🙏
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              EuroKids School Desk Dashboard
            </h2>
            <p className="text-xs text-blue-100 font-medium mt-0.5">
              Yahan se aap aaye hue parent contacts dekh sakte hain, WhatsApp kar sakte hain, aur website ke photos badal sakte hain.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/15 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/20 text-center">
              <p className="text-2xl font-black text-amber-300">{enquiries.length}</p>
              <p className="text-[10px] text-slate-200 font-bold uppercase">Total Forms</p>
            </div>
            <div className="bg-amber-400 text-slate-950 px-4 py-2 rounded-2xl text-center shadow-md">
              <p className="text-2xl font-black">{newCount}</p>
              <p className="text-[10px] font-black uppercase">New Pending</p>
            </div>
          </div>
        </div>

        {/* 3. RADICALLY SIMPLE 3 MAIN TABS */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-md flex items-center justify-between gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'enquiries'
                ? 'bg-blue-700 text-white shadow-lg scale-[1.02]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-amber-300" />
            <span>1. Parent Forms & WhatsApp ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-blue-700 text-white shadow-lg scale-[1.02]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-300" />
            <span>2. Upload School Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-blue-700 text-white shadow-lg scale-[1.02]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4 text-amber-300" />
            <span>3. Settings & Security Key</span>
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div>
          {activeTab === 'enquiries' && <EnquiryManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'settings' && <SettingsManager />}
        </div>
      </main>
    </div>
  );
};
