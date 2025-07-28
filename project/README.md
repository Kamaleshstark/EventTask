# TaskFlow - Task Management Dashboard

A comprehensive task management dashboard built with React, TypeScript, and Tailwind CSS. Features authentication, role-based access control (RBAC), and modern UI components.

## 🚀 Features

### Authentication System
- **JWT-based Authentication**: Secure login/logout with token management
- **User Registration**: Create new accounts with role selection
- **Auto-logout**: Automatic session management on token expiration
- **Protected Routes**: Route-level access control

### Role-Based Access Control (RBAC)
- **Admin**: Full access to all tasks and user management
- **Manager**: Manage own tasks and team tasks
- **User**: Create and manage only personal tasks

### Task Management
- **CRUD Operations**: Create, read, update, and delete tasks
- **Status Management**: Todo, In Progress, Done
- **Priority Levels**: High, Medium, Low priority tasks
- **Due Date Tracking**: Visual indicators for overdue tasks
- **Task Assignment**: Assign tasks to team members (Manager/Admin only)

### User Interface
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, professional design with smooth animations
- **Real-time Updates**: Instant feedback and state management
- **Advanced Filtering**: Filter by status, priority, and search
- **Sorting Options**: Sort by due date, priority, or creation date
- **Toast Notifications**: User-friendly feedback system

## 🛠️ Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Context API
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Local Storage**: Mock API with persistent data

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 Demo Credentials

The application comes with pre-configured demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | admin123 |
| Manager | manager@test.com | manager123 |
| User | user@test.com | user123 |

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── AuthPage.tsx     # Authentication wrapper
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Header.tsx       # App header with user info
│   ├── LoginForm.tsx    # Login component
│   ├── RegisterForm.tsx # Registration component
│   ├── TaskCard.tsx     # Individual task display
│   ├── TaskForm.tsx     # Task creation/editing
│   ├── Toast.tsx        # Notification system
│   ├── LoadingSpinner.tsx # Loading indicator
│   └── ProtectedRoute.tsx # Route protection
├── contexts/            # React Context providers
│   ├── AuthContext.tsx  # Authentication state
│   ├── TaskContext.tsx  # Task management state
│   └── ToastContext.tsx # Notification state
├── services/            # API services
│   ├── authService.ts   # Authentication API
│   └── taskService.ts   # Task management API
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔐 Security Features

- **JWT Token Management**: Secure token storage and validation
- **Role-based Permissions**: Granular access control
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: Sanitized user inputs
- **Auto-logout**: Session timeout management

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

- **Color Palette**: Blue/Purple gradient theme with semantic colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: ARIA labels and keyboard navigation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Implemented

### Authentication & Authorization
- ✅ JWT-based login/logout
- ✅ User registration with role selection
- ✅ Protected routes with role validation
- ✅ Auto-logout on token expiration

### Task Management
- ✅ Complete CRUD operations
- ✅ Status tracking (Todo, In Progress, Done)
- ✅ Priority levels (High, Medium, Low)
- ✅ Due date management with overdue detection
- ✅ Task assignment (role-dependent)

### User Experience
- ✅ Responsive design across all devices
- ✅ Advanced filtering and sorting
- ✅ Real-time search functionality
- ✅ Toast notifications for all actions
- ✅ Loading states and error handling
- ✅ Form validation with clear error messages

### Role-Based Features
- ✅ Admin: Full system access
- ✅ Manager: Team task management
- ✅ User: Personal task management
- ✅ Permission-based UI rendering

## 🚧 Future Enhancements

- Real-time updates with WebSockets
- Task comments and attachments
- Team management interface
- Email notifications
- Task templates
- Analytics dashboard
- Export functionality (CSV/PDF)
- Dark mode toggle

## 🐛 Known Issues

- Local storage simulation (would use real API in production)
- Limited user management interface for admins
- No file upload functionality yet

## 📄 License

This project is part of a frontend developer assessment and is for demonstration purposes.

## 👥 Contributing

This is an assessment project. For feedback or questions, please contact the development team.

---

