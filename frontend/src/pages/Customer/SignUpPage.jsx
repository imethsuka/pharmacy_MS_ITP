import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/Customer/Input";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/Customer/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";
import { addUser } from "../../store/userStore"; // Import addUser function
import "../../styles/Customer/SignUpPage.css";

const SignUpPage = () => {
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
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setPasswordError("Passwords do not match");
			return;
		}

		const selectedDob = new Date(dob);
		const currentDate = new Date();
		if (selectedDob > currentDate) {
			setDobError("Date of birth cannot be a future date");
			return;
		}

		const age = new Date().getFullYear() - new Date(dob).getFullYear();
		if (age < 18) {
			setDobError("You must be at least 18 years old");
			return;
		}

		try {
			await signup(email, password, name, gender, dob, address);
			addUser({ name, email, gender, dob, address }); // Store user data
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	const handleDobChange = (e) => {
		const selectedDob = e.target.value;
		setDob(selectedDob);

		const age = new Date().getFullYear() - new Date(selectedDob).getFullYear();
		const currentDate = new Date();
		if (new Date(selectedDob) > currentDate) {
			setDobError("Date of birth cannot be a future date");
		} else if (age < 18) {
			setDobError("You must be at least 18 years old");
		} else {
			setDobError("");
		}
	};

	return (
		<React.Fragment>
			{error && (
				<div className="error-message">
					{error}
				</div>
			)}
			<div className="signup-container">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="signup-form"
				>
					<div className="form-content">
						<h2 className="form-title">
							Create Account
						</h2>

						<form onSubmit={handleSignUp}>
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
								<label htmlFor="confirmPassword">Confirm Password</label>
								<div className="password-input-wrapper">
									<Input
										id="confirmPassword"
										
										type={showConfirmPassword ? "text" : "password"}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="form-input"
									/>
									<div
										className="password-toggle"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? <EyeOff /> : <Eye />}
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
							<PasswordStrengthMeter password={password} />
							<motion.button
								className="submit-button"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type="submit"
							>
								Sign Up
							</motion.button>
						</form>
					</div>
					<div className='signup-link-container'>
                    <p className='signup-text'>
                        Already have an account?{" "}
                        <Link to='/login' className='signup-link'>
                            Login
                        </Link>
                    </p>
                </div>
				</motion.div>
			</div>
		</React.Fragment>
	);
};

export default SignUpPage;
