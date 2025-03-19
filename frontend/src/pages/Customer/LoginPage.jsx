import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Input from "../../components/Customer/Input";
import { useAuthStore } from "../../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate(); // Initialize useNavigate

    const { login, isLoading, error } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        await login(email, password);

        if (email === "admin@gmail.com" && password === "admin") {
            navigate("/dashboard");
        } else {
            navigate("/home");
        }
    };

    const handleAdminDashboard = () => {
        navigate('/dashboard'); // Navigate to DashboardPage
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-white bg-opacity-95 border border-blue-500 rounded-2xl shadow-xl overflow-hidden'
            >
                <div className='p-8'>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text'>
                            Welcome Back
                        </h2>
                    </div>
                    <form onSubmit={handleLogin}>
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

                        <div className='flex items-center mb-6'>
                            <Link to='/forgot-password' className='text-sm text-blue-400 hover:underline'>
                                Forgot password?
                            </Link>
                        </div>
                        {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-white bg-opacity-95 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Don't have an account?{" "}
                        <Link to='/signup' className='text-blue-400 hover:underline'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;