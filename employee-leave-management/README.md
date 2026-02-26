# Employee Leave Management System

A full-stack web application that simulates a real company HR workflow for managing employee leave requests. Built with React.js, Node.js, Express.js, and MongoDB.

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Manager, Employee)
- Secure password hashing with bcrypt
- Protected routes on frontend and backend

### Employee Features
- Apply for leave (Sick, Casual, Annual, Unpaid)
- View leave history and status
- Dashboard with leave statistics
- Visual analytics with Chart.js

### Manager Features
- View all leave requests from team members
- Approve or reject leave requests
- Add comments when reviewing requests
- Filter leaves by status

### Admin Features
- Manage all users (Create, Update, Delete)
- Assign roles and managers
- View all leave requests across organization
- Full system access

## Tech Stack

### Frontend
- React.js 18
- React Router v6 (Routing)
- Context API (State Management)
- Tailwind CSS (Styling)
- Chart.js & react-chartjs-2 (Analytics)
- React Toastify (Notifications)
- Axios (HTTP Client)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (Authentication)
- bcryptjs (Password Hashing)
- CORS (Cross-Origin Resource Sharing)

## Project Structure

```
employee-leave-management/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── leaveController.js    # Leave management logic
│   │   └── userController.js     # User management logic
│   ├── middleware/
│   │   └── auth.js               # JWT verification & authorization
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Leave.js              # Leave schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── leaveRoutes.js        # Leave endpoints
│   │   └── userRoutes.js         # User endpoints
│   ├── .env.example              # Environment variables template
│   ├── server.js                 # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx        # Navigation component
    │   ├── context/
    │   │   └── AuthContext.jsx   # Global auth state
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   ├── Dashboard.jsx     # User dashboard
    │   │   ├── ApplyLeave.jsx    # Leave application form
    │   │   ├── ManageLeaves.jsx  # Manager leave approval
    │   │   └── ManageUsers.jsx   # Admin user management
    │   ├── utils/
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd employee-leave-management/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd employee-leave-management/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Leave Management
- `POST /api/leaves` - Create leave request (Protected)
- `GET /api/leaves/my-leaves` - Get user's leaves (Protected)
- `GET /api/leaves/all` - Get all leaves (Manager/Admin)
- `PUT /api/leaves/:id` - Update leave status (Manager/Admin)
- `DELETE /api/leaves/:id` - Delete leave (Protected)

### User Management
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/managers` - Get all managers (Protected)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

## Usage Guide

### 1. Register Users

Create accounts with different roles:
- **Admin**: Full system access
- **Manager**: Can approve/reject team leaves
- **Employee**: Can apply for leave

### 2. Employee Workflow

1. Login with employee credentials
2. Navigate to "Apply Leave"
3. Fill in leave details (type, dates, reason)
4. Submit request
5. View status on dashboard

### 3. Manager Workflow

1. Login with manager credentials
2. Navigate to "Manage Leaves"
3. View pending requests from team
4. Approve or reject with comments
5. Filter by status

### 4. Admin Workflow

1. Login with admin credentials
2. Manage users (assign roles, managers)
3. View all leave requests
4. Full CRUD operations on users

## Key Features Implementation

### Context API (State Management)
- `AuthContext` manages global authentication state
- Provides login, register, logout functions
- Persists token in localStorage
- Automatic token validation

### Protected Routes
- Frontend route protection based on authentication
- Role-based access control
- Automatic redirect to login if unauthorized

### Backend Authorization
- JWT middleware validates tokens
- Role-based middleware restricts endpoints
- Secure password hashing before storage

### Responsive Design
- Tailwind CSS for mobile-first design
- Responsive tables and forms
- Optimized for all screen sizes

### Loading & Error States
- Loading spinners during API calls
- Toast notifications for success/error
- Form validation and error messages

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token expiration
- Protected API routes
- Input validation
- CORS configuration
- Environment variable protection

## Testing the Application

### Test Accounts

Create these accounts for testing:

1. **Admin Account**
   - Email: admin@company.com
   - Password: admin123
   - Role: Admin

2. **Manager Account**
   - Email: manager@company.com
   - Password: manager123
   - Role: Manager

3. **Employee Account**
   - Email: employee@company.com
   - Password: employee123
   - Role: Employee

## Screenshots

### Login Page
User authentication with email and password.

### Dashboard
Visual analytics showing leave statistics with pie and bar charts.

### Apply Leave
Form for employees to submit leave requests.

### Manage Leaves
Manager interface to approve/reject leave requests.

### Manage Users
Admin panel for user management.

## Future Enhancements

- Email notifications for leave status updates
- Leave balance tracking
- Calendar view for leaves
- Export reports to PDF/Excel
- Multi-language support
- Leave policy configuration
- Mobile app version

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity

### Port Already in Use
- Change PORT in backend .env
- Update proxy in frontend vite.config.js

### CORS Issues
- Verify backend CORS configuration
- Check frontend API base URL

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the ISC License.

## Author

Built as a learning project for full-stack development with React, Node.js, and MongoDB.

## Acknowledgments

- React.js documentation
- Express.js documentation
- MongoDB documentation
- Tailwind CSS
- Chart.js
