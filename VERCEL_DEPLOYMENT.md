# Vercel Deployment Guide

## Quick Deployment Steps

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI globally**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   cd task-manager
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? **task-manager** (or any name you prefer)
   - In which directory is your code located? **./**
   - Want to override the settings? **N**

5. **Production deployment**:
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard (Web Interface)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**: `amanrajak30/Task_Manger`
5. **Configure project**:
   - Framework Preset: **Create React App**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
6. **Click "Deploy"**

## Project Configuration

The project is already configured for Vercel with:

- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Files to exclude from deployment
- ✅ `vercel-build` script in package.json
- ✅ Optimized for static hosting
- ✅ SPA routing configuration

## Environment Variables (if needed)

If you need environment variables:

1. **In Vercel Dashboard**:
   - Go to Project Settings → Environment Variables
   - Add variables like `REACT_APP_API_URL`

2. **Using CLI**:
   ```bash
   vercel env add REACT_APP_API_URL
   ```

## Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Automatic Deployments

Once connected to GitHub:
- ✅ **Push to main branch** = Production deployment
- ✅ **Push to other branches** = Preview deployments
- ✅ **Pull requests** = Preview deployments

## Build Optimization

The project includes:
- Code splitting
- Asset optimization
- Gzip compression
- CDN distribution
- Automatic HTTPS

## Troubleshooting

### Common Issues:

1. **Peer dependency conflicts**: 
   - Fixed with `.npmrc` and `overrides` in package.json
   - Vercel uses `--legacy-peer-deps` automatically

2. **Build fails**: Check `npm run build` works locally
3. **404 on refresh**: Vercel.json handles SPA routing
4. **Assets not loading**: Check public folder structure
5. **Environment variables**: Must start with `REACT_APP_`

### Performance Tips:

- Build size is optimized (~105KB)
- Uses React.lazy for code splitting
- Static assets are cached
- Vercel Edge Network provides fast global delivery

## Post-Deployment

After successful deployment:
- ✅ Test all functionality on live URL
- ✅ Verify responsive design
- ✅ Check drag & drop works
- ✅ Test localStorage persistence
- ✅ Verify all CRUD operations

Your Task Manager will be available at: `https://your-project-name.vercel.app`