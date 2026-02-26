# Project Structure

## Complete File Tree

```
employee-leave-management/
│
├── backend/                          # Backend Node.js/Express Application
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   │
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic (register, login, getMe)
│   │   ├── leaveController.js       # Leave management (create, get, update, delete)
│   │   └── userController.js        # User management (CRUD operations)
│   │
│   ├── middleware/
│   │   └── auth.js                  # JWT verification & role authorization
│   │
│   ├── models/
│   │   ├── User.js                  # User schema (name, email, password, role, etc.)
│   │   └── Leave.js                 # Leave schema (type, dates, status, etc.)
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints (/register, /login, /me)
│   │   ├── leaveRoutes.js           # Leave endpoints (CRUD operations)
│   │   └── userRoutes.js            # User endpoints (admin operations)
│   │
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Express server entry point
│
├── frontend/                         # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx           # Navigation bar component
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global authentication state (Context API)
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   ├── Dashboard.jsx        # User dashboard with charts
│   │   │   ├── ApplyLeave.jsx       # Leave application form
│   │   │   ├── ManageLeaves.jsx     # Manager leave approval interface
│   │   │   └── ManageUsers.jsx      # Admin user management interface
│   │   │
│   │   ├── utils/
│   │   │   └── ProtectedRoute.jsx   # Route protection component
│   │   │
│   │   ├── App.jsx                  # Main app component with routing
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles with Tailwind
│   │
│   ├── index.html                   # HTML template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── postcss.config.js            # PostCSS configuration
│
├── .gitignore                       # Root git ignore
├── README.md                        # Main project documentation
├── SETUP.md                         # Quick setup guide
├── GETTING_STARTED.md               # First-time user guide
├── API_DOCUMENTATION.md             # Complete API reference
├── PROJECT_OVERVIEW.md              # Technical architecture details
├── PROJECT_STRUCTURE.md             # This file
├── FEATURES_CHECKLIST.md            # Implementation checklist
├── install.bat                      # Windows installation script
└── start.bat                        # Windows startup script
```

## File Descriptions

### Backend Files

#### Configuration
- **config/db.js**: Establishes MongoDB connection using Mongoose

#### Controllers (Business Logic)
- **authController.js**: 
  - `register()` - Create new user with hashed password
  - `login()` - Authenticate user and generate JWT
  - `getMe()` - Get current user details

- **leaveController.js**:
  - `createLeave()` - Submit new leave request
  - `getMyLeaves()` - Get user's leave history
  - `getAllLeaves()` - Get team/all leaves (Manager/Admin)
  - `updateLeaveStatus()` - Approve/reject leave
  - `deleteLeave()` - Delete leave request

- **userController.js**:
  - `getAllUsers()` - Get all users (Admin)
  - `updateUser()` - Update user details (Admin)
  - `deleteUser()` - Delete user (Admin)
  - `getManagers()` - Get list of managers

#### Middleware
- **auth.js**:
  - `protect` - Verify JWT token
  - `authorize()` - Check user role permissions

#### Models (Database Schemas)
- **User.js**:
  - Fields: name, email, password, role, department, managerId
  - Methods: matchPassword()
  - Hooks: Pre-save password hashing

- **Leave.js**:
  - Fields: employeeId, leaveType, dates, reason, status, reviewedBy
  - Relationships: References User model

#### Routes (API Endpoints)
- **authRoutes.js**: `/api/auth/*`
- **leaveRoutes.js**: `/api/leaves/*`
- **userRoutes.js**: `/api/users/*`

#### Entry Point
- **server.js**: Express app setup, middleware, routes

### Frontend Files

#### Components
- **Navbar.jsx**: 
  - Role-based navigation menu
  - User info display
  - Logout functionality

#### Context (State Management)
- **AuthContext.jsx**:
  - Global user state
  - Login/register/logout functions
  - Token management
  - Auto-authentication on mount

#### Pages
- **Login.jsx**: 
  - Email/password form
  - Form validation
  - Error handling
  - Link to register

- **Register.jsx**:
  - User registration form
  - Role selection
  - Manager assignment
  - Department input

- **Dashboard.jsx**:
  - Statistics cards (Pending/Approved/Rejected)
  - Pie chart (leave distribution)
  - Bar chart (leave statistics)
  - Leave history table

- **ApplyLeave.jsx**:
  - Leave type dropdown
  - Date pickers
  - Reason textarea
  - Form validation

- **ManageLeaves.jsx**:
  - Leave requests table
  - Status filter buttons
  - Approve/reject actions
  - Comment functionality

- **ManageUsers.jsx**:
  - Users table
  - Inline editing
  - Role management
  - Delete functionality

#### Utils
- **ProtectedRoute.jsx**:
  - Authentication check
  - Role verification
  - Loading state
  - Redirect logic

#### Entry Points
- **main.jsx**: React DOM render
- **App.jsx**: Router setup, routes, providers

#### Configuration
- **vite.config.js**: Dev server, proxy settings
- **tailwind.config.js**: Tailwind customization
- **postcss.config.js**: PostCSS plugins

### Documentation Files

- **README.md**: Complete project documentation
- **SETUP.md**: Installation and setup instructions
- **GETTING_STARTED.md**: First-time user guide
- **API_DOCUMENTATION.md**: API endpoints reference
- **PROJECT_OVERVIEW.md**: Architecture and design
- **PROJECT_STRUCTURE.md**: This file
- **FEATURES_CHECKLIST.md**: Feature implementation list

### Scripts

- **install.bat**: Automated dependency installation (Windows)
- **start.bat**: Start both servers (Windows)

## Data Flow

### Authentication Flow
```
User Input → Login.jsx → AuthContext.login() → 
POST /api/auth/login → authController.login() → 
User.findOne() → JWT.sign() → Response with token → 
localStorage.setItem() → AuthContext.setUser() → 
Navigate to Dashboard
```

### Leave Application Flow
```
User Input → ApplyLeave.jsx → axios.post() → 
POST /api/leaves → auth.protect → leaveController.createLeave() → 
Leave.create() → Response → Toast notification → 
Navigate to Dashboard
```

### Leave Approval Flow
```
Manager Action → ManageLeaves.jsx → axios.put() → 
PUT /api/leaves/:id → auth.protect → auth.authorize('manager') → 
leaveController.updateLeaveStatus() → Leave.findByIdAndUpdate() → 
Response → Toast notification → Refresh list
```

## Component Hierarchy

```
App
├── AuthProvider (Context)
│   ├── Router
│   │   ├── Navbar
│   │   └── Routes
│   │       ├── Login (Public)
│   │       ├── Register (Public)
│   │       └── ProtectedRoute
│   │           ├── Dashboard (All roles)
│   │           ├── ApplyLeave (Employee only)
│   │           ├── ManageLeaves (Manager/Admin)
│   │           └── ManageUsers (Admin only)
│   └── ToastContainer
```

## API Endpoint Structure

```
/api
├── /auth
│   ├── POST /register
│   ├── POST /login
│   └── GET /me (protected)
│
├── /leaves
│   ├── POST / (protected)
│   ├── GET /my-leaves (protected)
│   ├── GET /all (manager/admin)
│   ├── PUT /:id (manager/admin)
│   └── DELETE /:id (protected)
│
└── /users
    ├── GET / (admin)
    ├── GET /managers (protected)
    ├── PUT /:id (admin)
    └── DELETE /:id (admin)
```

## Database Collections

```
MongoDB: leave-management
├── users
│   ├── _id (ObjectId)
│   ├── name (String)
│   ├── email (String, unique)
│   ├── password (String, hashed)
│   ├── role (String: employee/manager/admin)
│   ├── department (String)
│   ├── managerId (ObjectId, ref: users)
│   └── createdAt (Date)
│
└── leaves
    ├── _id (ObjectId)
    ├── employeeId (ObjectId, ref: users)
    ├── leaveType (String: sick/casual/annual/unpaid)
    ├── startDate (Date)
    ├── endDate (Date)
    ├── reason (String)
    ├── status (String: pending/approved/rejected)
    ├── reviewedBy (ObjectId, ref: users)
    ├── reviewedAt (Date)
    ├── reviewComment (String)
    └── createdAt (Date)
```

## Technology Stack Breakdown

### Backend Stack
```
Node.js (Runtime)
└── Express.js (Web Framework)
    ├── Mongoose (ODM)
    │   └── MongoDB (Database)
    ├── JWT (Authentication)
    ├── bcryptjs (Password Hashing)
    ├── CORS (Cross-Origin)
    └── dotenv (Environment Variables)
```

### Frontend Stack
```
React 18 (UI Library)
├── React Router v6 (Routing)
├── Context API (State Management)
├── Axios (HTTP Client)
├── Tailwind CSS (Styling)
├── Chart.js (Data Visualization)
│   └── react-chartjs-2 (React Wrapper)
├── React Toastify (Notifications)
└── Vite (Build Tool)
```

## Key Design Patterns

1. **MVC Pattern** (Backend)
   - Models: Database schemas
   - Views: JSON responses
   - Controllers: Business logic

2. **Context Pattern** (Frontend)
   - Global state management
   - Provider/Consumer pattern

3. **HOC Pattern** (Frontend)
   - ProtectedRoute wrapper
   - Authentication logic reuse

4. **Middleware Pattern** (Backend)
   - Request processing pipeline
   - Authentication/Authorization

5. **Repository Pattern** (Backend)
   - Data access abstraction
   - Mongoose models

## Security Layers

```
Frontend
├── Protected Routes (Authentication)
├── Role-based UI (Authorization)
└── Token in Headers

Backend
├── JWT Verification (Authentication)
├── Role Middleware (Authorization)
├── Password Hashing (Security)
└── Input Validation (Security)

Database
└── Mongoose Validation (Data Integrity)
```

## Development Workflow

```
1. Start MongoDB
2. Start Backend (npm run dev)
3. Start Frontend (npm run dev)
4. Access http://localhost:3000
5. Register users
6. Test features
7. Check logs for errors
```

This structure ensures:
- ✅ Separation of concerns
- ✅ Scalability
- ✅ Maintainability
- ✅ Security
- ✅ Best practices
