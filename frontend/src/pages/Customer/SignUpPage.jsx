import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, Calendar } from "lucide-react"; // Ensure Calendar is imported
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { signup } = useAuthStore();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword || !gender || !dateOfBirth || !address) {
            setError("Please fill all the fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await signup(email, password, name, gender, dateOfBirth, address);
            navigate("/login");
        } catch (error) {
            console.log(error);
            setError("Signup failed. Please try again.");
        }
    };

    return (
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

                {error && (
                    <div className='mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded'>
                        {error}
                    </div>
                )}

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
                        <Input
                            id='password'
                            icon={Lock}
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
                            Confirm Password
                        </label>
                        <Input
                            id='confirmPassword'
                            icon={Lock}
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='gender' className='block text-sm font-medium text-gray-700'>
                            Gender
                        </label>
                        <div className='relative'>
                            <select
                                id='gender'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            >
                                <option value=''>Select Gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>
                            </select>
                            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='dateOfBirth' className='block text-sm font-medium text-gray-700'>
                            Date of Birth
                        </label>
                        <div className='relative'>
                            <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                            <input
                                id='dateOfBirth'
                                type='date'
                                className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
                            Address
                        </label>
                        <Input
                            id='address'
                            icon={User}
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>
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
    );
};
export default SignUpPage;