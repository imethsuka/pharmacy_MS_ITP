import React from 'react';
import { Routes, Route } from 'react-router-dom';
//  import Home from './pages/Home';
import HomeOld from './pages/HomeOld';

// import CreateBook from './pages/CreateBooks';
// import ShowBook from './pages/ShowBook';
// import EditBook from './pages/EditBook';
// import DeleteBook from './pages/DeleteBook';

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


const App = () => {
  return (

    <>
  

    <Routes>
      <Route path='/' element={<HomeOld/>} />
      {/* <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} /> */}

      {/* Inventory Pages */}
      <Route path='/inventory/dashboard' element={<Dashboard />} />
      <Route path='/inventory/medicinelists' element={<MedicineLists />} /> 
      <Route path='/inventory/medicinegroups' element={<MedicineGroups />} /> 
      <Route path='/inventory/reports' element={<Reports />} /> 
      <Route path='/inventory/notifications' element={<Notifications />} />

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