import React from "react";
import "../../styles/Delivery/DeliveryStatus.css";
import NavBarV from "../../components/Delivery/NavBarV";
import SideBarV from "../../components/Delivery/SideBarV";

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
    <div className="delivery-dashboard">
       <NavBarV />
  
       <div>
         <SideBarV />
       
       </div>
      <div className="delivery-user-profile">
          <h2 className="delivery-title">Sethsiri Pharmacy - Deliveries</h2>
        </div>
      

      {/* <NavBarV /> */}
      <SideBarV />

      <main className="delivery-content">
        <table className="delivery-table">
          <thead>
            <tr>
              <th className="delivery-table-header">Customer Name</th>
              <th className="delivery-table-header">Prescription ID</th>
              <th className="delivery-table-header">Order Date</th>
              <th className="delivery-table-header">Status</th>
              <th className="delivery-table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr key={index}>
                <td className="delivery-table-data">{delivery.name}</td>
                <td className="delivery-table-data">{delivery.id}</td>
                <td className="delivery-table-data">{delivery.date}</td>
                <td className={`delivery-status status-${delivery.status.replace(/ /g, "-").toLowerCase()}`}>

                  {delivery.status}
                </td>
                <td className="delivery-table-data">
                  <button className="delivery-detail-btn">View Full Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main> 
    </div>
    
  );
};

export default DeliveryStatus;
