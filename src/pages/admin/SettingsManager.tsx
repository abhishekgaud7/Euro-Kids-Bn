import React, { useState } from 'react';
import { Save, Building, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export const SettingsManager: React.FC = () => {
  const { schoolInfo, updateSchoolInfo } = useData();

  const [name, setName] = useState(schoolInfo.name);
  const [tagline, setTagline] = useState(schoolInfo.tagline);
  const [address, setAddress] = useState(schoolInfo.address);
  const [phone, setPhone] = useState(schoolInfo.phone);
  const [email, setEmail] = useState(schoolInfo.email);
  const [officeHours, setOfficeHours] = useState(schoolInfo.officeHours);

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">School Profile Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Edit general phone numbers, campus address, and office hours displayed across the public website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
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
    </div>
  );
};
