import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import "./add.css";

const Add = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signup } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signup(email, password, name);
			navigate('/users'); // Navigate to the users list after adding a user
		} catch (error) {
			console.error('Error adding user:', error);
		}
	};

	return (
		<div className='addUser'>
			<Link to={"/users"}>Back</Link>
			<h3>Add new user</h3>
			<form className='addUserForm' onSubmit={handleSubmit}>
				<div className="inputGroup">
					<label htmlFor="name">Name</label>
					<input type="text" onChange={(e) => setName(e.target.value)} id="name" name="name" autoComplete='off' placeholder='Name' />
				</div>
				<div className="inputGroup">
					<label htmlFor="email">Email</label>
					<input type="email" onChange={(e) => setEmail(e.target.value)} id="email" name="email" autoComplete='off' placeholder='Email' />
				</div>
				<div className="inputGroup">
					<label htmlFor="password">Password</label>
					<input type="password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" autoComplete='off' placeholder='Password' />
				</div>
				<div className="inputGroup">
					<button type="submit">Add User</button>
				</div>
			</form>
		</div>
	);
};

export default Add;