import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../styles/Inventory/addMedicines.css'; // Import the CSS file
import InventoryBackButton from '../../components/Inventory/InventoryBackButton';

const CreateOrder = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [medicines, setMedicines] = useState(['']); // Array of medicine IDs
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Add a new medicine input field
  const addMedicineField = () => {
    setMedicines([...medicines, '']);
  };

  // Handle changes in medicine input fields
  const handleMedicineChange = (index, value) => {
    const newMedicines = [...medicines];
    newMedicines[index] = value;
    setMedicines(newMedicines);
  };

  const handleSaveOrder = async () => {
    if (!name || !email || !phone || medicines.some((id) => !id)) {
      enqueueSnackbar('Please fill all required fields', { variant: 'error' });
      return;
    }

    const data = {
      name,
      email,
      phone,
      medicines,
      notes,
    };

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5555/api/test/create', data);
      enqueueSnackbar('Order created successfully', { variant: 'success' });
      console.log(response.data);
      navigate('/inventory/orders'); // Redirect to the orders list page
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error creating order', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-medicine-container">
      <InventoryBackButton />
      <h1 className="create-medicine-title">Create New Order</h1>
      {loading ? <Spinner /> : ''}
      <div className="create-medicine-form">
        <div className="form-group">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Medicines</label>
          {medicines.map((medicine, index) => (
            <div key={index} className="medicine-input-group">
              <input
                type="text"
                value={medicine}
                onChange={(e) => handleMedicineChange(index, e.target.value)}
                className="form-input"
                placeholder={`Medicine ID ${index + 1}`}
                required
              />
              {index === medicines.length - 1 && (
                <button type="button" onClick={addMedicineField} className="add-medicine-button">
                  +
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-input"
          />
        </div>
        <button className="save-button" onClick={handleSaveOrder}>
          Create Order
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;