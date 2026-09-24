import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Heart, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const Footer: React.FC = () => {
  const { schoolInfo, openBookVisit, openEnquiryDrawer } = useData();

  return (
    <footer className="bg-slate-900 text-slate-300 relative overflow-hidden border-t-4 border-amber-400">
      {/* Decorative Top Wave Pattern */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400" />

      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <Link to="/" className="inline-block p-2.5 sm:p-3 rounded-2xl bg-white shadow-xl hover:opacity-95 transition-opacity" title="EuroKids Balwant Nagar">
              <img
                src="/images/eurokids-logo.jpg"
                alt="EuroKids Pre-School Balwant Nagar, Gwalior"
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              {schoolInfo.tagline} Providing a safe, nurturing environment where children discover, play, and prepare for primary school with joy.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 text-[11px] font-semibold border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>CCTV & Police Verified Staff</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-amber-400 text-[11px] font-semibold border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>TUV Certified Centre</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-sky-400 text-[11px] font-semibold border border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>24x7 Power Backup & AC</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-emerald-300 text-[11px] font-semibold border border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Open Green Play Garden</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Shifted from Col 3) */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">About Us & Pedagogy</Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-amber-400 transition-colors">Admission Process & Fees</Link>
              </li>
              <li>
                <Link to="/campus" className="hover:text-amber-400 transition-colors">Campus Safety & Bus Routes</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors">Photo Gallery</Link>
              </li>
              <li>
                <Link to="/feedbacks" className="hover:text-amber-400 transition-colors">Parent Testimonials</Link>
              </li>
              <li>
                <button onClick={openBookVisit} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Schedule Campus Walkthrough
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details (Shifted from Col 4, without time/date) */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{schoolInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${schoolInfo.phone}`} className="hover:text-amber-400 transition-colors">
                  {schoolInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${schoolInfo.email}`} className="hover:text-amber-400 transition-colors">
                  {schoolInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Interactive Campus Map */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Campus Location</span>
              </h4>
              <a
                href={schoolInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-slate-700 shadow-md bg-slate-800 h-44 w-full relative">
              <iframe
                title="EuroKids Preschool in Balwant Nagar, Gwalior"
                src="https://maps.google.com/maps?q=EuroKids+Preschool+in+Balwant+Nagar%2C+Gandhi+Rd%2C+Thatipur%2C+Gwalior%2C+Madhya+Pradesh+474011&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EuroKids Balwant Nagar, Gwalior. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={openEnquiryDrawer} className="hover:text-amber-400 transition-colors">
              Admission Enquiry
            </button>
            <span>•</span>
            <button onClick={openBookVisit} className="hover:text-amber-400 transition-colors">
              Book Walkthrough
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
