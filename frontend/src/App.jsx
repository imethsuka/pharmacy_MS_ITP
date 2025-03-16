import React from 'react';
import {Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeOld from './pages/HomeOld';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

// Import Inventory Pages
import Dashboard from './pages/Inventory/Dashboard';
import MedicineLists from './pages/Inventory/MedicineLists';
import MedicineGroups from './pages/Inventory/MedicineGroups';
import Reports from './pages/Inventory/Reports';
import Notifications from './pages/Inventory/Notifications';

//medicines
import AddMedicines from './pages/Inventory/addMedicines';

//import Customer pages
import SignUpPage from "./pages/Customer/SignUpPage";
import LoginPage from "./pages/Customer/LoginPage";
import EmailVerificationPage from "./pages/Customer/EmailVerificationPage";
import DashboardPage from "./pages/Customer/DashboardPage";
import ForgotPasswordPage from "./pages/Customer/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Customer/ResetPasswordPage";
import CusDashboard from './pages/Customer/DashboardCustomer';

import LoadingSpinner from "./components/Customer/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

//cutomer authentication
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
      
      <Route path='/inventory/addMedicines' element={<AddMedicines />} />

      <Route path='/inventory/medicinegroups' element={<MedicineGroups />} />
      <Route path='/inventory/reports' element={<Reports />} />
      <Route path='/inventory/notifications' element={<Notifications />} />

      {/* Customer Pages */}  
      <Route path='/customerdashboard' element={<CusDashboard />} />
      <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
      <Route path='/signup' element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
      <Route path='/verify-email' element={<EmailVerificationPage />} />  
      <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path='/forgot-password' element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
      <Route path='/reset-password' element={<ResetPasswordPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default App;