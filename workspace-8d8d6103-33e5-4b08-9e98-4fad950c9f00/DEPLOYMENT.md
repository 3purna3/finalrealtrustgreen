# 🚀 Deployment Guide - REAL TRUST Portfolio

## 📦 Prerequisites

Before deploying, ensure you have:
- GitHub account
- Vercel account (free tier)
- Database (PostgreSQL recommended for production)

## 🌐 Deployment Steps

### 1. Prepare for GitHub

```bash
# Initialize git if not already done
cd /home/z/my-project
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - REAL TRUST Portfolio System"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/real-trust-portfolio.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
bun install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `bun run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

6. Click "Deploy"

## 🔑 Environment Variables

For production, you need to set up a cloud database:

### PostgreSQL (Recommended)

1. Create a free database at [Supabase](https://supabase.com) or [Neon](https://neon.tech)
2. Get your connection string
3. Add to Vercel as environment variable:
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx.region.supabase.co:5432/postgres
   ```

### Alternative: Use SQLite (Not Recommended for Production)

You can continue using SQLite, but you'll need to handle file persistence. Not recommended for Vercel.

## 🗄️ Database Setup

### For PostgreSQL Production

```bash
# Install Prisma CLI
bun install -g prisma

# Generate Prisma Client
bunx prisma generate

# Push schema to production database
DATABASE_URL="postgresql://user:password@host/db" bunx prisma db push
```

### Schema Location

The database schema is in `prisma/schema.prisma`. It includes:
- Projects
- Clients
- Contact forms
- Newsletter subscribers
- Admin users

## 🔐 Admin Access

After deployment, access admin panel at:
```
https://your-domain.com/admin
```

**Credentials**:
- Username: `admin`
- Password: `RealTrust@2025`

⚠️ **IMPORTANT**: Change these credentials for production!

## 📝 Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as shown

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:
```bash
git add .
git commit -m "Update features"
git push origin main
```

## 📊 Monitoring

- Visit [vercel.com/dashboard](https://vercel.com/dashboard) for:
  - Deployment logs
  - Analytics
  - Error tracking
  - Performance metrics

## 🐛 Troubleshooting

### Build Fails

1. Check environment variables in Vercel
2. Ensure all dependencies are in package.json
3. Check build logs in Vercel dashboard

### Database Connection Error

1. Verify DATABASE_URL is correct
2. Check database is accessible
3. Ensure SSL is enabled for PostgreSQL

### Images Not Loading

- The project uses external Unsplash URLs
- For uploaded images, configure object storage (AWS S3, Cloudinary)

## 📈 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set up PostgreSQL database
3. ✅ Test all features
4. ✅ Change admin credentials
5. ✅ Add your content via admin panel
6. ✅ Configure custom domain (optional)

## 💡 Tips

- Use Vercel's preview deployments for testing
- Set up a staging environment
- Monitor database usage
- Regular backups of your database
- Use environment variables for all sensitive data

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review error messages
3. Ensure DATABASE_URL is correct
4. Verify Prisma schema is synced

---

**Deploy Time**: ~5 minutes
**Estimated Cost**: $0 (Free tier)
**Database**: Free PostgreSQL from Supabase or Neon
