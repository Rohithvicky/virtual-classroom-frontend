// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    try {
      // Update the currentUser state
      setCurrentUser(user);
      console.log('Login successful:', user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    // Reset the currentUser state
    setCurrentUser(null);
    console.log('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { currentUser } = useAuth();

  console.log('ProtectedRoute - Current User:', currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};