# Deployment Guide for Contact Manager App

## Prerequisites
- GitHub repository: https://github.com/swarajladke/contact-manager.git
- MongoDB Atlas account (for database)
- Render account (free tier available)

## Option 1: Deploy on Render (Recommended - Easiest)

### Backend Deployment (Server)

1. **Go to Render Dashboard**
   - Visit https://render.com
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `swarajladke/contact-manager`

3. **Configure Backend Service**
   - **Name**: `contact-manager-api` (or any name you prefer)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**
   - Click "Advanced" → "Add Environment Variable"
   - Add:
     ```
     MONGO_URI = your_mongodb_connection_string
     ```
   - (Optional) PORT is automatically set by Render

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://contact-manager-api.onrender.com`)

### Frontend Deployment (Client)

1. **Create New Static Site**
   - In Render dashboard, click "New +" → "Static Site"
   - Connect the same GitHub repository

2. **Configure Frontend**
   - **Name**: `contact-manager-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

3. **Add Environment Variable**
   - Click "Environment" → "Add Environment Variable"
   - Add:
     ```
     REACT_APP_API_URL = https://your-backend-url.onrender.com/api/contacts
     ```
   - Replace `your-backend-url` with your actual backend URL from step above

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment
   - Your app will be live!

---

## Option 2: Vercel (Frontend) + Render (Backend)

### Backend on Render
Follow the same backend steps from Option 1.

### Frontend on Vercel

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "New Project"
   - Import `swarajladke/contact-manager`

3. **Configure**
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build`

4. **Add Environment Variable**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL = https://your-backend-url.onrender.com/api/contacts
     ```

5. **Deploy**
   - Click "Deploy"
   - Your app will be live!

---

## Important Notes

### MongoDB Connection String
Make sure your MongoDB connection string includes:
- Your username and password
- Database name (e.g., `contactManager`)
- Connection parameters: `?retryWrites=true&w=majority`

Example format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contactManager?retryWrites=true&w=majority
```

### Environment Variables
- **Backend**: Needs `MONGO_URI` in Render environment variables
- **Frontend**: Needs `REACT_APP_API_URL` pointing to your backend

### CORS
The backend already has CORS enabled, so it should work with any frontend URL.

### Free Tier Limitations
- Render free tier: Services spin down after 15 minutes of inactivity (first request may be slow)
- Vercel free tier: Very generous, no spin-down

---

## Troubleshooting

1. **Backend not connecting to MongoDB**
   - Check your `MONGO_URI` environment variable
   - Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

2. **Frontend can't reach backend**
   - Verify `REACT_APP_API_URL` is set correctly
   - Check backend is deployed and running
   - Check CORS settings in backend

3. **Build fails**
   - Check build logs in Render/Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Check Node version compatibility

---

## After Deployment

1. Test your deployed app
2. Update your GitHub README with live URLs
3. Share your app! 🎉

