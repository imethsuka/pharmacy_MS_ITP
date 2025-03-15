import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import '../../styles/Inventory/showMedicines.css'; // Import the CSS file

const ShowMedicines = () => {
  const [medicine, setMedicine] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/medicines/${id}`)
      .then((response) => {
        setMedicine(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="show-medicine-container">
      <BackButton />
      <h1 className="show-medicine-title">Show Medicine</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="medicine-details">
          <div className="detail-item">
            <span className="detail-label">Id</span>
            <span className="detail-value">{medicine._id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Name</span>
            <span className="detail-value">{medicine.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Product ID</span>
            <span className="detail-value">{medicine.productId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Category</span>
            <span className="detail-value">{medicine.category}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Description</span>
            <span className="detail-value">{medicine.description}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">How To Use</span>
            <span className="detail-value">{medicine.howToUse}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Side Effects</span>
            <span className="detail-value">{medicine.sideEffects}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Price</span>
            <span className="detail-value">{medicine.price}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Stock</span>
            <span className="detail-value">{medicine.stock}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Reorder Level</span>
            <span className="detail-value">{medicine.reorderLevel}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Batch Expiry</span>
            <span className="detail-value">{medicine.batchExpiry}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Required Prescription</span>
            <span className="detail-value">{medicine.requiresPrescription ? 'Yes' : 'No'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Supplier Email</span>
            <span className="detail-value">{medicine.supplierEmail}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Image</span>
            <span className="detail-value">{medicine.imageUrl}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Create Time</span>
            <span className="detail-value">{new Date(medicine.createdAt).toString()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Update Time</span>
            <span className="detail-value">{new Date(medicine.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowMedicines;