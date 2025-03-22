import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore"; // Updated import path
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Customer/Input"; // Updated import path
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import "../../styles/Customer/ResetPasswordPage.css";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, error, isLoading, message } = useAuthStore();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token, password);

            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    };

    return (
        <div className="container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='reset-password-box'
            >
                <div className='reset-password-content'>
                    <h2 className='reset-password-title'>
                        Reset Password
                    </h2>
                    {error && <p className='error-message'>{error}</p>}
                    {message && <p className='message'>{message}</p>}

                    <form onSubmit={handleSubmit}>
                        <Input
                            
                            type='password'
                            placeholder='New Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Input
                            
                            type='password'
                            placeholder='Confirm New Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='submit-button'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? "Resetting..." : "Set New Password"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;
