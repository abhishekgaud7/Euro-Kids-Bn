import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Sparkles,
  Menu as MenuIcon,
  X,
  Palette,
  ShieldCheck,
  Calendar,
  Compass,
  GraduationCap,
  Baby,
  Smile,
  Award,
  BookOpen,
  FileText,
  Bus,
  Users,
  Sun,
  CheckCircle2,
  Download,
  Image as ImageIcon,
  MessageSquare,
  PhoneCall
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { ThemeMode } from '../types';

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { theme, setTheme } = useTheme();
  const { schoolInfo, openBookVisit, openEnquiryDrawer } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  // Hover trigger states for Hover-to-Open dropdown menus
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Program Items for Hover Dropdown
  const programDropdownItems = [
    {
      id: 'playgroup',
      name: 'Playgroup',
      age: '1.8 – 3 Years',
      desc: 'First steps with sensory exploration & play.',
      icon: Baby,
      badge: 'First Steps',
      color: 'bg-amber-100 text-amber-700 hover:bg-amber-200'
    },
    {
      id: 'nursery',
      name: 'Nursery',
      age: '3 – 4 Years',
      desc: 'Nurturing curiosity, speech & early counting.',
      icon: Smile,
      badge: 'Active Curiosity',
      color: 'bg-sky-100 text-sky-700 hover:bg-sky-200'
    },
    {
      id: 'junior-kg',
      name: 'Junior KG',
      age: '4 – 5 Years',
      desc: 'Connecting ideas, early phonics & social play.',
      icon: GraduationCap,
      badge: 'Creative Thinking',
      color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
    },
    {
      id: 'senior-kg',
      name: 'Senior KG',
      age: '5 – 6 Years',
      desc: 'Reading, foundational math & Grade 1 readiness.',
      icon: Award,
      badge: 'Grade 1 Ready',
      color: 'bg-pink-100 text-pink-700 hover:bg-pink-200'
    }
  ];

  // About Dropdown Items
  const aboutDropdownItems = [
    {
      title: 'Heureka Curriculum',
      desc: 'Visible thinking & hands-on sensory learning.',
      icon: BookOpen,
      color: 'bg-amber-100 text-amber-700'
    },
    {
      title: 'Interactive Day Routine',
      desc: '7-step rhythm balancing play, meals & stories.',
      icon: Sun,
      color: 'bg-rose-100 text-rose-700'
    },
    {
      title: 'Director Spotlight',
      desc: 'Mrs. Sadhna Shrivastava (30+ Yrs Pedagogy Care).',
      icon: Users,
      color: 'bg-emerald-100 text-emerald-700'
    }
  ];

  // Campus Dropdown Items
  const campusDropdownItems = [
    {
      title: 'Sunny Classrooms & Play Area',
      desc: 'Low open shelves, soft padded flooring & green patch.',
      icon: Sparkles,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      title: 'Gwalior Bus Route Checker',
      desc: 'Live routes across Thatipur, Morar, Pinto Park & DD Nagar.',
      icon: Bus,
      color: 'bg-sky-100 text-sky-700'
    },
    {
      title: 'CCTV & Police Verified Staff',
      desc: '100% fenced campus with safe pick-up gates.',
      icon: ShieldCheck,
      color: 'bg-rose-100 text-rose-700'
    }
  ];

  // Explore Quick Dropdown Items (Keeps Gallery, Parent Reviews, Admissions, & Contact available cleanly without cluttering navbar)
  const exploreDropdownItems = [
    {
      title: 'Photo Gallery',
      desc: 'Real photos of events, classrooms & playground.',
      path: '/gallery',
      id: 'gallery',
      icon: ImageIcon,
      color: 'bg-amber-100 text-amber-700'
    },
    {
      title: 'Parent Reviews & Ratings',
      desc: 'Read testimonials from Gwalior parents.',
      path: '/feedbacks',
      id: 'feedbacks',
      icon: MessageSquare,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      title: 'Admissions & Downloads',
      desc: '4-step process, fees & prospectus download.',
      path: '/admissions',
      id: 'admissions',
      icon: FileText,
      color: 'bg-sky-100 text-sky-700'
    },
    {
      title: 'Contact Us & Location',
      desc: 'Get in touch with front desk in Thatipur.',
      path: '/contact',
      id: 'contact',
      icon: PhoneCall,
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  const themeOptions: { id: ThemeMode; label: string; bg: string; border: string }[] = [
    { id: 'yellow', label: 'Sunbeam Yellow', bg: 'bg-amber-400', border: 'border-amber-500' },
    { id: 'blue', label: 'Sky Blue', bg: 'bg-sky-400', border: 'border-sky-500' },
    { id: 'green', label: 'Meadow Green', bg: 'bg-emerald-400', border: 'border-emerald-500' },
    { id: 'pink', label: 'Blossom Pink', bg: 'bg-pink-400', border: 'border-pink-500' },
  ];

  const handleNavClick = (linkId: string) => {
    if (setActiveTab) {
      setActiveTab(linkId);
    }
    setIsMobileMenuOpen(false);
    setHoveredMenu(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm backdrop-blur-md transition-all duration-300">
      {/* Top Bar - Quick Contact & Theme Selector */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href={`tel:${schoolInfo.phone}`} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{schoolInfo.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a href={`mailto:${schoolInfo.email}`} className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{schoolInfo.email}</span>
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{schoolInfo.officeHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Theme Selector Palette */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              <Palette className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden lg:inline text-[11px] font-medium text-slate-300 mr-1">Theme:</span>
              <div className="flex items-center gap-1">
                {themeOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    title={`Switch theme to ${t.label}`}
                    className={`w-4 h-4 rounded-full ${t.bg} transition-all duration-200 ${
                      theme === t.id ? 'ring-2 ring-white scale-110 shadow-sm' : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Location Badge */}
            <a
              href={schoolInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2.5 py-1 rounded-full text-[11px] font-medium border border-amber-500/30 transition-colors"
            >
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Thatipur, Gwalior</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="glass-panel bg-white/95 border-b border-blue-100/80 shadow-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group select-none"
            title="EuroKids Balwant Nagar Home"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-blue-800 text-xl">
                EK
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-blue-700 transition-colors">
                  EuroKids
                </span>
                <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-blue-200">
                  Balwant Nagar
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Preschool & Kindergarten • Gwalior
              </p>
            </div>
          </Link>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            {/* PROGRAMS (HOVER MENU) */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredMenu('programs')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to="/programs"
                onClick={() => handleNavClick('programs')}
                className={`flex items-center gap-1 px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all duration-200 ${
                  activeTab === 'programs' || location.pathname === '/programs'
                    ? 'bg-blue-100 text-blue-950 shadow-xs'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/80'
                }`}
              >
                <span>Programs</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    hoveredMenu === 'programs' ? 'rotate-180 text-amber-600' : 'text-slate-400'
                  }`}
                />
              </Link>

              <AnimatePresence>
                {hoveredMenu === 'programs' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-1 w-80 glass-dropdown rounded-2xl p-3 shadow-2xl z-50 border border-amber-100"
                  >
                    <div className="px-3 py-1.5 mb-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Our Learning Programs
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </div>

                    <div className="space-y-1.5">
                      {programDropdownItems.map((prog) => {
                        const IconComponent = prog.icon;
                        return (
                          <Link
                            key={prog.id}
                            to="/programs"
                            onClick={() => handleNavClick('programs')}
                            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 transition-all duration-200"
                          >
                            <div className={`p-2 rounded-xl ${prog.color} group-hover:scale-110 transition-transform`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                                  {prog.name}
                                </h4>
                                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                  {prog.age}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {prog.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ABOUT US (HOVER MENU) */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredMenu('about')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to="/about"
                onClick={() => handleNavClick('about')}
                className={`flex items-center gap-1 px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all duration-200 ${
                  activeTab === 'about' || location.pathname === '/about'
                    ? 'bg-amber-100 text-amber-900 shadow-xs'
                    : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50/80'
                }`}
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    hoveredMenu === 'about' ? 'rotate-180 text-amber-600' : 'text-slate-400'
                  }`}
                />
              </Link>

              <AnimatePresence>
                {hoveredMenu === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-1 w-72 glass-dropdown rounded-2xl p-3 shadow-2xl z-50 border border-amber-100"
                  >
                    <div className="px-3 py-1.5 mb-1.5 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        About Our Preschool
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </div>

                    <div className="space-y-1">
                      {aboutDropdownItems.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={idx}
                            to="/about"
                            onClick={() => handleNavClick('about')}
                            className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/80 transition-all"
                          >
                            <div className={`p-2 rounded-lg ${item.color} group-hover:scale-105 transition-transform`}>
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                                {item.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 line-clamp-1">{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CAMPUS (HOVER MENU) */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredMenu('campus')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to="/campus"
                onClick={() => handleNavClick('campus')}
                className={`flex items-center gap-1 px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all duration-200 ${
                  activeTab === 'campus' || location.pathname === '/campus'
                    ? 'bg-amber-100 text-amber-900 shadow-xs'
                    : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50/80'
                }`}
              >
                <span>Campus & Safety</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    hoveredMenu === 'campus' ? 'rotate-180 text-amber-600' : 'text-slate-400'
                  }`}
                />
              </Link>

              <AnimatePresence>
                {hoveredMenu === 'campus' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-1 w-80 glass-dropdown rounded-2xl p-3 shadow-2xl z-50 border border-amber-100"
                  >
                    <div className="px-3 py-1.5 mb-1.5 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Campus & Transport
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    </div>

                    <div className="space-y-1">
                      {campusDropdownItems.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={idx}
                            to="/campus"
                            onClick={() => handleNavClick('campus')}
                            className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/80 transition-all"
                          >
                            <div className={`p-2 rounded-lg ${item.color} group-hover:scale-105 transition-transform`}>
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                                {item.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 line-clamp-1">{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* EXPLORE MORE (HOVER DROPDOWN FOR GALLERY, REVIEWS, ADMISSIONS, CONTACT) */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredMenu('explore')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all duration-200 ${
                  hoveredMenu === 'explore' || ['/gallery', '/feedbacks', '/admissions', '/contact'].includes(location.pathname)
                    ? 'bg-amber-100 text-amber-900 shadow-xs'
                    : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50/80'
                }`}
              >
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Explore ▾</span>
              </button>

              <AnimatePresence>
                {hoveredMenu === 'explore' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-1 w-80 glass-dropdown rounded-2xl p-3 shadow-2xl z-50 border border-amber-100"
                  >
                    <div className="px-3 py-1.5 mb-1.5 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Explore Preschool Features
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </div>

                    <div className="space-y-1">
                      {exploreDropdownItems.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <Link
                            key={item.id}
                            to={item.path}
                            onClick={() => handleNavClick(item.id)}
                            className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/80 transition-all"
                          >
                            <div className={`p-2 rounded-lg ${item.color} group-hover:scale-105 transition-transform`}>
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                                {item.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 line-clamp-1">{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={openBookVisit}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Book Visit</span>
            </button>

            <button
              onClick={openEnquiryDrawer}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-amber-500 via-amber-600 to-rose-500 hover:from-amber-600 hover:to-rose-600 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Admissions Open</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-amber-100 overflow-hidden shadow-xl"
          >
            <div className="p-4 space-y-2">
              <Link
                to="/"
                onClick={() => handleNavClick('home')}
                className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50"
              >
                Home
              </Link>
              <Link
                to="/programs"
                onClick={() => handleNavClick('programs')}
                className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50"
              >
                Programs
              </Link>
              <Link
                to="/about"
                onClick={() => handleNavClick('about')}
                className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50"
              >
                About Us
              </Link>
              <Link
                to="/campus"
                onClick={() => handleNavClick('campus')}
                className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50"
              >
                Campus & Bus Routes
              </Link>
              <Link
                to="/admissions"
                onClick={() => handleNavClick('admissions')}
                className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50"
              >
                Admissions & Downloads
              </Link>
              <Link
                to="/gallery"
                onClick={() => handleNavClick('gallery')}
                className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50"
              >
                Photo Gallery
              </Link>
              <Link
                to="/feedbacks"
                onClick={() => handleNavClick('feedbacks')}
                className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50"
              >
                Parent Reviews
              </Link>
              <Link
                to="/contact"
                onClick={() => handleNavClick('contact')}
                className="block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-amber-50"
              >
                Contact Us
              </Link>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openBookVisit();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Book Visit</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openEnquiryDrawer();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-amber-500 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enquire Now</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
