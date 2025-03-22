import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { RiEdit2Line } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Correct import
import "../../styles/Inventory/MedicinesTable.css";
import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const MedicinesTable = ({ medicines, onMoreInfoClick }) => {

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
      orientation: "landscape", // Landscape mode for better table fit
      unit: "mm",
      format: "a3", // Larger format for clarity
    });
  
    doc.setFontSize(14);
    doc.text("Medicines Table", 14, 15);
  
    // Define table columns (ensure "Barcode" is just a title)
    const columns = [
      "No",
      "Name",
      "Product ID",
      "Barcode", // Title only, no barcode here!
      "Category",
      "Price",
      "Stock",
      "Reorder Level",
      "Batch Expiry",
      "Prescription",
      "Supplier",
    ];
  
    // Generate barcodes for each productId
    const barcodeImages = await Promise.all(
      medicines.map((medicine) => {
        return new Promise((resolve) => {
          if (!medicine.productId) {
            resolve(null);
            return;
          }
  
          const canvas = document.createElement("canvas"); // Temporary canvas for barcode
          JsBarcode(canvas, medicine.productId, {
            format: "CODE128",
            displayValue: false, // No text under barcode
            width: 2,
            height: 50, // Bigger barcode for clarity
          });
  
          const barcodeImage = canvas.toDataURL("image/png"); // Convert to base64
          resolve(barcodeImage);
        });
      })
    );
  
    // Map medicines data to rows, keeping "Barcode" column empty (it will be drawn later)
    const rows = medicines.map((medicine, index) => [
      index + 1,
      medicine.name || "N/A",
      medicine.productId || "N/A",
      "", // This will hold the barcode image
      medicine.category || "N/A",
      `Rs. ${medicine.price || "0.00"}`,
      medicine.stock || "0",
      medicine.reorderLevel || "N/A",
      medicine.batchExpiry ? medicine.batchExpiry : "N/A",
      medicine.requiresPrescription ? "Yes" : "No",
      medicine.supplierEmail || "N/A",
    ]);
  
    // Add table to PDF (without barcode images)
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 25,
      theme: "grid",
      styles: {
        fontSize: 10, // Set readable font size
        cellPadding: 4,
      },
      columnStyles: {
        3: { cellWidth: 50 }, // Increase barcode column width
      },
      didDrawCell: (data) => {
        if (data.column.index === 3 && barcodeImages[data.row.index]) {
          doc.addImage(
            barcodeImages[data.row.index], // Insert barcode
            "PNG",
            data.cell.x + 5,
            data.cell.y + 2,
            50, // Width
            20  // Height
          );
        }
      },
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
