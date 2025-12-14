# Render Deployment Guide

## Quick Deployment Steps

### Method 1: Render Dashboard (Recommended)

1. **Go to [render.com](https://render.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** → **"Static Site"**
4. **Connect your GitHub repository**: `amanrajak30/Task_Manger`
5. **Configure the deployment**:
   - **Name**: `task-manager` (or any name you prefer)
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish Directory**: `build`
6. **Click "Create Static Site"**

### Method 2: Using render.yaml (Auto-Deploy)

The project includes a `render.yaml` file for automatic configuration:

1. **Push the code** to your GitHub repository (already done)
2. **Go to Render Dashboard**
3. **Click "New +"** → **"Blueprint"**
4. **Connect repository** and select `render.yaml`
5. **Deploy automatically**

## Project Configuration

### Build Settings
- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18.x (auto-detected)
- **Install Command**: Uses npm with legacy peer deps

### Environment Variables (Optional)
If you need environment variables:
- Go to **Environment** tab in Render dashboard
- Add variables like `REACT_APP_API_URL`
- Must start with `REACT_APP_` for React apps

## Render Features

### ✅ **Included Benefits**:
- **Free SSL/HTTPS** automatically
- **Global CDN** for fast loading
- **Auto-deploy** on git push
- **Preview deployments** for pull requests
- **Custom domains** support
- **Build logs** and monitoring

### 📊 **Performance**:
- **Fast builds** (~2-3 minutes)
- **Global edge locations**
- **Automatic compression**
- **Optimized static hosting**

## Custom Domain (Optional)

1. **In Render Dashboard**:
   - Go to **Settings** → **Custom Domains**
   - Add your domain (e.g., `taskmanager.yourdomain.com`)
   - Update DNS records as instructed

2. **DNS Configuration**:
   - Add CNAME record pointing to your Render URL
   - SSL certificate is automatically provisioned

## Automatic Deployments

Once connected:
- ✅ **Push to main branch** = Automatic deployment
- ✅ **Pull requests** = Preview deployments
- ✅ **Branch deployments** = Test different versions

## Build Optimization

The project is optimized for Render:
- **Bundle size**: ~101KB (gzipped)
- **Code splitting**: Automatic
- **Asset optimization**: Built-in
- **Caching**: Optimized headers
- **SPA routing**: Configured in render.yaml

## Troubleshooting

### Common Issues:

1. **Build fails with peer dependencies**:
   - Uses `--legacy-peer-deps` in build command
   - `.npmrc` file handles dependency resolution

2. **404 on page refresh**:
   - `render.yaml` includes SPA routing configuration
   - All routes redirect to `/index.html`

3. **Build timeout**:
   - Render has 15-minute build timeout
   - Our build typically takes 2-3 minutes

4. **Environment variables not working**:
   - Must start with `REACT_APP_`
   - Set in Render dashboard Environment tab

### Performance Tips:

- **Static site hosting** is faster than web services for React apps
- **Global CDN** provides fast worldwide access
- **Automatic compression** reduces load times
- **HTTP/2** support for better performance

## Post-Deployment Checklist

After successful deployment:
- ✅ Test all functionality on live URL
- ✅ Verify responsive design on mobile/tablet
- ✅ Check drag & drop functionality works
- ✅ Test localStorage persistence
- ✅ Verify all CRUD operations (create, edit, delete)
- ✅ Test filtering and sorting features
- ✅ Check that page refresh works (SPA routing)

## Deployment URL

Your Task Manager will be available at:
`https://task-manager-xyz.onrender.com`

## Monitoring

Render provides:
- **Build logs** for debugging
- **Deploy history** to track changes
- **Performance metrics**
- **Uptime monitoring**
- **SSL certificate status**

## Cost

- **Static sites** are **FREE** on Render
- **Custom domains** are free
- **SSL certificates** are free
- **Bandwidth** is generous on free tier

## Support

If you encounter issues:
1. Check **build logs** in Render dashboard
2. Verify **build works locally**: `npm run build`
3. Check **Render documentation**: [render.com/docs](https://render.com/docs)
4. **Community support**: Render has active community forums