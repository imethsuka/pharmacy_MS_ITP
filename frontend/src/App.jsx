import React, { useEffect, useContext } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";
import './App.css';

// Home page
import Home from './pages/Home';
import HomeOld from './pages/HomeOld';
import Categories from './pages/Categories';

// Import Delivery Pages
import DeliveryStatus from './pages/Delivery/DeliveryStatus';
import FeedbackForm from './pages/Delivery/FeedbackForm';
import DeliveryHistory from './pages/Delivery/DeliveryHistory';
import DriverForm from './pages/Delivery/DriverForm';
import DriverDetails from './pages/Delivery/DriverDetails';
import AddDriver from './pages/Delivery/AddDriver';
import EditDriver from './pages/Delivery/EditDriver';
import DeleteDriver from './pages/Delivery/DeleteDriver';
import DriverProfile from './pages/Delivery/DriverProfile';

// Import Inventory Pages
import Dashboard from './pages/Inventory/Dashboard';
import MedicineLists from './pages/Inventory/MedicineLists';
import MedicineGroups from './pages/Inventory/MedicineGroups';
import Reports from './pages/Inventory/Reports';
import Notifications from './pages/Inventory/Notifications';

// Medicines
import AddMedicines from './pages/Inventory/addMedicines';
import ShowMedicines from './pages/Inventory/showMedicines';
import EditMedicine from './pages/Inventory/EditMedicine';
import DeleteMedicine from './pages/Inventory/DeleteMedicine';

// Pharmacist
import PDashboard from './pages/Prescription/PDashboard.jsx';
import Prescriptions from './pages/Prescription/Prescriptions.jsx';
import Verified from './pages/Prescription/Verified.jsx';
import Rejected from './pages/Prescription/Rejected.jsx';
import Pending from './pages/Prescription/Pending.jsx';
import PrescriptionUploadForm from './pages/Prescription/PrescriptionUploadForm.jsx';
import PrescriptionDetails from './pages/Prescription/PrescriptionDetails.jsx';

// Import Customer pages
import SignUpPage from "./pages/Customer/SignUpPage";
import LoginPage from "./pages/Customer/LoginPage";
import DashboardPage from "./pages/Customer/DashboardPage";
import ForgotPasswordPage from "./pages/Customer/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Customer/ResetPasswordPage";
// Removing the problematic import:
// import CusDashboard from './pages/Customer/DashboardCustomer';
import Users from './pages/Customer/getuser/User';
import Add from './pages/Customer/adduser/Add';
import Edit from './pages/Customer/updateuser/Edit';

// Admin User Management
import UsersList from './pages/Admin/UsersList';
import AddUser from './pages/Admin/AddUser';
import EditUser from './pages/Admin/EditUser';

// Order
import Product from './pages/Order/Product';
import ProductList from './pages/Order/ProductList';
import CheckoutPage from './pages/Order/CheckoutPage';
import Cart from './pages/Order/Cart';
import OrderConfirmation from './pages/Order/OrderConfirmation';
import OrderHistory from './pages/Order/OrderHistory';

// Import Route Protection Components
import { 
  ProtectedRoute,
  AdminRoute,
  PharmacistRoute,
  ManagerRoute,
  DriverRoute,
  CustomerRoute
} from './components/RouteProtection';

const App = () => {
  // Check auth status on app load
  const { checkAuth } = useContext(AuthContext);
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route path='/order/product/:id' element={<Product />} />
        <Route path='/order/products' element={<ProductList />} />
        <Route path='/inventory/medicines/details/:id' element={<ShowMedicines />} />

        {/* Admin Routes */}
        <Route path='/admin/users' element={
          <AdminRoute>
            <UsersList />
          </AdminRoute>
        } />
        <Route path='/admin/users/add' element={
          <AdminRoute>
            <AddUser />
          </AdminRoute>
        } />
        <Route path='/admin/users/edit/:id' element={
          <AdminRoute>
            <EditUser />
          </AdminRoute>
        } />

        {/* Inventory Pages - Manager Only */}
        <Route path='/inventory/dashboard' element={
          <ManagerRoute>
            <Dashboard />
          </ManagerRoute>
        } />
        <Route path='/inventory/MedicineLists' element={
          <ManagerRoute>
            <MedicineLists />
          </ManagerRoute>
        } />
        <Route path='/inventory/medicine-groups' element={
          <ManagerRoute>
            <MedicineGroups />
          </ManagerRoute>
        } />
        <Route path='/inventory/reports' element={
          <ManagerRoute>
            <Reports />
          </ManagerRoute>
        } />
        <Route path='/inventory/notifications' element={
          <ManagerRoute>
            <Notifications />
          </ManagerRoute>
        } />

        {/* Medicine CRUD Routes - Manager Only */}
        <Route path='/inventory/medicines/create' element={
          <ManagerRoute>
            <AddMedicines />
          </ManagerRoute>
        } />
        <Route path='/inventory/medicines/details/:id' element={<ShowMedicines />} />
        <Route path='/inventory/medicines/edit/:id' element={
          <ManagerRoute>
            <EditMedicine />
          </ManagerRoute>
        } />
        <Route path='/inventory/medicines/delete/:id' element={
          <ManagerRoute>
            <DeleteMedicine />
          </ManagerRoute>
        } />

        {/* Pharmacist Routes - Pharmacist Only */}
        <Route path='/prescription/PDashboard' element={
          <PharmacistRoute>
            <PDashboard />
          </PharmacistRoute>
        } />
        <Route path='/prescription/prescriptions' element={
          <PharmacistRoute>
            <Prescriptions />
          </PharmacistRoute>
        } />
        <Route path='/prescription/verified' element={
          <PharmacistRoute>
            <Verified />
          </PharmacistRoute>
        } />
        <Route path='/prescription/rejected' element={
          <PharmacistRoute>
            <Rejected />
          </PharmacistRoute>
        } />
        <Route path='/prescription/pending' element={
          <PharmacistRoute>
            <Pending />
          </PharmacistRoute>
        } />
        <Route path='/prescription/upload' element={
          <ProtectedRoute>
            <PrescriptionUploadForm />
          </ProtectedRoute>
        } />
        <Route path='/prescription/prescriptiondetails/:id' element={
          <PharmacistRoute>
            <PrescriptionDetails />
          </PharmacistRoute>
        } />

        {/* Customer Routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path='/customer/users' element={<Users />} />
        <Route path='/customer/add' element={<Add />} />
        <Route path='/customer/edit/:id' element={<Edit />} />

        {/* Delivery Routes - Driver Only */}
        <Route path='/delivery/DeliveryStatus' element={
          <DriverRoute>
            <DeliveryStatus />
          </DriverRoute>
        } />
        <Route path='/delivery/feedback' element={<FeedbackForm />} />
        <Route path='/delivery/DeliveryHistory' element={
          <DriverRoute>
            <DeliveryHistory />
          </DriverRoute>
        } />
        <Route path='/delivery/driver-form' element={<DriverForm />} />
        <Route path='/delivery/DriverDetails' element={
          <DriverRoute>
            <DriverDetails />
          </DriverRoute>
        } />
        <Route path='/delivery/add-driver' element={
          <AdminRoute>
            <AddDriver />
          </AdminRoute>
        } />
        <Route path='/delivery/edit-driver/:id' element={
          <AdminRoute>
            <EditDriver />
          </AdminRoute>
        } />
        <Route path='/delivery/delete-driver/:id' element={
          <AdminRoute>
            <DeleteDriver />
          </AdminRoute>
        } />
        <Route path='/delivery/driver-profile/:id' element={
          <DriverRoute>
            <DriverProfile />
          </DriverRoute>
        } />

        {/* Order Routes - Customer or Protected */}
        <Route path='/order/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path='/order/checkout' element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path='/order/confirmation/:id' element={
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        } />
        <Route path='/order/history' element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default App;