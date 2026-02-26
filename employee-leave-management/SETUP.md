# Quick Setup Guide

## Step-by-Step Installation

### 1. Install MongoDB

#### Windows:
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

#### Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux:
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Backend Setup

```bash
# Navigate to backend
cd employee-leave-management/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings
# Update JWT_SECRET with a strong random string

# Start server
npm run dev
```

Server should start on http://localhost:5000

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend
cd employee-leave-management/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend should start on http://localhost:3000

### 4. Create Test Users

Open http://localhost:3000/register and create:

1. **Admin User**
   - Name: Admin User
   - Email: admin@test.com
   - Password: admin123
   - Department: IT
   - Role: Admin

2. **Manager User**
   - Name: Manager User
   - Email: manager@test.com
   - Password: manager123
   - Department: HR
   - Role: Manager

3. **Employee User**
   - Name: Employee User
   - Email: employee@test.com
   - Password: employee123
   - Department: Engineering
   - Role: Employee
   - Manager: Select the manager created above

### 5. Test the Application

1. Login as Employee
2. Apply for leave
3. Logout and login as Manager
4. Approve/reject the leave request
5. Login as Admin to manage users

## Common Issues

### MongoDB not connecting
```bash
# Check if MongoDB is running
mongosh

# If not running, start it
# Windows: Start MongoDB service from Services
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongodb
```

### Port already in use
```bash
# Kill process on port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill -9
```

### Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Environment Variables

### Backend .env
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=your_very_secure_random_string_here
JWT_EXPIRE=7d
NODE_ENV=development
```

## Verification Checklist

- [ ] MongoDB is running
- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Dashboard loads with data
- [ ] Can apply for leave
- [ ] Manager can see and approve leaves
- [ ] Admin can manage users

## Next Steps

After successful setup:
1. Explore all three role dashboards
2. Test leave application workflow
3. Try approval/rejection process
4. Experiment with user management
5. Check the analytics charts

## Support

If you encounter issues:
1. Check console logs in browser (F12)
2. Check terminal logs for backend
3. Verify all environment variables
4. Ensure MongoDB is running
5. Check network tab for API errors
