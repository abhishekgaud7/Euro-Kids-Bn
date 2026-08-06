import React, { useState } from 'react';
import {
  Search,
  Trash2,
  Phone,
  Mail,
  Filter,
  CheckCircle2,
  MessageSquare,
  MessageCircle,
  Bus,
  Clock,
  MapPin,
  Printer,
  Download,
  User,
  Baby,
  Sparkles
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Enquiry } from '../../types';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';

export const EnquiryManager: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry, schoolInfo } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [localityFilter, setLocalityFilter] = useState<string>('All');

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesLocality = localityFilter === 'All' || (e.locality && e.locality.includes(localityFilter));

    return matchesSearch && matchesStatus && matchesLocality;
  });

  // Direct WhatsApp Link Helper for Front Desk / School Owner
  const getWhatsAppLink = (e: Enquiry) => {
    const cleanPhone = e.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const text = encodeURIComponent(
      `Hello ${e.parentName}! Greetings from EuroKids Balwant Nagar, Gwalior. We received your admission enquiry for ${e.childName} (${e.program}). When is a good time to schedule your campus walkthrough?`
    );
    return `https://wa.me/${phoneWithCountry}?text=${text}`;
  };

  // Export Enquiries List to PDF for Owner
  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(245, 158, 11); // Amber
      doc.rect(0, 0, 210, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('EuroKids Balwant Nagar - Admissions Enquiry Sheet', 14, 16);

      const tableData = filteredEnquiries.map((e) => [
        e.date,
        e.childName,
        e.parentName,
        e.program,
        e.phone,
        e.locality || 'Gwalior',
        e.status
      ]);

      autoTable(doc, {
        startY: 32,
        head: [['Date', 'Child', 'Parent', 'Program', 'Phone', 'Locality', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [30, 41, 59] },
        styles: { fontSize: 9 }
      });

      doc.save(`EuroKids-Enquiries-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('Enquiry sheet downloaded as PDF!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate PDF sheet');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200 inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Admissions Desk</span>
          </span>
          <h1 className="text-2xl font-black text-slate-900">Enquiry & Application Tracker</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage parent contacts, click to WhatsApp/Call, and track enrollment statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportPDF}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Export PDF Sheet</span>
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative col-span-1 sm:col-span-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search parent, child name, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-900 font-medium"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-xs font-bold text-slate-800"
        >
          <option value="All">Filter Status: All ({enquiries.length})</option>
          <option value="New">New Enquiries</option>
          <option value="Contacted">Contacted</option>
          <option value="Visited">Campus Visited</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={localityFilter}
          onChange={(e) => setLocalityFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-xs font-bold text-slate-800"
        >
          <option value="All">Filter Locality: All Gwalior</option>
          <option value="Thatipur">Thatipur</option>
          <option value="Gandhi Road">Gandhi Road</option>
          <option value="Balwant Nagar">Balwant Nagar</option>
          <option value="Morar">Morar</option>
          <option value="Pinto Park">Pinto Park</option>
          <option value="DD Nagar">DD Nagar</option>
          <option value="City Centre">City Centre</option>
        </select>
      </div>

      {/* ENQUIRIES TABLE FOR OWNER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4">Child & Program</th>
                <th className="p-4">Parent & Contact</th>
                <th className="p-4">Locality & Transport</th>
                <th className="p-4">Quick Action buttons</th>
                <th className="p-4">Status Tracker</th>
                <th className="p-4 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-amber-50/40 transition-colors">
                    {/* Child & Program */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                          <Baby className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm">{e.childName}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded">
                              {e.program}
                            </span>
                            {e.childAge && (
                              <span className="text-[10px] text-slate-500 font-semibold">
                                {e.childAge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Parent & Phone */}
                    <td className="p-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{e.parentName}</span>
                      </div>
                      <div className="text-slate-600 font-mono font-bold mt-0.5 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-sky-600" />
                        <span>{e.phone}</span>
                      </div>
                      {e.email && <div className="text-[10px] text-slate-400">{e.email}</div>}
                    </td>

                    {/* Locality & Transport */}
                    <td className="p-4">
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{e.locality || 'Gwalior'}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        {e.busNeeded ? (
                          <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-sky-200">
                            <Bus className="w-3 h-3" /> Bus Required
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                            Self Transport
                          </span>
                        )}
                        {e.preferredContactTime && (
                          <span className="text-[10px] text-slate-400 font-medium hidden md:inline">
                            • {e.preferredContactTime}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Direct One-Click WhatsApp & Call Buttons */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <a
                          href={getWhatsAppLink(e)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all hover:scale-105"
                          title="Open WhatsApp chat with parent"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${e.phone}`}
                          className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-all hover:scale-105"
                          title="Call parent directly"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>
                      </div>
                    </td>

                    {/* Status Tracker Dropdown */}
                    <td className="p-4 whitespace-nowrap">
                      <select
                        value={e.status}
                        onChange={(evt) => updateEnquiryStatus(e.id, evt.target.value as Enquiry['status'])}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black outline-none border cursor-pointer ${
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
                        <option value="New">🟡 New</option>
                        <option value="Contacted">🔵 Contacted</option>
                        <option value="Visited">🟣 Campus Visited</option>
                        <option value="Enrolled">🟢 Enrolled</option>
                        <option value="Closed">⚪ Closed</option>
                      </select>
                    </td>

                    {/* Delete */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteEnquiry(e.id)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Enquiry Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-400 font-medium">
                    No enquiries match your search/filter criteria.
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
