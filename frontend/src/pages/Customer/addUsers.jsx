import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../styles/Customer/addUsers.css' // Import the CSS file

const addUsers = () => {
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [dobError, setDobError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveUser = () => {
    const data = {
      name,
      email,
      password,
      confirmPassword,
      gender,
      dob,
      address
    };
    setLoading(true);
    axios.post('http://localhost:5555/users', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('User added successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error adding user', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="create-user-container">
      <BackButton />
      <h1 className="create-user-title">Add User</h1>
      {loading ? <Spinner /> : ''}
      <div className="create-user-form">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Gender</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">DOB</label>
          <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />
        </div>
        
        
        
        <button className="save-button" onClick={handleSaveUser}>Save</button>
      </div>
    </div>
  );
};

export default addMedicines;
