import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { CoursesProvider } from './contexts/CoursesContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Courses from './pages/Courses';
import Assignments from './pages/Assignments';
import Discussion from './pages/Discussion';
import LiveQuizzes from './pages/LiveQuizzes';
import LiveClasses from './pages/LiveClasses';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <CoursesProvider>
        <Router>
          <Routes>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Student Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <Courses />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/assignments"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <Assignments />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/discussion"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <Discussion />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/live-quizzes"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Layout>
                    <LiveQuizzes />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Shared Protected Routes */}
            <Route
              path="/live-classes"
              element={
                <ProtectedRoute allowedRoles={['student', 'teacher']}>
                  <Layout>
                    <LiveClasses />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['student', 'teacher']}>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Teacher Protected Route */}
            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <Layout>
                    <TeacherDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CoursesProvider>
    </AuthProvider>
  );
}

export default App;
