import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/Customer/Input";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/Customer/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";
import { addUser } from "../../store/userStore"; // Import addUser function

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
			navigate("/verify-email");
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
				<div className='mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded'>
					{error}
				</div>
			)}
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
				>
					<div className='p-8'>
						<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text'>
							Create Account
						</h2>

						<form onSubmit={handleSignUp}>
							<div className='mb-4'>
								<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
									Full Name
								</label>
								<Input
									id='name'
									icon={User}
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
									className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
							<div className='mb-4'>
								<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
									Email Address
								</label>
								<Input
									id='email'
									icon={Mail}
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
							<div className='mb-4'>
								<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
									Password
								</label>
								<div className='relative'>
									<Input
										id='password'
										icon={Lock}
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
									<div
										className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <EyeOff className='w-5 h-5 text-gray-500' /> : <Eye className='w-5 h-5 text-gray-500' />}
									</div>
								</div>
							</div>
							<div className='mb-4'>
								<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
									Confirm Password
								</label>
								<div className='relative'>
									<Input
										id='confirmPassword'
										icon={Lock}
										type={showConfirmPassword ? 'text' : 'password'}
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
									<div
										className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? <EyeOff className='w-5 h-5 text-gray-500' /> : <Eye className='w-5 h-5 text-gray-500' />}
									</div>
								</div>
							</div>
							<div className='mb-4'>
								<label htmlFor='gender' className='block text-sm font-medium text-gray-700'>
									Gender
								</label>
								<select
									id='gender'
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									className='w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								>
									<option value=''>Select Gender</option>
									<option value='male'>Male</option>
									<option value='female'>Female</option>
									<option value='other'>Other</option>
								</select>
							</div>
							<div className='mb-4'>
								<label htmlFor='dob' className='block text-sm font-medium text-gray-700'>
									Date of Birth
								</label>
								<Input
									id='dob'
									type='date'
									value={dob}
									onChange={handleDobChange}
									className='w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
								{dobError && (
									<div className='mt-2 text-sm text-red-600'>
										{dobError}
									</div>
								)}
							</div>
							<div className='mb-4'>
								<label htmlFor='address' className='block text-sm font-medium text-gray-700'>
									Address
								</label>
								<Input
									id='address'
									type='text'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className='w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
							{passwordError && (
								<div className='mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded'>
									{passwordError}
								</div>
							)}
							<PasswordStrengthMeter password={password} />
							<motion.button
								className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type='submit'
							>
								Sign Up
							</motion.button>
						</form>
					</div>
					<div className='px-8 py-4 bg-white bg-opacity-50 flex justify-center'>
						<p className='text-sm text-gray-400'>
							Already have an account?{" "}
							<Link to={"/login"} className='text-blue-400 hover:underline'>
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