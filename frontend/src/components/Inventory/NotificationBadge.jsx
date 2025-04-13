import React from 'react';
import { FaBell } from 'react-icons/fa';
import '../../styles/Inventory/NotificationBadge.css';

const NotificationBadge = ({ count }) => {
  return (
    <div className="notification-badge-container">
      <FaBell size={20} />
      {count > 0 && <span className="notification-count">{count}</span>}
    </div>
  );
};

export default NotificationBadge;