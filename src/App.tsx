import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { MainApp } from './MainApp';
import { AdminPortal } from './pages/admin/AdminPortal';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Routes>
          <Route path="/admin/*" element={<AdminPortal />} />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
