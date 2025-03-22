import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Customer/Input";
import { useAuthStore } from "../../store/authStore";
import "../../styles/Customer/LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

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

        if (email === "admin1@gmail.com" && password === "admin") {
            navigate("/customerdashboard");
        } else {
            navigate("/home");
        }
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='login-box'
            >
                <div className='login-content'>
                    <div className='login-header'>
                        <h2 className='login-title'>
                            Welcome Back
                        </h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className='form-group'>
                            <label htmlFor='email' className='form-label'>
                                Email Address
                            </label>
                            <Input
                                id='email'
                                icon={Mail}
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='input-field'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password' className='form-label'>
                                Password
                            </label>
                            <div className='password-container'>
                                <Input
                                    id='password'
                                    icon={Lock}
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='input-field'
                                />
                                <div
                                    className='password-toggle'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className='icon' /> : <Eye className='icon' />}
                                </div>
                            </div>
                        </div>

                        <div className='forgot-password'>
                            <Link to='/forgot-password' className='forgot-password-link'>
                                Forgot password?
                            </Link>
                        </div>
                        {error && <p className='error-message'>{error}</p>}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='submit-button'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='loading-icon' /> : "Login"}
                        </motion.button>
                    </form>
                </div>
                <div className='signup-link-container'>
                    <p className='signup-text'>
                        Don't have an account?{" "}
                        <Link to='/signup' className='signup-link'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
