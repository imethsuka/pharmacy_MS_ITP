import { motion } from "framer-motion";
import Input from "../../components/Customer/Input";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/Customer/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { signup } = useAuthStore();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Please fill all the fields.");
            return;
        }

        try {
            await signup(email, password, name);
            navigate("/login");
        } catch (error) {
            console.log(error);
            setError("Signup failed. Please try again.");
        }
    };

    return (
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
    );
};

export default SignUpPage;