import { motion } from "framer-motion";
import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/Customer/ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };

    // Input component inline implementation
    const Input = ({ icon: Icon, ...props }) => {
        return (
            <div className="input-field-container">
                {Icon && <Icon className="input-icon" />}
                <input {...props} className="input-field" />
            </div>
        );
    };

    return (
        <div className="forgot-password-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="forgot-password-form"
            >
                <div className="form-content">
                    <h2 className="form-title">Forgot Password</h2>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p className="form-description">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <Input
                                icon={Mail}
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="submit-button"
                                type="submit"
                            >
                                {isLoading ? <Loader className="loader" /> : "Send Reset Link"}
                            </motion.button>
                        </form>
                    ) : (
                        <div className="success-message">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="icon-wrapper"
                            >
                                <Mail className="icon" />
                            </motion.div>
                            <p className="success-message-text">
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                        </div>
                    )}
                </div>

                <div className="footer">
                    <Link to="/login" className="back-to-login">
                        <ArrowLeft className="arrow-icon" /> Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPage;
