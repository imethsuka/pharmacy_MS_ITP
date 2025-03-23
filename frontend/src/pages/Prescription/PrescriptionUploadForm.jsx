import React, { useState } from 'react';
import axios from 'axios';
import './PrescriptionUploadForm.css';

const PrescriptionUploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    medicines: [''],
    fileUrl: ''
  });

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const updatedMedicines = [...formData.medicines];
      updatedMedicines[index] = e.target.value;
      setFormData({ ...formData, medicines: updatedMedicines });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addMedicineField = () => {
    setFormData({ ...formData, medicines: [...formData.medicines, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/orders/create', formData);
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="prescription-form-container">
      <h2>Upload Prescription</h2>
      <form className="prescription-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        
        {formData.medicines.map((medicine, index) => (
          <div className="medicine-input-container" key={index}>
            <input type="text" placeholder="Medicine ID" value={medicine} onChange={(e) => handleChange(e, index)} required />
            <button type="button" className="add-medicine-btn" onClick={addMedicineField}>+</button>
          </div>
        ))}
        
        <input type="text" name="fileUrl" placeholder="Prescription File Path" value={formData.fileUrl} onChange={handleChange} required />
        
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default PrescriptionUploadForm;
