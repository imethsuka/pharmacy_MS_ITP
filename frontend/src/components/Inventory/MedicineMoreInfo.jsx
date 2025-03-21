import React from "react";
import "../../styles/Inventory/MedicineMoreInfo.css"; // Import Vanilla CSS styles

const MedicineMoreInfo = ({ medicine, onClose }) => {
  


  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="popup-body">
          <div className="popup-image">
            <img src={medicine.imageUrl} alt={medicine.name} />
          </div>
          <div className="popup-details">
            <h2 className="product-name">{medicine._id}</h2>
            <h2 className="product-name">{medicine.name}</h2>
            <p className="product-description">{medicine.description}</p>
            
            <div className="detail-section">
              <h3>Product ID</h3>
              <p>{medicine.productId}</p>
            </div>
            <div className="detail-section">
              <h3>Category</h3>
              <p>{medicine.category}</p>
            </div>
            <div className="detail-section">
              <h3>Description</h3>
              <p>{medicine.description}</p>
            </div>
            <div className="detail-section">
              <h3>How to Use</h3>
              <p>{medicine.howToUse}</p>
            </div>
            <div className="detail-section">
              <h3>Side Effects</h3>
              <p>{medicine.sideEffects}</p>
            </div>
            <div className="detail-section price-section">
              <h3>Price</h3>
              <p className="price">Rs. {medicine.price}</p>
            </div>
            <div className="detail-section">
              <h3>Stock</h3>
              <p>{medicine.stock}</p>
            </div>
            <div className="detail-section">
              <h3>Re-order Level</h3>
              <p>{medicine.reorderLevel}</p>
            </div>
            <div className="detail-section">
              <h3>Batch Expiry</h3>
              <p>{medicine.batchExpiry}</p>
            </div>
            <div className="detail-section">
              <h3>Requires Prescription</h3>
              <p>{medicine.requiresPrescription}</p>
            </div>
            <div className="detail-section">
              <h3>Supplier Email</h3>
              <p>{medicine.supplierEmail}</p>
            </div>
            <div className="detail-section">
              <h3>Create Time</h3>
              <p>{new Date(medicine.createdAt).toString()}</p>
            </div>
            <div className="detail-section">
              <h3>Last Update Time</h3>
              <p>{new Date(medicine.updatedAt).toString()}</p>
            </div>
            <div className="detail-section">
              <h3>Operations</h3>
              <p>
                <div className="operations">
                    <Link to={`/medicines/details/${medicine._id}`}>
                        <FiInfo className="info-icon" /> {/* Modern info icon */}
                    </Link>
                    <Link to={`/medicines/edit/${medicine._id}`}>
                        <RiEdit2Line className="edit-icon" /> {/* Modern edit icon */}
                    </Link>
                    <Link to={`/medicines/delete/${medicine._id}`}>
                        <HiOutlineTrash className="delete-icon" /> {/* Modern delete icon */}
                    </Link>
                </div>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineMoreInfo;
