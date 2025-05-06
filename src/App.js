import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CoursesProvider } from './contexts/CoursesContext';

// Import the missing pages
import Courses from './pages/Courses';
import Assignments from './pages/Assignments';
import Discussion from './pages/Discussion';
import LiveQuizzes from './pages/LiveQuizzes';
import LiveClasses from './pages/LiveClasses';

const RoleBasedRedirect = () => {
  const { user } = useAuth();

  if (user.role === 'student') {
    return <Navigate to="/student/dashboard" />;
  } else if (user.role === 'teacher') {
    return <Navigate to="/teacher/dashboard" />;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <AuthProvider>
      <CoursesProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Home route - redirects based on role */}
            <Route path="/" element={<RoleBasedRedirect />} />
            
            {/* Student routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/courses" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <Courses />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/assignments" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <Assignments />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/discussion" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <Discussion />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/live-quizzes" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <LiveQuizzes />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/live-classes" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <LiveClasses />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Teacher routes */}
            <Route path="/teacher-dashboard" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Layout>
                  <TeacherDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/teacher/courses" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Layout>
                  <div>Teacher Courses Page</div>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/teacher/students" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Layout>
                  <div>Teacher Students Page</div>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/teacher/assignments" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Layout>
                  <div>Teacher Assignments Page</div>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/teacher/announcements" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Layout>
                  <div>Teacher Announcements Page</div>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/teacher/quizzes" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Layout>
                  <div>Teacher Quizzes Page</div>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/teacher/live-classes" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Layout>
                  <div>Teacher Live Classes Page</div>
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/teacher/settings" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Layout>
                  <div>Teacher Settings Page</div>
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Profile route - accessible by both roles */}
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <Layout>
                  <div>Profile Page</div>
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Router>
      </CoursesProvider>
    </AuthProvider>
  );
}

export default App;