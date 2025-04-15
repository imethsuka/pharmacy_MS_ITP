import { Link } from "react-router-dom";
import { FiInfo, FiCheckCircle } from "react-icons/fi";
import { RiEdit2Line } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Correct import
import "../../styles/Inventory/MedicinesTable.css";
import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import axios from "axios";

const MedicinesTable = ({ medicines, onMoreInfoClick }) => {
  const [reorderedMedicines, setReorderedMedicines] = useState([]);

  // Fetch medicines with reorder emails sent
  useEffect(() => {
    const fetchReorderStatus = async () => {
      try {
        const response = await axios.get('/api/reorders');
        // Filter reorders where email has been sent
        const emailSentReorders = response.data.filter(reorder => reorder.emailSent);
        // Extract medicine IDs
        const medicinesWithEmailSent = emailSentReorders.map(reorder => reorder.medicineId);
        setReorderedMedicines(medicinesWithEmailSent);
      } catch (error) {
        console.error('Error fetching reorder status:', error);
      }
    };

    fetchReorderStatus();
  }, []);

  useEffect(() => {
    medicines.forEach((medicine) => {
      if (medicine.productId) {
        const barcodeElement = document.querySelector(`#barcode-${medicine.productId}`);
  
        // Ensure barcode is applied only in <tbody> (not in <thead>)
        if (barcodeElement && barcodeElement.closest("tbody")) {
          JsBarcode(barcodeElement, medicine.productId, {
            format: "CODE128",
            displayValue: false,
            width: 2,
            height: 40,
          });
        }
      }
    });
  }, [medicines]);
  
  

  const downloadPDF = async () => {
    if (!medicines || medicines.length === 0) {
      alert("No medicines available to generate the PDF.");
      return;
    }
  
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
    });
  
    doc.setFontSize(14);
    doc.text("Medicines Table", 14, 15);
  
    // Define table columns
    const columns = [
      "No",
      "Name",
      "Product ID",
      "Barcode Reader",
      "Category",
      "Price",
      "Stock",
      "Reorder Level",
      "Batch Expiry",
      "Prescription",
      "Supplier",
    ];
  
    // Generate barcode images
    const barcodeImages = await Promise.all(
      medicines.map((medicine) => {
        return new Promise((resolve) => {
          if (!medicine.productId) {
            resolve(null);
            return;
          }
    
          const canvas = document.createElement("canvas");
          JsBarcode(canvas, medicine.productId, {
            format: "CODE128",
            displayValue: false,
            width: 2,
            height: 50,
          });
    
          const barcodeImage = canvas.toDataURL("image/png");
          console.log("Generated Barcode for:", medicine.productId, barcodeImage); // Debugging Line
          resolve(barcodeImage);
        });
      })
    );
    
  
    // Create table data, leaving barcode column empty
    const rows = medicines.map((medicine, index) => [
      index + 1,
      medicine.name || "N/A",
      medicine.productId || "N/A",
      "", // Placeholder for barcode image
      medicine.category || "N/A",
      `Rs. ${medicine.price || "0.00"}`,
      medicine.stock || "0",
      medicine.reorderLevel || "N/A",
      medicine.batchExpiry || "N/A",
      medicine.requiresPrescription ? "Yes" : "No",
      medicine.supplierEmail || "N/A",
    ]);
  
    // Add table to PDF
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 25,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      columnStyles: {
        3: { cellWidth: 60 }, // Wider column for barcode
      },
      
      didDrawCell: (data) => {
        if (data.column.index === 3) {
          const barcodeImage = barcodeImages[data.row.index];
      
          if (barcodeImage) {
            console.log(`Adding barcode for row ${data.row.index + 1}`); // Debugging Line
            doc.addImage(
              barcodeImage, 
              "PNG",
              data.cell.x + 10, // Adjusted position
              data.cell.y + 3, 
              40, // Width
              15  // Height
            );
          } else {
            console.log(`No barcode available for row ${data.row.index + 1}`); // Debugging Line
          }
        }
      }
      
    });
  
    // Save PDF
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
            <th className="hide-on-mobile">Barcode</th>
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
              <td className="hide-on-mobile">
                <svg id={`barcode-${medicine.productId}`}></svg>
              </td>
              <td className="hide-on-mobile">{medicine.category}</td>
              <td className="hide-on-mobile price">Rs. {medicine.price}</td>
              <td className="hide-on-mobile stock">
                {reorderedMedicines.includes(medicine._id) && (
                  <FiCheckCircle className="check-icon" style={{ color: "green", marginRight: "5px" }} />
                )}
                {medicine.stock}
              </td>
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
                  {/* <button style={{
                        backgroundColor: "#0369a1", 
                        color: "white", 
                        padding: "0.5rem 1rem", 
                        border: "none", 
                        borderRadius: "0.5rem", 
                        fontSize: "1rem", 
                        fontWeight: "bold", 
                        cursor: "pointer", 
                        transition: "background-color 0.3s ease, transform 0.2s ease", 
                      }}>save</button> */}
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
