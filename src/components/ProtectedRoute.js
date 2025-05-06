import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if the user's role is not allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === 'teacher' ? '/teacher-dashboard' : '/'} replace />;
  }

  // Render the children if the user is authorized
  return children;
};

export default ProtectedRoute;