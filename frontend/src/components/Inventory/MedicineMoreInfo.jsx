import React from "react";
import "../../styles/Inventory/MedicineMoreInfo.css"; 

const MedicineMoreInfo = ({ medicine, onClose }) => {
  if (!medicine) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>

        <div className="popup-body">
          {/* Image Section */}
          <div className="popup-image">
            <img src={medicine.imageUrl} alt={medicine.name} />
          </div>

          {/* Details Section */}
          <div className="popup-details">
            <h2 className="product-name">{medicine.name}</h2>
            <p className="product-description">{medicine.description}</p>

            <div className="details-grid">
              <div className="detail-item"><strong>ID:</strong> {medicine._id}</div>
              <div className="detail-item"><strong>Category:</strong> {medicine.category}</div>
              <div className="detail-item"><strong>Usage:</strong> {medicine.howToUse}</div>
              <div className="detail-item"><strong>Side Effects:</strong> {medicine.sideEffects}</div>
              <div className="detail-item price"><strong>Price:</strong> Rs. {medicine.price}</div>
              <div className="detail-item stock"><strong>Stock:</strong> {medicine.stock}</div>
              <div className="detail-item"><strong>Reorder Level:</strong> {medicine.reorderLevel}</div>
              <div className="detail-item"><strong>Batch Expiry:</strong> {medicine.batchExpiry}</div>
              <div className="detail-item">
                <strong>Prescription:</strong> {medicine.requiresPrescription ? "Yes" : "No"}
              </div>
              <div className="detail-item"><strong>Supplier:</strong> {medicine.supplierEmail}</div>
              <div className="detail-item"><strong>Created:</strong> {new Date(medicine.createdAt).toLocaleString()}</div>
              <div className="detail-item"><strong>Updated:</strong> {new Date(medicine.updatedAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineMoreInfo;
