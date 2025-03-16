import React, { useState, useEffect } from "react";
import { FaSearch, FaSignOutAlt, FaCapsules, FaExclamationTriangle } from "react-icons/fa";
import "../../styles/Inventory/Dashboard.css"; // Import the external CSS file
import SidebarCustomer from "../../components/Customer/SidebarCustomer"; // Import SidebarCustomer
import logo from '/Sethsiri_Favicon.svg'; // Fix the import path for the logo
import axios from 'axios';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5555")
      .then(result => setUsers(result.data))
      .catch(err => {
        console.log(err);
        setError("Failed to fetch users. Please try again.");
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5555/deleteUser/${id}`)
      .then(result => {
        console.log(result);
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => {
        console.log(err);
        setError("Failed to delete user. Please try again.");
      });
  }

  const Dashboard = () => {
    return (
      <>
        {/* Top Bar */}
        <div className="top-bar">
          <div className="brand-section">
            <img src={logo} alt="Sethsiri Logo" width="80" />
            <h2 className="brand-title">Sethsiri Pharmacy</h2>
          </div>
          <div className="centered-search-box">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="right-side">
            <button className="signout-btn">
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
  
        <div className="dashboard-container">
          {/* Sidebar */}
          <SidebarCustomer/>
  
          {/* Main Content */}
          <main className="main-content">
            {/* Dashboard Summary */}
            <h2 className="dashboard-title">Customer Manager Dashboard</h2>
            <p className="dashboard-subtitle">A quick data overview of the customers.</p>
  
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-4xl w-full bg-white bg-opacity-95 border border-blue-500 rounded-2xl shadow-xl overflow-hidden'
              >
                <div className='p-8'>
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text'>
                      Users
                    </h2>
                    <Link to="/create" className="btn btn-success">Create User</Link>
                  </div>

                  {error && (
                    <div className='mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded'>
                      {error}
                    </div>
                  )}

                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Id</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{user.name}</td>
                          <td className="px-4 py-2">{user.email}</td>
                          <td className="px-4 py-2">
                            <Link to={`/update/${user._id}`} className="btn btn-success mr-2">Update</Link>
                            <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
        
          </main>
        </div>
      </>
    );
  };

  return <Dashboard />;
}

export default Users;