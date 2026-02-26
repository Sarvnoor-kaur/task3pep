# Deployment Guide

## Production Deployment Checklist

### Pre-Deployment

- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] Database backup strategy planned
- [ ] Error logging configured
- [ ] Security audit completed
- [ ] Performance optimization done

## Deployment Options

### Option 1: MongoDB Atlas + Heroku + Vercel

#### Step 1: Setup MongoDB Atlas (Database)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "Free Shared" tier
   - Select region closest to users
   - Click "Create Cluster"

3. **Configure Access:**
   - Database Access → Add Database User
   - Username: `admin`
   - Password: Generate secure password
   - Save credentials securely

4. **Network Access:**
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String:**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/leave-management`

#### Step 2: Deploy Backend to Heroku

1. **Install Heroku CLI:**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku App:**
   ```bash
   cd employee-leave-management/backend
   heroku create your-app-name-backend
   ```

4. **Set Environment Variables:**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   heroku config:set JWT_SECRET="your_secure_random_string"
   heroku config:set JWT_EXPIRE="7d"
   heroku config:set NODE_ENV="production"
   ```

5. **Create Procfile:**
   ```bash
   echo "web: node server.js" > Procfile
   ```

6. **Deploy:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

7. **Verify:**
   ```bash
   heroku open
   heroku logs --tail
   ```

#### Step 3: Deploy Frontend to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Update API URL:**
   ```javascript
   // frontend/src/context/AuthContext.jsx
   // Update axios base URL
   axios.defaults.baseURL = 'https://your-app-name-backend.herokuapp.com';
   ```

3. **Build Configuration:**
   Create `vercel.json` in frontend folder:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

4. **Deploy:**
   ```bash
   cd employee-leave-management/frontend
   vercel
   ```

5. **Follow Prompts:**
   - Setup and deploy? Yes
   - Which scope? Your account
   - Link to existing project? No
   - Project name? your-app-name-frontend
   - Directory? ./
   - Override settings? No

6. **Set Environment Variables (if needed):**
   ```bash
   vercel env add VITE_API_URL production
   # Enter: https://your-app-name-backend.herokuapp.com
   ```

### Option 2: Railway (All-in-One)

#### Deploy Backend

1. **Go to Railway:**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Create New Project:**
   - New Project → Deploy from GitHub repo
   - Select your repository
   - Select backend folder

3. **Add MongoDB:**
   - Add Plugin → MongoDB
   - Copy connection string

4. **Set Variables:**
   - Variables tab
   - Add all environment variables
   - Use MongoDB connection string from plugin

5. **Deploy:**
   - Automatic deployment on push

#### Deploy Frontend

1. **Create New Service:**
   - Add Service → GitHub Repo
   - Select frontend folder

2. **Configure Build:**
   - Build Command: `npm run build`
   - Start Command: `npm run preview`

3. **Set Variables:**
   - VITE_API_URL: Your backend Railway URL

4. **Deploy:**
   - Automatic deployment

### Option 3: DigitalOcean App Platform

1. **Create Account:**
   - Go to https://www.digitalocean.com

2. **Create App:**
   - Apps → Create App
   - Connect GitHub repository

3. **Configure Backend:**
   - Detect backend folder
   - Set environment variables
   - Choose plan ($5/month)

4. **Configure Frontend:**
   - Detect frontend folder
   - Set build command
   - Choose plan (Free tier available)

5. **Add Database:**
   - Add MongoDB database
   - Connect to backend

## Environment Variables

### Backend Production Variables
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=super_secure_random_string_min_32_chars
JWT_EXPIRE=7d
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend Production Variables
```env
VITE_API_URL=https://your-backend-domain.com
```

## Post-Deployment Configuration

### 1. Update CORS Settings

In `backend/server.js`:
```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
```

### 2. Add Rate Limiting

Install:
```bash
npm install express-rate-limit
```

Add to `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 3. Add Helmet for Security

Install:
```bash
npm install helmet
```

Add to `server.js`:
```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 4. Add Compression

Install:
```bash
npm install compression
```

Add to `server.js`:
```javascript
const compression = require('compression');
app.use(compression());
```

### 5. Setup Logging

Install:
```bash
npm install morgan
```

Add to `server.js`:
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

## Testing Production Deployment

### Backend Tests
```bash
# Test API endpoint
curl https://your-backend-url.com/api/auth/login

# Test with credentials
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Frontend Tests
1. Open production URL
2. Test registration
3. Test login
4. Test all features
5. Check browser console for errors
6. Test on mobile devices

## Monitoring & Maintenance

### 1. Setup Error Tracking

**Sentry Integration:**
```bash
npm install @sentry/node
```

```javascript
// server.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

### 2. Database Backups

**MongoDB Atlas:**
- Automatic backups enabled by default
- Configure backup schedule in Atlas dashboard
- Test restore procedure

### 3. Uptime Monitoring

**Options:**
- UptimeRobot (free)
- Pingdom
- StatusCake

### 4. Performance Monitoring

**Tools:**
- New Relic
- DataDog
- Google Analytics

## SSL/HTTPS

Most platforms (Vercel, Heroku, Railway) provide automatic SSL certificates.

**Manual Setup (if needed):**
1. Get certificate from Let's Encrypt
2. Configure in your hosting platform
3. Force HTTPS redirects

## Custom Domain Setup

### Vercel
1. Domains → Add Domain
2. Enter your domain
3. Update DNS records as instructed

### Heroku
1. Settings → Domains
2. Add custom domain
3. Update DNS CNAME record

## Rollback Strategy

### Heroku
```bash
# View releases
heroku releases

# Rollback to previous version
heroku rollback v123
```

### Vercel
- Deployments tab
- Click on previous deployment
- Click "Promote to Production"

## Performance Optimization

### Backend
- [ ] Enable gzip compression
- [ ] Add caching headers
- [ ] Optimize database queries
- [ ] Add database indexes
- [ ] Use connection pooling

### Frontend
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Minification
- [ ] CDN for static assets

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Helmet.js configured
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Regular dependency updates

## Cost Estimation

### Free Tier (Development)
- MongoDB Atlas: Free (512MB)
- Heroku: Free (550 hours/month)
- Vercel: Free (100GB bandwidth)
- **Total: $0/month**

### Production Tier
- MongoDB Atlas: $9/month (2GB)
- Heroku: $7/month (Hobby)
- Vercel: Free or $20/month (Pro)
- **Total: $16-36/month**

## Troubleshooting

### Backend Issues
```bash
# Check logs
heroku logs --tail

# Check environment variables
heroku config

# Restart dyno
heroku restart
```

### Frontend Issues
```bash
# Check build logs
vercel logs

# Redeploy
vercel --prod
```

### Database Issues
- Check MongoDB Atlas metrics
- Verify connection string
- Check IP whitelist
- Monitor query performance

## Maintenance Schedule

### Daily
- Monitor error logs
- Check uptime status

### Weekly
- Review performance metrics
- Check database size
- Update dependencies

### Monthly
- Security audit
- Backup verification
- Cost review
- Performance optimization

## Support Resources

- **Heroku**: https://devcenter.heroku.com
- **Vercel**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Railway**: https://docs.railway.app

## Conclusion

Your application is now production-ready! Follow this guide to deploy successfully and maintain a reliable service for your users.
