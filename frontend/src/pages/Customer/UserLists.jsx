import React, { useState, useEffect } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import "../../styles/Customer/UserLists.css"; // Import the external CSS file
import CSidebar from "../../components/Customer/CustomerSidebar";
import UsersTable from "../../components/Customer/UsersTable";
import Spinner from "../../components/Spinner";
import logo from '../../../public/Sethsiri_Favicon.svg';

const UsersLists = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/users')
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAddUser= () => {
    navigate('/Customer/addUsers'); // Navigate to addMedicines page
  };

  return (
    <>
    

      <div className="dashboard-container">
        {/* Sidebar */}
        <CSidebar />
        {/* <Sidebar /> */}

        {/* Main Content */}
        <main className="main-content">
          <div className="top-left">
            <button className="add-user-btn" onClick={handleAddUser}>
              Add User
            </button>
          </div>
          <h2 className="dashboard-title">User Lists</h2>
          <p className="dashboard-subtitle">A detailed list of all users.</p>

          <div className="userShow-container">
            <div className="userShow-content">
              {/* View Toggle Buttons */}
              <div className="view-toggle">
                
              </div>

              {/* Content Section */}
              {loading ? (
                <Spinner />
              ) : showType === 'table' ? (
                <UsersTable users={users} />
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

export default UsersLists;
