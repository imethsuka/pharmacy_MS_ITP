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

      
    </div>
    
  );
};

export default DeliveryStatus;
