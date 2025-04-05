import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Protected route component that requires authentication
export const ProtectedRoute = ({ children, allowedRoles = null }) => {
  try {
    const userInfoString = localStorage.getItem('userInfo');
    
    if (!userInfoString) {
      toast.error('Please login to access this page');
      return <Navigate to="/login" replace />;
    }
    
    const userInfo = JSON.parse(userInfoString);
    
    // Check if token exists
    if (!userInfo || !userInfo.token) {
      toast.error('Session expired. Please login again');
      localStorage.removeItem('userInfo');
      return <Navigate to="/login" replace />;
    }
    
    // If role restriction is specified, check if user has required role
    if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
      toast.error('You do not have permission to access this page');
      return <Navigate to="/" replace />;
    }
    
    return children;
  } catch (error) {
    console.error('Authentication error:', error);
    localStorage.removeItem('userInfo');
    return <Navigate to="/login" replace />;
  }
};

// Admin-only route - NO PROTECTION FOR DEVELOPMENT
export const AdminRoute = ({ children }) => {
  // Return children directly without protection
  return children;
};

// Pharmacist-only route
export const PharmacistRoute = ({ children }) => {
  return <ProtectedRoute allowedRoles={['pharmacist', 'admin']}>{children}</ProtectedRoute>;
};

// Manager-only route
export const ManagerRoute = ({ children }) => {
  return <ProtectedRoute allowedRoles={['manager', 'admin']}>{children}</ProtectedRoute>;
};

// Driver-only route
export const DriverRoute = ({ children }) => {
  return <ProtectedRoute allowedRoles={['driver', 'admin']}>{children}</ProtectedRoute>;
};

// Customer-only route
export const CustomerRoute = ({ children }) => {
  return <ProtectedRoute allowedRoles={['customer', 'admin']}>{children}</ProtectedRoute>;
};