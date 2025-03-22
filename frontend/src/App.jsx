import React from 'react';
import {Navigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeOld from './pages/HomeOld';
import Categories from './pages/Categories';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';




// Import Delivery Pages
import DeliveryStatus from './pages/Delivery/DeliveryStatus';
import FeedbackForm from './pages/Delivery/FeedbackForm'; 
import DeliveryHistory from './pages/Delivery/DeliveryHistory';
import DriverForm from './pages/Delivery/DriverForm';
import DriverDetails from './pages/Delivery/DriverDetails';
import AddDriver from './pages/Delivery/AddDriver';
import EditDriver from './pages/Delivery/EditDriver';
import DeleteDriver from './pages/Delivery/DeleteDriver';


// Import Inventory Pages
import Dashboard from './pages/Inventory/Dashboard';
import MedicineLists from './pages/Inventory/MedicineLists';
import MedicineGroups from './pages/Inventory/MedicineGroups';
import Reports from './pages/Inventory/Reports';
import Notifications from './pages/Inventory/Notifications';

//medicines
import AddMedicines from './pages/Inventory/addMedicines';
import ShowMedicines from './pages/Inventory/showMedicines';
import EditMedicine from './pages/Inventory/EditMedicine';
import DeleteMedicine from './pages/Inventory/DeleteMedicine';

//Pharmasist
import PDashboard from './pages/Prescription/PDashboard.jsx';
import Prescriptions from './pages/Prescription/Prescriptions.jsx';
import Verified from './pages/Prescription/Verified.jsx';
import Rejected from './pages/Prescription/Rejected.jsx';
import Pending from './pages/Prescription/Pending.jsx';


//import Customer pages
import SignUpPage from "./pages/Customer/SignUpPage";
import LoginPage from "./pages/Customer/LoginPage";

import DashboardPage from "./pages/Customer/DashboardPage";
import ForgotPasswordPage from "./pages/Customer/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Customer/ResetPasswordPage";
import CusDashboard from './pages/Customer/DashboardCustomer';


import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Users from './pages/Customer/getuser/User';
import Add from './pages/Customer/adduser/Add';
import Edit from './pages/Customer/updateuser/Edit';


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


//order

import Product from './pages/Order/Product';
import ProductList from './pages/Order/ProductList';
import Cart from './pages/Order/Cart';



const App = () => {
  return (

    <>
  

    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/books/create' element={<CreateBook />} />


      {/* <Route path='/books/create' element={<CreateBook />} />

      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} /> */}

    

      {/* Inventory Pages */}
      <Route path='/inventory/dashboard' element={<Dashboard />} />

      <Route path='/inventory/medicinelists' element={<MedicineLists />} />
      
      <Route path='/inventory/addMedicines' element={<AddMedicines />} />
      <Route path='/inventory/showMedicines/:id' element={<ShowMedicines />} />
      <Route path='/inventory/EditMedicine/:id'element={<EditMedicine />} />
      <Route path='/inventory/DeleteMedicine/:id' element={<DeleteMedicine />} />

      <Route path='/inventory/medicinegroups' element={<MedicineGroups />} />
      <Route path='/inventory/reports' element={<Reports />} />
      <Route path='/inventory/notifications' element={<Notifications />} />


      {/* Order */}
      <Route path='/order/product/:id' element={<Product />} />
      <Route path='/order/products' element={<ProductList />} />
      <Route path='/order/cart' element={<Cart />} />

      <Route path='/Prescription/pdashboard' element={<PDashboard />} />
      <Route path='/Prescription/prescriptions' element={<Prescriptions />} />
      <Route path='/Prescription/pending' element={<Pending />} />
      <Route path='/Prescription/verified' element={<Verified />} />
      <Route path='/Prescription/rejected' element={<Rejected />} />





      {/* Customer Pages */}  
      <Route path='/customerdashboard' element={<CusDashboard />} />
      <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
      <Route path='/signup' element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
        
      <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path='/forgot-password' element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
      <Route path='/reset-password' element={<ResetPasswordPage />} />
      <Route path='*' element={<Navigate to='/' />} />
      <Route path="/users" element={<Users />} />
      <Route path="/add" element={<Add/>} />
      <Route path="/edit/:id" element={<Edit/>} />




      {/* Delivery Pages */}
      <Route path='/delivery/deliverystatus' element={<DeliveryStatus />} />
      <Route path='/delivery/feedbackform' element={<FeedbackForm />} />
      <Route path='/delivery/deliveryhistory' element={<DeliveryHistory />} />
      <Route path='/delivery/driverform' element={<DriverForm />} /> 
      <Route path='/delivery/driverdetails' element={<DriverDetails />} />
      <Route path='/delivery/adddriver' element={<AddDriver />} />
      <Route path='/delivery/editdriver/:id' element={<EditDriver />} />
      <Route path='/delivery/deletedriver/:id' element={<DeleteDriver />} />
      


    </Routes>
    </>

  );
};

export default App;