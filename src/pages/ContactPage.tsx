import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, ExternalLink, Sparkles, Building } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { sendWeb3FormsNotification } from '../utils/web3forms';

export const ContactPage: React.FC = () => {
  const { schoolInfo, addEnquiry } = useData();

  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('Nursery');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone) return;

    addEnquiry({
      childName: `Child of ${parentName}`,
      parentName,
      phone,
      email,
      program,
      message
    });

    sendWeb3FormsNotification({
      subject: `New Contact Form Query: ${parentName} (${program})`,
      parent_name: parentName,
      phone_number: phone,
      email_address: email || 'Not provided',
      program_interest: program,
      message: message || 'No message provided'
    });

    setParentName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const rawWhatsapp = schoolInfo.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${rawWhatsapp}?text=Hello%20EuroKids%20Balwant%20Nagar!`;

  return (
    <div className="space-y-12 py-6 md:py-10">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-amber-400 via-rose-300 to-sky-300 rounded-3xl p-8 md:p-12 text-slate-900 border-4 border-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-white/90 text-amber-900 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-amber-200">
            Reach Out To Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            We'd Love to Welcome You to Campus
          </h1>
          <p className="text-base text-slate-800 font-medium leading-relaxed">
            Located in Thatipur, Gwalior. Have questions about admissions, fees, or bus routes? Visit us or drop a message below.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CONTACT INFO & MAPS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              School Front Desk
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Campus Address</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{schoolInfo.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Phone & Mobile</h4>
                  <a href={`tel:${schoolInfo.phone}`} className="text-sky-600 font-bold hover:underline">
                    {schoolInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Email Contact</h4>
                  <a href={`mailto:${schoolInfo.email}`} className="text-rose-600 font-bold hover:underline">
                    {schoolInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">Visiting Hours</h4>
                  <p className="text-slate-600 mt-0.5">{schoolInfo.officeHours}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={schoolInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <ExternalLink className="w-4 h-4 text-amber-400" />
                <span>Google Maps Route</span>
              </a>
            </div>
          </div>

          {/* EMBEDDED MAP PREVIEW */}
          <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-xl overflow-hidden">
            <iframe
              title="EuroKids Balwant Nagar Location"
              src="https://maps.google.com/maps?q=26.21089,78.193871&z=16&output=embed"
              width="100%"
              height="240"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>

        {/* DIRECT MESSAGE FORM */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct Message</span>
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
            Send a Quick Enquiry
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Leave your contact details and our team will get back to you promptly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Parent Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neha Sharma"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98260 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Program of Interest</label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800 font-medium"
                >
                  <option value="Playgroup">Playgroup (1.8 - 3 Yrs)</option>
                  <option value="Nursery">Nursery (3 - 4 Yrs)</option>
                  <option value="Junior KG">Junior KG (4 - 5 Yrs)</option>
                  <option value="Senior KG">Senior KG (5 - 6 Yrs)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message / Question</label>
              <textarea
                rows={5}
                placeholder="Ask us anything about campus timings, fee structures, bus routes, or classroom walkthroughs..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-xs text-slate-800 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message to Front Desk</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
