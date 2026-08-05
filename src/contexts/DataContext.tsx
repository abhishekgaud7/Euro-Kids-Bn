import React, { createContext, useContext, useState, useEffect } from 'react';
import { Enquiry, Testimonial, GalleryImage, SchoolInfo } from '../types';
import { TESTIMONIALS, GALLERY_ITEMS, SCHOOL_INFO } from '../data/schoolData';
import toast from 'react-hot-toast';

interface DataContextType {
  schoolInfo: SchoolInfo;
  updateSchoolInfo: (newInfo: Partial<SchoolInfo>) => void;
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  deleteEnquiry: (id: string) => void;
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date'>) => void;
  deleteTestimonial: (id: string) => void;
  galleryItems: GalleryImage[];
  addGalleryImage: (item: Omit<GalleryImage, 'id'>) => void;
  deleteGalleryImage: (id: string) => void;
  isBookVisitOpen: boolean;
  openBookVisit: () => void;
  closeBookVisit: () => void;
  isEnquiryDrawerOpen: boolean;
  openEnquiryDrawer: () => void;
  closeEnquiryDrawer: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    childName: 'Aarav Sharma',
    parentName: 'Neha Sharma',
    phone: '+91 98261 23456',
    email: 'neha.sharma@example.com',
    program: 'Nursery',
    childAge: '3.2 Years',
    dob: '2023-04-10',
    message: 'Interested in morning batch transport from Thatipur.',
    date: '2026-08-01',
    status: 'New'
  },
  {
    id: 'enq-102',
    childName: 'Pihu Dixit',
    parentName: 'Rajesh Dixit',
    phone: '+91 98930 87654',
    email: 'rajesh.dixit@example.com',
    program: 'Playgroup',
    childAge: '2.1 Years',
    dob: '2024-05-15',
    message: 'Would like to visit campus this Saturday for a walkthrough.',
    date: '2026-08-03',
    status: 'Visited'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(() => {
    const saved = localStorage.getItem('eurokids_school_info');
    return saved ? JSON.parse(saved) : SCHOOL_INFO;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('eurokids_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('eurokids_testimonials');
    return saved ? JSON.parse(saved) : TESTIMONIALS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('eurokids_gallery');
    return saved ? JSON.parse(saved) : GALLERY_ITEMS;
  });

  const [isBookVisitOpen, setIsBookVisitOpen] = useState(false);
  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('eurokids_school_info', JSON.stringify(schoolInfo));
  }, [schoolInfo]);

  useEffect(() => {
    localStorage.setItem('eurokids_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('eurokids_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('eurokids_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  const updateSchoolInfo = (newInfo: Partial<SchoolInfo>) => {
    setSchoolInfo(prev => ({ ...prev, ...newInfo }));
    toast.success('School profile updated successfully!');
  };

  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'date' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    toast.success('Enquiry submitted! Our team will contact you shortly.');
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    toast.success(`Enquiry status updated to ${status}`);
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    toast.success('Enquiry deleted');
  };

  const addTestimonial = (data: Omit<Testimonial, 'id' | 'date'>) => {
    const newTestimonial: Testimonial = {
      ...data,
      id: `t-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      isApproved: true
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
    toast.success('Thank you! Your feedback has been posted.');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    toast.success('Testimonial removed');
  };

  const addGalleryImage = (data: Omit<GalleryImage, 'id'>) => {
    const newItem: GalleryImage = {
      ...data,
      id: `g-${Date.now()}`
    };
    setGalleryItems(prev => [newItem, ...prev]);
    toast.success('Gallery photo added successfully!');
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
    toast.success('Photo deleted from gallery');
  };

  return (
    <DataContext.Provider value={{
      schoolInfo,
      updateSchoolInfo,
      enquiries,
      addEnquiry,
      updateEnquiryStatus,
      deleteEnquiry,
      testimonials,
      addTestimonial,
      deleteTestimonial,
      galleryItems,
      addGalleryImage,
      deleteGalleryImage,
      isBookVisitOpen,
      openBookVisit: () => setIsBookVisitOpen(true),
      closeBookVisit: () => setIsBookVisitOpen(false),
      isEnquiryDrawerOpen,
      openEnquiryDrawer: () => setIsEnquiryDrawerOpen(true),
      closeEnquiryDrawer: () => setIsEnquiryDrawerOpen(false)
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
