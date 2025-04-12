import React, { useState } from 'react';
import { FaUserCircle, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import '../styles/ProfileDropdown.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <FaUserCircle size={32} color="#374151" />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={handleEditProfile}>
            <FaEdit className="dropdown-icon" />
            <span>Edit Profile</span>
          </div>
          <div className="dropdown-item" onClick={handleLogout}>
            <FaSignOutAlt className="dropdown-icon" />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 