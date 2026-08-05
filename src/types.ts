export interface ProgramItem {
  id: string;
  name: string;
  subtitle: string;
  ageGroup: string;
  timing: string;
  teacherRatio: string;
  description: string;
  keyOutcomes: string[];
  dailyHighlights: string[];
  image: string;
  badge: string;
  annualFee: string;
  termFee: string;
}

export interface DayRoutineStep {
  time: string;
  title: string;
  description: string;
  category: 'welcome' | 'learning' | 'nutrition' | 'play' | 'creativity';
  iconName: string;
}

export interface CampusFacility {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  category: 'classroom' | 'play' | 'learning' | 'safety' | 'health';
}

export interface FacultyMember {
  name: string;
  role: string;
  qualification: string;
  experience: string;
  bio: string;
  image: string;
  specialty: string;
}

export interface Testimonial {
  id: string;
  parentName: string;
  childNameAndGrade: string;
  locality: string;
  quote: string;
  avatar: string;
  rating: number;
  date: string;
  isApproved?: boolean;
}

export interface NewsEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface BusRoute {
  routeNumber: string;
  areaName: string;
  stops: string[];
  pickupTime: string;
  dropTime: string;
  supervisorPhone: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  fileSize: string;
  date: string;
  downloadUrl: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

export interface Enquiry {
  id: string;
  childName: string;
  parentName: string;
  phone: string;
  email: string;
  program: string;
  childAge?: string;
  dob?: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Visited' | 'Enrolled' | 'Closed';
}

export interface SchoolInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  altPhone: string;
  email: string;
  whatsapp: string;
  officeHours: string;
  established: number;
  city: string;
  mapsUrl: string;
  mapCoordinates: { lat: number; lng: number };
  stats: { label: string; value: string }[];
}

export type ThemeMode = 'yellow' | 'blue' | 'green' | 'pink';
