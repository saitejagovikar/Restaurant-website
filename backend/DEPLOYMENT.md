# Deploying Backend to Render

This guide will walk you through deploying the restaurant backend API to Render.

## Prerequisites

Before deploying, ensure you have:

1. **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
   - Create a cluster (free tier available)
   - Get your connection string (should look like: `mongodb+srv://username:password@cluster.mongodb.net/database`)
   - Whitelist all IPs (0.0.0.0/0) for Render to connect

2. **Cloudinary Account** - [Sign up here](https://cloudinary.com/users/register/free)
   - Get your Cloud Name, API Key, and API Secret from the dashboard

3. **GitHub Repository** - Your code should be pushed to GitHub

## Deployment Steps

### 1. Create New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the `restaurant-app` repository

### 2. Configure Build Settings

Use these settings:

- **Name**: `restaurant-backend` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `master` (or `main`)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3. Configure Environment Variables

Add the following environment variables in Render:

| Key | Value | Example |
|-----|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `MONGO_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/restaurant` |
| `FRONTEND_URL` | Your frontend deployment URL | `https://your-frontend.netlify.app` |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret | `abcdefghijklmnopqrstuvwxyz` |

**Note**: `PORT` is automatically set by Render, no need to add it.

### 4. Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your application
3. Wait for the build to complete (usually 2-5 minutes)

### 5. Verify Deployment

Once deployed, test your endpoints:

1. **Health Check**: `https://your-app.onrender.com/health`
   - Should return: `{"status":"ok","timestamp":"...","uptime":...,"environment":"production"}`

2. **API Root**: `https://your-app.onrender.com/`
   - Should return API information

3. **Restaurants**: `https://your-app.onrender.com/api/restaurants`
   - Should return list of restaurants (may be empty initially)

## Post-Deployment

### Update Frontend

Update your frontend's API base URL to point to your Render deployment:

```typescript
// frontend/src/services/api.ts
const BASE_URL = 'https://your-app.onrender.com/api';
```

### Monitor Logs

- View logs in Render Dashboard → Your Service → Logs
- Check for any errors or warnings
- Verify MongoDB connection is successful

### Test Image Upload

1. Try uploading an image through your admin panel
2. Verify it uploads to Cloudinary successfully
3. Check that the image URL is returned correctly

## Troubleshooting

### Build Fails

- Check build logs in Render dashboard
- Verify `package.json` and `tsconfig.json` are correct
- Ensure all dependencies are listed in `package.json`

### MongoDB Connection Error

- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Ensure database user has read/write permissions

### CORS Errors

- Verify `FRONTEND_URL` environment variable is set correctly
- Check that your frontend URL matches exactly (including https://)
- Review CORS configuration in `src/index.ts`

### Cloudinary Upload Fails

- Verify all three Cloudinary environment variables are set
- Check Cloudinary dashboard for API usage limits
- Review upload logs in Render

## Free Tier Limitations

Render's free tier has some limitations:

- **Spin Down**: Services spin down after 15 minutes of inactivity
- **Spin Up**: First request after spin down takes 30-60 seconds
- **Build Minutes**: 500 build minutes per month
- **Bandwidth**: 100 GB per month

For production use, consider upgrading to a paid plan.

## Updating Your Deployment

To deploy updates:

1. Push changes to GitHub: `git push`
2. Render automatically detects changes and redeploys
3. Monitor the deployment in Render dashboard

## Environment Variables Reference

All required environment variables are documented in `.env.example`. Never commit actual credentials to Git!

## Support

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
