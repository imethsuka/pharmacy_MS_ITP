import React from "react";
import "../../styles/Delivery/DeliveryHistory.css"; // External CSS
import NavBar from "../../components/Delivery/NavBar";
import SideBarV from "../../components/Delivery/SideBarV";

const DeliveryHistory = () => {
  const deliveries = [
    { id: 1, customer: "Alice Johnson", date: "2025-03-12", status: "Delivered" },
    { id: 2, customer: "Bob Smith", date: "2025-03-11", status: "Pending" },
    { id: 3, customer: "Charlie Brown", date: "2025-03-10", status: "Cancelled" }
  ];

  return (
    <div className="delivery-history-wrapper">
      <SideBarV />
      <div className="content-container">
        <NavBar />
        <div className="delivery-history-container">
          <h2 className="title">Delivery History</h2>
          <table className="delivery-history-table">
            <thead>
              <tr className="History-table-content">
                <th className="History-header">ID</th>
                <th className="History-header">Customer</th>
                <th className="History-header">Date</th>
                <th className="History-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className={`History-table-content ${delivery.status.toLowerCase()}`}>
                  <td className="History-data">{delivery.id}</td>
                  <td className="History-data">{delivery.customer}</td>
                  <td className="History-data">{delivery.date}</td>
                  <td className="History-data">{delivery.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHistory;