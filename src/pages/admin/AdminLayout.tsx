import React from 'react';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  Globe,
  Sparkles,
  ShieldCheck
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
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, badge: 'Main' },
    { id: 'enquiries', label: 'Admission Enquiries', icon: Users, badge: 'Live' },
    { id: 'gallery', label: 'Photo Gallery Manager', icon: ImageIcon },
    { id: 'feedbacks', label: 'Parent Reviews', icon: MessageSquare },
    { id: 'settings', label: 'School Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sleek Dark Executive Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-5 flex flex-col justify-between shrink-0 border-r border-slate-800 shadow-2xl">
        <div className="space-y-6">
          {/* Executive Brand Logo Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-500 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-blue-900 text-lg">
                EK
              </div>
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-tight leading-none">
                EuroKids Admin
              </h2>
              <p className="text-[10px] text-amber-400 font-bold mt-1">
                Balwant Nagar Desk
              </p>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="space-y-1">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Management Menu
            </p>
            {sidebarItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg scale-[1.02]'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-white text-blue-900' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-sky-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>View Public Site ↗</span>
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Desk</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
