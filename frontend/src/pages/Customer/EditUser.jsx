import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Input from '../../components/Customer/Input'; // Make sure this is the correct path
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PasswordStrengthMeter from '../../components/Customer/PasswordStrengthMeter';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Import the spinner component
import '../../styles/Customer/EditUser.css'; // Import the CSS file


const EditUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dobError, setDobError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/users/${id}`)
      .then((response) => {
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setGender(userData.gender);
        setDob(userData.dob);
        setAddress(userData.address);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]);

  const handleEditUser = async(e) => {
    e.preventDefault();

  

    const selectedDob = new Date(dob);
    const currentDate = new Date();
    if (selectedDob > currentDate) {
      setDobError('Date of birth cannot be a future date');
      return;
    }

    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 18) {
      setDobError('You must be at least 18 years old');
      return;
    }


    // Hash the password before sending to the backend
  const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds

    const data = {
      name,
      email,
      password: hashedPassword,
      gender,
      dob,
      address,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/users/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('User Edited successfully', { variant: 'success' });
        navigate('/Customer/userslist');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleDobChange = (e) => {
    const selectedDob = e.target.value;
    setDob(selectedDob);

    const age = new Date().getFullYear() - new Date(selectedDob).getFullYear();
    const currentDate = new Date();
    if (new Date(selectedDob) > currentDate) {
      setDobError('Date of birth cannot be a future date');
    } else if (age < 18) {
      setDobError('You must be at least 18 years old');
    } else {
      setDobError('');
    }
  };

  return (
    <div className="edit-user-container">
      <h1 className="edit-user-title">Edit User</h1>
      {loading && <ClipLoader size={50} color="#3498db" />} {/* Display spinner while loading */}
      <form className="edit-user-form" onSubmit={handleEditUser}>
        
       
							<div className="form-group">
								<label htmlFor="name">Full Name</label>
								<Input
									id="name"
									icon={User}
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="form-input"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email Address</label>
								<Input
									id="email"
									icon={Mail}
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="form-input"
									disabled
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<div className="password-input-wrapper">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="form-input"
									/>
									<div
										className="password-toggle"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <EyeOff /> : <Eye />}
									</div>
								</div>
							</div>
							
							<div className="form-group">
								<label htmlFor="gender">Gender</label>
								<select
									id="gender"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									className="form-input"
								>
									<option value="">Select Gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="dob">Date of Birth</label>
								<Input
									id="dob"
									type="date"
									value={dob}
									onChange={handleDobChange}
									className="form-input"
								/>
								{dobError && <div className="error-text">{dobError}</div>}
							</div>
							<div className="form-group">
								<label htmlFor="address">Address</label>
								<Input
									id="address"
									type="text"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className="form-input"
								/>
							</div>
							{passwordError && (
								<div className="error-message">
									{passwordError}
								</div>
							)}
						
						
							
					
        <motion.button
          className="submit-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
        >
          Save
        </motion.button>
      </form>
    </div>
  );
};

export default EditUser;
