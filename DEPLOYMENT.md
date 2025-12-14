# Deployment Guide

## Quick Deployment Steps

### 1. GitHub Repository Setup
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Task Manager App"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/task-manager.git
git branch -M main
git push -u origin main
```

### 2. GitHub Pages Deployment
```bash
# Deploy to GitHub Pages
npm run deploy
```

### 3. Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: task-manager
# - Directory: ./
# - Override settings? N
```

### 4. Netlify Deployment

#### Option A: Drag & Drop
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `build` folder to the deploy area

#### Option B: Git Integration
1. Push code to GitHub
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

## Environment Variables (if needed)
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=your_api_url_here
```

## Build Optimization
The app is already optimized for production with:
- Code splitting
- Minification
- Tree shaking
- Asset optimization

## Post-Deployment Checklist
- [ ] Test all functionality on the live site
- [ ] Verify responsive design on different devices
- [ ] Check drag and drop functionality
- [ ] Test localStorage persistence
- [ ] Verify all task operations (CRUD)
- [ ] Test filtering and sorting features

## Troubleshooting

### Common Issues:
1. **White screen after deployment**: Check console for errors, usually path issues
2. **Assets not loading**: Verify the `homepage` field in package.json
3. **Routing issues**: This is a single-page app, so no additional routing setup needed

### Performance Tips:
- The app uses localStorage for data persistence
- Initial load includes sample data from tasks.json
- All images and assets are optimized for web delivery