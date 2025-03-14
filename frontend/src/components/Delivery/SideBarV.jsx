import React from "react";
import "../../Styles/Delivery/SideBarV.css"; 
import { FaRegClipboard } from "react-icons/fa"; // Importing an icon for Dashboard

const Sidebar = () => {
  return (
    <div className="sidebarV">
      <div className="profile-section">
        <img src="user-avatar.png" alt="User" className="avatar" />
        <div className="profile-info"><br /><br /><br /><br /><br />
          <p className="company-name">FedEx Delivery (Pvt) Ltd</p>
          <p className="role">Delivery Company</p>
        </div>
      </div>

      <div className="nav-items">
        <div className="nav-item active">
          <FaRegClipboard className="icon" />
          <span>Dashboard</span>
        </div><br/>
        <div className="nav-item active">
          <FaRegClipboard className="icon" />
          <span>History</span>
        </div><br/>
        <div className="nav-item active">
          <FaRegClipboard className="icon" />
          <span>Driver Form</span>
        </div>
      </div>

      <div className="footer">
        <p>Powered by ITP 2025</p>
        <p>v 1.1.2</p>
      </div>
    </div>
  );
};

export default SideBarV;
