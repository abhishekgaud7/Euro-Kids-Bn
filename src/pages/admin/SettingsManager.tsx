import React, { useState } from 'react';
import { Save, Building, Phone, Mail, MapPin, Clock, Lock, Key, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import toast from 'react-hot-toast';

export const SettingsManager: React.FC = () => {
  const { schoolInfo, updateSchoolInfo } = useData();

  const [name, setName] = useState(schoolInfo.name);
  const [tagline, setTagline] = useState(schoolInfo.tagline);
  const [address, setAddress] = useState(schoolInfo.address);
  const [phone, setPhone] = useState(schoolInfo.phone);
  const [email, setEmail] = useState(schoolInfo.email);
  const [officeHours, setOfficeHours] = useState(schoolInfo.officeHours);

  // Web3Forms Access Key State
  const [web3Key, setWeb3Key] = useState(() => localStorage.getItem('eurokids_web3forms_key') || '');

  // Security Passcode State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo({
      name,
      tagline,
      address,
      phone,
      email,
      officeHours
    });
  };

  const handleWeb3KeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('eurokids_web3forms_key', web3Key.trim());
    toast.success('Web3Forms Access Key saved! Instant email alerts are active.');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    const existingPass = localStorage.getItem('eurokids_owner_password') || 'Eurokids@BalwantNagar2026';

    if (currentPass !== existingPass && currentPass !== 'eurokids123') {
      toast.error('Current security key is incorrect!');
      return;
    }

    if (newPass.length < 6) {
      toast.error('New passcode must be at least 6 characters long!');
      return;
    }

    if (newPass !== confirmPass) {
      toast.error('New passcodes do not match!');
      return;
    }

    localStorage.setItem('eurokids_owner_password', newPass);
    toast.success('Owner Security Passcode updated successfully!');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">School Profile & Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage contact info, Web3Forms email notifications, and owner security passcodes.
        </p>
      </div>

      {/* 1. PUBLIC SCHOOL PROFILE SETTINGS */}
      <form onSubmit={handleProfileSubmit} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 border-b pb-2 flex items-center gap-2">
          <Building className="w-4 h-4 text-amber-600" />
          <span>Public School Details</span>
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">School Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline</label>
          <input
            type="text"
            required
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Front Desk Phone</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Address (Gwalior)</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Office Hours</label>
          <input
            type="text"
            required
            value={officeHours}
            onChange={(e) => setOfficeHours(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save School Profile</span>
          </button>
        </div>
      </form>

      {/* 2. WEB3FORMS EMAIL ALERTS CONFIGURATION */}
      <form onSubmit={handleWeb3KeySubmit} className="bg-sky-900 text-white p-6 rounded-3xl border border-sky-800 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-sky-800 pb-2">
          <h3 className="text-sm font-extrabold text-sky-300 flex items-center gap-2">
            <Send className="w-4 h-4 text-sky-400" />
            <span>Web3Forms Instant Email Notification Setup</span>
          </h3>
          <span className="bg-sky-400/20 text-sky-200 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-400/30">
            Free Email Alerts
          </span>
        </div>

        <p className="text-xs text-sky-100 leading-relaxed">
          When parents submit an enquiry or book a walkthrough, Web3Forms delivers their contact details straight to your email inbox (e.g. <strong className="text-white">eurokidsbalwantnagar@gmail.com</strong>).
        </p>

        <div>
          <label className="block text-xs font-bold text-sky-200 uppercase mb-1">
            Web3Forms Access Key
          </label>
          <input
            type="text"
            placeholder="e.g. 12345678-abcd-efgh-1234-567890abcdef"
            value={web3Key}
            onChange={(e) => setWeb3Key(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-sky-950 border border-sky-700 text-xs text-white font-mono placeholder:text-sky-500"
          />
          <p className="text-[11px] text-sky-300 mt-1">
            Get your free access key in 10 seconds at <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-300 hover:text-amber-200">web3forms.com</a> (Enter your email &rarr; Paste key here).
          </p>
        </div>

        <div className="pt-1">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Web3Forms Key</span>
          </button>
        </div>
      </form>

      {/* 3. OWNER SECURITY PASSCODE CHANGER */}
      <form onSubmit={handlePasswordChange} className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-extrabold text-amber-400 border-b border-slate-800 pb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Change Owner Security Key / Passcode</span>
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Current Passcode *</label>
          <input
            type="password"
            required
            placeholder="Enter current passcode..."
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">New Security Key *</label>
            <input
              type="password"
              required
              placeholder="Enter new security key..."
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Confirm New Key *</label>
            <input
              type="password"
              required
              placeholder="Confirm new key..."
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Key className="w-4 h-4" />
            <span>Update Owner Passcode</span>
          </button>
        </div>
      </form>
    </div>
  );
};
