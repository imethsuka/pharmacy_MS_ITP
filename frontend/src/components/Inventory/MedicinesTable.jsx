import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { RiEdit2Line } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Correct import
import "../../styles/Inventory/MedicinesTable.css";

const MedicinesTable = ({ medicines, onMoreInfoClick }) => {
  const downloadPDF = () => {
    if (!medicines || medicines.length === 0) {
      alert("No medicines available to generate the PDF.");
      return;
    }
  
    const doc = new jsPDF();
  
    // Add title
    doc.text("Medicines Table", 14, 10);
  
    // Define table columns
    const columns = [
      "No",
      "Name",
      "Product ID",
      "Category",
      "Price",
      "Stock",
      "Reorder Level",
      "Batch Expiry",
      "Prescription",
      "Supplier",
    ];
  
    // Map medicines data to rows with safe default values
    const rows = medicines.map((medicine, index) => [
      index + 1,
      medicine.name || "N/A",
      medicine.productId || "N/A",
      medicine.category || "N/A",
      `Rs. ${medicine.price || "0.00"}`,
      medicine.stock || "0",
      medicine.reorderLevel || "N/A",
      medicine.batchExpiry ? medicine.batchExpiry : "N/A",
      medicine.requiresPrescription ? "Yes" : "No",
      medicine.supplierEmail || "N/A",
    ]);

    if (rows.length === 0) {
      console.error("No valid data to generate the PDF.");
      return;
    }
  
    // Add table to PDF
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
    });
  
    // Save the PDF
    doc.save("MedicinesTable.pdf");
  };
  

  return (
    <div className="table-container">
      <button onClick={downloadPDF} className="download-button">
        Download as PDF
      </button>
      <table className="medicines-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th className="hide-on-mobile">Product ID</th>
            <th className="hide-on-mobile">Category</th>
            <th className="hide-on-mobile">Price</th>
            <th className="hide-on-mobile">Stock</th>
            <th className="hide-on-mobile">Reorder</th>
            <th className="hide-on-mobile">Batch Expiry</th>
            <th className="hide-on-mobile">Prescription</th>
            <th className="hide-on-mobile">Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={medicine._id}>
              <td>{index + 1}</td>
              <td>{medicine.name}</td>
              <td className="hide-on-mobile">{medicine.productId}</td>
              <td className="hide-on-mobile">{medicine.category}</td>
              <td className="hide-on-mobile price">Rs. {medicine.price}</td>
              <td className="hide-on-mobile stock">{medicine.stock}</td>
              <td className="hide-on-mobile">{medicine.reorderLevel}</td>
              <td className="hide-on-mobile">{medicine.batchExpiry}</td>
              <td className="hide-on-mobile">
                {medicine.requiresPrescription ? "Yes" : "No"}
              </td>
              <td className="hide-on-mobile">{medicine.supplierEmail}</td>
              <td>
                <div className="actions">
                  <button onClick={() => onMoreInfoClick(medicine)}>
                    <FiInfo className="info-icon" />
                  </button>
                  <Link to={`/inventory/EditMedicine/${medicine._id}`}>
                    <RiEdit2Line className="edit-icon" />
                  </Link>
                  <Link to={`/inventory/DeleteMedicine/${medicine._id}`}>
                    <HiOutlineTrash className="delete-icon" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicinesTable;
