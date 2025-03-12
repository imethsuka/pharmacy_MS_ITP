import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeOld from './pages/HomeOld';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Dashboard from "./Pages/Inventory/Dashboard";
import MedicineLists from "./Pages/Inventory/MedicineLists";
import MedicineGroups from "./Pages/Inventory/MedicineGroups";
import Reports from "./Pages/Inventory/Reports";
import Notifications from "./Pages/Inventory/Notifications";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    
    <Route path='/' element={<Dashboard />} />
    <Route path='/Pages/MedicineLists' element={<MedicineLists />} />
    <Route path='/Pages/MedicineGroups' element={<MedicineGroups />} />
    <Route path='/Pages/Reports' element={<Reports />} />
    <Route path='/Pages/Notifications' element={<Notifications />} />
  </Routes>
  );
};

export default App;
