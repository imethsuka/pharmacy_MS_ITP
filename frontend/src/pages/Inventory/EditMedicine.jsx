import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../styles/inventory/EditMedicine.css'; // Import the CSS file
import InventoryBackButton from '../../components/Inventory/InventoryBackButton';

const EditMedicine = () => {
  const [name, setName] = useState('');
  const [productId, setProductId] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [batchExpiry, setBatchExpiry] = useState('');
  const [requiresPrescription, setRequiresPrescription] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/medicines/${id}`)
      .then((response) => {
        setName(response.data.name);
        setProductId(response.data.productId);
        setCategory(response.data.category);
        setDescription(response.data.description);
        setHowToUse(response.data.howToUse);
        setSideEffects(response.data.sideEffects);
        setPrice(response.data.price);
        setStock(response.data.stock);
        setReorderLevel(response.data.reorderLevel);
        setBatchExpiry(response.data.batchExpiry);
        setRequiresPrescription(response.data.requiresPrescription);
        setSupplierEmail(response.data.supplierEmail);
        setImageUrl(response.data.imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check again');
        console.log(error);
      });
  }, [id]);

  const handleEditMedicine = () => {
    const data = {
        // name,
        // productId,
        // category,
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
    axios
      .put(`http://localhost:5555/medicines/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Medicine Edited successfully', { variant: 'success' });
        navigate('/inventory/MedicineLists');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="edit-medicine-container">
      
      {loading ? <Spinner /> : ''}
      
      <div className="edit-medicine-form">
        <InventoryBackButton />
        <h1 className="edit-medicine-name">Edit Medicine</h1>
      
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            readOnly    // Makes the field uneditable
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Product ID</label>
          <input
            type="text"
            value={productId}
            readOnly    // Makes the field uneditable
            onChange={(e) => setProductId(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <input
            type="text"
            value={category}
            readOnly    // Makes the field uneditable
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">How to use</label>
          <input
            type="text"
            value={howToUse}
            onChange={(e) => setHowToUse(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Side Effects</label>
          <input
            type="text"
            value={sideEffects}
            onChange={(e) => setSideEffects(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Re-order Level</label>
          <input
            type="number"
            value={reorderLevel}
            onChange={(e) => setReorderLevel(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Batch Expiry</label>
          <input
            type="date"
            value={batchExpiry}
            onChange={(e) => setBatchExpiry(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Requires Prescription</label>
          <input
            type="boolean"
            value={requiresPrescription}
            onChange={(e) => setRequiresPrescription(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Supplier Email</label>
          <input
            type="email"
            value={supplierEmail}
            onChange={(e) => setSupplierEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="form-input"
          />
        </div>
        
        <button className="save-button" onClick={handleEditMedicine}>
          Update Medicine
        </button>
      </div>
    </div>
  );
};

export default EditMedicine;