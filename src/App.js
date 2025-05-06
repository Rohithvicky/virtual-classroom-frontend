// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetails';
import Assignments from './pages/Assignments';
import Settings from './pages/Settings';
import Discussion from './pages/Discussion';
import LiveQuizzes from './pages/LiveQuizzes';
import Profile from './pages/Profile';
import Announcements from './pages/Announcements';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CourseDetails from './pages/CourseDetails';
import ContinueLearning from './pages/ContinueLearning';
import { CoursesProvider } from './contexts/CoursesContext';
import LiveClasses from './pages/LiveClasses';
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#3a86ff',
        light: '#8fb8ff',
        dark: '#0057cc',
      },
      secondary: {
        main: '#ff6b6b',
        light: '#ff9e9e',
        dark: '#c73e3e',
      },
      background: {
        default: '#f7fafc',
        paper: '#ffffff',
      },
      success: {
        main: '#4caf50',
      },
      error: {
        main: '#f44336',
      },
      text: {
        primary: '#2d3748',
        secondary: '#718096',
      },
    },
    typography: {
      fontFamily: [
        'Poppins',
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: '1rem',
        color: '#616161',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CoursesProvider>
          <Router>
            <AppRoutes />
          </Router>
        </CoursesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Loading spinner component
const LoadingSpinner = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}
  >
    <CircularProgress />
  </Box>
);

// Separate component for routes to access the auth context
function AppRoutes() {
  const location = useLocation();

  // Define the ProtectedRoute component
  const ProtectedRoute = ({ children, allowedRoles = ['student', 'teacher'] }) => {
    const auth = useAuth();
    const { isAuthenticated, role, loading } = auth;
    
    console.log('ProtectedRoute Check:', { 
      isAuthenticated, 
      role, 
      loading, 
      path: location.pathname,
      allowedRoles
    });
    
    // While checking authentication status
    if (loading) {
      return <LoadingSpinner />;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user has permission for this route
    if (Array.isArray(allowedRoles) && 
        allowedRoles.length > 0 && 
        role && 
        !allowedRoles.includes(role)) {
      
      console.log('Role not allowed:', role, 'Allowed roles:', allowedRoles);
      
      // Redirect based on role
      if (role === 'teacher') {
        return <Navigate to="/teacher-dashboard" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    }

    // User is authenticated and authorized
    return children;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Redirect root to appropriate dashboard */}
      <Route path="/" element={
        <RequireAuth>
          {({ role }) => (
            role === 'teacher' 
              ? <Navigate to="/teacher-dashboard" replace /> 
              : <Navigate to="/dashboard" replace />
          )}
        </RequireAuth>
      } />
      
      {/* Student Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['student']}>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Teacher Routes */}
      <Route path="/teacher-dashboard" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <Layout>
            <TeacherDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Routes for both roles */}
      <Route path="/courses" element={
        <ProtectedRoute>
          <Layout>
            <CourseList />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/courses/:id" element={
        <ProtectedRoute>
          <Layout>
            <CourseDetail />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/assignments" element={
        <ProtectedRoute>
          <Layout>
            <Assignments />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Layout>
            <Settings />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/discussion" element={
        <ProtectedRoute>
          <Layout>
            <Discussion />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/live-quizzes" element={
        <ProtectedRoute>
          <Layout>
            <LiveQuizzes />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/announcements" element={
        <ProtectedRoute>
          <Layout>
            <Announcements />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/course/:id" element={
        <ProtectedRoute>
          <Layout>
            <CourseDetails />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/course/:id/continue" element={
        <ProtectedRoute>
          <Layout>
            <ContinueLearning />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/live-classes" element={
        <ProtectedRoute>
          <Layout>
            <LiveClasses />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// Helper component for root route
function RequireAuth({ children }) {
  const auth = useAuth();
  
  if (auth.loading) {
    return <LoadingSpinner />;
  }
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children(auth);
}

export default App;