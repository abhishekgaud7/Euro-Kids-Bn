import React from 'react';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  ShieldCheck,
  Globe
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
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'enquiries', label: 'Admission Enquiries', icon: Users },
    { id: 'feedbacks', label: 'Parent Testimonials', icon: MessageSquare },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'settings', label: 'School Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-5 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-lg">
              EK
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white">EuroKids Admin</h2>
              <p className="text-[10px] text-amber-400 font-semibold">Balwant Nagar Desk</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
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
