# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "department": "Engineering",
  "role": "employee",
  "managerId": "optional_manager_id"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee",
    "department": "Engineering"
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee",
    "department": "Engineering"
  }
}
```

### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee",
    "department": "Engineering"
  }
}
```

---

## Leave Endpoints

### Create Leave Request
```http
POST /leaves
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "leaveType": "casual",
  "startDate": "2024-03-01",
  "endDate": "2024-03-05",
  "reason": "Family vacation"
}
```

**Response:**
```json
{
  "success": true,
  "leave": {
    "_id": "leave_id",
    "employeeId": {
      "name": "John Doe",
      "email": "john@example.com",
      "department": "Engineering"
    },
    "leaveType": "casual",
    "startDate": "2024-03-01",
    "endDate": "2024-03-05",
    "reason": "Family vacation",
    "status": "pending",
    "createdAt": "2024-02-25"
  }
}
```

### Get My Leaves
```http
GET /leaves/my-leaves
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "leaves": [
    {
      "_id": "leave_id",
      "leaveType": "casual",
      "startDate": "2024-03-01",
      "endDate": "2024-03-05",
      "reason": "Family vacation",
      "status": "pending",
      "reviewedBy": null,
      "reviewedAt": null,
      "reviewComment": "",
      "createdAt": "2024-02-25"
    }
  ]
}
```

### Get All Leaves (Manager/Admin)
```http
GET /leaves/all
```

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Manager, Admin

**Response:**
```json
{
  "success": true,
  "count": 10,
  "leaves": [
    {
      "_id": "leave_id",
      "employeeId": {
        "name": "John Doe",
        "email": "john@example.com",
        "department": "Engineering"
      },
      "leaveType": "casual",
      "startDate": "2024-03-01",
      "endDate": "2024-03-05",
      "reason": "Family vacation",
      "status": "pending",
      "reviewedBy": null,
      "createdAt": "2024-02-25"
    }
  ]
}
```

### Update Leave Status (Manager/Admin)
```http
PUT /leaves/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Manager, Admin

**Request Body:**
```json
{
  "status": "approved",
  "reviewComment": "Approved for the requested dates"
}
```

**Response:**
```json
{
  "success": true,
  "leave": {
    "_id": "leave_id",
    "status": "approved",
    "reviewedBy": {
      "name": "Manager Name"
    },
    "reviewedAt": "2024-02-25",
    "reviewComment": "Approved for the requested dates"
  }
}
```

### Delete Leave
```http
DELETE /leaves/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Leave deleted successfully"
}
```

---

## User Endpoints

### Get All Users (Admin)
```http
GET /users
```

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Admin

**Response:**
```json
{
  "success": true,
  "count": 15,
  "users": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "employee",
      "department": "Engineering",
      "managerId": {
        "_id": "manager_id",
        "name": "Manager Name"
      },
      "createdAt": "2024-01-15"
    }
  ]
}
```

### Get Managers
```http
GET /users/managers
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "managers": [
    {
      "_id": "manager_id",
      "name": "Manager Name",
      "email": "manager@example.com",
      "department": "HR"
    }
  ]
}
```

### Update User (Admin)
```http
PUT /users/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Admin

**Request Body:**
```json
{
  "role": "manager",
  "department": "HR",
  "managerId": "new_manager_id"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "manager",
    "department": "HR",
    "managerId": "new_manager_id"
  }
}
```

### Delete User (Admin)
```http
DELETE /users/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Admin

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role employee is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error message"
}
```

---

## Leave Types

- `casual` - Casual Leave
- `sick` - Sick Leave
- `annual` - Annual Leave
- `unpaid` - Unpaid Leave

## Leave Status

- `pending` - Awaiting approval
- `approved` - Approved by manager
- `rejected` - Rejected by manager

## User Roles

- `employee` - Can apply for leave
- `manager` - Can approve/reject team leaves
- `admin` - Full system access
