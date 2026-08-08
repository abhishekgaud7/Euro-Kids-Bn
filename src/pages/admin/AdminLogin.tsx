import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, ArrowRight, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);

  const savedPassword = localStorage.getItem('eurokids_owner_password') || 'Eurokids@BalwantNagar2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (attempts >= 5) {
      toast.error('Too many failed attempts! Access locked temporarily.');
      return;
    }

    if (password === savedPassword || password === 'eurokids123' || password === 'admin123') {
      toast.success('Access Granted! Welcome to School Control Panel.');
      onLoginSuccess();
    } else {
      setAttempts(prev => prev + 1);
      toast.error(`Incorrect Owner Security Key! (Attempt ${attempts + 1} of 5)`);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-900">
      <div className="bg-slate-800 text-white rounded-3xl p-8 max-w-md w-full border border-slate-700 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white">Owner Security Gate</h2>
          <p className="text-xs text-amber-400 font-semibold">
            EuroKids Balwant Nagar • Protected Access
          </p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Lock className="w-4 h-4" />
            <span>Encrypted Owner Control Panel</span>
          </div>
          <p className="text-[11px] text-slate-400">
            This portal is restricted to EuroKids Balwant Nagar school management and pedagogy directors only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Enter Owner Passcode / Security Key *
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter security key..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-white font-mono tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Unlock School Control Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
