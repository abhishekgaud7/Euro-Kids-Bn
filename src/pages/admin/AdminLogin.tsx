import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo credentials: admin / eurokids123 or any password for easy access
    if (username.toLowerCase() === 'admin' && (password === 'eurokids123' || password.length > 0)) {
      toast.success('Welcome back, Admin!');
      onLoginSuccess();
    } else {
      toast.error('Invalid credentials! (Try username: admin, password: eurokids123)');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Admin Portal Login</h2>
          <p className="text-xs text-slate-500">
            EuroKids Balwant Nagar Management Desk
          </p>
        </div>

        <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
          💡 Demo Access Credentials:
          <br />
          Username: <strong>admin</strong> | Password: <strong>eurokids123</strong>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Access Dashboard</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </form>
      </div>
    </div>
  );
};
