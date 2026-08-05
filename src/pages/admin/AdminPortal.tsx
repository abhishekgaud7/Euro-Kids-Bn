import React, { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { EnquiryManager } from './EnquiryManager';
import { FeedbackManager } from './FeedbackManager';
import { GalleryManager } from './GalleryManager';
import { SettingsManager } from './SettingsManager';

export const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('eurokids_admin_auth') === 'true';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('eurokids_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('eurokids_admin_auth');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLogin} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigate={setActiveTab} />;
      case 'enquiries':
        return <EnquiryManager />;
      case 'feedbacks':
        return <FeedbackManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <AdminDashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {renderTabContent()}
    </AdminLayout>
  );
};
