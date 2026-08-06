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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-lg">
                EK
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg leading-tight">
                  EuroKids Balwant Nagar
                </h3>
                <p className="text-xs text-amber-400 font-semibold">Gwalior, Madhya Pradesh</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {schoolInfo.tagline} Providing a safe, nurturing environment where children discover, play, and prepare for primary school with joy.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold border border-slate-700">
                <ShieldCheck className="w-4 h-4" />
                <span>CCTV & Verified Staff</span>
              </div>
            </div>
          </div>

          {/* Column 2: Programs & Curriculum */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Learning Programs</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/programs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Playgroup (1.8 - 3 Yrs)</span>
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Nursery (3 - 4 Yrs)</span>
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Junior KG (4 - 5 Yrs)</span>
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  <span>Senior KG (5 - 6 Yrs)</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Heureka Thinking Curriculum</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
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
                <button onClick={openBookVisit} className="hover:text-amber-400 transition-colors text-left">
                  Schedule Campus Walkthrough
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
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
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{schoolInfo.officeHours}</span>
              </div>

              <div className="pt-2">
                <a
                  href={schoolInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 font-semibold transition-colors text-xs"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
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
