# AgriSense AI - Deployment Guide

This guide will help you deploy the AgriSense AI application to production.

## Architecture

- **Backend**: Deployed on Render (or Railway)
- **Frontend**: Deployed on Vercel
- **Database**: Neon PostgreSQL (Serverless)

---

## Prerequisites

1. Neon PostgreSQL database (get connection string from https://neon.tech)
2. Google Gemini API key (get from https://makersuite.google.com/app/apikey)
3. OpenWeatherMap API key (get from https://openweathermap.org/api)
4. GitHub account
5. Render account (https://render.com)
6. Vercel account (https://vercel.com)

---

## Step 1: Push Code to GitHub

```bash
cd c:/Users/KIIT/Documents/japanese-company
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create New Web Service

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository: `assignment-suryansh`

### 2.2 Configure Build Settings

- **Name**: `agrisense-backend`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 2.3 Add Environment Variables

Click "Environment" tab and add:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://your-neon-connection-string
JWT_SECRET=your-secure-random-string-min-32-chars
GEMINI_API_KEY=your-google-gemini-api-key
OPENWEATHER_API_KEY=your-openweathermap-api-key
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important**:
- Generate JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- Get DATABASE_URL from Neon dashboard
- FRONTEND_URL will be added after deploying frontend (Step 3)

### 2.4 Deploy

1. Click "Create Web Service"
2. Wait for build to complete
3. Copy the backend URL (e.g., `https://agrisense-backend.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Import Project

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select `assignment-suryansh`

### 3.2 Configure Project

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3.3 Add Environment Variables

```
VITE_API_BASE_URL=https://agrisense-backend.onrender.com/api
VITE_APP_NAME=AgriSense AI
```

Replace `https://agrisense-backend.onrender.com` with your actual backend URL from Step 2.

### 3.4 Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the frontend URL (e.g., `https://agrisense-ai.vercel.app`)

---

## Step 4: Update Backend CORS

Go back to Render dashboard and update the `FRONTEND_URL` environment variable with your Vercel URL:

```
FRONTEND_URL=https://agrisense-ai.vercel.app
```

Then redeploy the backend.

---

## Step 5: Initialize Database

The database schema will be automatically created on first connection. However, if you want to manually run migrations:

1. Go to your Render backend service
2. Click "Shell" tab
3. Run: `npm run db:push`

---

## Deployment Checklist

### Backend (Render)
- [ ] Code pushed to GitHub
- [ ] Web service created
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] All environment variables set
- [ ] Deployment successful
- [ ] API accessible at `/api/health` or similar endpoint

### Frontend (Vercel)
- [ ] Project imported from GitHub
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Environment variables set (VITE_API_BASE_URL)
- [ ] Deployment successful
- [ ] Can access landing page

### Integration
- [ ] CORS configured (FRONTEND_URL set in backend)
- [ ] Backend redeployed after CORS update
- [ ] Can signup from frontend
- [ ] Can signin from frontend
- [ ] Chat functionality works
- [ ] Weather widget displays data

---

## Troubleshooting

### Backend Build Fails

**Error**: TypeScript compilation errors

**Solution**:
```bash
cd backend
npm install
npm run build
```
Fix any TypeScript errors locally first.

---

### Frontend Build Fails

**Error**: `Property 'env' does not exist on type 'ImportMeta'`

**Solution**: Make sure `vite-env.d.ts` exists in `frontend/src/` with:
```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

### CORS Errors

**Error**: "Access-Control-Allow-Origin" error in browser console

**Solution**:
1. Check `FRONTEND_URL` in backend environment variables
2. Make sure it matches your Vercel URL exactly (no trailing slash)
3. Redeploy backend after changing

---

### Database Connection Error

**Error**: "Database connection failed"

**Solution**:
1. Verify `DATABASE_URL` in Render environment variables
2. Check Neon dashboard - database should be active
3. Ensure connection string includes `?sslmode=require`

---

### API 404 Errors

**Error**: Frontend can't reach backend APIs

**Solution**:
1. Check `VITE_API_BASE_URL` in Vercel environment variables
2. Make sure it includes `/api` at the end
3. Test backend directly: `https://your-backend.onrender.com/api/health`

---

## Alternative: Deploy Backend to Railway

If you prefer Railway over Render:

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add the same environment variables as Render
6. Deploy

---

## Monitoring

### Backend Logs (Render)
1. Go to your service dashboard
2. Click "Logs" tab
3. Monitor for errors

### Frontend Logs (Vercel)
1. Go to your project dashboard
2. Click on a deployment
3. View "Runtime Logs"

---

## Updating Deployment

### Backend Update
```bash
git add .
git commit -m "Update backend"
git push
```
Render will automatically redeploy.

### Frontend Update
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel will automatically redeploy.

---

## Production URLs

After deployment, you should have:

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.onrender.com/api
- **Database**: Neon PostgreSQL (managed)

Test the complete flow:
1. Visit frontend URL
2. Click "無料で始める" (Sign Up)
3. Create account
4. Login
5. Test chat with voice input
6. Verify weather widget works

---

## Security Notes

1. **Never commit .env files** - They're in .gitignore
2. **Use strong JWT_SECRET** - Minimum 32 characters
3. **HTTPS only** - Both Render and Vercel provide HTTPS
4. **Environment variables** - Set in Render/Vercel dashboards only
5. **API keys** - Keep secure, never expose in frontend code

---

## Support

If you encounter issues:
1. Check logs in Render/Vercel dashboards
2. Verify all environment variables are set correctly
3. Test backend API endpoints directly using Postman or curl
4. Check browser console for frontend errors
