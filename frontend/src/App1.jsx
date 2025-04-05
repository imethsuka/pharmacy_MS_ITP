import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersList from "./pages/admin/UsersList"; // Adjust path based on your structure
import AddUser from "./pages/admin/AddUser"; // Adjust path based on your structure

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/admin/users/add" element={<AddUser />} />
    </Routes>
  );
};

export default App;
