import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../styles/Inventory/addMedicines.css' // Import the CSS file

const addMedicines = () => {
  const [name, setName] = useState('');
  const [productId, setProductId] = useState('');
  const [catergory, setCatergory] = useState('');
  const [description, setDescription] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [batchExpiry, setBatchExpiry] = useState('');
  const [requiresPrescription, setRequiresPrescription] = useState(false);
  const [supplierEmail, setSupplierEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveMedicine = () => {
    const data = {
      name,
      productId,
      catergory,
      description,
      howToUse,
      sideEffects,
      price,
      stock,
      reorderLevel,
      batchExpiry,
      requiresPrescription,
      supplierEmail,
      imageUrl,
    };
    setLoading(true);
    axios.post('http://localhost:5555/medicines', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Medicine added successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error adding medicine', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="create-medicine-container">
      <BackButton />
      <h1 className="create-medicine-title">Add Medicine</h1>
      {loading ? <Spinner /> : ''}
      <div className="create-medicine-form">
        <div className="form-group">
          <label className="form-label">Medicine Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Product ID</label>
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Catergory</label>
          <input type="text" value={catergory} onChange={(e) => setCatergory(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">How to Use</label>
          <input type="text" value={howToUse} onChange={(e) => setHowToUse(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Side Effects</label>
          <input type="text" value={sideEffects} onChange={(e) => setSideEffects(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Stock</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Reorder Level</label>
          <input type="number" value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Batch Expiry</label>
          <input type="date" value={batchExpiry} onChange={(e) => setBatchExpiry(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Requires Prescription</label>
          <div className="checkbox-container">
            <input 
              type="checkbox" 
              id="requiresPrescription"
              checked={requiresPrescription} 
              onChange={(e) => setRequiresPrescription(e.target.checked)} 
              className="form-checkbox" 
            />
            <label htmlFor="requiresPrescription" className="checkbox-label">
              Check this if a prescription is required to purchase this medicine
            </label>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Supplier Email</label>
          <input type="email" value={supplierEmail} onChange={(e) => setSupplierEmail(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="form-input" />
        </div>
        <button className="save-button" onClick={handleSaveMedicine}>Save</button>
      </div>
    </div>
  );
};

export default addMedicines;
