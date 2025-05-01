// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetails'; // Correct file name
import Assignments from './pages/Assignments';
import Settings from './pages/Settings';
import Discussion from './pages/Discussion'; // Import the Discussion page
import LiveQuizzes from './pages/LiveQuizzes'; // Import the LiveQuizzes page
import Profile from './pages/Profile'; // Import the Profile page
import Announcements from './pages/Announcements'; // Import the Announcements page
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CourseDetails from './pages/CourseDetails'; // Import the CourseDetails component
import ContinueLearning from './pages/ContinueLearning'; // Import the ContinueLearning component
import { CoursesProvider } from './contexts/CoursesContext';
import LiveClasses from './pages/LiveClasses'; // Import the LiveClasses page
import TeacherDashboard from './pages/TeacherDashboard'; // Import the TeacherDashboard page

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light', // Set the mode to light permanently
      primary: {
        main: '#3a86ff', // Vibrant blue
        light: '#8fb8ff',
        dark: '#0057cc',
      },
      secondary: {
        main: '#ff6b6b', // Coral accent
        light: '#ff9e9e',
        dark: '#c73e3e',
      },
      background: {
        default: '#f7fafc', // Light gray background
        paper: '#ffffff', // White for cards and drawers
      },
      success: {
        main: '#4caf50', // Green for success
      },
      error: {
        main: '#f44336', // Red for errors
      },
      text: {
        primary: '#2d3748', // Dark gray for text
        secondary: '#718096', // Light gray for secondary text
      },
    },
    typography: {
      fontFamily: [
        'Poppins', // Modern font
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
            borderRadius: '8px', // Rounded buttons
            textTransform: 'none', // Disable uppercase text
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px', // Rounded cards
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
          },
        },
      },
    },
  });

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CoursesProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
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
              } /> {/* Add the Settings route */}
              <Route path="/discussion" element={
                <ProtectedRoute>
                  <Layout>
                    <Discussion />
                  </Layout>
                </ProtectedRoute>
              } /> {/* Add the Discussion route */}
              <Route path="/live-quizzes" element={
                <ProtectedRoute>
                  <Layout>
                    <LiveQuizzes />
                  </Layout>
                </ProtectedRoute>
              } /> {/* Add the Live Quizzes route */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              } /> {/* Add the Profile route */}
              <Route path="/announcements" element={
                <ProtectedRoute>
                  <Layout>
                    <Announcements />
                  </Layout>
                </ProtectedRoute>
              } /> {/* Add the Announcements route */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/course/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <CourseDetails />
                  </Layout>
                </ProtectedRoute>
              } /> {/* Add this route */}
              <Route path="/course/:id/continue" element={
                <ProtectedRoute>
                  <Layout>
                    <ContinueLearning />
                  </Layout>
                </ProtectedRoute>
              } /> {/* Add this route */}
              <Route path="/live-classes" element={
                <ProtectedRoute>
                  <Layout>
                    <LiveClasses />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/teacher-dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <TeacherDashboard />
                  </Layout>
                </ProtectedRoute>
              } /> {/* Add the Teacher Dashboard route */}
            </Routes>
          </Router>
        </CoursesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;