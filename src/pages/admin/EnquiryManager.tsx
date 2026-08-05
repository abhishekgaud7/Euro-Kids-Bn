import React, { useState } from 'react';
import { Search, Trash2, Phone, Mail, Filter, CheckCircle2, MessageSquare } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Enquiry } from '../../types';

export const EnquiryManager: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Enquiry Manager</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track and update status of admission enquiries submitted by parents.
          </p>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by parent, child, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-xs font-bold text-slate-700"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Visited">Visited</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">Child & Parent</th>
                <th className="p-4">Program</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Message / Query</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status Tracker</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-extrabold text-slate-900">{e.childName}</div>
                      <div className="text-[11px] text-slate-500 font-medium">Parent: {e.parentName}</div>
                      {e.childAge && <div className="text-[10px] text-amber-600 font-semibold">Age: {e.childAge}</div>}
                    </td>

                    <td className="p-4 font-bold text-amber-700">{e.program}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <a href={`tel:${e.phone}`} className="hover:underline">{e.phone}</a>
                      </div>
                      {e.email && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{e.email}</span>
                        </div>
                      )}
                    </td>

                    <td className="p-4 max-w-xs text-slate-600">
                      <p className="line-clamp-2">{e.message || 'No custom query provided.'}</p>
                    </td>

                    <td className="p-4 text-slate-500 font-medium whitespace-nowrap">{e.date}</td>

                    <td className="p-4">
                      <select
                        value={e.status}
                        onChange={(evt) => updateEnquiryStatus(e.id, evt.target.value as Enquiry['status'])}
                        className={`px-2.5 py-1 rounded-lg text-xs font-extrabold outline-none border cursor-pointer ${
                          e.status === 'New'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : e.status === 'Contacted'
                            ? 'bg-sky-100 text-sky-900 border-sky-300'
                            : e.status === 'Visited'
                            ? 'bg-purple-100 text-purple-900 border-purple-300'
                            : e.status === 'Enrolled'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Visited">Visited</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteEnquiry(e.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No enquiries match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
