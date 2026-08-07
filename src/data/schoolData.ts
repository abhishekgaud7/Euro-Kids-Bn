import {
  ProgramItem,
  DayRoutineStep,
  CampusFacility,
  FacultyMember,
  Testimonial,
  NewsEvent,
  BusRoute,
  DownloadItem,
  GalleryImage,
  SchoolInfo
} from '../types';

export const SCHOOL_INFO: SchoolInfo = {
  name: "EuroKids Balwant Nagar",
  tagline: "A happy place where young children feel at home while they learn.",
  address: "E-46-A, Balwant Nagar, Gandhi Road, Thatipur, Gwalior, Madhya Pradesh - 474011",
  phone: "+91-9183686765",
  altPhone: "+91-9183686765",
  email: "Eurokidsccgwl@gmail.com",
  whatsapp: "919183686765",
  officeHours: "9:00 AM – 5:00 PM (Monday to Saturday)",
  established: 2018,
  city: "Gwalior, Madhya Pradesh",
  mapsUrl: "https://maps.google.com/?q=26.21089,78.193871",
  mapCoordinates: { lat: 26.21089, lng: 78.193871 },
  stats: [
    { label: "Hands-on Learning", value: "Curriculum" },
    { label: "Child Safety", value: "CCTV Guarded" },
    { label: "Family Community", value: "Engaged" },
    { label: "Outdoor Play Space", value: "Nature-focused" },
  ]
};

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: "playgroup",
    name: "Playgroup",
    subtitle: "A gentle transition from home to school.",
    ageGroup: "1.8 to 3 Years",
    timing: "9:30 AM to 12:30 PM",
    teacherRatio: "Small groups with dedicated attention",
    description: "Our Playgroup space is designed to feel like a cozy home. Toddlers learn naturally through touch, sound, and play, using soft shapes, musical tunes, and simple activities to build early coordination and self-reliance.",
    keyOutcomes: [
      "Using hands and fingers to explore different textures",
      "Sharing, listening, and expressing feelings gently",
      "Exploring new words through rhymes and stories",
      "Climbing, balance, and early motor coordination"
    ],
    dailyHighlights: [
      "Sensory Play and Sand Fun",
      "Story Circle and Rhyme Time",
      "Water and Paint Exploration",
      "Healthy Fruit and Snack Break"
    ],
    image: "/images/slider/slide1.jpg",
    badge: "First Steps",
    annualFee: "Contact Center",
    termFee: "Flexible Payment Options"
  },
  {
    id: "nursery",
    name: "Nursery",
    subtitle: "Nurturing early questions and words.",
    ageGroup: "3 to 4 Years",
    timing: "9:00 AM to 1:00 PM",
    teacherRatio: "Small groups with dedicated attention",
    description: "In Nursery, we encourage children's natural curiosity. Through storytelling, phonic sounds, and matching games, they begin to connect letters, numbers, and shapes, growing more independent every day.",
    keyOutcomes: [
      "Saying letter sounds and tracing basic shapes",
      "Counting, sorting objects, and spotting patterns masterfully",
      "Washing hands, serving snacks, and keeping toys tidy",
      "Planting seeds and caring for classroom plants"
    ],
    dailyHighlights: [
      "Morning Stretches and Breathing",
      "Picture Book Story Hour",
      "Blocks, Matching, and Puzzles",
      "Mud Play and Seed Planting"
    ],
    image: "/images/slider/slide2.jpg",
    badge: "Active Curiosity",
    annualFee: "Contact Center",
    termFee: "Flexible Payment Options"
  },
  {
    id: "junior-kg",
    name: "Junior KG",
    subtitle: "Connecting ideas, logic, and friends.",
    ageGroup: "4 to 5 Years",
    timing: "9:00 AM to 1:00 PM",
    teacherRatio: "Small groups with dedicated attention",
    description: "Junior KG children dive deeper into letter blends, basic numbers, and small science experiments. Working with classmates, they practice talking about their thoughts and solving simple puzzles together.",
    keyOutcomes: [
      "Reading simple words and speaking confidently",
      "Comparing sizes, weights, and simple grouping",
      "Observing natural cycles, like how plants grow",
      "Telling stories and sharing ideas with friends"
    ],
    dailyHighlights: [
      "Mini Science Experiments",
      "Drawing and Painting Journeys",
      "Dance, Beats, and Rhythm Play",
      "Obstacle Course and Balancing Games"
    ],
    image: "/images/slider/slide3.jpg",
    badge: "Creative Thinking",
    annualFee: "Contact Center",
    termFee: "Flexible Payment Options"
  },
  {
    id: "senior-kg",
    name: "Senior KG",
    subtitle: "Growing into confident learners.",
    ageGroup: "5 to 6 Years",
    timing: "9:00 AM to 1:00 PM",
    teacherRatio: "Small groups with dedicated attention",
    description: "Senior KG prepares children for their next school steps. We focus on reading short stories, addition concepts, public speaking, and building social confidence in a warm, encouraging classroom.",
    keyOutcomes: [
      "Reading simple books and writing short notes",
      "Simple math addition and telling time basics",
      "Speaking clearly to a group with confidence",
      "Working happily in teams on small projects"
    ],
    dailyHighlights: [
      "Show and Tell Speaking Circle",
      "Math Puzzles and Counting games",
      "Pottery, Clay, and Art Crafts",
      "Graduation Class Activities"
    ],
    image: "/images/slider/slide4.jpg",
    badge: "Ready for Grade 1",
    annualFee: "Contact Center",
    termFee: "Flexible Payment Options"
  }
];

export const DAY_ROUTINE: DayRoutineStep[] = [
  {
    time: "09:00 AM",
    title: "Warm Welcome",
    description: "Teachers greet each child individually with warm smiles, helping them put away their bags and settle in comfortably.",
    category: "welcome",
    iconName: "Sun"
  },
  {
    time: "09:15 AM",
    title: "Morning Circle & Music",
    description: "We sing morning songs, discuss the weather, and do light, calming stretches together to begin the day.",
    category: "learning",
    iconName: "Users"
  },
  {
    time: "10:00 AM",
    title: "Hands-on Phonics & Math",
    description: "Children play with tactile alphabet blocks, count colorful beads, and practice tracing with teacher guidance.",
    category: "learning",
    iconName: "BookOpen"
  },
  {
    time: "11:15 AM",
    title: "Healthy Snack & Chat",
    description: "We wash our hands and eat fresh fruit or light snacks together, practicing good table manners and sharing.",
    category: "nutrition",
    iconName: "Coffee"
  },
  {
    time: "11:45 AM",
    title: "Outdoor Play & Garden Time",
    description: "Children run, cycle on safe tricycles, and explore our small plant patch under close teacher supervision.",
    category: "play",
    iconName: "Trees"
  },
  {
    time: "12:15 PM",
    title: "Art, Clay & Creative Play",
    description: "We paint, shape clay, play small drums, or try simple science questions to spark creative thinking.",
    category: "creativity",
    iconName: "Palette"
  },
  {
    time: "01:00 PM",
    title: "Story Circle & Goodbye",
    description: "We gather on the carpet for a picture book story, pack our bags together, and wait for safe pick-up.",
    category: "welcome",
    iconName: "Heart"
  }
];

export const FACILITIES: CampusFacility[] = [
  {
    id: "smart-classrooms",
    title: "Sunny Classrooms",
    subtitle: "Bright, airy spaces with child-friendly furniture.",
    description: "Classrooms feature large windows for natural light, low open shelves that children can easily reach, and child-safe rounded furniture.",
    image: "/images/slider/slide1.jpg",
    features: ["Round-edged wooden tables", "Low shelving for independence", "Fresh air flow", "Comfortable soft carpets"],
    category: "classroom"
  },
  {
    id: "outdoor-play",
    title: "Green Outdoor Play Area",
    subtitle: "Soft safety flooring and small nature patches.",
    description: "Equipped with rubberized flooring to prevent scrapes, climbing frames, a sandbox, and tricycle paths for active play.",
    image: "/images/slider/slide5.jpg",
    features: ["Padded safety flooring", "Shaded climbing frames", "Herbs and flowers patch", "Mini cycling track"],
    category: "play"
  },
  {
    id: "sensory-library",
    title: "Cozy Story Book Library",
    subtitle: "A quiet space to discover stories.",
    description: "A comfortable space filled with picture books, soft pillows, audiobooks, and texture cards to encourage a love for reading.",
    image: "/images/slider/slide2.jpg",
    features: ["Colorful picture books", "Soft reading pillows", "Touch-and-feel books", "Quiet story corner"],
    category: "learning"
  },
  {
    id: "security-tech",
    title: "Secure Campus",
    subtitle: "Ensuring child safety at all times.",
    description: "Equipped with CCTV coverage, a secure check-in system, verified staff members, and clear safety rules.",
    image: "/images/slider/slide3.jpg",
    features: ["Fully fenced campus", "CCTV check-in security", "First-aid certified staff", "Safe pick-up gates"],
    category: "safety"
  },
  {
    id: "nutrition-dining",
    title: "Simple, Healthy Meals",
    subtitle: "Fresh snacks prepared daily in a clean kitchen.",
    description: "We serve simple, fresh snacks free from artificial colors or heavy spices, keeping food allergies and preferences in mind.",
    image: "/images/slider/slide4.jpg",
    features: ["Clean, visible kitchen", "Allergy-safe preparation", "RO water filter stations", "Fresh fruits and warm milk"],
    category: "health"
  }
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    name: "Mrs. Sadhna Shrivastava",
    role: "Founder & Pedagogy Director",
    qualification: "M.A. in Early Childhood Education & Development",
    experience: "30+ Years",
    bio: "Mrs. Sadhna Shrivastava believes that school should feel like a second home. With over 30+ years of rich experience in early childhood education, she is dedicated to creating a warm, supportive space where children feel safe, happy, and confident to learn.",
    image: "/images/slider/slide3.jpg",
    specialty: "Early Childhood Pedagogy, Mentorship & Care"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    parentName: "Neha Sharma",
    childNameAndGrade: "Parent of Aarav (Senior KG)",
    locality: "Thatipur, Gwalior",
    quote: "The school is beautifully run and feels incredibly warm and secure. The teachers are very patient, and my son Aarav is always excited to go. I highly recommend it.",
    avatar: "/images/slider/slide2.jpg",
    rating: 5,
    date: "April 2026",
    isApproved: true
  },
  {
    id: "t2",
    parentName: "Rajesh Dixit",
    childNameAndGrade: "Parent of Pihu (Nursery)",
    locality: "Gandhi Road, Gwalior",
    quote: "We love the focus on simple, healthy snacks and the cozy story library. Our daughter Pihu has become much more expressive and independent.",
    avatar: "/images/slider/slide1.jpg",
    rating: 5,
    date: "May 2026",
    isApproved: true
  },
  {
    id: "t3",
    parentName: "Anjali Saxena",
    childNameAndGrade: "Parent of Kabir (Playgroup)",
    locality: "Balwant Nagar, Gwalior",
    quote: "The school environment is exceptionally clean, safe, and welcoming. The teachers are incredibly patient, and they organize beautiful drawing workshops.",
    avatar: "/images/slider/slide5.jpg",
    rating: 5,
    date: "June 2026",
    isApproved: true
  }
];

export const LATEST_NEWS: NewsEvent[] = [
  {
    id: "news-1",
    title: "Admissions Open for 2026-27",
    category: "Admission",
    date: "July 2026",
    excerpt: "Admissions are open for Playgroup, Nursery, and KG programs. Feel free to schedule a walkthrough of our classrooms.",
    image: "/images/slider/slide1.jpg"
  },
  {
    id: "news-2",
    title: "Creative Painting and Art Day",
    category: "Activity",
    date: "July 2026",
    excerpt: "Children enjoyed a beautiful day painting, hand-printing, and constructing paper crafts in our creative art zone.",
    image: "/images/slider/slide2.jpg"
  },
  {
    id: "news-3",
    title: "Parents Storytelling Circle",
    category: "Community",
    date: "June 2026",
    excerpt: "A warm storytelling workshop bringing families and educators together to discuss reading aloud to children.",
    image: "/images/slider/slide3.jpg"
  }
];

export const BUS_ROUTES_GWALIOR: BusRoute[] = [
  {
    routeNumber: "Route A",
    areaName: "Thatipur, Gandhi Road, Patel Nagar",
    stops: ["Thatipur Square", "Gandhi Road Crossing", "Patel Nagar Gate", "Balwant Nagar School Gate"],
    pickupTime: "8:15 AM",
    dropTime: "1:45 PM",
    supervisorPhone: "+91-9183686765"
  },
  {
    routeNumber: "Route B",
    areaName: "DD Nagar, Pinto Park, Morar",
    stops: ["DD Nagar Gate 2", "Pinto Park Chowk", "Morar Circle", "Balwant Nagar School Gate"],
    pickupTime: "8:00 AM",
    dropTime: "2:00 PM",
    supervisorPhone: "+91-9183686765"
  },
  {
    routeNumber: "Route C",
    areaName: "City Centre, University Road, Alkapuri",
    stops: ["City Centre Mall", "University Gate", "Alkapuri Main Stop", "Balwant Nagar School Gate"],
    pickupTime: "8:25 AM",
    dropTime: "1:35 PM",
    supervisorPhone: "+91-9183686765"
  }
];

export const DOWNLOADS_LIST: DownloadItem[] = [
  {
    id: "d1",
    title: "EuroKids Academic Prospectus 2026-27",
    category: "Prospectus",
    fileSize: "1.8 MB",
    date: "Academic Session 2026",
    downloadUrl: "#"
  },
  {
    id: "d2",
    title: "Balwant Nagar Center Admission Form",
    category: "Application",
    fileSize: "1.2 MB",
    date: "Academic Session 2026",
    downloadUrl: "#"
  },
  {
    id: "d3",
    title: "Child Health & Emergency Contact Form",
    category: "Medical",
    fileSize: "0.5 MB",
    date: "Academic Session 2026",
    downloadUrl: "#"
  }
];

export const GALLERY_ITEMS: GalleryImage[] = [
  {
    id: "g1",
    title: "Morning Namaste & Prayer Values",
    category: "Campus",
    image: "/images/slider/slide1.jpg",
    caption: "Toddlers learning respect, mindfulness, and warm greetings on soft mats."
  },
  {
    id: "g2",
    title: "Proud of My Apple Drawing",
    category: "Classrooms",
    image: "/images/slider/slide2.jpg",
    caption: "A happy child showing off her completed drawing worksheet in Nursery class."
  },
  {
    id: "g3",
    title: "Joyful Teacher Guidance",
    category: "Curriculum",
    image: "/images/slider/slide3.jpg",
    caption: "Director & teachers interacting closely with toddlers in a warm, welcoming space."
  },
  {
    id: "g4",
    title: "Tactile Number Puzzles & Coloring",
    category: "Classrooms",
    image: "/images/slider/slide4.jpg",
    caption: "Toddlers learning number recognition and coloring patterns."
  },
  {
    id: "g5",
    title: "Constructing Towers & Spatial Play",
    category: "Activities",
    image: "/images/slider/slide5.jpg",
    caption: "Building block towers to foster spatial thinking and fine motor skills."
  }
];

export const ADMISSION_FAQS = [
  {
    question: "What is the starting age for Playgroup and Nursery?",
    answer: "Playgroup children start from 1.8 years. Nursery starts from 3 years. We arrange a gentle welcome interaction to ensure the program matches your child's developmental step."
  },
  {
    question: "How do you check child safety and staff background?",
    answer: "Every teacher and support staff member undergoes thorough police verification. Our campus is fully fenced with CCTV oversight and supervised entry at the gates."
  },
  {
    question: "Can we request a details breakdown of the fee schedule?",
    answer: "Yes. Our fees are fully transparent without hidden costs. Please reach out to our desk, and we will share the details of the schedule with you."
  },
  {
    question: "How do you manage meals and specific food sensitivities?",
    answer: "We serve simple, fresh mid-morning snacks. If your child has allergies or specific food requirements, please let us know so we can prepare alternatives."
  },
  {
    question: "Is there a safe transport bus service?",
    answer: "Yes, we operate safe buses across major parts of Gwalior. A dedicated supervisor travels on every route to look after the children."
  }
];
