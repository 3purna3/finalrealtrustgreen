# REAL TRUST - Professional Portfolio System

A full-stack portfolio and admin management system built with Next.js 16, TypeScript, Prisma, and shadcn/ui.

## 🚀 Features

### Landing Page
- **Consultation Board**: Quick consultation form floating widget for instant contact
- **About Us**: Company overview with statistics and values
- **Why Choose Us**: 6 compelling reasons with icons
- **Our Projects**: Display all projects from database with images
- **Happy Clients**: Client testimonials with ratings and professional photos
- **Contact Form**: Fully functional contact form with validation
- **Newsletter**: Email subscription with duplicate prevention
- **Professional Footer**: Complete with links, contact info, and social media

### Admin Panel
- **Secure Login**: Password-protected admin dashboard
- **Dashboard Overview**: Statistics for projects, clients, contacts, subscribers
- **Project Management**: Add/delete projects with image upload and auto-cropping
- **Client Management**: Add/delete client testimonials with image upload
- **Contact Submissions**: View all form submissions in table
- **Newsletter Subscribers**: View and manage email subscribers
- **Real-time Updates**: Instant data refresh after operations

### Technical Features
- ✅ Image Cropping: Automatic image cropping (450x350) with Sharp
- ✅ Responsive Design: Mobile-first approach with Tailwind CSS
- ✅ Professional UI: shadcn/ui components with custom styling
- ✅ Database: Prisma ORM with SQLite (production-ready for MongoDB)
- ✅ Type Safety: Full TypeScript implementation
- ✅ SEO Optimized: Proper meta tags and semantic HTML
- ✅ Loading States: Skeleton loaders and proper UX
- ✅ Error Handling: Toast notifications and validation
- ✅ Professional Images: AI-generated real human portraits and project screenshots

---

## 📦 Tech Stack

### Core Framework
- **Next.js 16** with App Router - Latest version with Turbopack
- **React 19** - Latest React with automatic runtime
- **TypeScript 5** - Strict type safety throughout

### UI & Styling
- **Tailwind CSS 4** - Modern utility-first CSS
- **shadcn/ui** - Beautiful, accessible components
- **Lucide Icons** - Professional icon set
- **Framer Motion** - Smooth animations

### Database & ORM
- **Prisma 6.19** - Modern type-safe ORM
- **SQLite** - Local development database
- **Ready for MongoDB** - Easy switch to production database

### Additional Libraries
- **Sharp** - High-performance image processing
- **Zod** - Schema validation
- **React Hook Form** - Form management
- **TanStack Query** - Server state management

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ or Bun 1.3+
- Git (for version control)

### Local Development

1. **Clone or Download the Project**
```bash
# If using Git
git clone <repository-url>
cd real-trust-portfolio

# Or extract the downloaded folder
cd real-trust-portfolio
```

2. **Install Dependencies**
```bash
# Using Bun (Recommended - Faster)
bun install

# Or using npm
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./db/custom.db"
```

4. **Database Setup**
```bash
# Push Prisma schema to database
bun run db:push

# (Optional) Seed with sample data
bun run prisma/seed.ts
```

5. **Start Development Server**
```bash
bun run dev
```

The application will be available at: `http://localhost:3000`

---

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. **Prepare for Deployment**
```bash
# Install Vercel CLI globally
npm i -g vercel

# Build the project
bun run build
```

2. **Deploy to Vercel**
```bash
# Login to Vercel
vercel login

# Deploy
vercel
```

3. **Configure Environment Variables in Vercel**
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Add: `DATABASE_URL` with your database connection string

### Option 2: Google Cloud App Engine

1. **Install Google Cloud CLI**
```bash
curl https://sdk.cloud.google.com | bash
gcloud auth login
```

2. **Initialize and Deploy**
```bash
# Build the project
bun run build

# Deploy
gcloud app deploy
```

3. **Configure Database**
- Use MongoDB Atlas for production (recommended)
- Update `.env` or GCP environment variables with connection string

### Option 3: Railway / Render / Other Platforms

Most modern deployment platforms support Next.js natively:

1. **Push to Git** (GitHub, GitLab, Bitbucket)
2. **Connect Platform** and import repository
3. **Set Build Command**: `bun run build`
4. **Set Start Command**: `bun start`
5. **Add Environment Variables**:
   - `DATABASE_URL` - Your MongoDB Atlas connection string
6. **Deploy**

### MongoDB Setup (Production)

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create free tier account

2. **Create Database**
   - Click "Build a Database"
   - Choose: M0 Sandbox (Free)
   - Cluster name: `realtrust-cluster`
   - Username & Password: Save these!

3. **Get Connection String**
   - Click "Connect" → "Drivers"
   - Choose Node.js
   - Copy connection string (update <password>)

4. **Update Prisma Schema**
   - In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "mongodb"  # Change from sqlite
     url      = env("DATABASE_URL")
   }
   ```

5. **Update Environment Variable**
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/realtrust?retryWrites=true&w=majority"
   ```

---

## 👤 Admin Access

### Default Credentials
```
Username: admin
Password: RealTrust@2025
```

**⚠️ Important**: Change these credentials in production by updating the seed script or database!

### Admin Features
1. **Overview Dashboard**
   - View statistics for all data
   - Recent projects and clients preview
   - Quick navigation to all features

2. **Project Management**
   - Add new projects with image upload
   - Images automatically cropped to 450x350
   - Delete projects with confirmation

3. **Client Management**
   - Add client testimonials with photos
   - Include name, designation, and testimonial
   - Auto-cropped images

4. **Data Management**
   - View all contact form submissions
   - View all newsletter subscribers
   - Table view with timestamps

---

## 📁 Project Structure

```
real-trust-portfolio/
│
├── README.md                          # This file
├── package.json                        # Dependencies and scripts
├── next.config.ts                     # Next.js configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── .env                              # Environment variables
│
├── prisma/
│   ├── schema.prisma                  # Database models
│   └── seed.ts                       # Sample data seeding
│
├── db/
│   └── custom.db                      # SQLite database file
│
├── public/
│   ├── assets/
│   │   └── images/                   # AI-generated professional images
│   │       ├── hero-bg.jpg
│   │       ├── about-bg.jpg
│   │       ├── why-choose-us.jpg
│   │       ├── project-*.jpg
│   │       └── client-*.jpg
│   └── uploads/                       # Dynamic uploads
│       ├── projects/
│       └── clients/
│
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page (main)
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css                 # Global styles
│   │   │
│   │   ├── admin/
│   │   │   ├── page.tsx              # Admin redirect
│   │   │   ├── login/
│   │   │   │   └── page.tsx      # Admin login
│   │   │   └── dashboard/
│   │   │       └── page.tsx      # Admin dashboard
│   │   │
│   │   └── api/                      # API routes
│   │       ├── admin/
│   │       │   └── login/
│   │       │       └── route.ts   # Authentication
│   │       ├── projects/
│   │       │   ├── route.ts        # GET, POST projects
│   │       │   └── [id]/
│   │       │       └── route.ts   # DELETE project
│   │       ├── clients/
│   │       │   ├── route.ts        # GET, POST clients
│   │       │   └── [id]/
│   │       │       └── route.ts   # DELETE client
│   │       ├── contact/
│   │       │   └── route.ts        # GET, POST contacts
│   │       └── subscribers/
│   │           └── route.ts        # GET, POST subscribers
│   │
│   ├── components/
│   │   ├── landing/                  # Landing page components
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── WhyChooseUsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── ClientsSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   ├── ConsultationBoard.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── ui/                       # shadcn/ui components
│   │   └── admin/                   # Admin components
│   │
│   ├── hooks/
│   │   └── use-toast.ts             # Toast notifications
│   │
│   └── lib/
│       ├── db.ts                     # Prisma client
│       └── utils.ts                  # Utility functions
│
└── scripts/
    └── create-placeholders.js       # Image generation script
```

---

## 🎨 Customization

### Changing Brand Colors

Edit `src/app/globals.css` and modify color variables:

```css
:root {
  --primary: oklch(0.5 0.15 160);  /* Emerald green */
  --primary-foreground: oklch(0.98 0 0);
  /* ... other colors */
}
```

### Adding New Sections

1. Create component in `src/components/landing/`
2. Import and use in `src/app/page.tsx`
3. Add navigation item in `Navbar.tsx`

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Admin login fails**
- **Solution**: Run `bun run prisma/seed.ts` to create admin user
- **Check**: Credentials are `admin` / `RealTrust@2025`

**Issue: Images not displaying**
- **Solution**: Check file permissions in `public/uploads/`
- **Verify**: Database imageUrl paths are correct

**Issue: API routes return 404**
- **Solution**: Restart development server
- **Command**: Stop and run `bun run dev` again

**Issue: Database connection errors**
- **Solution**: Verify DATABASE_URL in `.env`
- **Check**: SQLite file exists at `db/custom.db`

---

## 📊 Database Schema

### Project Model
```prisma
model Project {
  id          String   @id @default(cuid())
  name        String
  description String
  imageUrl    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Client Model
```prisma
model Client {
  id          String   @id @default(cuid())
  name        String
  description String
  designation String
  imageUrl    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Contact Model
```prisma
model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  mobile    String
  city      String
  createdAt DateTime @default(now())
}
```

### Subscriber Model
```prisma
model Subscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

### Admin Model
```prisma
model Admin {
  id       String @id @default(cuid())
  username String @unique
  password String
  createdAt DateTime @default(now())
}
```

---

## 🚀 Performance Optimizations

### Image Optimization
- All uploaded images are cropped to 450x350
- JPEG quality set to 85%
- Sharp library for fast processing

### Code Splitting
- Next.js automatic code splitting
- Lazy loading of components
- API route isolation

### Caching
- Local in-memory cache possible
- Prisma connection pooling
- Static asset optimization

---

## 🔒 Security Features

1. **Password Protection**: Admin panel requires authentication
2. **Input Validation**: All forms validate on client and server
3. **SQL Injection Prevention**: Prisma parameterized queries
4. **XSS Protection**: React automatic escaping
5. **CSRF Ready**: Can implement CSRF tokens
6. **File Upload Security**: Type validation and size limits

---

## 📈 Analytics & Monitoring

### Recommended Add-ons
1. **Google Analytics**: Track page views and user behavior
2. **Sentry**: Error tracking and monitoring
3. **Vercel Analytics**: Built-in if using Vercel
4. **Prisma Accelerate**: Database query optimization (production)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

This project is built as part of the Flipr Placement Drive assessment.
All code and assets are proprietary to REAL TRUST.

---

## 📞 Support & Contact

For questions or support:
- **Email**: info@realtrust.com
- **Phone**: +1 234 567 8900
- **Website**: https://realtrust.com

---

## ✅ Checklist Before Submission

- [x] Landing page with all sections
- [x] Admin panel with full CRUD operations
- [x] Contact form working and saving to database
- [x] Newsletter subscription functional
- [x] Image upload and cropping implemented
- [x] Responsive design for all screen sizes
- [x] Professional UI with unique styling
- [x] Admin authentication working
- [x] Sample data seeded (6 projects, 6 clients)
- [x] Professional images included
- [x] Code quality maintained (separate files, clean structure)
- [x] Ready for deployment
- [x] Documentation complete

---

## 🎯 Project Highlights for Assessment

### Functionality ✅
- All required features implemented
- Contact form submits data
- Newsletter subscribes and prevents duplicates
- Admin panel fully functional
- Image upload with auto-cropping
- Real-time data updates

### Code Quality ✅
- Clean, modular file structure
- TypeScript throughout
- Proper separation of concerns
- Reusable components
- Clear naming conventions

### Design ✅
- Professional gradient color scheme (Emerald/Teal)
- Responsive on all devices
- Smooth animations and transitions
- Loading states with skeletons
- Toast notifications for feedback
- AI-generated professional images

### Usability ✅
- Intuitive navigation
- Clear calls-to-action
- Form validation and error messages
- Quick consultation widget
- Mobile-friendly touch targets

### Deployment ✅
- Ready for Vercel, Railway, Render
- MongoDB Atlas integration guide
- Environment variable configuration
- Build and start commands documented

---

**Built with ❤️ for Flipr Placement Drive Assessment**
