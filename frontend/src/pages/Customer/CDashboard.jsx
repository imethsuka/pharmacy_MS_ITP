import React, { useState, useEffect } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { RiEdit2Line } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import HeaderStripe2 from "../../components/HeaderStripe2";
import AddCSidebar from "../../components/Customer/CustomerSidebar";
import UserLists from "./UserLists"; // Import UserLists component

const CMDashboardPage = () => {
  return (
    <div className="dashboard-container">
      <HeaderStripe2 />
      <div className="dashboard-content">
        <AddCSidebar />
        <div className="dashboard-main">
          <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Users</h1>
          {/* Instead of manually writing the table, use the UserLists component */}
          <UserLists />
        </div>
      </div>
    </div>
  );
};

export default CMDashboardPage;
