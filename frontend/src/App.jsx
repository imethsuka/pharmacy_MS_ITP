import React from 'react';
import {Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeOld from './pages/HomeOld';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import FloatingShape from "./components/FloatingShape";
// Import Inventory Pages
import Dashboard from './pages/Inventory/Dashboard';
import MedicineLists from './pages/Inventory/MedicineLists';
import MedicineGroups from './pages/Inventory/MedicineGroups';
import Reports from './pages/Inventory/Reports';
import Notifications from './pages/Inventory/Notifications';

//Import Customer pages
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
      return <Navigate to='/verify-email' replace />;
  }

  return children;
};
// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
      return <Navigate to='/' replace />;
  }

  return children;
};



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />

      {/* Inventory Pages */}
      <Route path='/inventory/dashboard' element={<Dashboard />} />
      <Route path='/inventory/medicinelists' element={<MedicineLists />} />
      <Route path='/inventory/medicinegroups' element={<MedicineGroups />} />
      <Route path='/inventory/reports' element={<Reports />} />
      <Route path='/inventory/notifications' element={<Notifications />} />


    </Routes>
  );
};
function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
      checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
      <div
          className='min-h-screen bg-white flex items-center justify-center relative overflow-hidden'
      >
          <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
          <FloatingShape color='bg-blue-400' size='w-48 h-48' top='70%' left='80%' delay={5} />
          <FloatingShape color='bg-blue-300' size='w-32 h-32' top='40%' left='-10%' delay={2} />

          <Routes>
              <Route
                  path='/'
                  element={
                      <ProtectedRoute>
                          <DashboardPage />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path='/signup'
                  element={
                      <RedirectAuthenticatedUser>
                          <SignUpPage />
                      </RedirectAuthenticatedUser>
                  }
              />
              <Route
                  path='/login'
                  element={
                      <RedirectAuthenticatedUser>
                          <LoginPage />
                      </RedirectAuthenticatedUser>
                  }
              />
              <Route path='/verify-email' element={<EmailVerificationPage />} />
              <Route
                  path='/forgot-password'
                  element={
                      <RedirectAuthenticatedUser>
                          <ForgotPasswordPage />
                      </RedirectAuthenticatedUser>
                  }
              />

              <Route
                  path='/reset-password/:token'
                  element={
                      <RedirectAuthenticatedUser>
                          <ResetPasswordPage />
                      </RedirectAuthenticatedUser>
                  }
              />
              {/* catch all routes */}
              <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          <Toaster />
      </div>
  );
}

export default App;