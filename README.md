# 🧸 EuroKids Balwant Nagar Preschool, Gwalior

A premium, highly interactive Single Page Application (SPA) and Admin Management Portal built for **EuroKids Balwant Nagar Preschool, Gwalior** using React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons, and jsPDF.

---

## 🌟 Key Highlights & Special Features

### 1. 💡 Hover Trigger / MouseEnter Trigger (Hover-to-Open Menus)
- **Technical Terms**: `onMouseEnter` / `onMouseLeave` triggers, Hover Dropdowns, CSS `:hover` pseudo-class micro-animations.
- **How It Works**: Users don't need to click menu items; hovering over navigation headings automatically reveals glassmorphic dropdown cards with smooth Framer Motion entrance/exit transitions:
  - **Programs**: Previews for *Playgroup*, *Nursery*, *Junior KG*, & *Senior KG*.
  - **About Us**: Previews for *Heureka Curriculum*, *Interactive Day Routine*, & *Director Spotlight*.
  - **Admissions**: Previews for *4-Step Process*, *Prospectus Downloads*, & *FAQs*.
  - **Campus & Safety**: Previews for *Sunny Classrooms*, *Gwalior Live Bus Route Checker*, & *CCTV Safety*.

### 2. 🎨 Dynamic Color Theme Switcher
- Switch between 4 playful color palettes live from the header top bar:
  - 🟡 **Sunbeam Yellow** (`yellow`)
  - 🔵 **Sky Blue** (`blue`)
  - 🟢 **Meadow Green** (`green`)
  - 🌸 **Blossom Pink** (`pink`)
- Theme selection persists automatically in `localStorage`.

### 3. 🧮 Interactive Age Finder Quiz
- Input child's Date of Birth or adjust an age slider (1.8 to 6 years) to receive instant recommendations for the right EuroKids program (*Playgroup*, *Nursery*, *Junior KG*, or *Senior KG*).

### 4. 🚌 Gwalior Live Bus Route Checker
- Live search tool filtering Gwalior localities (*Thatipur*, *Morar*, *Pinto Park*, *DD Nagar*, *City Centre*, *Gandhi Road*).
- Displays exact stops, pickup/drop timings, and supervisor contact numbers.

### 5. 🎟 Campus Walkthrough Booking & PDF Pass Generator
- Schedule physical campus tours.
- Generates an official downloadable **PDF Visit Pass** using `jsPDF`.

### 6. 📥 Admission Enquiry Drawer
- Slide-in right drawer capturing child name, age, program, parent details, and queries.
- Saves directly to local state (`localStorage`) for real-time reactivity in the Admin Panel.

### 7. 💬 Floating WhatsApp Support Widget
- Instant floating button connecting directly to EuroKids WhatsApp (`+91-9183686765`).

---

## 🔐 Admin Management Portal (`/admin`)

Access the admin dashboard by visiting `/admin` or clicking the **Admin Portal** button in the header top bar.

### 🔑 Demo Login Credentials
- **Username**: `admin`
- **Password**: `eurokids123`

### 🛠 Admin Features:
1. **Dashboard Overview (`/admin/dashboard`)**: Analytics for total enquiries, pending walkthrough visits, testimonials count, and live gallery photos.
2. **Admission Enquiry Manager (`/admin/enquiries`)**: Search, filter by status, change status (`New` ➔ `Contacted` ➔ `Visited` ➔ `Enrolled` ➔ `Closed`), and delete enquiries.
3. **Feedback Moderation (`/admin/feedbacks`)**: Approve, view, and delete parent reviews.
4. **Gallery Manager (`/admin/gallery`)**: Add new campus photos dynamically via image URLs or delete existing ones.
5. **School Settings (`/admin/settings`)**: Edit phone numbers, email, campus address, tagline, and office hours across the site.

---

## 📁 Directory Structure

```text
Euro-Kids-Bn/
├── index.html                   # HTML entry with Google fonts ("Manrope" & "Plus Jakarta Sans")
├── package.json                 # Dependency definitions (React 19, Tailwind v4, Framer Motion)
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with React & Tailwind plugins
├── src/
│   ├── main.tsx                 # React app entry point with BrowserRouter
│   ├── App.tsx                  # Router container wrapped in Theme & Data providers
│   ├── MainApp.tsx              # Public site frame, navigation, footer, & floating widgets
│   ├── types.ts                 # TypeScript interface definitions
│   ├── index.css                # Tailwind CSS imports, theme variables, glassmorphism utils
│   ├── contexts/
│   │   ├── ThemeContext.tsx     # Dynamic color theme state management
│   │   └── DataContext.tsx      # LocalStorage persistent store for enquiries, feedback & gallery
│   ├── data/
│   │   └── schoolData.ts        # Comprehensive static dataset (Programs, Routes, FAQs, Gallery)
│   ├── components/
│   │   ├── Header.tsx           # Responsive Header with Hover-to-Open dropdown triggers
│   │   ├── Footer.tsx           # Contact details, address & quick links
│   │   ├── AgeFinderQuiz.tsx    # Interactive age calculator widget
│   │   ├── BusRouteChecker.tsx  # Gwalior bus transport route search
│   │   ├── BookVisitModal.tsx   # Walkthrough appointment & PDF pass generator
│   │   ├── EnquiryDrawer.tsx    # Slide-in admission enquiry drawer
│   │   └── FloatingWhatsApp.tsx # Floating WhatsApp chat button
│   └── pages/
│       ├── HomePage.tsx         # Hero section, stats, programs, day routine & testimonials
│       ├── AboutPage.tsx        # EuroKids story, Heureka curriculum & routine timeline
│       ├── ProgramsPage.tsx     # Age criteria, timings, & outcomes for all 4 programs
│       ├── AdmissionsPage.tsx   # 4-step admission guide, downloads, & FAQs accordion
│       ├── CampusPage.tsx       # Campus facilities, safety specs, & bus route checker
│       ├── GalleryPage.tsx      # Filterable photo gallery with lightbox modal
│       ├── FeedbacksPage.tsx    # Parent review wall & submission form
│       ├── ContactPage.tsx      # Embedded Google Maps, front desk contact, & message form
│       └── admin/
│           ├── AdminPortal.tsx  # Main admin router & authentication guard
│           ├── AdminLogin.tsx   # Admin login screen
│           ├── AdminLayout.tsx  # Admin sidebar layout frame
│           ├── AdminDashboard.tsx # Overview statistics panel
│           ├── EnquiryManager.tsx # Admission application tracking & status manager
│           ├── FeedbackManager.tsx # Parent review moderation panel
│           ├── GalleryManager.tsx  # Dynamic photo uploader/manager
│           └── SettingsManager.tsx # School profile details editor
```

---

## 💻 Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- `npm` or `yarn`

### 2. Installation
Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/abhishekgaud7/Euro-Kids-Bn.git

# Navigate into project directory
cd Euro-Kids-Bn

# Install npm packages
npm install
```

### 3. Running Development Server
Start Vite development server:

```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`**.

### 4. Building for Production
Build the project for production deployment:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🏫 School Information

- **School Name**: EuroKids Balwant Nagar
- **Address**: E-46-A, Balwant Nagar, Gandhi Road, Thatipur, Gwalior, Madhya Pradesh - 474011
- **Phone**: +91-9183686765
- **Email**: Eurokidsccgwl@gmail.com
- **Office Hours**: 9:00 AM – 5:00 PM (Monday to Saturday)

---

## 📄 License

Created for **EuroKids Balwant Nagar Preschool, Gwalior**. All rights reserved.
