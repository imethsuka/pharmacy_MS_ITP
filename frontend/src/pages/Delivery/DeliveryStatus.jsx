import React from "react";
import "./DeliveryStatus.css";

const DeliveryStatus = () => {
  const deliveries = [
    { name: "Name", id: "D06ID232435454", date: "01.01.2025", status: "Not Yet Collected" },
    { name: "Name 1", id: "D06ID232435451", date: "01.01.2025", status: "Delivery in Progress" },
    { name: "Name 2", id: "D06ID232435452", date: "01.01.2025", status: "Delivery Completed" },
    { name: "Name 3", id: "D06ID232435450", date: "01.01.2025", status: "Not Yet Collected" },
    { name: "Name 4", id: "D06ID232435455", date: "01.01.2025", status: "Not Yet Collected" },
    { name: "Name 5", id: "D06ID232435456", date: "01.01.2025", status: "Delivery in Progress" },
    { name: "Name 6", id: "D06ID232435457", date: "01.01.2025", status: "Delivery Completed" },
    { name: "Name 7", id: "D06ID232435458", date: "01.01.2025", status: "Delivery Completed" },
  ];

  return (
    <div className="dashboard-container">
      <header className="topbar">
        <h2>Sethsiri Pharmacy - Deliveries</h2><br/>        <div className="user-profile">
          <span className="user-name">Hello, User</span>
          {/* <button className="logout-btn">Sign Out</button> */}
        </div>
      </header>
      <aside className="sidebar">
        <h2>Sethsiri Pharmacy</h2>
        <p>FedEx Delivery (Pvt) Ltd</p>
        <button className="dashboard-btn">Dashboard</button>
        <button className="history-btn">Delivery History</button>
      </aside>
      <main className="content">
        <table className="delivery-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Prescription ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr key={index}>
                <td>{delivery.name}</td>
                <td>{delivery.id}</td>
                <td>{delivery.date}</td>
                <td className={`status ${delivery.status.replace(/ /g, "-").toLowerCase()}`}>{delivery.status}</td>
                <td><button className="detail-btn">View Full Detail</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default DeliveryStatus;
