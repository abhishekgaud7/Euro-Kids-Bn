import React from 'react';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  ShieldCheck,
  Globe,
  HelpCircle,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
  children
}) => {
  const sidebarItems = [
    {
      id: 'dashboard',
      label: '📊 Dashboard Overview',
      subtitle: 'Quick Summary & Today Actions',
      icon: LayoutDashboard
    },
    {
      id: 'enquiries',
      label: '📩 Admission Enquiries',
      subtitle: 'Parent WhatsApp & Call List',
      icon: Users
    },
    {
      id: 'gallery',
      label: '📸 School Photo Gallery',
      subtitle: 'Upload & Delete Campus Photos',
      icon: ImageIcon
    },
    {
      id: 'feedbacks',
      label: '⭐ Parent Reviews',
      subtitle: 'Manage Parent Testimonials',
      icon: MessageSquare
    },
    {
      id: 'settings',
      label: '⚙️ School Settings',
      subtitle: 'Email Alert & Security Passcode',
      icon: Settings
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Super Clear Owner Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 text-white p-5 flex flex-col justify-between shrink-0 border-r border-slate-800 shadow-2xl">
        <div className="space-y-6">
          {/* Header Brand */}
          <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
              EK
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white leading-tight">EuroKids Control Desk</h2>
              <p className="text-[11px] text-amber-400 font-bold">Balwant Nagar • Owner Panel</p>
            </div>
          </div>

          {/* Simple Tab Navigation */}
          <div className="space-y-1">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 mb-2">
              School Management Tabs
            </p>
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg font-black scale-[1.02]'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white font-bold'
                  }`}
                >
                  <div className="text-xs font-black">{item.label}</div>
                  <div className={`text-[10px] mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400 font-medium'}`}>
                    {item.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Quick Links */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-sky-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Open Public Website ↗</span>
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock & Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
