import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

const AdminHeaderStripe = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const headerStyle = {
    width: '100%',
    backgroundColor: '#1f2937',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const actionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid #4b5563',
    borderRadius: '0.375rem',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const logoImageStyle = {
    height: '40px',
    width: 'auto',
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <img src="/Sethsiri_Favicon.svg" alt="Logo" style={logoImageStyle} />
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Sethsiri Pharmacy</h1>
      </div>
      
      <div style={actionsStyle}>
        <Link to="/" style={buttonStyle}>
          <FaHome />
          Home
        </Link>
        <button onClick={handleSignOut} style={{ ...buttonStyle, borderColor: '#ef4444' }}>
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default AdminHeaderStripe;