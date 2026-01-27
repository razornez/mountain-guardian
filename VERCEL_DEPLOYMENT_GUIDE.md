# Vercel Deployment Guide - MonitorGunung.com

## ✅ Issue Fixed: Missing Public Folder

The deployment error **"No Output Directory named public found"** has been resolved.

### What Was Changed

#### 1. Created `/public` Directory
```
public/
├── .gitattributes      # Git attributes for binary files
├── .gitkeep           # Ensures directory is tracked by Git
├── README.md          # Documentation for public assets
├── favicon.ico        # Browser favicon (32x32)
├── favicon.svg        # SVG version of favicon
├── icon.png           # App icon for PWA/mobile (512x512)
├── placeholder.png    # Placeholder image for development
└── robots.txt         # Search engine crawler instructions
```

#### 2. Updated `next.config.js`

**BEFORE (Problematic for Vercel):**
```javascript
const nextConfig = {
  output: 'standalone',  // ❌ This breaks Vercel deployment
  // ...
};
```

**AFTER (Vercel-compatible):**
```javascript
const nextConfig = {
  // ✅ Removed 'output: standalone' for Vercel
  // Use 'standalone' only for Docker/self-hosted deployments
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['mongodb'],
  // ...
};
```

#### 3. Enhanced `app/layout.js` Metadata

Added comprehensive metadata for SEO, social sharing, and proper favicon handling:

```javascript
export const metadata = {
  title: 'MonitorGunung.com - Environmental Surveillance Platform',
  description: 'Satellite monitoring dashboard for tracking deforestation...',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.png',
  },
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
};
```

#### 4. Created `vercel.json`

Optimal Vercel configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "regions": ["iad1"]
}
```

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your Git repository

2. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `yarn install` (auto-detected)

3. **Environment Variables:**
   Add the following in Vercel dashboard:
   ```
   MONGO_URL=your_mongodb_connection_string
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## 📋 Pre-Deployment Checklist

- [x] ✅ `/public` folder created with essential assets
- [x] ✅ `next.config.js` updated (removed `output: 'standalone'`)
- [x] ✅ `app/layout.js` metadata updated with proper icons
- [x] ✅ `vercel.json` configuration added
- [x] ✅ Environment variables documented
- [ ] ⚠️ Update `NEXT_PUBLIC_BASE_URL` in Vercel environment variables
- [ ] ⚠️ Add MongoDB connection string to Vercel environment variables

## 🔍 Verification

After deployment, verify the following:

1. **Favicon Loads:**
   - Visit your deployment URL
   - Check browser tab shows favicon

2. **Public Assets Accessible:**
   - Test: `https://your-domain.vercel.app/favicon.ico`
   - Test: `https://your-domain.vercel.app/robots.txt`

3. **Pages Load Correctly:**
   - Main dashboard: `/`
   - Detail pages: `/mountain/[id]`

4. **No Build Errors:**
   - Check Vercel build logs
   - Ensure no "public folder" errors

## 📊 Expected Build Output

```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (3/3)
✓ Collecting build traces
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                   142 B          87.2 kB
├ ○ /mountain/[id]                      142 B          87.2 kB
└ ○ /_not-found                         871 B          85.9 kB
```

## 🛠️ Troubleshooting

### Issue: "No Output Directory named public found"
**Status:** ✅ FIXED - Public folder now exists

### Issue: Build fails with standalone output
**Status:** ✅ FIXED - Removed `output: 'standalone'`

### Issue: Favicon not showing
**Solution:** 
- Verify `/public/favicon.ico` exists
- Check `app/layout.js` metadata includes icons
- Clear browser cache

### Issue: Environment variables not working
**Solution:**
- Add variables in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding variables

## 📦 Framework Preset Settings

**Vercel Auto-Detection:**
```
Framework: Next.js 15.5.10
Node.js Version: 20.x (recommended)
Package Manager: Yarn 1.22.22
Build Command: next build
Output Directory: .next
Development Command: next dev
```

## 🔐 Environment Variables

Required for production:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://...` |
| `NEXT_PUBLIC_BASE_URL` | Your production URL | `https://monitorgunung.vercel.app` |
| `CORS_ORIGINS` | Allowed CORS origins | `*` or specific domain |

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `monitorgunung.com`
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate provisioning (automatic)

## 📱 Performance Optimizations

The following are already configured:

- ✅ Next.js 15 with Turbopack
- ✅ React 19 automatic optimizations
- ✅ Image optimization disabled (for flexibility)
- ✅ Proper metadata for SEO
- ✅ CDN-ready static assets

## 🎉 Success Indicators

After successful deployment, you should see:

1. ✅ Green checkmark in Vercel dashboard
2. ✅ Deployment URL is live and accessible
3. ✅ No errors in build logs
4. ✅ All pages load correctly
5. ✅ Favicon displays in browser tab
6. ✅ Interactive map renders with markers
7. ✅ Charts and visualizations work

## 📞 Support

If deployment issues persist:

1. Check Vercel build logs for specific errors
2. Verify all environment variables are set
3. Ensure MongoDB connection string is valid
4. Test locally with `next build` before deploying

---

**Last Updated:** January 27, 2025  
**Next.js Version:** 15.5.10  
**Deployment Platform:** Vercel  
**Status:** ✅ Ready for Production Deployment
