// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error restoring authentication:', error);
        // Clear potentially corrupted auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (userData, token) => {
    try {
      console.log('Logging in with:', userData);
      
      // Save auth data to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update the user state
      setUser(userData);
      
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    // Clear the token and user state
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Calculate authentication status
  const isAuthenticated = user !== null;
  
  // Get role safely
  const role = user && user.role ? user.role : null;

  // For debugging
  console.log('Auth Context State:', { isAuthenticated, role, user });

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    role,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
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