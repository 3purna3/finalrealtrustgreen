# REAL TRUST - Portfolio Management System

A modern, full-stack portfolio management system built with Next.js 16, TypeScript, Prisma, and shadcn/ui.

## 🚀 Features

- **Landing Page**: Professional portfolio website with multiple sections
- **Admin Dashboard**: Secure admin panel for managing projects and clients
- **Authentication**: Token-based authentication system
- **Image Handling**: Support for file upload and image URLs
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Beautiful interface using shadcn/ui components

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Image Processing**: Sharp
- **State Management**: React Hooks + Zustand

## 📦 Installation

```bash
# Install dependencies
bun install

# Set up database
bun run db:push

# Run development server
bun run dev
```

## 🔐 Admin Credentials

- **Username**: `admin`
- **Password**: `RealTrust@2025`

## 📁 Project Structure

```
real-trust-portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/         # API routes
│   │   ├── admin/       # Admin panel
│   │   └── page.tsx     # Landing page
│   ├── components/       # React components
│   │   └── ui/         # shadcn/ui components
│   ├── hooks/          # Custom React hooks
│   └── lib/           # Utility functions
├── prisma/            # Database schema
├── public/            # Static assets
└── package.json       # Dependencies
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push this repository to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL` (PostgreSQL connection string)
4. Deploy!

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 📄 API Endpoints

- `GET/POST /api/projects` - Manage projects
- `GET/POST /api/clients` - Manage clients
- `POST /api/contact` - Contact form submissions
- `POST /api/subscribers` - Newsletter subscriptions
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/validate` - Token validation

## 🎨 Customization

### Colors
Primary colors are Emerald Green and Teal:
- Primary: `emerald-600`
- Secondary: `teal-600`

### Images
Uses Unsplash for professional portfolio images. Add your own by updating the database or using the admin panel.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or support, please open an issue on GitHub.
