# Deploy to Vercel - Complete Guide

## Prerequisites

1. **MongoDB Atlas Account** (for database)
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string

2. **Vercel Account**
   - Sign up at https://vercel.com
   - Connect your GitHub account

3. **GitHub Repository**
   - Push your code to GitHub

## Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Database Access → Add Database User
   - Username: `admin`
   - Password: Create a strong password (save it!)
4. Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Get Connection String:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/leave-management`

## Step 2: Deploy Backend to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `employee-leave-management/backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
5. Add Environment Variables:
   - Click "Environment Variables"
   - Add these variables:
     ```
     MONGODB_URI = your_mongodb_connection_string
     JWT_SECRET = your_super_secret_random_string_min_32_chars
     JWT_EXPIRE = 7d
     NODE_ENV = production
     ```
6. Click "Deploy"
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://your-backend.vercel.app`)

### Option B: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy backend:
   ```bash
   cd employee-leave-management/backend
   vercel
   ```

4. Follow prompts:
   - Setup and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name? **leave-management-backend**
   - Directory? **./**
   - Override settings? **No**

5. Add environment variables:
   ```bash
   vercel env add MONGODB_URI
   # Paste your MongoDB connection string

   vercel env add JWT_SECRET
   # Enter a secure random string (min 32 characters)

   vercel env add JWT_EXPIRE
   # Enter: 7d

   vercel env add NODE_ENV
   # Enter: production
   ```

6. Deploy to production:
   ```bash
   vercel --prod
   ```

## Step 3: Deploy Frontend to Vercel

### Update API URL in Frontend

Before deploying frontend, update the API URL:

1. Open `frontend/src/context/AuthContext.jsx`
2. Find the axios baseURL configuration
3. Update it to your backend Vercel URL:
   ```javascript
   axios.defaults.baseURL = 'https://your-backend.vercel.app';
   ```

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import the same GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `employee-leave-management/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables (optional):
   ```
   VITE_API_URL = https://your-backend.vercel.app
   ```
6. Click "Deploy"
7. Wait for deployment to complete
8. Your app is live! 🎉

### Option B: Using Vercel CLI

1. Update API URL first (see above)

2. Deploy frontend:
   ```bash
   cd employee-leave-management/frontend
   vercel
   ```

3. Follow prompts:
   - Setup and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name? **leave-management-frontend**
   - Directory? **./**
   - Override settings? **No**

4. Deploy to production:
   ```bash
   vercel --prod
   ```

## Step 4: Update CORS Settings

After deploying frontend, update backend CORS:

1. Go to your backend Vercel project
2. Settings → Environment Variables
3. Add:
   ```
   CORS_ORIGIN = https://your-frontend.vercel.app
   ```
4. Redeploy backend

Or update `backend/server.js`:
```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
};
app.use(cors(corsOptions));
```

## Step 5: Test Your Deployment

1. Open your frontend URL: `https://your-frontend.vercel.app`
2. Test registration:
   - Create a new account
   - Check if it saves to database
3. Test login:
   - Login with created account
   - Verify JWT token works
4. Test all features:
   - Apply for leave
   - View dashboard
   - Admin features (if admin user)

## Troubleshooting

### Backend Issues

**Error: Cannot connect to database**
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify connection string is correct
- Check MongoDB Atlas cluster is running

**Error: 500 Internal Server Error**
- Check Vercel logs: Project → Deployments → Click deployment → View Function Logs
- Verify all environment variables are set correctly

**Error: CORS issues**
- Add frontend URL to CORS_ORIGIN environment variable
- Redeploy backend

### Frontend Issues

**Error: Network Error / Cannot connect to API**
- Verify backend URL in AuthContext.jsx
- Check backend is deployed and running
- Open browser console for detailed errors

**Error: Build failed**
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Try building locally: `npm run build`

### Check Logs

**Backend logs:**
```bash
vercel logs your-backend-url.vercel.app
```

**Frontend logs:**
```bash
vercel logs your-frontend-url.vercel.app
```

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to main branch** → Production deployment
- **Push to other branches** → Preview deployment

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed
5. SSL certificate is automatic

## Environment Variables Management

### View variables:
```bash
vercel env ls
```

### Add variable:
```bash
vercel env add VARIABLE_NAME
```

### Remove variable:
```bash
vercel env rm VARIABLE_NAME
```

## Redeployment

### Redeploy backend:
```bash
cd employee-leave-management/backend
vercel --prod
```

### Redeploy frontend:
```bash
cd employee-leave-management/frontend
vercel --prod
```

## Cost

- **Vercel Free Tier includes:**
  - Unlimited deployments
  - 100GB bandwidth per month
  - Automatic SSL
  - Serverless functions
  - Perfect for this project!

- **MongoDB Atlas Free Tier:**
  - 512MB storage
  - Shared cluster
  - Enough for development and small production

**Total Cost: $0/month** 🎉

## Important Notes

1. **Serverless Functions**: Backend runs as serverless functions on Vercel
2. **Cold Starts**: First request after inactivity may be slower (2-3 seconds)
3. **Function Timeout**: Free tier has 10-second timeout per function
4. **Database**: Keep MongoDB Atlas connection string secure
5. **Environment Variables**: Never commit .env files to GitHub

## Security Checklist

- [ ] MongoDB Atlas IP whitelist configured
- [ ] Strong JWT_SECRET (min 32 characters)
- [ ] CORS properly configured
- [ ] Environment variables set in Vercel (not in code)
- [ ] .env files in .gitignore
- [ ] HTTPS enabled (automatic on Vercel)

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

## Quick Commands Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME

# Remove project
vercel remove project-name
```

## Success! 🚀

Your Employee Leave Management System is now live on Vercel!

- Backend: `https://your-backend.vercel.app`
- Frontend: `https://your-frontend.vercel.app`

Share the frontend URL with your users and start managing leaves!
