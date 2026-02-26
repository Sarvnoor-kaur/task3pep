# Getting Started - Employee Leave Management System

## 🚀 Quick Start (5 Minutes)

### Prerequisites Check
Before starting, ensure you have:
- ✅ Node.js installed (v14 or higher) - Check: `node --version`
- ✅ MongoDB installed and running - Check: `mongosh`
- ✅ npm or yarn installed - Check: `npm --version`

### Installation (Windows)

1. **Run the automated installer:**
   ```bash
   cd employee-leave-management
   install.bat
   ```

2. **Configure environment:**
   ```bash
   cd backend
   copy .env.example .env
   ```
   
   Edit `.env` and update:
   - `JWT_SECRET` - Change to a random secure string
   - `MONGODB_URI` - Update if using different MongoDB setup

3. **Start the application:**
   ```bash
   cd ..
   start.bat
   ```

### Manual Installation (All Platforms)

1. **Install Backend:**
   ```bash
   cd employee-leave-management/backend
   npm install
   cp .env.example .env
   # Edit .env file
   npm run dev
   ```

2. **Install Frontend (New Terminal):**
   ```bash
   cd employee-leave-management/frontend
   npm install
   npm run dev
   ```

## 🎯 First Time Setup

### Step 1: Access the Application
Open your browser and go to: `http://localhost:3000`

### Step 2: Create Admin Account
1. Click "Register"
2. Fill in the form:
   - Name: Admin User
   - Email: admin@test.com
   - Password: admin123
   - Department: IT
   - Role: Admin
3. Click "Register"

### Step 3: Create Manager Account
1. Logout (top right)
2. Click "Register"
3. Fill in the form:
   - Name: Manager User
   - Email: manager@test.com
   - Password: manager123
   - Department: HR
   - Role: Manager
4. Click "Register"

### Step 4: Create Employee Account
1. Logout
2. Click "Register"
3. Fill in the form:
   - Name: Employee User
   - Email: employee@test.com
   - Password: employee123
   - Department: Engineering
   - Role: Employee
   - Manager: Select "Manager User"
4. Click "Register"

## 🧪 Testing the Application

### Test Scenario 1: Employee Applies for Leave

1. **Login as Employee:**
   - Email: employee@test.com
   - Password: employee123

2. **View Dashboard:**
   - See your statistics (all zeros initially)
   - View empty leave history

3. **Apply for Leave:**
   - Click "Apply Leave" in navbar
   - Select Leave Type: Casual
   - Start Date: Tomorrow's date
   - End Date: 3 days from tomorrow
   - Reason: "Family vacation"
   - Click "Submit Request"

4. **Verify:**
   - Should see success notification
   - Redirected to dashboard
   - Leave appears in "My Leave Requests" table
   - Status shows "pending" (yellow badge)
   - Statistics updated: Pending = 1

### Test Scenario 2: Manager Approves Leave

1. **Logout and Login as Manager:**
   - Email: manager@test.com
   - Password: manager123

2. **View Leave Requests:**
   - Click "Manage Leaves" in navbar
   - See the employee's leave request
   - Note: Shows employee name, department, dates, reason

3. **Approve the Leave:**
   - Click "Approve" button
   - Enter comment (optional): "Approved for requested dates"
   - Click OK

4. **Verify:**
   - Success notification appears
   - Leave status changes to "approved" (green badge)
   - Approve/Reject buttons disappear

### Test Scenario 3: Employee Checks Status

1. **Logout and Login as Employee:**
   - Email: employee@test.com
   - Password: employee123

2. **View Dashboard:**
   - Statistics updated: Approved = 1, Pending = 0
   - Leave request shows "approved" status
   - Charts updated with new data

### Test Scenario 4: Admin Manages Users

1. **Logout and Login as Admin:**
   - Email: admin@test.com
   - Password: admin123

2. **Manage Users:**
   - Click "Manage Users" in navbar
   - See all registered users
   - Try editing a user:
     - Click "Edit" on employee
     - Change department to "Sales"
     - Click "Save"
   - Verify change is saved

## 📱 Features to Explore

### Employee Features
- ✅ Dashboard with statistics
- ✅ Pie chart showing leave distribution
- ✅ Bar chart showing leave counts
- ✅ Apply for different leave types
- ✅ View complete leave history
- ✅ Real-time status updates

### Manager Features
- ✅ View all team leave requests
- ✅ Filter by status (All/Pending/Approved/Rejected)
- ✅ Approve requests with comments
- ✅ Reject requests with reasons
- ✅ See employee details

### Admin Features
- ✅ View all users in system
- ✅ Edit user roles
- ✅ Assign managers to employees
- ✅ Update departments
- ✅ Delete users
- ✅ View all leaves across organization

## 🎨 UI Components to Notice

### Color Coding
- 🟡 Yellow - Pending status
- 🟢 Green - Approved status
- 🔴 Red - Rejected status

### Responsive Design
- Try resizing your browser
- Test on mobile device
- All tables and forms adapt

### Notifications
- Success messages (green)
- Error messages (red)
- Auto-dismiss after 3 seconds

### Loading States
- Spinners during API calls
- Disabled buttons during submission
- Loading text on buttons

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if MongoDB is running
mongosh

# If not, start MongoDB
# Windows: Start MongoDB service
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongodb
```

### Frontend won't start
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules
npm cache clean --force
npm install
```

### Can't login
- Verify MongoDB is running
- Check backend console for errors
- Verify .env file is configured
- Try registering a new user

### Port already in use
```bash
# Backend (port 5000)
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill -9

# Frontend (port 3000)
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill -9
```

## 📚 Next Steps

1. **Explore the Code:**
   - Backend: `backend/controllers/` - Business logic
   - Frontend: `frontend/src/pages/` - UI components
   - Models: `backend/models/` - Database schemas

2. **Read Documentation:**
   - `README.md` - Complete project documentation
   - `API_DOCUMENTATION.md` - API reference
   - `PROJECT_OVERVIEW.md` - Technical architecture

3. **Customize:**
   - Add more leave types
   - Customize colors in Tailwind
   - Add new features
   - Modify workflows

4. **Deploy:**
   - Setup MongoDB Atlas
   - Deploy backend to Heroku/Railway
   - Deploy frontend to Vercel/Netlify
   - Configure environment variables

## 🎓 Learning Resources

### Technologies Used
- **React**: https://react.dev/learn
- **Express**: https://expressjs.com/en/guide/routing.html
- **MongoDB**: https://www.mongodb.com/docs/manual/tutorial/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **JWT**: https://jwt.io/introduction

### Concepts to Study
- RESTful API design
- JWT authentication flow
- React Context API
- React Router v6
- MongoDB relationships
- Middleware patterns

## 💡 Tips for Success

1. **Start Simple:**
   - Test basic login/register first
   - Then try leave application
   - Finally test approval workflow

2. **Use Browser DevTools:**
   - F12 to open console
   - Check Network tab for API calls
   - View errors in Console tab

3. **Check Logs:**
   - Backend terminal shows API requests
   - Frontend terminal shows build errors
   - MongoDB logs show database operations

4. **Experiment:**
   - Try different user roles
   - Test edge cases
   - Break things and fix them

## 🆘 Getting Help

If you encounter issues:

1. Check console logs (F12 in browser)
2. Check terminal logs (backend & frontend)
3. Verify MongoDB is running
4. Review error messages carefully
5. Check the troubleshooting section above

## ✅ Success Checklist

Before considering setup complete:
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can register new users
- [ ] Can login successfully
- [ ] Dashboard loads with data
- [ ] Can apply for leave
- [ ] Manager can approve leaves
- [ ] Admin can manage users
- [ ] Charts display correctly
- [ ] Notifications appear
- [ ] All roles work as expected

## 🎉 You're Ready!

Once all checks pass, you have a fully functional Employee Leave Management System. Explore, experiment, and enjoy learning!

For detailed information, refer to:
- `README.md` - Main documentation
- `SETUP.md` - Detailed setup guide
- `API_DOCUMENTATION.md` - API endpoints
- `PROJECT_OVERVIEW.md` - Architecture details
- `FEATURES_CHECKLIST.md` - Feature list
