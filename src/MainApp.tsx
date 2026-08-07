import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookVisitModal } from './components/BookVisitModal';
import { EnquiryDrawer } from './components/EnquiryDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { CampusPage } from './pages/CampusPage';
import { GalleryPage } from './pages/GalleryPage';
import { FeedbacksPage } from './pages/FeedbacksPage';
import { ContactPage } from './pages/ContactPage';

export const MainApp: React.FC = () => {
  const location = useLocation();

  const getActiveTabFromPath = () => {
    const path = location.pathname.substring(1);
    return path || 'home';
  };

  const [activeTab, setActiveTab] = useState<string>(getActiveTabFromPath());

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-slate-50 selection:bg-blue-200">
      {/* Background EuroKids Blue Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-20 left-10 w-48 h-48 bg-blue-300 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-96 right-16 w-56 h-56 bg-sky-200 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Responsive Navbar */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Page Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage onNavigateTab={setActiveTab} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/campus" element={<CampusPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/feedbacks" element={<FeedbacksPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Preschool Footer */}
        <Footer />
      </div>

      {/* Global Modals & Drawers */}
      <BookVisitModal />
      <EnquiryDrawer />
      <FloatingWhatsApp />
    </div>
  );
};
