import React, { useState, useEffect } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import "../../styles/Customer/UserLists.css"; // Adjust the import for user list styles
import AddCSidebar from "../../components/Customer/CustomerSidebar";
import Sidebar from "../../components/Inventory/Sidebar"; // Sidebar is still relevant for user lists
import UsersTable from "../../components/Customer/UsersTable"; // Create a UsersTable component for displaying users
import Spinner from "../../components/Spinner";
import logo from '../../../public/Sethsiri_Favicon.svg';
import HeaderStripe from "../../components/HeaderStripe";

const UserLists = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/users') // Assuming your backend has a route for users
      .then((response) => {
        setUsers(response.data.data); // Update with the users data
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAddUser = () => {
    navigate('/Customer/addUsers'); // Navigate to addUsers page
  };

  return (
    <>
      {/* Top Bar */}
      <div className="dashboard-container">
         
         <main className="main-content">
        {/* Sidebar */}
        
        {/* <Sidebar /> */}
        
        {/* Main Content */}
        
          
        

          <div className="userShow-container">
            <div className="userShow-content">
              {/* View Toggle Buttons */}
              <div className="view-toggle">
                {/* You can implement toggle functionality for table/card view */}
              </div>

              {/* Content Section */}
              {loading ? (
                <Spinner />
              ) : showType === 'table' ? (
                <UsersTable users={users} /> // Display the users in a table format
              ) : (
                <div>Card View Content</div> // Placeholder for card view content
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserLists;
