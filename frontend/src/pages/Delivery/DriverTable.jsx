// import { Link } from "react-router-dom";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import React from "react";
// import "../../styles/Delivery/DriverDetails.css";
// import { FiInfo } from "react-icons/fi";
// import { RiEdit2Line } from "react-icons/ri";
// import { HiOutlineTrash } from "react-icons/hi";

// const DriverTable = ({ drivers }) => {

//   const downloadPDF = () => {
//     if (!drivers || drivers.length === 0) {
//       alert("No driver details available to generate the PDF.");
//       return;
//     }

//     const doc = new jsPDF({
//       orientation: "landscape",
//       unit: "mm",
//       format: "a3",
//     });

//     doc.setFontSize(14);
//     doc.text("Delivery Driver Details Table", 14, 15);

//     const columns = [
//       "No",
//       "Name",
//       "Phone Number",
//       "Vehicle Type",
//       "Email",
//       "License Number",
//       "Availability",
//     ];

//     const rows = drivers.map((driver, index) => [
//       index + 1,
//       driver.DName || "N/A",
//       driver.Phone || "N/A",
//       driver.VehicleType || "N/A",
//       driver.Email || "N/A",
//       driver.LicenseNumber || "N/A",
//       driver.Availability || "N/A",
//     ]);

//     autoTable(doc, {
//       head: [columns],
//       body: rows,
//       startY: 25,
//       theme: "grid",
//       styles: {
//         fontSize: 10,
//         cellPadding: 4,
//       },
//     });

//     doc.save("DriverDetails.pdf");
//   };

//   return (
//     <div className="Driver-large-container">
//       <h1 className="Driver-Title">Delivery Driver Details</h1>
//       <div className="Add-driver-button">
//         <Link to="/Delivery/AddDriver">
//           <button>Add Driver</button>
//         </Link>
//         <button onClick={downloadPDF} className="download-button-driver">
//           Download as PDF
//         </button>
//       </div>
//       <table className="Driver-table-start">
//         <thead>
//           <tr className="Driver-table-header">
//             <th>No</th>
//             <th>Name</th>
//             <th>Phone Number</th>
//             <th>Vehicle Type</th>
//             <th>Email</th>
//             <th>License Number</th>
//             <th>Availability</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {drivers.map((driver, index) => (
//             <tr key={driver._id}>
//               <td>{index + 1}</td>
//               <td>{driver.DName}</td>
//               <td>{driver.Phone}</td>
//               <td>{driver.VehicleType}</td>
//               <td>{driver.Email}</td>
//               <td>{driver.LicenseNumber}</td>
//               <td
//                 className={`${
//                   driver.Availability === "Available" ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {driver.Availability}
//               </td>
//               <td>
//                 <div className="actions">
//                   <Link to={`/delivery/editdriver/${driver._id}`}>
//                     <RiEdit2Line className="edit-icon" />
//                   </Link>
//                   <Link to={`/delivery/deletedriver/${driver._id}`}>
//                     <HiOutlineTrash className="delete-icon" />
//                   </Link>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DriverTable;
