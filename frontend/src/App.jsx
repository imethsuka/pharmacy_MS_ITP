import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeOld from './pages/HomeOld';
import Categories from './pages/Categories';
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
import ShowMedicines from './pages/Inventory/showMedicines';

//Pharmasist
import PDashboard from './pages/Prescription/PDashboard.jsx';
import Prescriptions from './pages/Prescription/Prescriptions.jsx';
import Verified from './pages/Prescription/Verified.jsx';
import Rejected from './pages/Prescription/Rejected.jsx';
import Pending from './pages/Prescription/Pending.jsx';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />

    

      {/* Inventory Pages */}
      <Route path='/inventory/dashboard' element={<Dashboard />} />
      <Route path='/inventory/medicinelists' element={<MedicineLists />} />
      
      <Route path='/inventory/addMedicines' element={<AddMedicines />} />
      <Route path='/inventory/showMedicines/:id' element={<ShowMedicines />} />

      <Route path='/inventory/medicinegroups' element={<MedicineGroups />} />
      <Route path='/inventory/reports' element={<Reports />} />
      <Route path='/inventory/notifications' element={<Notifications />} />

      <Route path='/Prescription/pdashboard' element={<PDashboard />} />
      <Route path='/Prescription/prescriptions' element={<Prescriptions />} />
      <Route path='/Prescription/pending' element={<Pending />} />
      <Route path='/Prescription/verified' element={<Verified />} />
      <Route path='/Prescription/rejected' element={<Rejected />} />



    </Routes>
  );
};

export default App;